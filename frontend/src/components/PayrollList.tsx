import React from 'react';

const PayrollList = () => {
  const payrollRecords = [
    { name: 'John Doe', salary: 5000, deductions: 500, netPay: 4500 },
    { name: 'Jane Smith', salary: 6000, deductions: 600, netPay: 5400 },
    { name: 'Bob Johnson', salary: 5500, deductions: 550, netPay: 4950 },
  ];

  return (
    <div>
      <h2>Payroll Records</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Salary</th>
            <th>Deductions</th>
            <th>Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {payrollRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>${record.salary}</td>
              <td>${record.deductions}</td>
              <td>${record.netPay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;