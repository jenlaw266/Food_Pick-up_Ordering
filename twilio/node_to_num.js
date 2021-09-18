// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require("dotenv").load();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const twilioNum = process.env.TWILIO_NUM;
const ownerNum = process.env.OWNER_NUM;

//customer submit -> twilioNum sends message to owner
const express = require("express");
const app = express();

app.post("/", (req, res) => {
  const response = req.body.order; //change accordingly to html form
  client.messages
    .create({
      body: `An order came in from ${response.name}`,
      from: twilioNum,
      to: ownerNum,
    })
    .then((message) => console.log(message.status));
});

//owner esimtated time -> twilioNum send message to customer
app.post("/admin", (req, res) => {
  const customer = getCustomer(req.body.order_id); //grab from database
  const readyToPickUp = Now() + res.body.estimated_time; //change accordingly
  client.messages
    .create({
      body: `Your order will be ready at ${readyToPickUp}`,
      from: twilioNum,
      to: customer.phone_number,
    })
    .then((message) => console.log(message.status));

  //also update site to display estimated time - pop up windows
});
