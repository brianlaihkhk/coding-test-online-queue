from orm import Item
from db import db
import response
import logging

def list(event, context):
    logging.info("Start getting items")
    items = Item.query.all()
    return_items = []
    for item in items:
        return_items.append({"item_uuid" : str(item.ITEM_UUID), "item_name" : str(item.ITEM_NAME), "item_description" : str(item.ITEM_DESCRIPTION) , "price" : float(item.PRICE)})
    logging.info("Success in getting items")
    return response.success(return_items)