# Flask-React-App
A Flask and React Application using SQLite for DB, and redis for session management

# Set Up

First you need to create a python .venv and install the requirements via the requirements.txt file
```
python3 -m venv .venv
source ./venv/bin/activate
pip install requirements.txt  
```

Then you need to use npm to install the relavent packages from the package-lock.json file
```
npm ci
```

Make sure you have redis installed as this project is configured to use redis for session management.
Confirm installation with 
```
redis-server
redis-cli
```
If you cannot connect to the server make sure your firewalls allow tcp from ip 127.0.0.1 port 6379

# First Time Configuration

# Initialization

First run the command 
```
npm run build
```
Which will run the script located in package.json.  Currently all this script does it 'webpack --config webpack.config.js --watch' outputs bundled.js into 'static/bundle.js


Then start up the flask server.  **Make sure you are in your venv**
```
flask --debug run
```

Congrats!  You now have a simple react-flask application connected to a SQLiteDB that uses redis for session management.  Features include basic authentication.