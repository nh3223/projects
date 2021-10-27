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
import math
import random

from qgis.PyQt.QtCore import QCoreApplication, QVariant
from qgis.core import (QgsProcessing,
                       QgsFeature, 
                       QgsFeatureSink,
                       QgsField,
                       QgsFields,
                       QgsProcessingException,
                       QgsProcessingAlgorithm,
                       QgsProcessingParameterFeatureSource,
                       QgsProcessingParameterFeatureSink,
                       QgsSpatialIndex)
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
            




        feedback.pushInfo('pre-census_tracts')
        


        #features = [feature for feature in source.getFeatures]
      
        #feedback.pushInfo(str(census_tracts))
        
        features = {feature.id(): feature for feature in source.getFeatures()}
        number_of_districts = 4 # NEED TO FIGURE OUT HOW TO IMPORT # OF DISTRICTS TO AUTOMATE DIFFERENT STATES
        
        feedback.pushInfo('pre-model')
        
        model = Model(features, number_of_districts, feedback)
        
        #feedback.pushInfo(str(model.census_tracts))
        census_tract_district_assignment = model.final_tract_assignments
        #census_tract_district_assignment = {}
        #for tract in model.census_tracts:
            #feedback.pushInfo(str(tract))
        #    if tract.district is not None:
        #        census_tract_district_assignment[tract.tract_id] = tract.district.district_id
        #    else:
        #        census_tract_district_assignment[tract.tract_id] = 0
        #census_tract_district_assignment = {tract.tract_id: tract.district.district_id for tract in model.census_tracts}
        
        #for tract in census_tract_district_assignment:
        #    feedback.pushInfo(str(tract))
        
        
        feedback.pushInfo('post-model')

        # Create the Output Sink
        for feature in source.getFeatures():
            f = QgsFeature()
            f.setFields(output_fields)
            f.setGeometry(feature.geometry())
            f['id'] = feature['GEOID10']
            f['population'] = feature['POP10']
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

class Utilities:
    
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
        location_centers = Utilities.get_centers(locations)
        center_latitude = sum([location['latitude'] for location in location_centers]) / len(location_centers)
        center_longitude = sum([location['longitude'] for location in location_centers]) / len(location_centers)
        return {
            'latitude': center_latitude, 
            'longitude': center_longitude
        }
    
    @staticmethod
    def get_distance(location_1, location_2):
        assert(isinstance(location_1, dict))
        assert(isinstance(location_2, dict))
        import math
        '''
        Brief Description:  Calculates the distance between two location (ignoring curvature)
        Parameters:         location_1: A dictionary with latitude and longitude for one location
                            location_2: A dictionary with latitude and longitude for a second location
        Returns:            Distance bewteen the two points
        '''
        return  math.sqrt(
                    (location_1['latitude'] - location_2['latitude'])**2 + 
                    (location_1['longitude'] - location_2['longitude'])**2
                )
                
    @staticmethod
    def assign(district, tract):
        district.assign(tract)
        tract.assign(district)
        
    @staticmethod
    def remove(tract):
        tract.district.remove(tract)
        tract.remove()
    
    @staticmethod
    def reassign(district, tract):
        assert(isinstance(tract, Tract))
        assert(isinstance(district, District))
        
        Utilities.remove(tract)
        Utilities.assign(district, tract)        
    
    @staticmethod
    def reset(items):
        # items is either districts or tracts
        for item in items:
            item.reset()
    
    @staticmethod
    def update_distances(item):
        for distance in item.distances:
            distance.update()
    
    @staticmethod
    def get_differences(census_tracts, last_assignment):
        new_assignment = [tract.district for tract in census_tracts]
        return sum([1 for assignment in zip(new_assignment, last_assignment) if assignment[0] != assignment[1]])
        
    @staticmethod
    def relocate_centers(districts):
        for district in districts:
            district.relocate_center()

class Distance:

    '''
    The Distance class keeps track of the distance between a tract center and a district center.  It includes custom less than
    function (based on the distance between tract center and distance center and a customized equality function in which two
    Distance objects are equal if they have the same tract and district.
    '''

    def __init__(self, tract, district):
        self.tract = tract
        self.district = district
        self.update()
    
    def update(self):
        self.distance = Utilities.get_distance(self.tract.center, self.district.center)
        
    def __lt__(self, other):
        return self.distance < other.distance

    def __eq__(self, other):
        return self.tract == other.tract and self.district == other.district
        
    def __repr__(self):
        return f'Tract: {self.tract.tract_id}, District: {self.district.district_id}, Distance: {self.distance}'

