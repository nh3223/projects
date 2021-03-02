from flask import render_template, redirect, url_for, abort, flash, request, current_app, make_response
from flask_login import login_required, current_user

from . import main
from .. import db
from .forms import NoteForm
from ..models import User, Note

@main.route('/', methods=['GET','POST'])
def index():
    notes = Note.query.order_by(Note.timestamp.desc())
    return render_template('index.html', notes=notes)

@main.route('/new', methods=['GET','POST'])
def new():
    form = NoteForm()
    if form.validate_on_submit():
        note = Note(content = form.content.data, author = current_user._get_current_object())
        db.session.add(note)
        db.session.commit()
        return redirect(url_for('.index'))
    return render_template('new.html', form=form)
