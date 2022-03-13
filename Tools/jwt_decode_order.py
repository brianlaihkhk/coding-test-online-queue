import sys
import jwt
import json

def decode(token, message):
   decoded_message = jwt.decode(message, token, algorithms=["HS256"])
   print(json.dumps(decoded_message))

if __name__ == "__main__":
   decode(sys.argv[1], sys.argv[2])