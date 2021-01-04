import random

from district import District
from tract import Tract

class Model:

    def __init__(source, number_of_districts):
        
        self.census_tracts = [Tract(feature) for feature in source.getFeatures]
        self.number_of_districts = number_of_districts
        self.target_district_population = sum([tract['population'] for tract in self.census_tracts]) / self.number_of_districts
        self.state_center = self.locate_center(self.census_tracts) 

    # Getters

    def get_census_tracts():    
        return self.census_tracts

    def get_number_of_districts():
        return self.number_of_districts

    def get_target_district_population():
        return self.target_district_population

    def get_state_center():
        return self.state_center

    # District Assignment

    def complete_district_assignment():


    # Utility Functions

    def get_centers(locations):
        '''
        Brief Description:  Creates a list of just the centers of a group of locations
        Parameters:         locations: List of census tracts or districts
        Returns:            List of location centers, where each center is a dictionary with latitude and longitude keys
        '''
        return [location['center'] for location in locations]

    def locate_center(locations):
        '''
        Brief Description:  Locates the geographic center of a group of locations.
        Parameters:         locations: List of census_tracts or districts
        Returns:            Dictionary containing the latitude and longitude of the center of locations
        '''
        location_centers = get_centers(locations)
        center_latitude = sum([location['latitude'] for location in location_centers]) / len(location_centers)
        center_longitude = sum([location['longitude'] for location in location_centers]) / len(location_centers)
        return {
            'latitude': center_latitude, 
            'longitude': center_longitude
        }
