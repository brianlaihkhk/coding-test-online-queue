import jwt
import yaml
import sys

def encrypt(input):
    with open("../Deploy/resources/encrypt-prd.yml", "r") as stream:
        try:
            env = yaml.safe_load(stream)
            key = env["RDS_ENCRYPT_KEY"]
            print(jwt.encode({"body" : input}, key))
            # print(cryptocode.encrypt(input, key))
        except yaml.YAMLError as exc:
            print(exc)

if __name__ == "__main__":
   encrypt(sys.argv[1])