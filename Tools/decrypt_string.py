from cryptography.fernet import Fernet
import yaml
import sys

def encrypt(input):
    with open("../Deploy/resources/encrypt-prd.yml", "r") as stream:
        try:
            env = yaml.safe_load(stream)
            key = env["RDS_ENCRYPT_KEY"].encode()
            print(Fernet(key).decrypt(input.encode()).decode())
        except yaml.YAMLError as exc:
            print(exc)

if __name__ == "__main__":
   encrypt(sys.argv[1])