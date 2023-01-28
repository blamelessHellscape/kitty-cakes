import requests

CREATE_CONVERSATION = "https://conversations.twilio.com/v1/Conversations"
GET_CONVERSATION = "https://conversations.twilio.com/v1/Conversations/{}"

conversation_id = None

def create_conversation(sid, auth):
    global conversation_id

    if not conversation_id:
        params = {"FriendlyName": "Kitten Chat"}
        response = requests.post(CREATE_CONVERSATION, data=params, auth=(sid, auth))
        resp_json = response.json()
        conversation_id = resp_json['sid']
        return response.json()
    else:
        conversation_url = GET_CONVERSATION.format(conversation_id)
        response = requests.get(conversation_url, auth=(sid, auth))
        return response.json()
