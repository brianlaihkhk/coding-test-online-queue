import json

def build_response(statusCode, success, payload):

    body = {
        "success": success,
        "payload": payload
    }

    response = {
        "statusCode": statusCode,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True
        },
        "body": json.dumps(body)
    }

    return response

def success(body) :
    return build_response(200, True, body)

def failure(body) :
    return build_response(500, False, body)
