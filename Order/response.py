import json

def buildResponse(statusCode, success, payload):

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
    return buildResponse(200, True, body)

def failure(body) :
    return buildResponse(500, False, body)
