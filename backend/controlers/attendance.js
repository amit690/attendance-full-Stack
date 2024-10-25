const Student = require('../models/student');
const Attendance = require('../models/attendance');

// POST Attendance
exports.postAttendance = async (req, res, next) => {
    const { attendanceArray } = req.body;
    let resAttendanceArray = [];

    try {
        for (const element of attendanceArray) {
            const { studentId, date, status } = element;

            let attendance = await Attendance.findOne({
                where: { studentId: studentId, date: date },
            });

            if (attendance) {
                // Update status if attendance exists
                attendance.status = status;
                await attendance.save();
            } else {
                // Create new attendance entry
                attendance = await Attendance.create({
                    StudentId: studentId,
                    date: date,
                    status: status,
                });
            }

            resAttendanceArray.push(attendance);
        }

        res.status(200).json({
            message: 'Attendance saved successfully',
            attendance: resAttendanceArray
        });

    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error });
    }
};


// GET Attendance by Date
exports.getAttendance = async (req, res, next) => {
    const { date } = req.params;

    try {
        const attendanceRecords = await Attendance.findAll({
            where: { date: date },
            include: Student
        });

        if (attendanceRecords.length > 0) {
            res.status(200).json(attendanceRecords);
        } else {
            // Fetch all students to provide data if no attendance is found for that date
            const students = await Student.findAll();
            res.status(200).json({
                message: 'No attendance records found for this date.',
                students: students
            });
        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};