class District:
    
    '''
    The District class keeps track of all properties and functions relative to a given district.
    '''
    
    def __init__(self, id, state_center):

        self.district_id = id
        self.center = None
        self.population = 0
        self.state_center = state_center
        self.assigned_census_tracts = []
        self.neighbors = []
        self.distances = []
    
    def initialize(self, starting_tract):
        self.center = starting_tract.center
        Utilities.assign(self, starting_tract)

    def update(self):
        self.relocate_center()
        self.set_border_tracts()
        self.set_neighboring_districts()
        self.reset_neighbors()
        
    def relocate_center(self):
        if self.assigned_census_tracts:
            self.center = Utilities.locate_center(self.assigned_census_tracts)
    
    def add_neighbors(self, tract):
        for neighboring_tract in tract.neighbors:
            if neighboring_tract.district != self:
                neighbor = Distance(neighboring_tract, self)
                if neighbor not in self.neighbors:
                    self.neighbors.append(neighbor)
        
    def remove_neighbors(self, tract):
        self.neighbors.append(Distance(tract, self))
        tract_neighbors = [neighbor for neighbor in self.neighbors if any([neighboring_tract == tract for neighboring_tract in neighbor.tract.neighbors])]
        for neighbor in tract_neighbors:
            if self.does_not_border(neighbor.tract):
                self.neighbors.remove(neighbor)
    
    def does_not_border(self, tract):
        return all([neighbor_tract.district != self for neighbor_tract in tract.neighbors])
    
    def reset_neighbors(self):
        self.neighbors = []
        for tract in self.assigned_census_tracts:
            self.add_neighbors(tract)
    
    def sort_neighbors(self):
        self.neighbors.sort()
    
    def get_nearest_neighbor(self):
        return self.neighbors.pop(0).tract
        
    def assign(self, tract):
        self.population += tract.population
        self.assigned_census_tracts.append(tract)
        self.add_neighbors(tract)
        
    def remove(self, tract):
        self.population -= tract.population
        self.assigned_census_tracts.remove(tract)
        self.remove_neighbors(tract)
        
    def distance_to_state_center(self):
        return Utilities.get_distance(self.center, self.state_center)
    
    def set_border_tracts(self):
        self.border_tracts = [tract for tract in self.assigned_census_tracts if any([neighbor.district != self for neighbor in tract.neighbors])]
    
    def set_average_border_tract_distance(self):
        if len(self.border_tracts) == 0:
            self.average_border_tract_distance = 0
        else:
            self.average_border_tract_distance = sum([Utilities.get_distance(tract.center, self.center) for tract in self.border_tracts]) / len(self.border_tracts)
    
    def set_neighboring_districts(self):
        self.neighboring_districts = list({neighboring_district for tract in self.assigned_census_tracts for neighboring_district in tract.get_neighboring_districts()})
        
    def __lt__(self, other):
        return self.distance_to_state_center() < other.distance_to_state_center()

    def __repr__(self):
        return f'District {self.district_id}: Population {self.population}, Tracts: {len(self.assigned_census_tracts)}'
        
    def __str__(self):
        return f'District {self.district_id}: Population {self.population}, Tracts: {len(self.assigned_census_tracts)}'

'''
class KMeansAssignment:

    def __init__(self, model_parameters, show_feedback):

        self.census_tracts = model_parameters['census_tracts']
        self.districts = model_parameters['districts']
        self.number_of_districts = model_parameters['number_of_districts']
        self.centroids = []
        
        self.show_feedback = show_feedback
        
        self.run_assignment()
        self.reset()
        self.run_trial()
        self.show_feedback('K-Means Clustering Complete')

    def run_assignment(self):
        
        trials = 10
        
        for trial in range(trials):
            self.show_feedback(f'Trial {trial + 1}')
            self.run_trial()
            self.reset()
    
    def run_trial(self):
        
        max_iterations = 50
        iteration_number = 1
        differences = len(self.census_tracts)
        
        while differences > 0 and iteration_number <= max_iterations:
            #self.show_feedback(f'Iteration: {iteration_number}, {differences} differences')
            last_assignment = [tract.district for tract in self.census_tracts]
            self.assign_census_tracts()
            differences = Utilities.get_differences(self.census_tracts, last_assignment)
            self.update_district_centers()
            iteration_number += 1    
    
    def assign_census_tracts(self):
        for tract in self.census_tracts:
            closest_district = tract.get_closest_district()
            if closest_district != tract.district:
                if tract.district:
                    Utilities.remove(tract)
                Utilities.assign(closest_district, tract)
                
    def update_district_centers(self):
        for district in self.districts:
            district.relocate_center()
    
    def reset(self):
        self.centroids.append([district.center for district in self.districts])
        new_starting_tracts = random.sample(self.census_tracts, self.number_of_districts)
        for district in self.districts:
            tract = new_starting_tracts.pop()
            district.update_center(tract.center)
            Utilities.assign(district, tract)
    
    def final_reset(self):
        district_centers = self.get_final_district_centers()
        for district in self.districts:
            district.update_center(district_centers.pop())
        self.run_trial()
        
    def get_final_district_centers(self):
        
        def calculate_new_centroid_center(district_center, centroid_center, multiplier):
            centroid_center['longitude'] = (district_center['longitude'] + centroid_center['longitude'] * multiplier) / (multiplier + 1)
            centroid_center['latitude'] = (district_center['latitude'] + centroid_center['latitude'] * multiplier) / (multiplier + 1)
            return centroid_center        
        
        def get_closest_centers(centroid_centers, trial_centers):
            closest_centers = []
            for centroid in centroid_centers:
                distances = [Utilities.get_distance(centroid, center) for center in trial_centers]
                closest_index = distances.index(min(distances))
                closest_centers.append(trial_centers.pop(closest_index))
            return closest_centers
        
        centroid_centers = self.centroids[0]
        for index in range(1, len(self.centroids)):
            closest_centers = get_closest_centers(centroid_centers, self.centroids[index])      
            #self.show_feedback(f'Closest centers length {len(closest_centers)}, Centroid Length {
            for center_index in range(len(centroid_centers)):
                centroid_centers[center_index] = calculate_new_centroid_center(centroid_centers[center_index], closest_centers[center_index], index)
        return centroid_centers

class NeighborAssignment:
    
    def __init__(self, model_parameters, show_feedback):

        self.census_tracts = model_parameters['census_tracts']
        self.districts = model_parameters['districts']
        self.number_of_districts = model_parameters['number_of_districts']
        self.target_district_population = model_parameters['target_district_population']
        
        self.show_feedback = show_feedback
        
        self.run_assignment()
        self.show_feedback('Neighbor Assignment Complete')

    def run_assignment(self):
        
        max_iterations = 100
        iteration_number = 0
        differences = len(self.census_tracts)
        
        while differences > 0 and iteration_number < max_iterations:
            self.show_feedback(f'Iteration number {iteration_number}: {differences} differences')
            last_assignment = [tract.district for tract in self.census_tracts]
            self.reset()
            self.assign_census_tracts()
            differences = Utilities.get_differences(self.census_tracts, last_assignment)
            iteration_number += 1
                    
    def assign_census_tracts(self):
        tracts_to_be_assigned = len(self.census_tracts) - self.number_of_districts
        while tracts_to_be_assigned > 0:
            for district in self.districts:
                if self.assign_neighbor(district):
                    tracts_to_be_assigned -= 1
    
    def reset(self):
        for district in self.districts:
            district.relocate_center()
        for tract in self.census_tracts:
            tract.reset()
        assigned_tracts = []
        for district in self.districts:
            district.reset()
            new_starting_tract = district.get_closest_tract(assigned_tracts)
            Utilities.assign(district, new_starting_tract)
            district.get_neighbors()
      
    def assign_neighbor(self, district):
        tract = district.neighbors.nearest_available()
        if tract:
            Utilities.assign(district, tract)
            return True
        return False
'''

