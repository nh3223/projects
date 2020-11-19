from datetime import datetime
from . import db

class Company(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64), unique = True)
    transaction_date = db.Column(db.DateTime)
    per_share_deal_price = db.Column(db.Float)
    executives = db.relationship('Executive', backref='company', lazy=True)

    def __repr__(self):
        return f'<Company {name}>'

class Executive(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    commpany = db.Column(db.Integer, db.ForeignKey('company.id'))
    name = db.Column(db.String(32))
    title = db.Column(db.String(32))
    start_date = db.Column(db.DateTime)
    first_year_non_recurring_compensation = db.Column(db.Float, default = 0)
    compensation = db.relationship('Compensation', backref='executive', lazy=True)
    non_equity_payments = db.relationship('NonEquityPayment', backref='executive', lazy=True)
    options = db.relationship('Option', backref='executive', lazy=True)
    restricted_stock = db.relationship('RestrictedStock', backref='executive', lazy=True)

    def __repr__(self):
        return f'<Executive: {name}, {title}>'

    @property
    def parachute_threshold(self):
        return 3 * self.base_amount
    
    @property
    def base_amount(self):
        start_year = self.start_date.year()
        if start_year == self.company.transaction_date.year():
            worked_days = datetime.today() - self.start_date + 1
            current_year_compensation = self.compensation.compensation
            return annualized_compensation(worked_days, compensation)
        compensation = []
        for item in self.compensation:
            if item.year != start_year:
                compensation.append(item.compensation)
            else:
                worked_days = datetime.date(start_year, 12, 31) - self.start_date + 1
                compensation.append(annualized_compensation(worked_days, item.compensation))
        return average(compensation)

    def annualized_compensation(self, worked_days, compensation):
        non_recurring_compensation = self.first_year_non_recurring_compensation
        percentage_of_days_worked = worked_days / days_in_year()
        return (compensation - non_recurring_compensation) / percentage_of_days_worked + non_recurring_compensation

    def days_in_year(self):
        return datetime.date(self.start_date.year(), 12, 31) - datetime.date(self.start_date.year(), 1, 1) + 1

class Compensation(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    executive = db.Column(db.Integer, db.ForeignKey('executive.id'))
    year = db.Column(db.Integer)
    compensation = db.Column(db.Float)

class NonEquityPayment(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    executive = db.Column(db.Integer, db.ForeignKey('executive.id'))
    amount = db.Column(db.Float)
    description = db.Column(db.String(64))
    reasonable_compensation_before_change = db.Column(db.Boolean, default = False)
    reasonable_compensation_after_change = db.Column(db.Boolean, default = False)

class Option(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    executive = db.Column(db.Integer, db.ForeignKey('executive.id'))
    number = db.Column(db.Float)
    grant_date = db.Column(db.Date)
    vesting_date = db.Column(db.Date)
    strike_price = db.Column(db.Float)
    change_of_control = db.Column(db.Boolean, default = False)
    accelerated = db.Column(db.Boolean, default = True)
    roll_over = db.Column(db.Boolean, default = False)

class RestrictedStock(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    executive = db.Column(db.Integer, db.ForeignKey('executive.id'))
    number = db.Column(db.Float)
    grant_date = db.Column(db.Date)
    vesting_date = db.Column(db.Date)
    change_of_control = db.Column(db.Boolean, default = False)
    accelerated = db.Column(db.Boolean, default = True)