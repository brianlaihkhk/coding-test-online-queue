import response
from session import get, is_in_queue, is_expired, get_waiting_time, get_waiting_position, update_queue, delete_old_session
from orm import Session
import os

expiration_minute = int(os.environ['SESSION_EXPIRATION_MINUTE'])
concurrent_maximum_users = int(os.environ['CONCURRENT_MAXIMUM_USERS'])

def queue_status(event, context):
    if 'headers' not in event or 'Session' not in event['headers'] or not event['headers']['Session']:
        return response.failure("Unable to retrieve Session")

    delete_old_session()
    update_queue()

    session_uuid = event['headers']['Session']
    user_session = get(session_uuid)

    if user_session is None or is_expired(user_session):
        return response.failure("Session is expired")

    if is_in_queue(user_session):
        waiting_time = get_waiting_time(user_session)
        waiting_position = get_waiting_position(user_session)
        return response.success({"in_queue" : True, "waiting_time" : waiting_time, "waiting_position" : waiting_position, "total_user" : waiting_position + concurrent_maximum_users})

    return response.success({"in_queue" : False, "token_valid_until" : int(user_session.SESSION_EPOCH_TIME) + expiration_minute})