class InitialAssignment:
    
    def __init__(self, model_parameters, show_feedback):

        self.census_tracts = model_parameters['census_tracts']
        self.districts = model_parameters['districts']
        #self.number_of_districts = model_parameters['number_of_districts']
        self.target_district_population = model_parameters['target_district_population']
        #self.state_center = Utilities.locate_center(self.census_tracts)
        self.show_feedback = show_feedback
        
        self.run_assignment()
        Utilities.relocate_centers(self.districts)
        self.show_feedback('Initial Assignment Complete')

    def run_assignment(self):
        
        def get_available_tracts():
            return [tract for tract in self.census_tracts if tract.district is None]
    
        def nearest_available_neighbor(district):
            district.sort_neighbors()
            while len(district.neighbors) > 0:
                tract = district.get_nearest_neighbor()
                if tract.district is None:
                    return tract
            return None
    
        def get_new_starting_tract(district):
            available_tracts = get_available_tracts()
            return min([Distance(tract, district) for tract in available_tracts]).tract if available_tracts else None
        
        for district in self.districts:
            starting_tract = max(get_available_tracts())
            district.initialize(starting_tract)
            while district.population < self.target_district_population:
                tract_to_be_assigned = nearest_available_neighbor(district)
                if tract_to_be_assigned:
                    Utilities.assign(district, tract_to_be_assigned)
                else:
                    new_starting_tract = get_new_starting_tract(district)
                    if new_starting_tract:
                        district.initialize(new_starting_tract)
                    else:
                        break
            self.show_feedback(str(district))
    
class ConsolidateDistricts:
    
    def __init__(self, districts, show_feedback):
        
        self.districts = districts
        self.show_feedback = show_feedback

        self.consolidate_districts()
        Utilities.relocate_centers(self.districts)
        self.show_feedback('Consolidation Complete')
    
    def consolidate_districts(self):
        
        def get_outliers(district):
            central_tract = min([Distance(tract, district) for tract in district.assigned_census_tracts]).tract
            visited = Set()
            queue = [central_tract]
            while len(queue) > 0:
                tract = queue.pop(0)
                visited.add(tract)
                for neighbor in tract.neighbors:
                    if neighbor.district == district and neighbor not in visited:
                        queue.append(neighbor)
            assigned = set(district.assigned_census_tracts)
            return list(assigned.difference(visited))
        
        def get_neighboring_districts(tract, district):
            return list({neighbor.district for neighbor in tract.neighbors}.difference({district}))
               
        self.show_feedback('Starting Consolidation')
        consolidated_districts = 0
        self.show_feedback(str(self.districts))
        for district in self.districts:
            #self.show_feedback(str(district))
            district.reset_neighbors()
            outliers = get_outliers(district)
            self.show_feedback(f'Outliers {len(outliers)}')
            while len(outliers) > 0:
                tract = outliers.pop(0)
                neighboring_districts = get_neighboring_districts(tract, district)
                if not neighboring_districts:
                    outliers.append(tract)
                else:
                    new_district = neighboring_districts.pop()
                    Utilities.reassign(new_district, tract)
                    consolidated_districts += 1
        self.show_feedback(f'Consolidated Districts: {consolidated_districts}')
        
