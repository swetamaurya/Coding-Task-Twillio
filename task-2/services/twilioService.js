const twilio = require('twilio');
const { accountSid, authToken, twilioPhoneNumber } = require('../config/twilioConfig');

const client = new twilio(accountSid, authToken);

const makeCall = async (to, url) => {
    try {
        const call = await client.calls.create({
            url: url,
            to: to,
            from: twilioPhoneNumber,
        });
        return call;
    } catch (error) {
        throw new Error(`Failed to make a call: ${error.message}`);
    }
};

module.exports = {
    makeCall,
};
