from district import District
from model import Model
from tract import Tract

class DistrictAssignment:

    def __init__(assignment_type='random', district_centers=None):

        self.census_tracts = Model.get_census_tracts()
        self.number_of_districts = Model.get_number_of_districts()
        self.target_district_population = Model.get_target_district_population()
        self.districts = initialize_districts(district_centers)
        
        self.initialize_tract_assignment()
        self.run_k_means()
        self.run_population_adjustment()

    # Initialization Functions

    def initialize_districts(district_centers):
        '''
        Brief Description:  Initializes the districts with new District instances for assignment.
                            If no parameters, starting centers are chosen at random from the census tracts
        Parameters:         Optional list of district centers         
        Returns:            List of new Districts
        '''
        if district_centers is None:
            centers = random.sample(Model.get_centers(self.census_tracts), self.number_of_districts)
        else:
            centers = district_centers
        return [District(id, centers[ district - 1 ]) for district in range(1, number_of_districts + 1)]

    def initialize_tract_assignment():
        '''
        Brief Description:  calls the initialize_assignment function for each census_tract
        Parameters:         None
        Returns:            None
        '''
        for tract in self.census_tracts:
            tract.initialize_assignment()

    # K-Means Assignment

    def run_k_means():
        '''
        Brief Description:  Provides the framework for assignment of districts using a standard K-Means algorithm
        Paramenters:        None
        Returns:            Nothing (Modifies class instance variables)
        '''
        iteration_number = 1
        differences = len(self.census_tracts)
        while differences > 0 and iteration_number < 100:
            feedback.pushInfo(f'Iteration number {iteration_number}: {differences} differences')
            self.reset_district_info()
            self.assign_census_tracts()
            iteration_number += 1

    def reset_district_info():
        '''
        Brief Description:  Calls the district's reset function
        Parameters:         None
        Returns:            Nothing
        '''
        for district in self.districts:
            district.reset()
        
    def assign_census_tracts(census_tracts, districts, census_tract_district_assignment):
        '''
        Brief Description:  Assigns each census_tract to a district and calculates changes from the prior iteration
        Paramters:          None
        Returns:            A number representing the number of tracts which changed districts from the prior iteration
        '''
        self.get_assignment_by_tract()
        return self.get_differences()
    
    def get_assignment_by_tract():
        '''
        Brief Description:  Assigns a census tract to the closest district
        Paramenters:        None
        Returns:            Nothing (Modifies class instance variables)
        '''        
        for tract in self.census_tracts:
            closest_district = self.get_closest_district(tract)
            tract.assign_district(closest_district)
            closest_district.assign_tract(tract)

    def get_closest_district(tract, current_district = None):
        '''
        Brief Description:  Finds the closest district center to a given tract center
        Parameters:         A tract object
        Returns:            A district object representing the closest distrrict
        '''
        min_distance = math.inf
        for district in self.districts:
            distance = get_squared_distance(district.center, tract.center)
            if distance < min_distance and district != current_district:
                closest_district = district
                min_distance = distance
        return closest_district

    def get_squared_distance(location_1, location_2):
        '''
        Brief Description:  Calculates the squared distance between two location (ignoring curvature)
        Parameters:         location_1: A dictionary with latitude and longitude for one location
                            location_2: A dictionary with latitude and longitude for a second location
        Returns:            Squared distance bewteen the two points
        '''
        return (location_1['latitude'] - location_2['latitude'])**2 + (location_1['longitude'] - location_2['longitude'])**2

    def get_differences():
        '''
        Brief Description:  Calculates the number of different census tract assignments compared to the prior iteration
        Parameters:         None
        Returns:            A number representing the total differences
        '''
        return sum([1 for tract in self.census_tracts if tract.old_assignment != tract.new_assignment])
                
    # Population Adjustments

    def run_population_adjustment():
        district_order = self.get_district_order()
        tracts_available_for_assignment = self.get_tracts_available_for_assignment(district_order)
        for district in district_order:
            if district.population > self.target_district_population:
                tracts_available_for_assignment = self.adjust_overpopulation(district, tracts_available_for_assignment)
            else:
                tracts_available_for_assignment = self.adjust_underpopulation(district, tracts_available_for_assignment)
            # Remove tracts from tracts_available_for_assignment if assigned to the district
            for tract in tracts_available_for_assignment:
                if tract.new_assignment == district:
                    tracts_available_for_assignment.remove(tract) 
        for district in district_order:
            feedback.pushInfo(f"{district['id']}: {districts[district['id']]['population']}")

        def get_district_order():
            district_order = []
            for district in self.districts:
                distance = get_squared_distance(district['center'], Model.get_state_center())
                district_order.append({
                    'district': district
                    'distance': distance
                })
            district_order.sort(key = lambda x: x['distance'], reverse=True)
            return district_order
        
        def get_tracts_available_for_assignment(district_order):
            furthest_district = district_order[0]
            return [tract for tract in self.census_tracts if tract.new_assignment != furthest_district]

        def adjust_overpopulation(district, tracts_available_for_assignment):
            furthest_census_tracts = self.find_furthest_census_tracts(district)
            while district.population > self.target_district_population + 2500 and len(furthest_census_tracts) > 0:
                new_assigned_tract = furthest_census_tracts.pop(0).tract
                if new_assigned_tract in tracts_available_for_assignment:
                    new_district = self.get_closest_district(new_assigned_tract, current_district = district)
                    self.reassign_tract(new_assigned_tract, new_district)
                    tracts_available_for_assignment.remove(new_assigned_tract)
            return tracts_available_for_assignment
            
        def adjust_underpopulation(district, tracts_available_for_assignment):
            nearest_census_tracts = self.find_nearest_census_tracts(district)
            while district.population < target_district_population - 2500 and len(nearest_census_tracts) > 0:
                new_assigned_tract = nearest_census_tracts.pop(0).tract
                if new_assigned_tract_id in tracts_available_for_assignment:
                    self.reassign_tract(new_assigned_tract, district)
                    tracts_available_for_assignment.remove(new_assigned_tract)
            return districts, census_tract_district_assignment, tracts_available_for_assignment
        
        def find_furthest_census_tracts(district):
            furthest_census_tracts = [
                {
                    'tract': tract, 
                    'distance': get_squared_distance(district.center, tract.center)
                }
                for tract in district.assigned_census_tracts
            ]
            furthest_census_tracts.sort(key = lambda x: x['distance'], reverse=True)
            return furthest_census_tracts
        
        def find_nearest_census_tracts(district):
            nearest_census_tracts = []
            for tract in self.census_tracts:
                if tract.new_assignment != district:
                    nearest_census_tracts.append(
                        {
                            'tract': tract,
                            'distance': get_squared_distance(district.center, tract.center)
                        }
                    )
            nearest_census_tracts.sort(key = lambda x: x['distance'])
            return nearest_census_tracts
        
        def reassign_tract(tract, new_district):
            old_district = tract.new_assignment
            old_district.remove_tract(tract)
            new_district.assign_tract(tract)
            tract.reassign_district(new_district)