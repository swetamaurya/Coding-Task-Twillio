require('dotenv').config();

module.exports = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    myPhoneNumber: process.env.MY_PHONE_NUMBER,
    interviewLink: process.env.INTERVIEW_LINK,
    voiceUrl:process.env.VOICE_URL,
    twilioBaseUrl:process.env.TWILIO_BASE_URL,
    baseUrl:process.env.BASE_URL,
};
