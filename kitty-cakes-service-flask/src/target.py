from flask import Response
import json, requests

pi_addr = "http://192.168.50.150:80"; #insert actual IP here.
def target(cat):
    data = {'is_in_frame': False}
    #contact GCP here and figure out if cat is in frame. 
    #return true or false if cat is in frame. motor will move until true 
    headers = {"Content-type": "application/json"}
    
    try:
        response = requests.post(pi_addr, data=json.dumps(data), headers=headers)
        return response.status_code
    except Exception:
        print('beef')
        return ('beef1',501)