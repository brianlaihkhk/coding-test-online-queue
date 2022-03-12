import response

def ping(event, context):
    return response.success("Ping success")