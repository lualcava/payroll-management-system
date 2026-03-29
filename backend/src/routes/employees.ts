import { Router } from 'express';

const router = Router();

let employees = [];

// Create an employee
router.post('/employees', (req, res) => {
    const employee = req.body;
    employees.push(employee);
    res.status(201).send(employee);
});

// Read all employees
router.get('/employees', (req, res) => {
    res.send(employees);
});

// Read a single employee by ID
router.get('/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found.');
    res.send(employee);
});

// Update an employee
router.put('/employees/:id', (req, res) => {
    const employeeIndex = employees.findIndex(e => e.id === parseInt(req.params.id));
    if (employeeIndex === -1) return res.status(404).send('Employee not found.');
    employees[employeeIndex] = req.body;
    res.send(employees[employeeIndex]);
});

// Delete an employee
router.delete('/employees/:id', (req, res) => {
    const employeeIndex = employees.findIndex(e => e.id === parseInt(req.params.id));
    if (employeeIndex === -1) return res.status(404).send('Employee not found.');
    employees.splice(employeeIndex, 1);
    res.status(204).send();
});

export default router;