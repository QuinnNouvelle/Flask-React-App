from flask import Blueprint, request, session, make_response
from ..models.users import Users
from extentions import db
import bcrypt
from flask import current_app


auth = Blueprint("auth", __name__)

# All Of the data should be restricted at this point by the regex tests.  
# But if somehow u can remove the regex and import whatever values u want i wondder how that would react
@auth.route('/createNewUser', methods=['POST']) 
def newUserCreate():
    salt = bcrypt.gensalt()
    try:
      data = request.get_json()
      try:
        hashed_password = bcrypt.hashpw(data['Password'].encode('utf-8'), salt)
        userData = Users(username=data['Username'], email=data['Email'], password=hashed_password, salt=salt)

      except Exception as e:
        print(e)
        return {'message': 'Your Inputs for these fields are invalid.'},400

      # From this point because of the last try catch, we know the input values are all valid.  The only fail would be multiple emails ie users.
      try:
        db.session.add(userData)
        db.session.commit()
      except Exception as e:
        print(e)
        return {'message': 'This email already has an account.'}, 409

      return {"message": "Account Successfully Created"}, 201
    except Exception as e:
      print(e)
      return {'message': 'Server Error'}, 500

@auth.route('/userAuthentication', methods=['POST'])
def userAuthentication():
  try:
    data = request.get_json()
    output = db.session.query(Users).filter(Users.email == data['Email']).first() 
    hashed_password = bcrypt.hashpw(data['Password'].encode('utf-8'), output.salt)
    if output.password == hashed_password: 
      current_app.logger.debug("Test DEBUG")
      session['user_id'] = output.id 
      return {'message': 'Login Successful'}, 200
    return {'message': 'Invalid Request'}, 400
  except Exception as e:
    print(e)
    return {'message': 'Invalid Request'}, 400

@auth.route('/logout', methods=['POST'])
def logout():
  try:
    session.pop('user_id')
    return {'message': "Logout Successful"}, 200
  except Exception as e:
    print(e)
    return {'message': 'Invalid Request'}, 400

@auth.route('/getUser')
def getUser():
  userID = session.get(f'user_id')
  if userID == None:
    return {'message': 'Unauthorized'}, 401
  else:
    user = db.session.query(Users).filter(Users.id == userID).first()
    return {"name": user.username}, 200
    


