const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion, Card } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post("/webhook", async (req, res) => {
  var id = (res.req.body.session).substr(43);

  console.log(id)
  const agent = new WebhookClient({ request: req, response: res });



  function Default Welcome Intent(agent) {
    console.log(`intent  =>  hi`);
    agent.add(`Hi i am SMIT assistant, how can i help you? `)
  }
  function Default Fallback Intent(agent) {
    console.log(`intent  =>  hi`);
    agent.add("fallback from server side?")
  }
  function fees(agent) {
    console.log(`intent  =>  hi`);
    agent.add("what is the fees?")
  }
  function courses(agent) {
    console.log(`intent  =>  hi`);
    agent.add("what are the courses?")
  }
  function address(agent) {
    console.log(`intent  =>  hi`);
    agent.add("what is the address?")
  }
  function form(agent) {
    console.log(`intent  =>  hi`);
    const { givenname, phone, address, email } = agent.parameters;




    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shajeeahmed10@gmail.com',
        pass: 'uigkjljhyftycj'
      }
    });

    var mailOptions = {
      from: 'shajeeahmed10@gmail.com',
      to: email,
      subject: 'Sending Email from Backend',
      text: `Hello Sir/Madam! hope you are received email kindly confirm  your name ${givenname} your contact number ${phone}  and your email ${email} and your addres ${address}  thank you`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    agent.add("ok sir! you're enrolled")
  }

  let intentMap = new Map();
  intentMap.set('Default Fallback Intent', fallBack);
  intentMap.set('Default Welcome Intent', hi);
  intentMap.set('form', form);
  intentMap.set('courses', courses);
  intentMap.set('address', address);
  intentMap.set('fees', fees);


  agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});