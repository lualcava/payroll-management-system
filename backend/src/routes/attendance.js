'use strict';
var express = require('express');
var router = express.Router();
// In-memory attendance data
var attendanceData = [];
// Create attendance record
router.post('/attendance', function (req, res) {
    var _a = req.body, employeeId = _a.employeeId, date = _a.date, status = _a.status;
    if (!employeeId || !date || !status) {
        return res.status(400).send('All fields are required.');
    }
    var attendanceRecord = { id: attendanceData.length + 1, employeeId: employeeId, date: date, status: status };
    attendanceData.push(attendanceRecord);
    res.status(201).send(attendanceRecord);
});
// Read attendance records
router.get('/attendance', function (req, res) {
    res.status(200).send(attendanceData);
});
// Update attendance record
router.put('/attendance/:id', function (req, res) {
    var id = req.params.id;
    var _a = req.body, employeeId = _a.employeeId, date = _a.date, status = _a.status;
    var attendanceRecord = attendanceData.find(function (record) { return record.id == id; });
    if (!attendanceRecord) {
        return res.status(404).send('Attendance record not found.');
    }
    attendanceRecord.employeeId = employeeId || attendanceRecord.employeeId;
    attendanceRecord.date = date || attendanceRecord.date;
    attendanceRecord.status = status || attendanceRecord.status;
    res.status(200).send(attendanceRecord);
});
// Delete attendance record
router.delete('/attendance/:id', function (req, res) {
    var id = req.params.id;
    var index = attendanceData.findIndex(function (record) { return record.id == id; });
    if (index === -1) {
        return res.status(404).send('Attendance record not found.');
    }
    attendanceData.splice(index, 1);
    res.status(204).send();
});
module.exports = router;
