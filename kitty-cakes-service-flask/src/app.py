from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from conversation import create_conversation
import sys

app = Flask(__name__)
CORS(app)
load_dotenv()

db = {'maple': 0,
      'apricot': 0}

@app.route("/")
def hello():
    return "My favorite cat is Maple. Don't tell the others about this endpoint!"


@app.route("/auth", methods=["GET"])
def auth():
    return jsonify({"secret": os.getenv("TWILIO_AUTH_TOKEN"), "sid": os.getenv("TWILIO_ACCOUNT_SID")})

@app.route("/conversation", methods=["GET"])
def get_conversation():
    sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth = os.getenv("TWILIO_AUTH_TOKEN")
    conversation = create_conversation(sid, auth)

    return jsonify(conversation)

@app.route("/donate", methods=["POST"])
def donate():
    cat_data = request.get_json()

    if cat_data.get('cat') and cat_data['cat'] in db:
        db[cat_data['cat']] += 1

    # print(db)

    return jsonify({'status': 200, 'data': db})

@app.route("/get_cats", methods=["GET"])
def get_cats():
    return jsonify(db)

@app.route("/getTopCat", methods=["GET"])
def get_top_cat():
    cat, num = max(db.items(), key=lambda k: k[1])

    return jsonify({'cat': cat, 'num': num})

@app.route("/donate-create", methods=["POST"])
def donate_create():
    create = request.get_json()

    print(create)

    return jsonify({"status": 202})

if __name__ == "__main__":
    app.run('0.0.0.0', 5000)
