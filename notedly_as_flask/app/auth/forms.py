from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, Email, Regexp, EqualTo
from wtforms import ValidationError

from ..models import User

class LoginForm(FlaskForm):
    email = StringField('Email', validators = [DataRequired(), Length(1, 64), Email()])
    password = PasswordField('Password', validators = [DataRequired()])
    remember_me = BooleanField('Keep me logged in')
    submit = SubmitField('Log In')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators = [DataRequired(), Length(1, 64)])
    email = StringField('Email', validators = [DataRequired(), Length(1, 64), Email()])
    password = PasswordField('Password', validators = [DataRequired()])
    submit = SubmitField('Register')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data.lower()).first():
            raise ValidationError('Email already registered.')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username already in use.')