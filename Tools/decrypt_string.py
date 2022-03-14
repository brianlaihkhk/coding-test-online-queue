import yaml
import sys
import jwt

def decrypt(input):
    with open("../Deploy/resources/encrypt-prd.yml", "r") as stream:
        try:
            env = yaml.safe_load(stream)
            key = env["RDS_ENCRYPT_KEY"]
            # print(cryptocode.decrypt(input, key))
            print(jwt.decode(input, key, algorithms=["HS256"])["body"])
        except yaml.YAMLError as exc:
            print(exc)

if __name__ == "__main__":
   decrypt(sys.argv[1])