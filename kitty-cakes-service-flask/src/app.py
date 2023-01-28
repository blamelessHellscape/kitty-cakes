from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
  return "My favorite cat is Maple. Don't tell the others about this endpoint!"

if __name__ == "__main__":
  app.run()
