import requests
import base64
from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict

pi_addr = "http://192.168.50.150:80/pussycat"; #insert actual IP here.
rtsp_server = "'http://192.168.50.x/get-frame" #insert actual endpoint here

def target(cat):
    data = 'flag=',False

    # while True:


    # The AI Platform services require regional API endpoints.
    client_options = {"api_endpoint": "us-central1-aiplatform.googleapis.com"}
    print('so it begins')
    # Initialize client that will be used to create and send requests.
    # This client only needs to be created once, and can be reused for multiple requests.
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)
    with open('nothing.jpg', "rb") as f:
        file_content = f.read()
        print('read maple')
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


        
    #contact GCP here and figure out if cat is in frame. 
    #return true or false if cat is in frame. motor will move until true 
    # headers = {"Content-type": "application/json"}
    
    # try:
    #     response = requests.post(pi_addr, data=data)
    #     return make_response('good',response.status_code)
    # except Exception:
    #     print('beef')
    #     return ('beef1',501)
target('maple')