class CompactDistricts:
    
    def __init__(self, districts, show_feedback):

        self.districts = districts
        self.show_feedback = show_feedback
        
        self.compact_districts()
        Utilities.relocate_centers(self.districts)
        self.show_feedback('Compact Districts Complete')
    
    def compact_districts(self):
        
        def get_border_tracts(border_tracts, neighboring_district):
            return [tract for tract in border_tracts if any([neighbor.district == neighboring_district for neighbor in tract.neighbors])]
            
        def get_potential_swaps(district, neighboring_district):
            potential_swap_tracts = []
            border_tracts = get_border_tracts(district.border_tracts, neighboring_district)
            for tract in border_tracts:
                district_distance = Utilities.get_distance(tract.center, district.center)
                neighbor_district_distance = Utilities.get_distance(tract.center, neighboring_district.center)
                swap_ratio = neighbor_district_distance / district_distance
                potential_swap_tracts.append({
                    'tract': tract,
                    'swap_ratio': swap_ratio
                })
            potential_swap_tracts.sort(key = lambda d: d['swap_ratio'])
            return potential_swap_tracts
        
        def swap_tracts(tract, neighbor):
            tract_district = tract.district
            neighbor_district = neighbor.district
            Utilities.reassign(neighbor_district, tract)
            Utilities.reassign(tract_district, neighbor)  
        
        def set_district(district):
            district.relocate_center()
            district.set_border_tracts()
            district.set_neighboring_districts()
        
        def get_available_neighboring_districts(district, assigned_districts):
            return [neighboring_district for neighboring_district in district.neighboring_districts if neighboring_district not in assigned_districts]
        
        def get_swaps(district, neighboring_district):
            neighboring_district.set_border_tracts()
            district_potential_swaps = get_potential_swaps(district, neighboring_district)
            neighboring_district_potential_swaps = get_potential_swaps(neighboring_district, district)
            return zip(district_potential_swaps, neighboring_district_potential_swaps)    
        
        number_swaps = 0
        assigned_districts = []
        for district in self.districts:
            set_district(district)
            available_neighboring_districts = get_available_neighboring_districts(district, assigned_districts)
            assigned_districts.append(district)
            for neighboring_district in available_neighboring_districts:
                swaps = get_swaps(district, neighboring_district)
                for swap in swaps:
                    district_potential_swap = swap[0]
                    neighbor_potential_swap = swap[1]
                    if district_potential_swap['swap_ratio'] + neighbor_potential_swap['swap_ratio'] < 2:
                        swap_tracts(district_potential_swap['tract'], neighbor_potential_swap['tract'])
                        number_swaps += 1
        self.show_feedback(f'Swaps: {number_swaps}')
 
    '''
    def get_border_tracts(self):
        border_tracts = []
        for district in self.districts:
            district.set_border_tracts()
            border_tracts.extend(district.border_tracts)
        return border_tracts

    def set_average_distances_to_border_tracts(self):
        for district in self.districts:
            district.set_average_border_tract_distance()
    
    def get_border_tract_ratio(self):
        pass

    def compact_districts(self):
        
        border_tracts = self.get_border_tracts()
        self.set_average_distances_to_border_tracts()

        for tract in border_tracts:
            new_assignment = tract.get_new_assignment()
            if new_assignment:
                Utilities.reassign(new_assignment, tract)
                
    def new_compact_districts(self):
        
        def get_neighboring_districts(district, assigned_districts):
            neighboring_districts = list({neighboring_district for tract in district.assigned_census_tracts for neighboring_district in tract.get_neighboring_districts()})
            return [district for district in neighboring_districts if district not in assigned_districts]
        
        def get_neighboring_tracts(district, neighboring_district):
            return [neighbor.tract for neighbor in district.neighbors if neighbor.tract.district == neighboring_district]
        
        def get_distance_ratios(district, neighboring_district, tracts):
        
            def get_average_distance(district, tracts):
                return sum([Utilities.get_distance(tract.center, district.center) for tract in tracts]) / len(tracts)
            
            average_district_distance = get_average_distance(district, tracts)
            average_neighboring_district_distance = get_average_distance(neighboring_district, tracts)
            distance_ratios = []
            for tract in tracts:
                district_distance_ratio = Utilities.get_distance(tract.center, district.center) / average_district_distance
                neighboring_district_distance_ratio = Utilities.get_distance(tract.center, neighboring_district.center) / average_neighboring_district_distance
                #if district_distance_ratio < neighboring_district_distance_ratio:
                distance_ratio = {
                    'tract': tract,
                    'district_distance_ratio': district_distance_ratio,
                    'neighboring_district_distance_ratio': neighboring_district_distance_ratio
                }
                distance_ratios.append(distance_ratio)
            distance_ratios.sort(key = lambda d: d['district_distance_ratio'])
            return distance_ratios

        def swap_tracts(tract, neighbor):
            tract_district = tract.district
            neighbor_district = neighbor.district
            Utilities.reassign(neighbor_district, tract)
            Utilities.reassign(tract_district, neighbor)  

        assigned_districts = []
        for district in self.districts:
            assigned_districts.append(district)
            neighboring_districts = get_neighboring_districts(district, assigned_districts)
            self.show_feedback(str(neighboring_districts))
            for neighboring_district in neighboring_districts:
                district.reset_neighbors()
                swaps = 0
                neighbor_tracts = get_neighboring_tracts(district, neighboring_district)
                border_tracts = get_neighboring_tracts(neighboring_district, district)
                #self.show_feedback(str(district))
                #self.show_feedback(str(neighboring_district))
                #self.show_feedback(str(len(neighbor_tracts)))
                #self.show_feedback(str(len(border_tracts)))
                if neighbor_tracts and border_tracts:
                    neighbor_tract_distance_ratios = get_distance_ratios(district, neighboring_district, neighbor_tracts)
                    neighbor_tract_distance_ratios = [tract for tract in neighbor_tract_distance_ratios if tract['district_distance_ratio'] < 1]
                    border_tract_distance_ratios = get_distance_ratios(neighboring_district, district, border_tracts)
                    border_tract_distance_ratios = [tract for tract in border_tract_distance_ratios if tract['district_distance_ratio'] > 1]
                    border_tract_distance_ratios.reverse()
                    #self.show_feedback(str(len(neighbor_tract_distance_ratios)))
                    #self.show_feedback(str(len(border_tract_distance_ratios)))
                    while len(neighbor_tract_distance_ratios) > 0 and len(border_tract_distance_ratios) > 0:
                        neighbor_tract = neighbor_tract_distance_ratios.pop(0)
                        border_tract = border_tract_distance_ratios.pop(0)
                        if border_tract['district_distance_ratio'] > neighbor_tract['district_distance_ratio']:
                            swap_tracts(neighbor_tract['tract'], border_tract['tract'])
                        swaps += 1
                self.show_feedback(f'District: {district.district_id}, Neighboring District: {neighboring_district.district_id}, Swaps: {swaps}')

                
                
    '''


    
