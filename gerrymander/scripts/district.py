from model import Model

class District:

    def __init__(id, center):

        self.id = id
        self.center = center
        self.population = 0
        self.assigned_census_tracts = []
        
    def reset():
        '''
        Brief Description:  Relocates a new district center if tracts are assigned to the district, otherwise
                            keeps the same center as previously determined.
                            Resets district population to zero.
                            Empties the assigned tract array.
        Parameters:         None
        Returns:            Nothing (Modifies class instance variables)
        '''
        if self.assigned_census_tracts:
            self.center = Model.locate_center(self.assigned_census_tracts) 
        self.population = 0
        self.assigned_census_tracts = []

    def assign_tract(tract):
        self.population += tract.population
        self.assigned_census_tracts.append(tract)

    def remove_tract(tract):
        self.population -= tract.population
        self.assigned_census_tracts.remove(tract)
