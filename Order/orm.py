from db import db

class User(db.Model):
    __tablename__ = 'USER'

    USER_UUID = db.Column(db.String, primary_key=True)
    FIRST_NAME = db.Column(db.String, nullable=False)
    LAST_NAME = db.Column(db.String, nullable=False)
    EMAIL = db.Column(db.String, nullable=False)
    MOBILE = db.Column(db.String, nullable=False)
    CREATION_EPOCH_TIME = db.Column(db.Integer, nullable=False)

    def __init__(self, user_uuid, first_name, last_name, email, mobile, creation_epoch_time):
        self.USER_UUID = user_uuid
        self.FIRST_NAME = first_name
        self.LAST_NAME = last_name
        self.EMAIL = email
        self.MOBILE = mobile
        self.CREATION_EPOCH_TIME = creation_epoch_time


class Session(db.Model):
    __tablename__ = 'SESSION'

    SESSION_UUID = db.Column(db.String, primary_key=True)
    JWT_TOKEN = db.Column(db.String, nullable=False)
    SESSION_EPOCH_TIME = db.Column(db.Integer, nullable=False)
    IS_IN_QUEUE = db.Column(db.Boolean, nullable=False)

    def __init__(self, session_uuid, jwt_token, session_epoch_time, is_in_queue):
        self.SESSION_UUID = session_uuid
        self.JWT_TOKEN = jwt_token
        self.SESSION_EPOCH_TIME = session_epoch_time
        self.IS_IN_QUEUE = is_in_queue

class Item(db.Model):
    __tablename__ = 'ITEM'

    ITEM_UUID = db.Column(db.String, primary_key=True)
    ITEM_NAME = db.Column(db.String, nullable=False)
    ITEM_DESCRIPTION = db.Column(db.String, nullable=False)
    PRICE = db.Column(db.DECIMAL(precision=5, scale=2), nullable=False)
    CREATION_EPOCH_TIME = db.Column(db.Integer, nullable=False)

    def __init__(self, item_uuid, item_name, item_description, price, creation_epoch_time):
        self.ITEM_UUID = item_uuid
        self.ITEM_NAME = item_name
        self.ITEM_DESCRIPTION = item_description
        self.PRICE = price
        self.CREATION_EPOCH_TIME = creation_epoch_time

class Purchase(db.Model):
    __tablename__ = 'PURCHASE'

    PURCHASE_UUID = db.Column(db.String, primary_key=True)
    USER_UUID = db.Column(db.String, db.ForeignKey('USER.USER_UUID'), nullable=False)
    ITEM_UUID = db.Column(db.String, db.ForeignKey('ITEM.ITEM_UUID'), nullable=False)
    QUANTITY = db.Column(db.Integer, nullable=False)
    CREATION_EPOCH_TIME = db.Column(db.Integer, nullable=False)

    def __init__(self, purchase_uuid, user_uuid, item_uuid, quantity, creation_epoch_time):
        self.PURCHASE_UUID = purchase_uuid
        self.USER_UUID = user_uuid
        self.ITEM_UUID = item_uuid
        self.QUANTITY = quantity
        self.CREATION_EPOCH_TIME = creation_epoch_time