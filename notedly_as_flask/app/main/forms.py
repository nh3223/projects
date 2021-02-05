from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, Email, Regexp
from wtforms import ValidationError

from ..models import Role, User

class NoteForm(FlaskForm):
    content = PageDownField('Message', validators=[DataRequired()])
    submit = SubmitField('Submit')