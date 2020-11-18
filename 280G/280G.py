import os
from app import create_app, db
from app.models import Company, Executive, BaseAmount, NonEquityPayment, Option, RestrictedStock
from flask_migrate import Migrate 

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Company=Company, Executive=Executive, BaseAmount=BaseAmount, 
                NonEquityPayment=NonEquityPayment, Option=Option, RestrictedStock=RestrictedStock)

@app.cli.command()
def test():
    '''Run the Unit Tests'''
    from unittest import TestLoader, TextTestRunner
    tests = TestLoader().discover('tests')
    TextTestRunner(verbosity=2).run(tests)