const express = require('express');
const router = express.Router();
const axios = require("axios");

const headers = {
  "Client-ID": "m76caohkundcwwjv0v3bb0ul5qj4ag",
  "Authorization": "Bearer v1a6v1pl0860xx9zsklvtzkexw6mu9",
}

// OK
router.get('/', async (req, res) => {
  const params = {
    client_id: "m76caohkundcwwjv0v3bb0ul5qj4ag",
    client_secret: "cenj56ld4rfbpyqtbr7ik0o699p8xk",
    grant_type: "client_credentials"
  }
  try {
    const response = await axios.post("https://id.twitch.tv/oauth2/token", null, { params })
    console.log(response);
    res.send(response.data);
  } catch (error) {
    if (error && error.response)
      res.send(error.response.data);
  }
});

router.get('/sub', async (req, res) => {
  const data = {
    "hub.callback": "http://localhost:3000/auth/confirm",
    "hub.mode": "subscribe",
    "hub.topic": "https://api.twitch.tv/helix/streams?user_id=63875647",
    "hub.lease_seconds": "864000"
  }
  try {
    await axios.post("https://api.twitch.tv/helix/webhooks/hub", data, { headers });
  } catch (error) {
    console.log(error)
    res.send(error);
  }
  res.send("hello world")
});

router.get('/confirm', (req, res) => {
  console.log("confirm -->", req);
  res.status(200).send("ok")
})

// OK
router.get('/getStreams', async (req, res) => {
  try {
    const response = await axios.get("https://api.twitch.tv/helix/webhooks/subscriptions", { params: { first: 10 }, headers });
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
})

module.exports = router;
