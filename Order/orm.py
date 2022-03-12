from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float

class User(Base):
    __tablename__ = 'USER'

    USER_UUID = Column(String, primary_key=True)
    FIRST_NAME = Column(String, nullable=False)
    LAST_NAME = Column(String, nullable=False)
    EMAIL = Column(String, nullable=False)
    MOBILE = Column(String, nullable=False)
    CREATION_EPOCH_TIME = Column(Integer, nullable=False)

class Session(Base):
    __tablename__ = 'SESSION'

    SESSION_UUID = Column(String, primary_key=True)
    SESSION_TOKEN = Column(String, nullable=False)
    CREATION_EPOCH_TIME = Column(Integer, nullable=False)
    IS_IN_QUEUE = Column(Boolean, nullable=False)

class Item(Base):
    __tablename__ = 'ITEM'

    ITEM_UUID = Column(String, primary_key=True)
    ITEM_NAME = Column(String, nullable=False)
    ITEM_DESCRIPTION = Column(String, nullable=False)
    PRICE = Column(Float(precision=5, scale=2), nullable=False)
    CREATION_EPOCH_TIME = Column(Integer, nullable=False)

class Purchase(Base):
    __tablename__ = 'PURCHASE'

    PURCHASE_UUID = Column(String, primary_key=True)
    USER_UUID = Column(String, nullable=False, ForeignKey('USER.USER_UUID'))
    ITEM_UUID = Column(String, nullable=False, ForeignKey('ITEM.ITEM_UUID'))
    QUANTITY = Column(Integer, nullable=False)
    CREATION_EPOCH_TIME = Column(Integer, nullable=False)
