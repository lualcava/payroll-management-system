import React from 'react';

const Dashboard = () => {
    const totalEmployees = 100; // Sample Data
    const totalPayrollAmount = 250000; // Sample Data
    const pendingAttendance = 5; // Sample Data

    return (
        <div>
            <h1>Payroll Management Dashboard</h1>
            <div>
                <h2>Total Employees: {totalEmployees}</h2>
                <h2>Total Payroll Amount: ${totalPayrollAmount}</h2>
                <h2>Pending Attendance: {pendingAttendance}</h2>
            </div>
        </div>
    );
};

export default Dashboard;