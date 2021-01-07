class Tract:

    def __init__(self, tract):

        self.id = tract.id
        self.center = tract.center
        self.population = tract.population
    
    def initialize_assignment(self):
        self.prior_assignment = None
        self.new_assignment = None

    def assign_district(self, district):
        self.prior_assignment = self.new_assignment
        self.new_assignment = district

    def reassign_district(self, district):
        self.new_assignment = district
