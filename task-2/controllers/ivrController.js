const { makeCall } = require('../services/twilioService');
const { interviewLink, myPhoneNumber, voiceUrl ,twilioBaseUrl } = require('../config/twilioConfig');
require("dotenv").config()
const twilio = require('twilio');

exports.sendIvrCall = async (req, res) => {
    try {
        console.log("call to candidate")
        const call = await makeCall(myPhoneNumber, `${twilioBaseUrl}/ivr/ivr-response`);
        res.status(200).json({ message: 'Call initiated', callSid: call.sid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.ivrResponse = (req, res) => {
    console.log("Ask to candidate")
    console.log("message sent")
    const twiml = new twilio.twiml.VoiceResponse();
    let twilioVoiceUrl= `${twilioBaseUrl}${voiceUrl}`
    twiml.play(twilioVoiceUrl)
    
    twiml.gather({
        numDigits: 1,
        action: '/ivr/gather-response',
        method: 'POST',
    });
    
    res.type('text/xml');
    res.send(twiml.toString());
};

exports.gatherResponse = (req, res) => {
    const digit = req.body.Digits;

    console.log("message sent")
    const twiml = new twilio.twiml.VoiceResponse();

    if (digit === '1') {
        twiml.say('Thank you. Please check your SMS for the interview link.');
        twiml.sms(`Here is your interview link: ${interviewLink}`);
    } else {
        twiml.say('You did not press 1. Goodbye!');
    }

    res.type('text/xml');
    res.send(twiml.toString());
};
