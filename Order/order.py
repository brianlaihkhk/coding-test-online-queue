import uuid
import response
import jwt
import time
import db
from session import is_valid, get
from orm import Session, Purchase, User

def purchase(event, context):
    if 'Session' not in event or not event['Session']:
        return response.failure("Unable to retrieve Session")
    if 'Authorization' not in event or not event['Authorization']:
        return response.failure("Unable to retrieve Authorization message")

    user_session = get(event['Session'])
    user_uuid = str(uuid.uuid4())

    if not is_valid(user_session):
        return response.failure("Session is expired or waiting")

    try:
        payload = jwt.decode(event['Authorization'], user_session.JWT_TOKEN, algorithms=["HS256"])
    except:
        return response.failure("Unable to decrypt message")

    if 'user' not in payload:
        return response.failure("No user message")
    if 'purchase' not in payload:
        return response.failure("No purchase message")

    try:
        create_user(user_uuid, payload['user'])
        for purchase_item in payload['purchase']:
            create_purchase(user_uuid, purchase_item)
        db.session.commit()
    except:
        return response.failure("Unable to create purchase")

    return response.success("success")

def create_user(user_uuid, new_user):
    epoch_time = int(time.time())
    create_user = User(user_uuid, new_user['first_name'], new_user['last_name'], new_user['email'], new_user['mobile'], epoch_time)
    return User.add(create_user)

def create_purchase(user_uuid, new_purchase):
    purchase_uuid = str(uuid.uuid4())
    epoch_time = int(time.time())
    create_purchase = Purchase(purchase_uuid, user_uuid, new_purchase['item_uuid'], new_purchase['quantity'], epoch_time)
    return Purchase.add(create_purchase)