import random

from center import Center
from tract import Tract


class Model:

    def __init__(self, census_tracts, number_of_districts):
        
        self.census_tracts = [Tract(tract) for tract in census_tracts]
        self.number_of_districts = number_of_districts
        self.target_district_population = sum([tract['population'] for tract in self.census_tracts]) / self.number_of_districts
        self.state_center = Center.locate_center(self.census_tracts)
        
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
        assignment = DistrictAssignment(self.model_parameters)


