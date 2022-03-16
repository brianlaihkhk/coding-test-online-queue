import uuid
import response
import time
import uuid
import os
from db import db
import traceback
from orm import Session

expiration_minute = int(os.environ['SESSION_EXPIRATION_MINUTE'])
concurrent_maximum_users = int(os.environ['CONCURRENT_MAXIMUM_USERS'])

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
    if user_session.SESSION_EPOCH_TIME < epoch_time - expiration_minute * 60:
        return True
    return False

def get_waiting_time(user_session):
    return int(get_waiting_position(user_session) * expiration_minute / concurrent_maximum_users)

def get_waiting_position(user_session):
    if user_session is None :
        return -1

    filters = db.and_(Session.IS_IN_QUEUE == True , Session.SESSION_EPOCH_TIME < user_session.SESSION_EPOCH_TIME)
    count = db.session.query(Session.SESSION_UUID).filter(filters).count()
    return count

def update_queue():
    concurrent_users = Session.query.filter_by(IS_IN_QUEUE = False).count()
    waiting_users = Session.query.filter_by(IS_IN_QUEUE = True).order_by(Session.SESSION_EPOCH_TIME.asc()).limit(concurrent_maximum_users - concurrent_users).all()

    for user_session in waiting_users :
        update_finish_queue_session(user_session)

    return True

def update_finish_queue_session(user_session) :
    epoch_time = int(time.time())
    user_session.IS_IN_QUEUE = False
    user_session.SESSION_EPOCH_TIME = epoch_time
    db.session.commit()
    return user_session


def delete_old_session():
    epoch_time = int(time.time())
    filters = db.and_(Session.IS_IN_QUEUE == False , Session.SESSION_EPOCH_TIME < epoch_time - (expiration_minute * 60))
    old_session = db.session.query(Session).filter(filters)

    for delete_session in old_session :
        db.session.delete(delete_session)
        
    db.session.commit()
    return True

def populate_session(event, context):
    total_populate = 100
    for count in range(total_populate):
        new(event, context)
    return response.success({"total_populate" : total_populate})