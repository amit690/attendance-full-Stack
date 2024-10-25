const express = require('express');

const summaryeControler = require('../controlers/summary');

const router = express.Router();

router.get('/summary', summaryeControler.getSummary);

module.exports = router;