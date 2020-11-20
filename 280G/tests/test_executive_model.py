import unittest
from datetime import datetime
from flask import current_app
from app import create_app, db
from app.models import Company, Executive, Compensation


class ExecutiveModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.create_company()
        self.create_executives()
        self.add_executive_compensation()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def create_company(self):
        Company.query.delete()
        company = Company(name = 'abc', transaction_date = datetime(2020, 12, 1), per_share_deal_price = 55.55)
        db.session.add(company)
        db.session.commit()

    def create_executives(self):
        company = Company.query.get(1)
        executive_1 = Executive(company = company, name = 'John', title = 'CEO', start_date = datetime(2010,1,1))
        executive_2 = Executive(company = company, name = 'Paul', title = 'COO', start_date = datetime(2018,7,1))
        executive_3 = Executive(company = company, name = 'George', title = 'CFO', start_date = datetime(2018,7,1), first_year_non_recurring_compensation = 10000)
        executive_4 = Executive(company = company, name = 'Ringo', title = 'CTO', start_date = datetime(2020,7,1))
        executives = [executive_1, executive_2, executive_3, executive_4]
        for executive in executives:
            db.session.add(executive)
        db.session.commit()

    def add_executive_compensation(self):
        executive_1_compensation = [(2019, 500000), (2018, 500000), (2017, 500000), (2016, 400000), (2015, 100000)]
        executive_2_compensation = [(2019, 200000), (2018, 100000)]
        executive_3_compensation = [(2019, 200000), (2018, 100000)]
        executive_4_compensation = [(2020, 100000)]
        compensation = [executive_1_compensation, executive_2_compensation, executive_3_compensation, executive_4_compensation]
        for i, executive in enumerate(compensation):
            for year in executive:
                db.session.add(Compensation(executive = Executive.query.get(i+1), year = year[0], compensation = year[1]))
        db.session.commit()
    
    def test_company_executive_relationship(self):
        executive_1 = Executive.query.get(1)
        self.assertTrue(executive_1.company.name == 'abc')

    def test_base_amount(self):
        executive_1 = Executive.query.get(1)
        executive_2 = Executive.query.get(2)
        executive_3 = Executive.query.get(3)
        executive_4 = Executive.query.get(4)
        self.assertTrue(abs(executive_1.base_amount - 400000) < 0.01)
        self.assertTrue(abs(executive_2.base_amount - 199184.78) < 0.01)
        self.assertTrue(abs(executive_3.base_amount - 194266.30) < 0.01)
        self.assertTrue(abs(executive_4.base_amount - 237662.34) < 0.01)

    def test_parachute_threshold(self):
        executive_1 = Executive.query.get(1)
        self.assertTrue(executive_1.parachute_threshold - 1200000 < 0.01)