class PopulationAdjustment:
    
    def __init__(self, model_parameters, show_feedback):

        self.census_tracts = model_parameters['census_tracts']
        self.districts = model_parameters['districts']
        self.number_of_districts = model_parameters['number_of_districts']
        self.target_district_population = model_parameters['target_district_population']
        self.buffer = 2000
        
        self.show_feedback = show_feedback
        
        self.run_adjustment()
        self.show_feedback('Population Adjustment Complete')

    def run_adjustment(self):
        assigned_districts = []
        max_iterations = 100
        for district in self.districts:
            self.update_districts()
            #self.show_feedback(str(district))
            assigned_districts.append(district)
            if len(assigned_districts) == self.number_of_districts:
                break
            iterations = 1
            while district.population > self.target_district_population + self.buffer and iterations < max_iterations:
                #self.show_feedback('Over')
                self.adjust_overpopulation(district, assigned_districts)
                iterations += 1
            while district.population < self.target_district_population - self.buffer and iterations < max_iterations:
                #self.show_feedback('Under')
                self.adjust_underpopulation(district, assigned_districts)
                iterations += 1
            self.show_feedback(f'{district}: {iterations} iterations')
            
        
    def update_districts(self):
        for district in self.districts:
            district.update()



    def adjust_overpopulation(self, district, assigned_districts):
        
        def get_neighboring_districts(district, assigned_districts):
            return [neighboring_district for neighboring_district in district.neighboring_districts if neighboring_district not in assigned_districts]
        
        def get_tract_to_be_removed(district, assigned_districts):
            neighboring_districts = get_neighboring_districts(district, assigned_districts)
            tracts = []
            for tract in district.border_tracts:
                for neighbor in tract.neighbors:
                    if neighbor.district in neighboring_districts:
                        tracts.append(Distance(tract, district))
            return max(tracts, key = lambda d: d.distance).tract if tracts else None

        def get_new_district(tract, assigned_districts):
            available_districts = [neighbor.district for neighbor in tract.neighbors if neighbor.district not in assigned_districts]
            return min(available_districts, key = lambda d: d.population)
             
        district.update()
        tract_to_be_removed = get_tract_to_be_removed(district, assigned_districts)
        if tract_to_be_removed:
            new_district = get_new_district(tract_to_be_removed, assigned_districts)
            Utilities.reassign(new_district, tract_to_be_removed)
        
    def adjust_underpopulation(self, district, assigned_districts):
        district.sort_neighbors()
        while len(district.neighbors) > 0:
            tract = district.get_nearest_neighbor()
            if tract.district not in assigned_districts:
                Utilities.reassign(district, tract)
                break
        
    '''    
    
        for neighboring_district in neighboring_districts:
            adjacent_neighbors = self.get_adjacent_neighbors(district, neighboring_district)
            if adjacent_neighbors:
                available_neighbors.extend(adjacent_neighbors)
        if available_neighbors:
            neighbor_to_be_removed = min(available_neighbors, key = lambda d: d['ratio'])['neighbor']
            tract_to_be_removed = neighbor_to_be_removed.tract
            new_district = neighbor_to_be_removed.district
            Utilities.reassign(new_district, tract_to_be_removed)
    
    def get_adjacent_neighbors(self, district, neighboring_district):
        adjacent_neighbors = [neighbor for neighbor in neighboring_district.neighbors if neighbor.tract.district == district]
        #self.show_feedback(str(adjacent_neighbors))
        if not adjacent_neighbors:
            return []
        average_neighbor_distance = sum([neighbor.distance for neighbor in adjacent_neighbors]) / len(adjacent_neighbors)
        adjacent_neighbor_ratios = []
        for neighbor in adjacent_neighbors:
            neighbor_ratio = {
                'neighbor': neighbor,
                'ratio': neighbor.distance / average_neighbor_distance
            }
            adjacent_neighbor_ratios.append(neighbor_ratio)
        #self.show_feedback(str(adjacent_neighbor_ratios))
        return adjacent_neighbor_ratios
    
    def get_neighboring_districts(self, district, assigned_districts):
        return list({neighbor.tract.district for neighbor in district.neighbors if neighbor.tract.district not in assigned_districts})
        
    def get_tract_and_district(self, district, available_districts):
        #self.show_feedback(f'{district}, {available_districts}')
        available_tracts = [tract for tract in district.border_tracts if any([neighbor.district in available_districts for neighbor in tract.neighbors])]
        #self.show_feedback(f'{available_tracts}')
        tract_to_be_removed = None
        new_district = None
        maximum_distance_ratio_difference = -math.inf
        for tract in available_tracts:
            district_distance_ratio = Utilities.get_distance(tract.center, district.center) / district.average_border_tract_distance
            neighbor_district, neighbor_distance_ratio = self.get_neighbor_distance_ratio(tract, available_districts)
            distance_ratio_difference = district_distance_ratio - neighbor_distance_ratio
            if distance_ratio_difference > maximum_distance_ratio_difference:
               tract_to_be_removed = tract
               new_district = neighbor_district
               maximum_distance_ratio_difference = distance_ratio_difference 
        #self.show_feedback(f'{tract_to_be_removed}, {new_district}')
        return tract_to_be_removed, new_district
        
    def get_neighbor_distance_ratio(self, tract, available_districts):
        neighboring_districts = [neighbor.district for neighbor in tract.neighbors if neighbor.district in available_districts]
        minimum_district = None
        minimum_distance_ratio = math.inf
        for district in neighboring_districts:
            distance_ratio = Utilities.get_distance(tract.center, district.center) / district.average_border_tract_distance
            if distance_ratio < minimum_distance_ratio:
                minimum_district = district
                minimum_distance_ratio = distance_ratio
        return minimum_district, minimum_distance_ratio
        
    def get_new_district(self, tract, assigned_districts):
        neighboring_districts = [neighbor for neighbor in tract.get_neighboring_districts() if neighbor not in assigned_districts]
        new_district = None
        distance_ratio = math.inf
        for district in neighboring_districts:
            district.set_average_border_tract_distance()
            district_distance_ratio = Utilities.get_distance(tract.center, district.center) / district.average_border_tract_distance
            if district_distance_ratio < distance_ratio:
                new_district = district
                distance_ratio = district_distance_ratio
        return new_district
        

                
    def get_underpopulation_available_tracts(self, district, assigned_districts):
        neighbor_tracts = [neighbor.tract for neighbor in district.neighbors]
        return [tract for tract in neighbor_tracts if tract.district not in assigned_districts]
    
    def get_tract_to_add(self, district, available_tracts):
        new_tract = None
        minimum_combined_distance_ratio = math.inf
        for tract in available_tracts:
            district_distance_ratio = Utilities.get_distance(tract.center, district.center) / district.average_border_tract_distance
            neighbor_distance_ratio = Utilities.get_distance(tract.center, tract.district.center) / tract.district.average_border_tract_distance
            combined_distance_ratio = district_distance_ratio + neighbor_distance_ratio
            if combined_distance_ratio < minimum_combined_distance_ratio:
                new_tract = tract
                minimum_combined_distance_ratio = combined_distance_ratio
        return new_tract
    
    def old_run_adjustment(self):
        for district in self.districts:
            district.relocate_center()
        self.get_district_neighbors()
        assigned_districts = []
        for district in self.districts:
            assigned_districts.append(district)
            #self.show_feedback(f'District {district.district_id}: {district.population}')
            if district.population > self.target_district_population + self.buffer:
                self.adjust_overpopulation(district, assigned_districts)
            else:
                self.adjust_underpopulation(district, assigned_districts)
        
    def get_district_neighbors(self):
        for district in self.districts:
            district.get_neighbors()
        
    def old_adjust_overpopulation(self, district, assigned_districts):
        #self.show_feedback(f'Overpopulation {district.district_id} {district.population}')
        #for tract in district.assigned_census_tracts:
            #self.show_feedback(f'District tracts: {tract}, neighbors {tract.neighbors}')
        furthest_census_tracts = self.find_furthest_census_tracts(district)
        #self.show_feedback(f'Furthest: {furthest_census_tracts}')
        while district.population > self.target_district_population + 2000 and len(furthest_census_tracts) > 0:
            #self.show_feedback(f'District {district.district_id}: {district.population} Furthest: {len(furthest_census_tracts)}')
            tract_to_be_reassigned = furthest_census_tracts.pop(0)
            #self.show_feedback(str(tract_to_be_reassigned))
            for tract in tract_to_be_reassigned.neighbors:
                #self.show_feedback(f'Tract district: {tract.district}')
                if tract.district != district and tract.district not in assigned_districts:
                    new_district = tract.district
                    self.reassign_tract(tract_to_be_reassigned, new_district)
        #self.show_feedback(f'{district.district_id} {district.population}')
        
    def old_adjust_underpopulation(self, district, assigned_districts):
        #self.show_feedback(f' Underpopulation {district.district_id} {district.population}')
        #nearest_census_tracts = self.find_nearest_census_tracts(district, assigned_districts)
        while district.population < self.target_district_population - 2000 and len(district.neighbors) > 0:
        #self.feedback.pushInfo(f'District {district.district_id}: {district.population} Neighbors: {len(district.neighbors)}')
            tract_to_be_reassigned = district.neighbors.nearest(assigned_districts)
        #self.show_feedback(str(tract_to_be_reassigned))
            if tract_to_be_reassigned:
                self.reassign_tract(tract_to_be_reassigned, district)
        #self.show_feedback(f'{district.district_id} {district.population}')
        
    def find_furthest_census_tracts(self, district):
        #self.feedback.pushInfo(str(district))
        distances = []
        for tract in district.assigned_census_tracts:
            if any([neighbor.district != district for neighbor in tract.neighbors]):
                distances.append(Distance(tract, district.center))
        distances.sort(reverse = True)
        return [distance.location for distance in distances]
        
    def find_nearest_census_tracts(self, district, assigned_districts):
        return sorted([DistrictDistance(tract, district) for tract in self.census_tracts if tract.new_assignment not in assigned_districts])

    def reassign_tract(self, tract, new_district):
        #self.show_feedback(f'Reassign: {new_district}')
        old_district = tract.district
        Utilities.remove(tract)
        Utilities.assign(new_district, tract)
    '''

