import uuid
import response
import time
import uuid
import os
from db import db
import traceback
from orm import Session

expiration_minute = int(os.environ['SESSION_EXPIRATION_MINUTE'])

def new(event, context):
    epoch_time = int(time.time())
    session_uuid = str(uuid.uuid4())
    jwt_token = str(uuid.uuid4())
    is_in_queue = True

    try:
        new_session = Session(session_uuid, jwt_token, epoch_time, is_in_queue)
        db.session.add(new_session)
        db.session.commit()
    except Exception:
        return response.failure("Error in generating session")
    return response.success({"session" : session_uuid, "jwt_token" : jwt_token})

def get(session_uuid):
    filters = {'SESSION_UUID': session_uuid}
    user_session = Session.query.filter_by(**filters).first()

    return user_session

def is_valid(user_session):
    if user_session is None or is_expired(user_session):
        return False

    if is_in_queue(user_session):
        return False
    
    return True

def is_in_queue(user_session):
    return user_session.IS_IN_QUEUE

def is_expired(user_session):
    epoch_time = int(time.time())
    if user_session.CREATION_EPOCH_TIME < epoch_time - expiration_minute * 60:
        return True
    return False

def get_waiting_time(user_session):
    return get_waiting_position(user_session) / (expiration_minute * 60)

def get_waiting_position(user_session):
    if user_session is None :
        return -1

    filters = db.and_( Session.IS_IN_QUEUE == True , Session.CREATION_EPOCH_TIME < user_session.CREATION_EPOCH_TIME)
    count = db.session.query(db.func.count(Session.SESSION_UUID)).filter(filters).count()
    return count