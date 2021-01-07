class Center:

    @staticmethod
    def get_centers(locations):
        '''
        Brief Description:  Creates a list of just the centers of a group of locations
        Parameters:         locations: List of census tracts or districts
        Returns:            List of location centers, where each center is a dictionary with latitude and longitude keys
        '''
        return [location['center'] for location in locations]

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


        