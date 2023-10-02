from dotenv import dotenv_values
import os
import redis

envVars = dotenv_values('.env')
basedir = os.path.abspath(os.path.dirname(__file__))

# TODO Configure expiration date of keys in redis db match with date given in cookies

class ApplicationConfig:
  SECRET_KEY = envVars['SECRET_KEY']
  SQLALCHEMY_ECHO = True
  SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(basedir, 'database.db')}"

  SESSION_TYPE = "redis"
  SESSION_PERMANENT = False
  SESSION_USE_SIGNER = True
  SESSION_COOKIE_SECURE = True
  SESSION_COOKIE_SAMESITE = 'Strict'
  SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
