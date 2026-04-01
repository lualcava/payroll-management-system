'use strict';
const express = require('express');
const router = express.Router();
// In-memory attendance data
let attendanceData = [];
// Create attendance record
router.post('/attendance', (req, res) => {
    const { employeeId, date, status } = req.body;
    if (!employeeId || !date || !status) {
        return res.status(400).send('All fields are required.');
    }
    const attendanceRecord = { id: attendanceData.length + 1, employeeId, date, status };
    attendanceData.push(attendanceRecord);
    res.status(201).send(attendanceRecord);
});
// Read attendance records
router.get('/attendance', (req, res) => {
    res.status(200).send(attendanceData);
});
// Update attendance record
router.put('/attendance/:id', (req, res) => {
    const { id } = req.params;
    const { employeeId, date, status } = req.body;
    const attendanceRecord = attendanceData.find(record => record.id == id);
    if (!attendanceRecord) {
        return res.status(404).send('Attendance record not found.');
    }
    attendanceRecord.employeeId = employeeId || attendanceRecord.employeeId;
    attendanceRecord.date = date || attendanceRecord.date;
    attendanceRecord.status = status || attendanceRecord.status;
    res.status(200).send(attendanceRecord);
});
// Delete attendance record
router.delete('/attendance/:id', (req, res) => {
    const { id } = req.params;
    const index = attendanceData.findIndex(record => record.id == id);
    if (index === -1) {
        return res.status(404).send('Attendance record not found.');
    }
    attendanceData.splice(index, 1);
    res.status(204).send();
});
module.exports = router;
//# sourceMappingURL=attendance.js.map