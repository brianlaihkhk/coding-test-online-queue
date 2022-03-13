import response
from session import get, is_in_queue, is_expired, get_waiting_time, get_waiting_position
from orm import Session

def queue_status(event, context):
    if 'Session' not in event or not event['Session']:
        return response.failure("Unable to retrieve Session")
    session_uuid = event['Session']

    user_session = get(session_uuid)

    if user_session is None or is_expired(user_session):
        return response.failure("Session is expired")

    if is_in_queue(user_session):
        waiting_time = get_waiting_time(user_session)
        waiting_position = get_waiting_position(user_session)
        return response.success({"in_queue" : True, "waiting_time" : waiting_time, "waiting_position" : waiting_position})

    return response.success({"in_queue" : False})

