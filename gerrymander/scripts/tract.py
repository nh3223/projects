class Tract:

    def __init__(feature):

        self.id = feature['GEOID_Data']
        self.center = self.get_location(feature)
        self.population = feature['B01001e1']
    
    def get_location(feature):

        return {
            'latitude': float(feature['INTPTLAT']),
            'longitude': float(feature['INTPTLON'])
        }

    def initialize_assignment():
        self.prior_assignment = None
        self.new_assignment = None

    def assign_district(district):
        self.prior_assignment = self.new_assignment
        self.new_assignment = district

    def reassign_district(district):
        self.new_assignment = district
