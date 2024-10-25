const express = require('express');

const attendanceControler = require('../controlers/attendance');

const router = express.Router();

router.post('/attendance', attendanceControler.postAttendance);
router.get('/attendance/:date', attendanceControler.getAttendance);

module.exports = router;