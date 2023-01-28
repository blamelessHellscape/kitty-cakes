const express = require("express");
const app = express();
const port = 8080;

require("dotenv").config({ path: "../config.env" });

app.use(
  express.raw({
    // Need raw message body for signature verification
    type: "application/json",
  })
);

app.get("/auth", (req, res) => {
  let secret = getSecret();

  res.json({ secret: secret });
  // res.sendStatus(200)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function getSecret() {
  // TODO: Get secret from secure storage. This is the secret you pass
  // when you subscribed to the event.
  console.log(process.env.TWITCH_SECRET);
  return process.env.TWITCH_SECRET;
}
