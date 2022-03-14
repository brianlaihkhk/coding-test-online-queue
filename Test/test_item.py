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
from item import list

class TestItem(unittest.TestCase):
    event = {}
    context = {}

    def test_get_item(self):
        response = json.loads(list(self.event, self.context)["body"])
        self.assertEqual(True, response["success"])


if __name__ == '__main__':
    unittest.main()