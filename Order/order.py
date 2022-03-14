import uuid
import response
import jwt
import time
from db import db
from session import is_valid, get
import traceback
from orm import Purchase, User

def purchase(event, context):
    if 'headers' not in event or 'Session' not in event['headers'] or not event['headers']['Session']:
        return response.failure("Unable to retrieve Session")
    if 'headers' not in event or 'Authorization' not in event['headers'] or not event['headers']['Authorization']:
        return response.failure("Unable to retrieve Authorization message")

    user_session = get(event['headers']['Session'])
    user_authorization = str(event['headers']['Authorization']).lstrip("Bearer").strip()
    user_uuid = str(uuid.uuid4())
    purchase_uuid_list = []

    if not is_valid(user_session):
        return response.failure("Session is expired or waiting")

    try:
        payload = jwt.decode(user_authorization, user_session.JWT_TOKEN, algorithms=["HS256"])
    except Exception:
        return response.failure("Unable to decrypt message")

    if 'user' not in payload:
        return response.failure("No user message")
    if 'purchase' not in payload:
        return response.failure("No purchase message")

    try:
        create_user(user_uuid, payload['user'])
        for purchase_item in payload['purchase']:
            purchase_uuid_list.append(create_purchase(user_uuid, purchase_item))
        db.session.commit()
    except Exception:
        return response.failure("Unable to create purchase")

    return response.success({"user" : user_uuid, "purchase" : purchase_uuid_list})

def create_user(user_uuid, new_user):
    epoch_time = int(time.time())
    create_user = User(user_uuid, new_user['first_name'], new_user['last_name'], new_user['email'], new_user['mobile'], epoch_time)
    db.session.add(create_user)
    db.session.commit()
    return user_uuid

def create_purchase(user_uuid, new_purchase):
    purchase_uuid = str(uuid.uuid4())
    epoch_time = int(time.time())
    create_purchase = Purchase(purchase_uuid, user_uuid, new_purchase['item_uuid'], int(new_purchase['quantity']), epoch_time)
    db.session.add(create_purchase)
    db.session.commit()
    return purchase_uuid