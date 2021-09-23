const twilio = require("twilio");

//authentication info for twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const twilioNum = process.env.TWILIO_NUM;
const ownerNum = process.env.OWNER_NUM;
const customerNum = process.env.CUSTOMER_NUM;

//creates a text message to owner to notify that they have an incoming order
const smsToOwner = function (order) {
  client.messages
    .create({
      body: `An order came in from ${order.name}. Phone: ${order.phone}`,
      from: twilioNum,
      to: ownerNum,
    }) //change placeholder to order.name
    .then((message) =>
      console.log(
        `Message ${message.status} to ${message.to} at ${message.date_sent}`
      )
    );
};

//create a function to notify customers their food is being prepared and its ETA.
//creates a text message to owner to notify that they have an incoming order
const smsToCustomer = function (time, phone) {
  client.messages
    .create({
      body: `Your food is arriving approximately at ${time}`,
      from: twilioNum,
      to: "+1" + phone,
    }) // change placeholder to order.estimated_time
    .then((message) =>
      console.log(
        `Message ${message.status} to ${message.to} at ${message.date_sent}`
      )
    );
};

module.exports = { smsToOwner, smsToCustomer };
