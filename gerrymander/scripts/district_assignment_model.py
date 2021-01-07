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

class DistrictAssignmentProcessingAlgorithm(QgsProcessingAlgorithm):
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
        return DistrictAssignmentProcessingAlgorithm()

    def name(self):
        """
        Returns the algorithm name, used for identifying the algorithm. This
        string should be fixed for the algorithm, and must not be localised.
        The name should be unique within each provider. Names should contain
        lowercase alphanumeric characters only and no spaces or other
        formatting characters.
        """
        return 'district_assignment_model'

    def displayName(self):
        """
        Returns the translated algorithm name, which should be used for any
        user-visible display of the algorithm name.
        """
        return self.tr('District Assignment Model')

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
        return self.tr("Assigns Census Tracts to Districts")

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
            return [
                {   
                    'id': feature['GEOID_Data'],
                    'center': get_location(feature), 
                    'population': feature['B01001e1']
                }
                for feature in source.getFeatures()
            ]
        
        def get_location(feature):
            return {
                'latitude': float(feature['INTPTLAT']),
                'longitude': float(feature['INTPTLON'])
            }

        feedback.pushInfo('pre-census_tracts')
        


        #features = [feature for feature in source.getFeatures]
        census_tracts = get_census_tracts()
        
        #feedback.pushInfo(str(census_tracts))

        number_of_districts = 8 # NEED TO FIGURE OUT HOW TO IMPORT # OF DISTRICTS TO AUTOMATE DIFFERENT STATES
        
        feedback.pushInfo('pre-model')
        
        model = Model(census_tracts, number_of_districts, feedback)
        #feedback.pushInfo(str(model.census_tracts))
        census_tract_district_assignment = {tract.tract_id: tract.new_assignment.district_id for tract in model.census_tracts}
        
        for tract in census_tract_district_assignment:
            feedback.pushInfo(str(tract))
        
        
        feedback.pushInfo('post-model')

        # Create the Output Sink
        for feature in source.getFeatures():
            f = QgsFeature()
            f.setFields(output_fields)
            f.setGeometry(feature.geometry())
            f['id'] = feature['GEOID_Data']
            f['population'] = feature['B01001e1']
            f['district'] = census_tract_district_assignment[f['id']]
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

class Center:
    
    @staticmethod
    def get_centers(locations):
        '''
        Brief Description:  Creates a list of just the centers of a group of locations
        Parameters:         locations: List of census tracts or districts
        Returns:            List of location centers, where each center is a dictionary with latitude and longitude keys
        '''
        return [location.center for location in locations]

    @staticmethod
    def locate_center(locations):
        '''
        Brief Description:  Locates the geographic center of a group of locations.
        Parameters:         locations: List of census_tracts or districts
        Returns:            Dictionary containing the latitude and longitude of the center of locations
        '''
        location_centers = Center.get_centers(locations)
        center_latitude = sum([location['latitude'] for location in location_centers]) / len(location_centers)
        center_longitude = sum([location['longitude'] for location in location_centers]) / len(location_centers)
        return {
            'latitude': center_latitude, 
            'longitude': center_longitude
        }

class District:
    
    def __init__(self, id, center):

        self.district_id = id
        self.center = center
        self.population = 0
        self.assigned_census_tracts = []
        
    def reset(self):
        '''
        Brief Description:  Relocates a new district center if tracts are assigned to the district, otherwise
                            keeps the same center as previously determined.
                            Resets district population to zero.
                            Empties the assigned tract array.
        Parameters:         None
        Returns:            Nothing (Modifies class instance variables)
        '''
        if self.assigned_census_tracts:
            self.center = Center.locate_center(self.assigned_census_tracts) 
        self.population = 0
        self.assigned_census_tracts = []

    def assign_tract(self, tract):
        self.population += tract.population
        self.assigned_census_tracts.append(tract)

    def remove_tract(self, tract):
        self.population -= tract.population
        self.assigned_census_tracts.remove(tract)
        
    def __repr__(self):
        return f'District {self.district_id}: Center {self.center}, Population {self.population}'

