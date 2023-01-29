from flask import make_response
import requests

pi_addr = "http://192.168.50.150:80/pussycat"; #insert actual IP here.
def target(cat):
    data = 'flag=',False
    #contact GCP here and figure out if cat is in frame. 
    #return true or false if cat is in frame. motor will move until true 
    # headers = {"Content-type": "application/json"}
    
    try:
        response = requests.post(pi_addr, data=data)
        return make_response('good',response.status_code)
    except Exception:
        print('beef')
        return ('beef1',501)