class SwapTracts:
    
    def __init__(self, model_parameters, show_feedback):

        self.census_tracts = model_parameters['census_tracts']
        self.number_of_districts = model_parameters['number_of_districts']
        self.districts = model_parameters['districts']
        self.target_district_population = model_parameters['target_district_population']
        
        self.show_feedback = show_feedback
        self.run_distance_swap()
        self.run_isolated_swap()
        
        self.show_feedback('Tract Swap Complete')
    
    def run_isolated_swap(self):
        for tract in self.census_tracts:
            if tract.is_isolated():
                Utilities.remove(tract)
                Utilities.assign(tract.neighbors[0].district, tract)
    
    def run_distance_swap(self):
    
        for this_district in self.districts:
            self.show_feedback(f'District: {this_district}')
            outer_ring_tracts = this_district.get_outer_ring_tracts()
            for tract in outer_ring_tracts:
                #self.show_feedback(str(tract))
                neighboring_districts = self.get_neighboring_districts(tract)
                self.show_feedback(str(this_district.neighbors))
                self.show_feedback(str(neighboring_districts))
                available_neighbors = this_district.neighbors.get_potential_swap_tracts(neighboring_districts)
                self.show_feedback(str(available_neighbors))
                potential_swaps = [neighbor for neighbor in available_neighbors if self.swap_criteria_met(tract, neighbor.tract)]
                #self.show_feedback(str(potential_swaps))
                #self.show_feedback(f'Tract: {tract}, Available Neighbors: {available_neighbors}, Potential Swaps: {potential_swaps}')
                if potential_swaps:
                    neighbor = sorted(potential_swaps)[0].tract
                    self.show_feedback(str(tract))
                    self.show_feedback(str(neighbor))
                    self.show_feedback('-------------------')
                    self.swap_tracts(tract, neighbor)
    
    def get_neighboring_districts(self, tract):
        return list({neighbor.district for neighbor in tract.neighbors if neighbor.district != tract.district})
    
    def swap_criteria_met(self, tract, neighbor):
        if Utilities.get_distance(tract.district.center, tract.center) < Utilities.get_distance(tract.district.center, neighbor.center):
            return False
        if Utilities.get_distance(neighbor.district.center, tract.center) > Utilities.get_distance(neighbor.district.center, neighbor.center):
            return False
        return True
    
    def swap_tracts(self, tract, neighbor):
        tract_district = tract.district
        neighbor_district = neighbor.district
        self.show_feedback(str(tract))
        self.show_feedback(str(neighbor))
        Utilities.remove(tract)
        Utilities.remove(neighbor)
        Utilities.assign(neighbor_district, tract)
        Utilities.assign(tract_district, neighbor)
    
