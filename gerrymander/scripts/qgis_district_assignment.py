    # -*- coding: utf-8 -*-

"""
***************************************************************************
*                                                                         *
*   This program is free software; you can redistribute it and/or modify  *
*   it under the terms of the GNU General Public License as published by  *
*   the Free Software Foundation; either version 2 of the License, or     *
*   (at your option) any later version.                                   *
*                                                                         *
***************************************************************************
"""

from qgis.PyQt.QtCore import QCoreApplication, QVariant
from qgis.core import (QgsProcessing,
                       QgsFeature, 
                       QgsFeatureSink,
                       QgsField,
                       QgsFields,
                       QgsProcessingException,
                       QgsProcessingAlgorithm,
                       QgsProcessingParameterFeatureSource,
                       QgsProcessingParameterFeatureSink)
from qgis import processing

import random
import math

class ConstrainedKMeansProcessingAlgorithm(QgsProcessingAlgorithm):
    """
    This algorithm is used with US census tract information to create
    non-gerrymandered congressional and legislative districts.  The
    algorithm uses a relatively standard K Means Clustering algorithm,
    but the number of census tracts that can be in any given cluster is
    constrained by the total population of those census tracts to ensure
    that the population of each cluster is approximately equal.
    """

    # Constants used to refer to parameters and outputs. They will be
    # used when calling the algorithm from another algorithm, or when
    # calling from the QGIS console.

    INPUT = 'INPUT'
    OUTPUT = 'OUTPUT'

    def tr(self, string):
        """
        Returns a translatable string with the self.tr() function.
        """
        return QCoreApplication.translate('Processing', string)

    def createInstance(self):
        return ConstrainedKMeansProcessingAlgorithm()

    def name(self):
        """
        Returns the algorithm name, used for identifying the algorithm. This
        string should be fixed for the algorithm, and must not be localised.
        The name should be unique within each provider. Names should contain
        lowercase alphanumeric characters only and no spaces or other
        formatting characters.
        """
        return 'constrained_k_means'

    def displayName(self):
        """
        Returns the translated algorithm name, which should be used for any
        user-visible display of the algorithm name.
        """
        return self.tr('Constrained K Means')

    def group(self):
        """
        Returns the name of the group this algorithm belongs to. This string
        should be localised.
        """
        return self.tr('scripts')

    def groupId(self):
        """
        Returns the unique ID of the group this algorithm belongs to. This
        string should be fixed for the algorithm, and must not be localised.
        The group id should be unique within each provider. Group id should
        contain lowercase alphanumeric characters only and no spaces or other
        formatting characters.
        """
        return 'scripts'

    def shortHelpString(self):
        """
        Returns a localised short helper string for the algorithm. This string
        should provide a basic description about what the algorithm does and the
        parameters and outputs associated with it..
        """
        return self.tr("K Means Clustering Algorithm with Constraint")

    def initAlgorithm(self, config=None):
        """
        Here we define the inputs and output of the algorithm, along
        with some other properties.
        """

        # We add the input vector features source. It can have any kind of
        # geometry.
        self.addParameter(
            QgsProcessingParameterFeatureSource(
                self.INPUT,
                self.tr('Input layer'),
                [QgsProcessing.TypeVectorAnyGeometry]
            )
        )

        # We add a feature sink in which to store our processed features (this
        # usually takes the form of a newly created vector layer when the
        # algorithm is run in QGIS).
        self.addParameter(
            QgsProcessingParameterFeatureSink(
                self.OUTPUT,
                self.tr('Output layer')
            )
        )
        
    def processAlgorithm(self, parameters, context, feedback):
        """
        Here is where the processing itself takes place.
        """

        # Retrieve the feature source and sink. The 'dest_id' variable is used
        # to uniquely identify the feature sink, and must be included in the
        # dictionary returned by the processAlgorithm function.
        source = self.parameterAsSource(
            parameters,
            self.INPUT,
            context
        )

        # If source was not found, throw an exception to indicate that the algorithm
        # encountered a fatal error. The exception text can be any string, but in this
        # case we use the pre-built invalidSourceError method to return a standard
        # helper text for when a source cannot be evaluated
        if source is None:
            raise QgsProcessingException(self.invalidSourceError(parameters, self.INPUT))
        
        output_fields = QgsFields()
        
        output_fields.append(QgsField('id', QVariant.String))
        output_fields.append(QgsField('population', QVariant.Int))
        output_fields.append(QgsField('district', QVariant.Int))
        
        (sink, dest_id) = self.parameterAsSink(
            parameters,
            self.OUTPUT,
            context,
            output_fields,
            source.wkbType(),
            source.sourceCrs()
        )

        # Send some information to the user
        feedback.pushInfo('CRS is {}'.format(source.sourceCrs().authid()))

        # If sink was not created, throw an exception to indicate that the algorithm
        # encountered a fatal error. The exception text can be any string, but in this
        # case we use the pre-built invalidSinkError method to return a standard
        # helper text for when a sink cannot be evaluated
        if sink is None:
            raise QgsProcessingException(self.invalidSinkError(parameters, self.OUTPUT))

        # Compute the number of steps to display within the progress bar and
        # get features from source
        # total = 100.0 / source.featureCount() if source.featureCount() else 0
            
        def get_census_tracts():
            return {
                feature['GEOID_Data']: {
                    'center': get_location(feature), 
                    'population': feature['B01001e1']
                }
                for feature in source.getFeatures()
            }
        
        def get_location(feature):
            return {
                'latitude': float(feature['INTPTLAT']),
                'longitude': float(feature['INTPTLON'])
            }

        def get_target_district_population(census_tracts, number_of_districts):
            total_population = sum([tract['population'] for tract in census_tracts.values()])
            return total_population / number_of_districts
        
        def get_all_tract_centers(census_tracts):
            return [tract['center'] for tract in census_tracts.values()]
            
        def initialize_districts(tract_centers, number_of_districts, target_district_population):
            '''
            For each district:
                (1) Randomly assign one of the census tracte locations to be the initial district center
                (2) Assign the target district population to the district
                (3) Create an empty list for census tracts assigned to district
            '''
            
            centers = random.sample(tract_centers, number_of_districts)
            return {
                district: {
                    'center': centers[district - 1],
                    'population': target_district_population, 
                    'assigned_census_tracts': []
                }
                for district in range(1, number_of_districts + 1)
            }
        
        def initialize_tract_assignments(census_tracts):
            '''
            Assign all census tracts to non-existent district 0
            '''
            return {
                id: {
                    'old_assignment': 0,
                    'new_assignment': 0
                }
                for id in census_tracts.keys()
            }
        
        def locate_state_center(census_tracts):
            locations = [tract['center'] for tract in census_tracts.values()]
            state_center_latitude = sum([location['latitude'] for location in locations]) / len(locations)
            state_center_longitude = sum([location['longitude'] for location in locations]) / len(locations)
            return {
                'latitude': state_center_latitude, 
                'longitude': state_center_longitude
            }
        
        def locate_center(assigned_census_tracts):
            locations = [list(tract.values())[0]['center'] for tract in assigned_census_tracts] 
            if len(locations) == 0:
                return None
            new_center_latitude = sum([location['latitude'] for location in locations]) / len(locations)
            new_center_longitude = sum([location['longitude'] for location in locations]) / len(locations)
            return {
                'latitude': new_center_latitude, 
                'longitude': new_center_longitude
            }
        
        def reset_district_info(districts, target_district_population):
            for id in districts.keys():
                new_center = locate_center(districts[id]['assigned_census_tracts'])
                if new_center:
                    districts[id]['center'] = new_center 
                districts[id]['population'] = target_district_population
                districts[id]['assigned_census_tracts'] = []
            return districts
        
        def get_squared_distance(location_1, location_2):
            squared_distance = (location_1['latitude'] - location_2['latitude'])**2 + (location_1['longitude'] - location_2['longitude'])**2
            return squared_distance

        def get_closest_district(districts, location, reassignment_id = None):
            min_distance = math.inf
            for id in districts.keys():
                district_location = districts[id]['center']
                distance = get_squared_distance(district_location, location)
                if distance < min_distance and id != reassignment_id:
                    closest_district = id
                    min_distance = distance
            return closest_district
            
        def get_assignment_by_tract(census_tracts, districts, census_tract_district_assignment):
            for id, tract in census_tracts.items():
                closest_district = get_closest_district(districts, tract['center'])
                census_tract_district_assignment[id]['new_assignment'] = closest_district
                districts[closest_district]['population'] -= tract['population']
                districts[closest_district]['assigned_census_tracts'].append({id: tract})
            return districts, census_tract_district_assignment
        
        def adjust_overpopulation(census_tracts, districts, census_tract_district_assignment, district_id, tracts_available_for_assignment):
            furthest_census_tracts = find_furthest_census_tracts(districts, district_id)
            while districts[district_id]['population'] < -2500 and len(furthest_census_tracts) > 0:
                #feedback.pushInfo(f"{district_id}: {districts[district_id]['population']}")
                new_assigned_tract = furthest_census_tracts.pop(0)
                new_assigned_tract_id = new_assigned_tract['tract_id']
                if new_assigned_tract_id in tracts_available_for_assignment:
                    new_assigned_tract_center = census_tracts[new_assigned_tract_id]['center']
                    new_district_id = get_closest_district(districts, new_assigned_tract_center, reassignment_id = district_id)
                    districts, census_tract_district_assignment = reassign_tract(census_tracts, districts, census_tract_district_assignment,
                                                                                 district_id, new_district_id, new_assigned_tract_id)
                    tracts_available_for_assignment.remove(new_assigned_tract_id)
            return districts, census_tract_district_assignment, tracts_available_for_assignment
            
        def adjust_underpopulation(census_tracts, districts, census_tract_district_assignment, district_id, tracts_available_for_assignment):
            nearest_census_tracts = find_nearest_census_tracts(census_tracts, districts, census_tract_district_assignment, district_id)
            while districts[district_id]['population'] > 2500 and len(nearest_census_tracts) > 0:
                #feedback.pushInfo(f"Underpop: {district_id}: {districts[district_id]['population']}")
                new_assigned_tract = nearest_census_tracts.pop(0)
                new_assigned_tract_id = new_assigned_tract['tract_id']
                if new_assigned_tract_id in tracts_available_for_assignment:
                    old_district = census_tract_district_assignment[new_assigned_tract_id]['new_assignment']
                    districts, census_tract_district_assignment = reassign_tract(census_tracts, districts, census_tract_district_assignment,
                                                                                 old_district, district_id, new_assigned_tract_id)
                    tracts_available_for_assignment.remove(new_assigned_tract_id)
            return districts, census_tract_district_assignment, tracts_available_for_assignment
        
        def find_furthest_census_tracts(districts, district_id):
            furthest_census_tracts = []
            for tract in districts[district_id]['assigned_census_tracts']:
                tract_id = list(tract.keys())[0]
                tract_center = tract[tract_id]['center']
                district_center = districts[district_id]['center']
                furthest_census_tracts.append({
                    'tract_id': tract_id,
                    'distance': get_squared_distance(tract_center, district_center)
                })
            furthest_census_tracts.sort(key = lambda x: x['distance'], reverse=True)
            return furthest_census_tracts
        
        def find_nearest_census_tracts(census_tracts, districts, census_tract_district_assignment, district_id):
            nearest_census_tracts = []
            for tract_id, tract in census_tract_district_assignment.items():
                if tract['new_assignment'] != district_id:
                    nearest_census_tracts.append(
                        {
                            'tract_id': tract_id,
                            'distance': get_squared_distance(census_tracts[tract_id]['center'], districts[district_id]['center'])
                        }
                    )
            nearest_census_tracts.sort(key = lambda x: x['distance'])
            return nearest_census_tracts
        
        def reassign_tract(census_tracts, districts, census_tract_district_assignment,
                           old_district_id, new_district_id, tract_id):
            tract = {tract_id: census_tracts[tract_id]}
            tract_population = tract[tract_id]['population']
            census_tract_district_assignment[tract_id]['new_assignment'] = new_district_id
            districts[new_district_id]['assigned_census_tracts'].append(tract)
            districts[old_district_id]['assigned_census_tracts'].remove(tract)
            districts[new_district_id]['population'] -= tract_population
            districts[old_district_id]['population'] += tract_population
            return districts, census_tract_district_assignment
        
        def get_district_order(districts, state_center):
            district_order = []
            for id, district in districts.items():
                distance = get_squared_distance(district['center'], state_center)
                district_order.append({
                    'id': id,
                    'distance': distance
                })
            district_order.sort(key = lambda x: x['distance'], reverse=True)
            return district_order
        
        def get_tracts_available_for_assignment(census_tracts, census_tract_district_assignment, furthest_district_id):
            return [id for id in census_tracts.keys() if census_tract_district_assignment[id]['new_assignment'] != furthest_district_id]
        
        def population_adjustment(census_tracts, districts, census_tract_district_assignment, state_center):
            district_order = get_district_order(districts, state_center)
            tracts_available_for_assignment = get_tracts_available_for_assignment(census_tracts, census_tract_district_assignment, district_order[0]['id'])
            for district in district_order:
                id = district['id']
                if districts[id]['population'] < 0:
                    districts, census_tract_district_assignment, tracts_available_for_assignment = adjust_overpopulation(census_tracts, districts,
                                                                                                                         census_tract_district_assignment,
                                                                                                                         id, tracts_available_for_assignment)
                else:
                    districts, census_tract_district_assignment, tracts_available_for_assignment = adjust_underpopulation(census_tracts, districts,
                                                                                                                          census_tract_district_assignment,
                                                                                                                          id, tracts_available_for_assignment)
                for tract_id, assignments in census_tract_district_assignment.items():
                    if tract_id in tracts_available_for_assignment and assignments['new_assignment'] == id:
                       tracts_available_for_assignment.remove(tract_id) 
            for district in district_order:
                feedback.pushInfo(f"{district['id']}: {districts[district['id']]['population']}")
            return districts, census_tract_district_assignment
                
        def get_differences(census_tract_district_assignment):
            differences = 0
            for tract in census_tract_district_assignment.values():
                if tract['old_assignment'] != tract['new_assignment']:
                    differences += 1
                    tract['old_assignment'] = tract['new_assignment']
            return differences, census_tract_district_assignment
            
        def assign_census_tracts(census_tracts, districts, census_tract_district_assignment):
            districts, census_tract_district_assignment = get_assignment_by_tract(census_tracts, districts, census_tract_district_assignment)

            differences, census_tract_district_assignment = get_differences(census_tract_district_assignment)
            return districts, census_tract_district_assignment, differences

        def k_means(census_tracts, tract_centers, number_of_districts, target_district_population):
            districts = initialize_districts(tract_centers, number_of_districts, target_district_population)
            census_tract_district_assignment = initialize_tract_assignments(census_tracts)
            #county_order = initialize_county_order(census_tracts)
            iteration_number = 1
            differences = 1
            while differences > 0 and iteration_number < 100:
                if iteration_number > 1:
                    districts = reset_district_info(districts, target_district_population)
                feedback.pushInfo(f'Iteration number {iteration_number}: {differences} differences')
                districts, census_tract_district_assignment, differences = assign_census_tracts(census_tracts, districts, census_tract_district_assignment)
                
                iteration_number += 1
            return districts, census_tract_district_assignment
        
        number_of_districts = 8 # NEED TO FIGURE OUT HOW TO IMPORT # OF DISTRICTS TO AUTOMATE DIFFERENT STATES
        
        # Run the K-Means Analysis
        census_tracts = get_census_tracts()
        tract_centers = get_all_tract_centers(census_tracts)
        state_center = locate_state_center(census_tracts)
        target_district_population = get_target_district_population(census_tracts, number_of_districts)
        districts, census_tract_district_assignment = k_means(census_tracts, tract_centers, number_of_districts, target_district_population)
        districts, census_tract_district_assignment = population_adjustment(census_tracts, districts, census_tract_district_assignment, state_center)

        
        # Create the Output Sink
        for feature in source.getFeatures():
            f = QgsFeature()
            f.setFields(output_fields)
            f.setGeometry(feature.geometry())
            f['id'] = feature['GEOID_Data']
            f['population'] = feature['B01001e1']
            f['district'] = census_tract_district_assignment[f['id']]['new_assignment']
            sink.addFeature(f, QgsFeatureSink.FastInsert)
        
        
        '''
        for current, feature in enumerate(features):
            # Stop the algorithm if cancel button has been clicked
            if feedback.isCanceled():
                break

            # Add a feature in the sink
            sink.addFeature(feature, QgsFeatureSink.FastInsert)

            # Update the progress bar
            feedback.setProgress(int(current * total))

        # To run another Processing algorithm as part of this algorithm, you can use
        # processing.run(...). Make sure you pass the current context and feedback
        # to processing.run to ensure that all temporary layer outputs are available
        # to the executed algorithm, and that the executed algorithm can send feedback
        # reports to the user (and correctly handle cancellation and progress reports!)
        if False:
            buffered_layer = processing.run("native:buffer", {
                'INPUT': dest_id,
                'DISTANCE': 1.5,
                'SEGMENTS': 5,
                'END_CAP_STYLE': 0,
                'JOIN_STYLE': 0,
                'MITER_LIMIT': 2,
                'DISSOLVE': False,
                'OUTPUT': 'memory:'
            }, context=context, feedback=feedback)['OUTPUT']

        # Return the results of the algorithm. In this case our only result is
        # the feature sink which contains the processed features, but some
        # algorithms may return multiple feature sinks, calculated numeric
        # statistics, etc. These should all be included in the returned
        # dictionary, with keys matching the feature corresponding parameter
        # or output names.
        '''
        return {self.OUTPUT: dest_id}