class DistrictAssignment:

    def __init__(self, model_parameters, feedback, assignment_type='random', district_centers=None):

        self.census_tracts = model_parameters['census_tracts']
        self.number_of_districts = model_parameters['number_of_districts']
        self.target_district_population = model_parameters['target_district_population']
        self.state_center = model_parameters['state_center']
        self.feedback = feedback
        
        self.districts = self.initialize_districts(district_centers)
        self.initialize_tract_assignment()
        
        self.run_k_means()
        self.run_population_adjustment()

    # Initialization Functions

    def initialize_districts(self, district_centers):
        '''
        Brief Description:  Initializes the districts with new District instances for assignment.
                            If no parameters, starting centers are chosen at random from the census tracts
        Parameters:         Optional list of district centers         
        Returns:            List of new Districts
        '''
        import random
        if district_centers is None:
            centers = random.sample(Center.get_centers(self.census_tracts), self.number_of_districts)
        else:
            centers = district_centers
        return [District(id, centers[ id - 1 ]) for id in range(1, self.number_of_districts + 1)]

    def initialize_tract_assignment(self):
        '''
        Brief Description:  calls the initialize_assignment function for each census_tract
        Parameters:         None
        Returns:            None
        '''
        for tract in self.census_tracts:
            tract.initialize_assignment()

    # K-Means Assignment

    def run_k_means(self):
        '''
        Brief Description:  Provides the framework for assignment of districts using a standard K-Means algorithm
        Paramenters:        None
        Returns:            Nothing (Modifies class instance variables)
        '''
        iteration_number = 1
        differences = len(self.census_tracts)
        while differences > 0 and iteration_number < 100:
            self.feedback.pushInfo(f'Iteration number {iteration_number}: {differences} differences')
            self.reset_district_info()
            self.assign_census_tracts()
            iteration_number += 1

    def reset_district_info(self):
        '''
        Brief Description:  Calls the district's reset function
        Parameters:         None
        Returns:            Nothing
        '''
        for district in self.districts:
            district.reset()
        
    def assign_census_tracts(self):
        '''
        Brief Description:  Assigns each census_tract to a district and calculates changes from the prior iteration
        Paramters:          None
        Returns:            A number representing the number of tracts which changed districts from the prior iteration
        '''
        self.get_assignment_by_tract()
        return self.get_differences()
    
    def get_assignment_by_tract(self):
        '''
        Brief Description:  Assigns a census tract to the closest district
        Paramenters:        None
        Returns:            Nothing (Modifies class instance variables)
        '''        
        for tract in self.census_tracts:
            closest_district = self.get_closest_district(tract)
            tract.assign_district(closest_district)
            closest_district.assign_tract(tract)

    def get_closest_district(self, tract, current_district = None):
        '''
        Brief Description:  Finds the closest district center to a given tract center
        Parameters:         A tract object
        Returns:            A district object representing the closest distrrict
        '''
        import math
        min_distance = math.inf
        for district in self.districts:
            distance = self.get_squared_distance(district.center, tract.center)
            if distance < min_distance and district != current_district:
                closest_district = district
                min_distance = distance
        return closest_district

    def get_squared_distance(self, location_1, location_2):
        '''
        Brief Description:  Calculates the squared distance between two location (ignoring curvature)
        Parameters:         location_1: A dictionary with latitude and longitude for one location
                            location_2: A dictionary with latitude and longitude for a second location
        Returns:            Squared distance bewteen the two points
        '''
        return (location_1['latitude'] - location_2['latitude'])**2 + (location_1['longitude'] - location_2['longitude'])**2

    def get_differences(self):
        '''
        Brief Description:  Calculates the number of different census tract assignments compared to the prior iteration
        Parameters:         None
        Returns:            A number representing the total differences
        '''
        return sum([1 for tract in self.census_tracts if tract.prior_assignment != tract.new_assignment])
                
    # Population Adjustments

    def run_population_adjustment(self):
        district_order = self.get_district_order()
        tracts_available_for_assignment = self.get_tracts_available_for_assignment(district_order)
        for district in district_order:
            self.feedback.pushInfo(str(district))
            if district['district'].population > self.target_district_population:
                tracts_available_for_assignment = self.adjust_overpopulation(district, tracts_available_for_assignment)
            else:
                tracts_available_for_assignment = self.adjust_underpopulation(district, tracts_available_for_assignment)
            # Remove tracts from tracts_available_for_assignment if assigned to the district
            for tract in tracts_available_for_assignment:
                if tract.new_assignment == district:
                    tracts_available_for_assignment.remove(tract) 
        for district in district_order:
            self.feedback.pushInfo(f"{district['district'].district_id}: {district['district'].population}")

    def get_district_order(self):
        district_order = []
        for district in self.districts:
            distance = self.get_squared_distance(district.center, self.state_center)
            district_order.append({
                'district': district,
                'distance': distance
            })
        district_order.sort(key = lambda x: x['distance'], reverse=True)
        return district_order
    
    def get_tracts_available_for_assignment(self, district_order):
        furthest_district = district_order[0]
        return [tract for tract in self.census_tracts if tract.new_assignment != furthest_district]

    def adjust_overpopulation(self, district, tracts_available_for_assignment):
        furthest_census_tracts = self.find_furthest_census_tracts(district)
        while district.population > self.target_district_population + 2500 and len(furthest_census_tracts) > 0:
            new_assigned_tract = furthest_census_tracts.pop(0).tract
            if new_assigned_tract in tracts_available_for_assignment:
                new_district = self.get_closest_district(new_assigned_tract, current_district = district)
                self.reassign_tract(new_assigned_tract, new_district)
                tracts_available_for_assignment.remove(new_assigned_tract)
        return tracts_available_for_assignment
        
    def adjust_underpopulation(self, district, tracts_available_for_assignment):
        nearest_census_tracts = self.find_nearest_census_tracts(district)
        while district['district'].population < self.target_district_population - 2500 and len(nearest_census_tracts) > 0:
            new_assigned_tract = nearest_census_tracts.pop(0)['tract']
            if new_assigned_tract in tracts_available_for_assignment:
                self.reassign_tract(new_assigned_tract, district)
                tracts_available_for_assignment.remove(new_assigned_tract)
        return tracts_available_for_assignment
    
    def find_furthest_census_tracts(self, district):
        self.feedback.pushInfo(str(district))
        furthest_census_tracts = [
            {
                'tract': tract, 
                'distance': self.get_squared_distance(district['district'].center, tract.center)
            }
            for tract in district['district'].assigned_census_tracts
        ]
        furthest_census_tracts.sort(key = lambda x: x['distance'], reverse=True)
        return furthest_census_tracts
    
    def find_nearest_census_tracts(self, district):
        nearest_census_tracts = []
        for tract in self.census_tracts:
            if tract.new_assignment != district:
                nearest_census_tracts.append(
                    {
                        'tract': tract,
                        'distance': self.get_squared_distance(district['district'].center, tract.center)
                    }
                )
        nearest_census_tracts.sort(key = lambda x: x['distance'])
        return nearest_census_tracts
    
    def reassign_tract(self, tract, district):
        new_district = district['district']
        self.feedback.pushInfo(str(new_district))
        old_district = tract.new_assignment
        old_district.remove_tract(tract)
        new_district.assign_tract(tract)
        tract.reassign_district(new_district)

