from . import db

class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64), unique = True)
    transaction_date = db.Column(db.Date)
    per_share_deal_price = db.Column(db.Float)

class Executive(db.Model):
    __tablename__ = 'executives'
    id = db.Column(db.Integer, primary_key = True)
    commpany = db.Column(db.Integer, db.ForeignKey('companies.id'))
    name = db.Column(db.String(32))
    title = db.Column(db.String(32))

class BaseAmount(db.Model):
    __tablename__ = 'base_amounts'
    id = db.Column(db.Integer, primary_key = True)
    executive = db.Column(db.Integer, db.ForeignKey('executives.id'))
    start_date = db.Column(db.Date)
    year_5_compensation = db.Column(db.Float, nullable=True)
    year_4_compensation = db.Column(db.Float, nullable=True)
    year_3_compensation = db.Column(db.Float, nullable=True)
    year_2_compensation = db.Column(db.Float, nullable=True)
    year_1_compensation = db.Column(db.Float, nullable=True)
    year_1_special_compensation = db.Column(db.Float, nullable=True)

class NonEquityPayment(db.Model):
    __tablename__ = 'non_equity_payments'
    id = db.Column(db.Integer, primary_key = True)
    executive = db.Column(db.Integer, db.ForeignKey('executives.id'))
    amount = db.Column(db.Float)
    description = db.Column(db.String(64))
    reasonable_compensation_before_change = db.Column(db.Boolean, default = False)
    reasonable_compensation_after_change = db.Column(db.Boolean, default = False)

class Option(db.Model):
    __tablename__ = 'options'
    id = db.Column(db.Integer, primary_key = True)
    executive = db.Column(db.Integer, db.ForeignKey('executives.id'))
    number = db.Column(db.Float)
    grant_date = db.Column(db.Date)
    vesting_date = db.Column(db.Date)
    strike_price = db.Column(db.Float)
    change_of_control = db.Column(db.Boolean, default = False)
    accelerated = db.Column(db.Boolean, default = True)
    roll_over = db.Column(db.Boolean, default = False)

class RestrictedStock(db.Model):
    __tablename__ = 'restricted_stock'
    id = db.Column(db.Integer, primary_key = True)
    executive = db.Column(db.Integer, db.ForeignKey('executives.id'))
    number = db.Column(db.Float)
    grant_date = db.Column(db.Date)
    vesting_date = db.Column(db.Date)
    change_of_control = db.Column(db.Boolean, default = False)
    accelerated = db.Column(db.Boolean, default = True)