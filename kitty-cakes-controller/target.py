import requests, base64, time
from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict
from twitchrealtimehandler import TwitchImageGrabber
from PIL import Image as im

pi_addr = "http://192.168.50.150:80/pussycat"; #insert actual IP here.
twitch_stream = "https://www.twitch.tv/hoya_hacks_kitty_cakes" 
twilio_server = "http://192.168.50.6:5000/getTopCat"
THRESHOLD = 70
# client_options = {"api_endpoint": "us-central1-aiplatform.googleapis.com"}
# client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)

def target():
    data = 'flag='
    # while True:
    cat = get_top_cat()
    print('so it begins')
    image_grabber = TwitchImageGrabber(
    twitch_url=twitch_stream,
    quality="720p",  # quality of the stream could be ["160p", "360p", "480p", "720p", "720p60", "1080p", "1080p60"]
    blocking=True,
    rate=10  # frame per rate (fps)
    )
    frame = image_grabber.grab()
    # return
    print(frame)
    print(type(frame))
    image_grabber.terminate()  # stop the transcoding
    return
    # with open('nothing.jpg', "rb") as f:
    # file_content = frame.read()
    # with open('output', 'wb+') as file:
    #     for chunk in file_content.chunks():
    #         file.write(chunk)
    # return
    file_content = im.fromarray(frame)
    file_content.save("nothing.jpg")
    print('reading cat')
    # The format of each instance should conform to the deployed model's prediction input schema.
    encoded_content = base64.b64encode(file_content).decode("utf-8")
    print('maple is', encoded_content)
    instance = predict.instance.ImageClassificationPredictionInstance(
        content=encoded_content,
    ).to_value()
    instances = [instance]
    # See gs://google-cloud-aiplatform/schema/predict/params/image_classification_1.0.0.yaml for the format of the parameters.
    parameters = predict.params.ImageClassificationPredictionParams(
        confidence_threshold=0.5, max_predictions=5,
    ).to_value()
    endpoint = client.endpoint_path(
        project='266463960399', location="us-central1", endpoint='3798561985314947072'
    )
    print('boutta send a response')
    response = client.predict(
        endpoint=endpoint, instances=instances, parameters=parameters
    )
    print("response")
    print(" deployed_model_id:", response.deployed_model_id)
    # See gs://google-cloud-aiplatform/schema/predict/prediction/image_classification_1.0.0.yaml for the format of the predictions.
    predictions = response.predictions
    for prediction in predictions:
        print(" prediction:", dict(prediction))
        if(dict(prediction)['displayNames'] == cat and dict(prediction)['confidences'][0] > THRESHOLD):
            response = requests.post(pi_addr, data=data+str(False)) #False to the question of: should i move the camera?
        else: 
            response = requests.post(pi_addr, data=data+str(True)) # move the camera!

        
    #contact GCP here and figure out if cat is in frame. 
    #return true or false if cat is in frame. motor will move until true 

def get_top_cat():
    response = requests.get(twilio_server)
    print(response.json()['cat'])
    return response.json()['cat'].lower()

target()