const express = require('express');
const router = express.Router();
const ivrController = require('../controllers/ivrController');

router.get('/send-call', ivrController.sendIvrCall);
router.post('/ivr-response', ivrController.ivrResponse);
router.post('/gather-response', ivrController.gatherResponse);

module.exports = router;
