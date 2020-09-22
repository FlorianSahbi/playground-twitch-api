const express = require('express');
const router = express.Router();
const axios = require("axios");

// 63875647 Yul userId

const headers = {
  "Client-ID": "m76caohkundcwwjv0v3bb0ul5qj4ag",
  "Authorization": "Bearer e72bnxzdx9okyk4i1kxsrka1ldtiok",
}

router.get('/token', async (req, res) => {
  const params = {
    client_id: "m76caohkundcwwjv0v3bb0ul5qj4ag",
    client_secret: "cenj56ld4rfbpyqtbr7ik0o699p8xk",
    grant_type: "client_credentials"
  }
  try {
    const response = await axios.post("https://id.twitch.tv/oauth2/token", null, { params })
    res.send(response.data);
  } catch (error) {
    if (error && error.response)
      res.send(error.response.data);
  }
});

router.get('/webhook/subscribe/:userId', async (req, res) => {
  console.log(req.params.userId)
  const data = {
    "hub.callback": `https://shielded-thicket-62633.herokuapp.com/twitch/webhook/${req.params.userId}`,
    "hub.mode": "subscribe",
    "hub.topic": `https://api.twitch.tv/helix/streams?user_id=${req.params.userId}`,
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

router.get('/webhook/:userId', (req, res) => {
  console.log("confirm -->", req.query[Object.keys(req.query)[0]]);
  res.status(200).send(req.query[Object.keys(req.query)[0]])
})

router.get('/subscriptions', async (req, res) => {
  try {
    const response = await axios.get("https://api.twitch.tv/helix/webhooks/subscriptions", { params: { first: 10 }, headers });
    res.send(response.data);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
})

module.exports = router;
