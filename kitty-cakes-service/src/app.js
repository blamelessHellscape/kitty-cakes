const express = require("express");
const app = express();
const port = 8080;
require("dotenv").config({ path: "../config.env" });
const AccessToken = require("twilio").jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

//https://www.npmjs.com/package/in-memory-database
const { InMemoryDatabase } = require("in-memory-database");
const { target } = require('./target');

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
const identity = "ww.kitty.cakes@gmail.com";

const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
});

app.use(
  express.raw({
    // Need raw message body for signature verification
    type: "application/json",
  })
);

const db = new InMemoryDatabase();
db.set("maple", 0);
db.set("apricot", 0);

app.get("/auth", (req, res) => {
  let secret = getSecret();
  res.json({ 'secret': secret });
});

app.post("/donate", (req, res) => {
  const target_cat = req.body.cat;
  const amount = req.body.amount;
  let total = db.get(target_cat);
  let new_total = total + amount;
  db.set(target_cat, new_total);

  if (db.get('maple') > db.get('apricot')){
    target('maple');
  }else{
    target('apricot');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function getSecret() {
  // const token = new AccessToken(
  //   twilioAccountSid,
  //   twilioApiKey,
  //   twilioApiSecret,
  //   { identity: identity }
  // );

  // token.addGrant(chatGrant);
  // const jwt = token.toJwt();
  // // Serialize the token to a JWT string
  // console.log(jwt);
  return process.env.TWITCH_API
  //TODO: figure this out
}
