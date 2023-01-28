from flask import Flask, jsonify
import os
from dotenv import load_dotenv
app = Flask(__name__)
load_dotenv()
@app.route("/")
def hello():
  return "My favorite cat is Maple. Don't tell the others about this endpoint!"

@app.route("/auth", methods=["GET"])
def auth():
    return jsonify({"secret": os.getenv("TWILIO_AUTH_TOKEN"), "sid": os.getenv("TWILIO_ACCOUNT_SID")})

@app.route("/donate", methods=["POST"])
def donate():
    target_cat = request.json["cat"]
    amount = request.json["amount"]
    total = db.get(target_cat)
    new_total = total + amount
    db[target_cat] = new_total

    if db.get("maple") > db.get("apricot"):
        target("maple")
    else:
        target("apricot")
if __name__ == "__main__":
  app.run()
