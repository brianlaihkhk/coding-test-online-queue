import sys
import jwt
import json

def encode(input):
   user = {"first_name" : "Lieu", "last_name" : "Mandy" , "email" : "mandy.lieu@test.com" , "mobile" : "99912345"}
   purchase = []
   purchase.append({"item_uuid" : "2935f354-d527-4689-b624-e014622577eb" , "quantity" : 2})
   purchase.append({"item_uuid" : "968adbb9-56df-4056-9ffe-5ce787cce659" , "quantity" : 3})

   order = {"user" : user, "purchase" : purchase}
   print(json.dumps(order))

   encoded_message = jwt.encode(order, input)

   print("Bearer " + encoded_message)

if __name__ == "__main__":
   encode(sys.argv[1])