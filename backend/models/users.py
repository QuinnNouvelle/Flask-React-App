from extentions import db

class Users(db.Model):
    __tablename__ = 'users'

    id =  db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    salt = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<username %r>' % self.username