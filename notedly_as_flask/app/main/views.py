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
@login_required
def new():
    form = NoteForm()
    if form.validate_on_submit():
        note = Note(content = form.content.data, author = current_user._get_current_object())
        db.session.add(note)
        db.session.commit()
        return redirect(url_for('.index'))
    return render_template('new.html', form=form)

@main.route('/user/<username>')
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    notes = user.notes.order_by(Note.timestamp.desc())
    return render_template('index.html', notes=notes)

@main.route('/favorite/<note_id>')
@login_required
def favorite(note_id):
    note = Note.query.filter_by(id=note_id).first()
    if not current_user.get_favorite(note):
        current_user.favorite(note)
    else:
        current_user.unfavorite(note)
    db.session.commit()
    return redirect(request.referrer)

@main.route('/favorites/<username>')
@login_required
def favorites(username):
    user = User.query.filter_by(username=username).first()
    notes = user.favorites
    return render_template('index.html', notes=notes)
