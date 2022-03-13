
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from cryptography.fernet import Fernet
import os

app = Flask(__name__)

# Obtain encrypt key
encrypt_key = str(os.environ['RDS_ENCRYPT_KEY']).encode()
env_username = os.environ['RDS_USERNAME']
env_password = os.environ['RDS_PASSWORD']
fernet = Fernet(encrypt_key) if encrypt_key else None

# MySql datebase
db_url = os.environ['RDS_HOST']
db_username = fernet.decrypt(env_username.encode()).decode() if encrypt_key is not None else env_username
db_password = fernet.decrypt(env_password.encode()).decode() if encrypt_key is not None else env_password
db_target = os.environ['RDS_DEFAULT_DB']

# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://" + db_username + ":" + db_password + "@" + db_url + "/" + db_target

db = SQLAlchemy(app)