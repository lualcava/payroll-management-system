import React, { useState } from 'react';

const AttendanceForm = () => {
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ employee, date, checkInTime, checkOutTime, status });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Employee:</label>
                <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
                    <option value="">Select Employee</option>
                    <option value="emp1">Employee 1</option>
                    <option value="emp2">Employee 2</option>
                    <option value="emp3">Employee 3</option>
                </select>
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
                <label>Check-in Time:</label>
                <input type="time" value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} required />
            </div>
            <div>
                <label>Check-out Time:</label>
                <input type="time" value={checkOutTime} onChange={(e) => setCheckOutTime(e.target.value)} required />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AttendanceForm;