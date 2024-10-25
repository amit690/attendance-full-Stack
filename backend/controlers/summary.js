const Student = require('../models/student');
const Attendance = require('../models/attendance');

exports.getSummary = async (req, res, next) => {
    const resArray = [];

    try {
        const studentArray = await Student.findAll();

        for (const student of studentArray) {
            const summary = await Attendance.findAll({
                where: { StudentId: student.id }
            });

            let total = summary.length;
            let present = summary.filter(element => element.status === 'present').length;

            const studentSummary = {
                name: student.name,
                attendance: total > 0 ? (present / total).toFixed(2) : 'No attendance recorded'
            };

            resArray.push(studentSummary);
        }

        res.status(200).json(resArray);

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Error fetching summary', error });
    }
};
