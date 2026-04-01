"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var employees = [];
// Create an employee
router.post('/employees', function (req, res) {
    var employee = req.body;
    employees.push(employee);
    res.status(201).send(employee);
});
// Read all employees
router.get('/employees', function (req, res) {
    res.send(employees);
});
// Read a single employee by ID
router.get('/employees/:id', function (req, res) {
    var employee = employees.find(function (e) { return e.id === parseInt(req.params.id); });
    if (!employee)
        return res.status(404).send('Employee not found.');
    res.send(employee);
});
// Update an employee
router.put('/employees/:id', function (req, res) {
    var employeeIndex = employees.findIndex(function (e) { return e.id === parseInt(req.params.id); });
    if (employeeIndex === -1)
        return res.status(404).send('Employee not found.');
    employees[employeeIndex] = req.body;
    res.send(employees[employeeIndex]);
});
// Delete an employee
router.delete('/employees/:id', function (req, res) {
    var employeeIndex = employees.findIndex(function (e) { return e.id === parseInt(req.params.id); });
    if (employeeIndex === -1)
        return res.status(404).send('Employee not found.');
    employees.splice(employeeIndex, 1);
    res.status(204).send();
});
exports.default = router;
