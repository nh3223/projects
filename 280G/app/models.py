from datetime import date
from . import db

class Company(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64), unique = True)
    transaction_date = db.Column(db.DateTime)
    per_share_deal_price = db.Column(db.Float)
    executives = db.relationship('Executive', backref='company', lazy=True)

    def __repr__(self):
        return f'<Company: {self.name}>'

class Executive(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    commpany_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    name = db.Column(db.String(32))
    title = db.Column(db.String(32))
    start_date = db.Column(db.DateTime)
    first_year_non_recurring_compensation = db.Column(db.Float, default = 0)
    executive_compensation = db.relationship('Compensation', backref='executive', lazy=True)
    non_equity_payments = db.relationship('NonEquityPayment', backref='executive', lazy=True)
    options = db.relationship('Option', backref='executive', lazy=True)
    restricted_stock = db.relationship('RestrictedStock', backref='executive', lazy=True)

    def __repr__(self):
        return f'<Executive: {self.name}, {self.title}, {self.company}, {self.start_date}, {self.first_year_non_recurring_compensation}>'

class Compensation(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    executive_id = db.Column(db.Integer, db.ForeignKey('executive.id'))
    year = db.Column(db.Integer)
    compensation = db.Column(db.Float)

class NonEquityPayment(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    executive_id = db.Column(db.Integer, db.ForeignKey('executive.id'))
    amount = db.Column(db.Float)
    description = db.Column(db.String(64))
    reasonable_compensation_before_change = db.Column(db.Boolean, default = False)
    reasonable_compensation_after_change = db.Column(db.Boolean, default = False)

class Option(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    executive_id = db.Column(db.Integer, db.ForeignKey('executive.id'))
    number = db.Column(db.Float)
    grant_date = db.Column(db.Date)
    vesting_date = db.Column(db.Date)
    strike_price = db.Column(db.Float)
    change_of_control = db.Column(db.Boolean, default = False)
    accelerated = db.Column(db.Boolean, default = True)
    roll_over = db.Column(db.Boolean, default = False)

class RestrictedStock(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    executive_id = db.Column(db.Integer, db.ForeignKey('executive.id'))
    number = db.Column(db.Float)
    grant_date = db.Column(db.Date)
    vesting_date = db.Column(db.Date)
    change_of_control = db.Column(db.Boolean, default = False)
    accelerated = db.Column(db.Boolean, default = True)