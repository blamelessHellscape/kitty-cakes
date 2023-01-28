from flask import Flask, jsonify, request, Response
import os
from dotenv import load_dotenv
from .target import target
import sys

app = Flask(__name__)
load_dotenv()

db = {'maple': 0,
      'apricot': 0}


@app.route("/")
def hello():
    return "My favorite cat is Maple. Don't tell the others about this endpoint!"


@app.route("/auth", methods=["GET"])
def auth():
    return jsonify({"secret": os.getenv("TWILIO_AUTH_TOKEN"), "sid": os.getenv("TWILIO_ACCOUNT_SID")})


@app.route("/donate", methods=["POST"])
def donate():
    # print('hey', file=sys.stderr)
    target_cat = request.form["cat"].lower()
    print(str(target_cat))
    amount = request.form["amount"]

    total = db[target_cat]
    new_total = total + float(amount)
    db[target_cat] = new_total

    if db["maple"] > db["apricot"]:
        print('targeting maple')
        return Response(target("maple"))
    else:
        return Response(target("apricot"))


if __name__ == "__main__":
    app.run()