class Model:

    def __init__(self, features, number_of_districts, feedback):
        
        self.show_feedback = feedback.pushInfo
        self.number_of_districts = number_of_districts
        self.census_tracts = self.get_census_tracts(features)
        
        self.target_district_population = self.get_target_district_population()
        self.state_center = Utilities.locate_center(self.census_tracts)
        
        self.districts = self.initialize_districts()
        
        self.model_parameters = {
            'census_tracts': self.census_tracts,
            'districts': self.districts,
            'number_of_districts': self.number_of_districts,
            'target_district_population': self.target_district_population,
        }

        self.show_feedback('Model Initialized')
        self.show_feedback(f'Target District Population: {self.target_district_population}')
        self.final_tract_assignments = {tract.tract_id: None for tract in self.census_tracts}
        
        #self.get_assignment()
        #self.add_distances()
        self.run_model()

    def get_census_tracts(self, features):
          
        def extract_tracts_from_features(features):
            
            def get_index(features):
                index = QgsSpatialIndex()
                for feature in features.values():
                    index.insertFeature(feature)
                return index
                
            def get_location(feature):
                return {
                    'latitude': float(feature['INTPTLAT10']),
                    'longitude': float(feature['INTPTLON10'])
                }

            def find_neighbors(feature, features, index):
                neighbors = []
                intersecting_ids = index.intersects(feature.geometry().boundingBox())
                for id in intersecting_ids:
                    intersecting_feature = features[id]
                    if intersecting_feature != feature and not intersecting_feature.geometry().disjoint(feature.geometry()):
                        neighbors.append(intersecting_feature['GEOID10'])
                return neighbors

            index = get_index(features)
            self.show_feedback('Index complete')
            return [
                {
                    'tract_id': feature['GEOID10'],
                    'center': get_location(feature), 
                    'population': feature['POP10'],
                    'county': feature['COUNTYFP10'],
                    'neighbors': find_neighbors(feature, features, index)
                }
                for feature in features.values()
            ]
                
        census_tract_data = extract_tracts_from_features(features)
        self.show_feedback('Features extracted')
        tract_centers = [tract['center'] for tract in census_tract_data]
        state_center_latitude = sum([location['latitude'] for location in tract_centers]) / len(tract_centers)
        state_center_longitude = sum([location['longitude'] for location in tract_centers]) / len(tract_centers)
        state_center = {
            'latitude': state_center_latitude, 
            'longitude': state_center_longitude
        }
        
        
        
        #for tract in census_tract_data:
            #self.feedback.pushInfo(f'Tract {tract["tract_id"]}: {tract["neighbors"]}')
        #state_center = Utilities.locate_center(self.census_tracts)
        census_tracts = [Tract(tract, state_center, self.show_feedback) for tract in census_tract_data]
        census_tract_index = {tract.tract_id: tract for tract in census_tracts}
        for tract in census_tracts:
            tract.update_neighbors(census_tract_index)
        return census_tracts
    
    def get_target_district_population(self):
        return sum([tract.population for tract in self.census_tracts]) / self.number_of_districts
    

    def initialize_districts(self):
        return [District(index, self.state_center) for index in range(1, self.number_of_districts + 1)]
        
    def add_distances(self):
        for tract in self.census_tracts:
            for district in self.districts:
                distance = Distance(tract, district)
                tract.add_distance(distance)
                district.add_distance(distance)
    
    def run_model(self):
        
        InitialAssignment(self.model_parameters, self.show_feedback)
        for _ in range(2):
            ConsolidateDistricts(self.model_parameters['districts'], self.show_feedback)
            PopulationAdjustment(self.model_parameters, self.show_feedback)
        for _ in range(25):
            ConsolidateDistricts(self.model_parameters['districts'], self.show_feedback) 
            CompactDistricts(self.model_parameters['districts'], self.show_feedback)
            PopulationAdjustment(self.model_parameters, self.show_feedback)
 
        #assignment = KMeansAssignment(self.model_parameters, self.show_feedback)
        #self.show_district_feedback()      
        #for i in range(15):            
        #    CompactDistricts(self.model_parameters, self.show_feedback)
        #    ConsolidateDistricts(self.model_parameters, self.show_feedback)
        #for _ in range(2):
        #    ConsolidateDistricts(self.model_parameters['districts'], self.show_feedback)            
        #    PopulationAdjustment(self.model_parameters, self.show_feedback)

            #self.show_district_feedback()
            
            #neighbor_assignment = NeighborAssignment(self.model_parameters,self.show_feedback)
            #self.show_district_feedback()
        
        #PopulationAdjustment(self.model_parameters, self.show_feedback)
        #CompactDistricts(self.model_parameters, self.show_feedback)
        #ConsolidateDistricts(self.model_parameters, self.show_feedback)
        self.show_district_feedback()
        
        #swap_tracts = SwapTracts(self.model_parameters, self.show_feedback)
        #self.show_district_feedback()
        
        #PopulationAdjustment(self.model_parameters, self.show_feedback)
        #self.show_district_feedback()
        
        '''
        iterations = 1
        for iteration in range(iterations):
        
            neighbor_assignment = NeighborAssignment(self.model_parameters, self.show_feedback)
            self.show_district_feedback()
            
            for i in range(iterations):
            
                swap_tracts = SwapTracts(self.model_parameters, self.show_feedback)
                self.show_district_feedback()
                
                population_adjustment = PopulationAdjustment(self.model_parameters, self.show_feedback)
                self.show_district_feedback()
                
                #swap_tracts = SwapTracts(self.model_parameters, self.show_feedback)
                #self.show_district_feedback()
        
        #population_adjustment = PopulationAdjustment(self.model_parameters, self.show_feedback)
        #self.show_district_feedback()
        '''
        
        for tract in self.census_tracts:
            self.final_tract_assignments[tract.tract_id] = 0 if tract.district is None else tract.district.district_id
        
        #self.final_tract_assignments = {tract.tract_id: tract.district.district_id for tract in self.census_tracts}

    def show_district_feedback(self):
        for district in self.districts:
            self.show_feedback(str(district))
            
