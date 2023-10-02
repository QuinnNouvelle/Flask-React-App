from flask import Flask, render_template, request, session, redirect
from datetime import datetime
from extentions import db, migrate
from flask_session import Session
from backend.api.auth import auth
# from flask_session import Session
from config import ApplicationConfig

#login_manager = LoginManager()
app = Flask(__name__)
app.config.from_object(ApplicationConfig)

# BluePrints are Bundled Routes
app.register_blueprint(auth)

db.init_app(app)
migrate.init_app(app, db)


server_session = Session(app)

@app.route('/overview')
def index():
    # session is the redis server configured in config.py  Im attempting to grab a session cookie if the client has one
    if session.get(f'user_id') == None:
        return redirect('/')
    else:
        return render_template('index.html')

        
@app.errorhandler(404)
def not_found(e):
    return render_template('index.html'), 404