class Model:

    def __init__(self, census_tracts, number_of_districts, feedback):
        
        self.census_tracts = [Tract(tract, feedback) for tract in census_tracts]
        self.number_of_districts = number_of_districts
        self.target_district_population = sum([tract.population for tract in self.census_tracts]) / self.number_of_districts
        self.state_center = Center.locate_center(self.census_tracts)
        self.feedback = feedback
        
        self.model_parameters = {
            'census_tracts': self.census_tracts,
            'number_of_districts': self.number_of_districts,
            'target_district_population': self.target_district_population,
            'state_center': self.state_center
        }

        feedback.pushInfo('Model Initialized')
        
        self.complete_district_assignment()

    # District Assignment

    def complete_district_assignment(self):
        assignment = DistrictAssignment(self.model_parameters, self.feedback)

class Tract:
    
    def __init__(self, tract, feedback):

        feedback.pushInfo(str(tract))
        self.tract_id = tract['id']
        self.center = tract['center']
        self.population = tract['population']
    
    def initialize_assignment(self):
        self.prior_assignment = None
        self.new_assignment = None

    def assign_district(self, district):
        self.prior_assignment = self.new_assignment
        self.new_assignment = district

    def reassign_district(self, district):
        self.new_assignment = district

    def __repr__(self):
        return f'{self.tract_id}: ({self.center},  {self.population}) => District {self.new_assignment.district_id}'