class Tract:
    
    def __init__(self, tract, state_center, show_feedback):

        self.tract_id = tract['tract_id']
        self.center = tract['center']
        self.population = tract['population']
        self.neighbors = tract['neighbors']
        self.state_center = state_center
        self.district = None
        self.show_feedback = show_feedback
    
    def update_neighbors(self, census_tract_index):
        self.neighbors = [census_tract_index[id] for id in self.neighbors]
    
    def assign(self, district):
        self.district = district

    def remove(self):
        self.district = None

    def get_state_distance(self):
        return Utilities.get_distance(self.center, self.state_center)
        
    def get_neighboring_districts(self):
        return list({neighbor.district for neighbor in self.neighbors if neighbor.district != self.district})
    
    def get_new_assignment(self):
        new_assignment = None
        distance_ratio = Utilities.get_distance(self.center, self.district.center) / self.district.average_border_tract_distance
        for neighbor in self.neighbors:
            if neighbor.district != self.district:
                neighbor_distance_ratio = Utilities.get_distance(self.center, neighbor.district.center) / neighbor.district.average_border_tract_distance
                if neighbor_distance_ratio < distance_ratio:
                    new_assignment = neighbor.district
                    distance_ratio = neighbor_distance_ratio
        return new_assignment
    
    def __lt__(self, other, key = None):
        return self.get_state_distance() < other.get_state_distance()
            
    def __repr__(self):
        if self.district:
            return f'{self.tract_id} => {self.district.district_id}\n'
        return f'{self.tract_id} => None\n'