import requests

CREATE_CONVERSATION = "https://conversations.twilio.com/v1/Conversations"
GET_CONV

conversation = None

def create_conversation(sid, auth):
    global conversation

    if not conversation:
        params = {"FriendlyName": "Kitten Chat"}
        response = requests.post(CREATE_CONVERSATION, data=params, auth=(sid, auth))
        resp_json = response.json()
        conversation = resp
        return response.json()
    else:
        
