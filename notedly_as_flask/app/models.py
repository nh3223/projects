from datetime import datetime
from flask import current_app, request, url_for
from flask_login import UserMixin

from . import db, login_manager

class Favorite(db.Model):
    __tablename__ = 'favorites'
    favorited_id = db.Column(db.Integer, db.ForeignKey('notes.id'), primary_key=True)
    favorited_by_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(64))
    notes = db.relationship('Note', backref='author', lazy='dynamic')
    favorited = db.relationship('Favorite',
                               foreign_keys=[Favorite.favorited_by_id],
                               backref=db.backref('favorited_by', lazy='joined'),
                               lazy='dynamic',
                               cascade='all, delete-orphan')
    
    def verify_password(self, password):
        return self.password == password

    def favorite(self, note):
        print('NEW FAVORITE')
        if not self.get_favorite(note):
            f = Favorite(favorited_by=self, favorited=note)
            db.session.add(f)
            print('FAVORITE ADDED')

    def unfavorite(self, note):
        f = self.get_favorite(note)
        if f is not None:
            db.session.delete(f)
    
    def get_favorite(self, note):
        return self.favorited.filter_by(favorited_id=note.id).first()

    @property
    def favorites(self):
        return [Note.query.get(favorite.favorited_id) for favorite in self.favorited.all()]

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    favorited_by = db.relationship('Favorite',
                               foreign_keys=[Favorite.favorited_id],
                               backref=db.backref('favorited', lazy='joined'),
                               lazy='dynamic',
                               cascade='all, delete-orphan')

    @property
    def is_favorited_by(self):
        return [User.query.get(favorite.favorited_by_id) for favorite in self.favorited_by.all()]