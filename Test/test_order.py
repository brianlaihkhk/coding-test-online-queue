import unittest
import os
import yaml
import json
import sys
import jwt

with open("../Deploy/resources/env-dev.yml", "r") as stream:
    try:
        env = yaml.safe_load(stream)
        os.environ['RDS_USERNAME'] =  env['RDS_SESSION_USERNAME']
        os.environ['RDS_PASSWORD'] = env['RDS_SESSION_PASSWORD']
        os.environ['RDS_HOST'] = env['RDS_HOST']
        os.environ['RDS_DEFAULT_DB'] = env['RDS_DEFAULT_DB']
        os.environ['SESSION_EXPIRATION_MINUTE'] = str(env['SESSION_EXPIRATION_MINUTE'])
        os.environ['CONCURRENT_MAXIMUM_USERS'] = str(env['CONCURRENT_MAXIMUM_USERS'])
    except yaml.YAMLError as exc:
        print(exc)

sys.path.append(os.path.abspath('../Order'))
from session import new, get, is_in_queue, is_expired, get_waiting_position, update_finish_queue_session
from status import queue_status
from order import purchase

class TestOrder(unittest.TestCase):
    session_and_jwt = {}
    user_session = {}
    event = {}
    context = {}

    def test_session_create(self):
        response = json.loads(new(TestOrder.event, TestOrder.context)["body"])
        TestOrder.session_and_jwt = response["payload"]
        TestOrder.event = {"headers" : {"Session" : TestOrder.session_and_jwt["session"], "Jwt" : TestOrder.session_and_jwt["jwt_token"], "Authorization" : encode(TestOrder.session_and_jwt["jwt_token"])}}
        self.assertTrue(response["success"])

    def test_session_get(self):
        TestOrder.user_session = get(TestOrder.session_and_jwt["session"])
        self.assertEqual(TestOrder.user_session.SESSION_UUID, TestOrder.session_and_jwt["session"])

    def test_session_in_queue(self):
        result = is_in_queue(TestOrder.user_session)
        self.assertTrue(result)

    def test_session_is_expired(self):
        result = is_expired(TestOrder.user_session)
        self.assertFalse(result)

    def test_session_waiting_position(self):
        result = get_waiting_position(TestOrder.user_session)
        self.assertTrue(result > 0)

    def test_status(self):
        response = json.loads(queue_status(TestOrder.event, TestOrder.context)["body"])
        self.assertTrue(response["success"])

    def test_submit_order(self):
        update_finish_queue_session(TestOrder.user_session)
        response = json.loads(purchase(TestOrder.event, TestOrder.context)["body"])
        self.assertTrue(response["success"])

def encode(input):
    user = {"first_name" : "Lieu", "last_name" : "Mandy" , "email" : "mandy.lieu@test.com" , "mobile" : "99912345"}
    purchase = []
    purchase.append({"item_uuid" : "2935f354-d527-4689-b624-e014622577eb" , "quantity" : 2})
    purchase.append({"item_uuid" : "968adbb9-56df-4056-9ffe-5ce787cce659" , "quantity" : 3})

    order = {"user" : user, "purchase" : purchase}

    encoded_message = jwt.encode(order, input)
    return str("Bearer " + encoded_message)

if __name__ == '__main__':
    unittest.main()