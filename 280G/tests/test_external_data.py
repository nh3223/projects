import unittest
from flask import current_app
from app import create_app, db
import app.utilities as utilities

'''
The treasury changes in real_time.
To ensure proper test results, the value of current_rate will need to be confirmed at the time of testing.

The applicable federal rates change monthly.
To ensure proper test results, the value of the rates (120% compounded semi-annually) will need to be confirmed at the time of testing.
'''

class ExternalDataTestCase(unittest.TestCase):

    def test_treasury_rate(self):
        current_rate = 0.075
        self.assertTrue(utilities.update_treasury_rate() == current_rate)

    def test_afrs(self):
        short_term = 0.18
        mid_term = 0.58
        long_term = 1.57
        self.assertTrue(utilities.get_applicable_federal_rate(30) == short_term) # Short term is 36 months or less
        self.assertTrue(utilities.get_applicable_federal_rate(50) == mid_term)   # Mid term is 36 to 108 months
        self.assertTrue(utilities.get_applicable_federal_rate(120) == long_term) # Long term is greater than 108 months

    def test_option_valuation_rev_proc(self):
        spread_factors = utilities.update_spread_factors()
        self.assertTrue(utilities.get_spread_factor(spread_factors, 20, 130, 0) == 'N/A')
        self.assertTrue(utilities.get_spread_factor(spread_factors, 20, 60, 300) == 'N/A')
        self.assertTrue(utilities.get_spread_factor(spread_factors, 20, 60, -80) == 'N/A')
        self.assertTrue(utilities.get_spread_factor(spread_factors, 20, 60, 100) == 0.579)
        self.assertTrue(utilities.get_spread_factor(spread_factors, 50, 60, 100) == 0.637)
        self.assertTrue(utilities.get_spread_factor(spread_factors, 80, 60, 100) == 0.706)
        self.assertTrue(utilities.get_spread_factor(spread_factors, 20, 50, 100) == 0.564)
        self.assertTrue(utilities.get_spread_factor(spread_factors, 20, 60, 90) == 0.543)
        self.assertTrue(utilities.get_spread_factor(spread_factors, 20, 50, 90) == 0.526)
