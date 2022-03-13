from orm import Item
from db import db
import response

def list(event, context):
    items = Item.query.all()
    return response.success(items)