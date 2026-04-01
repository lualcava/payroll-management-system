"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const app = (0, express_1.default)();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(express_1.default.json());
console.log('Database URL:', process.env.DATABASE_URL);
// Test database connection
pool.on('connect', () => {
    console.log('✓ Pool connected to database');
});
pool.on('error', (err) => {
    console.error('✗ Pool error:', err.message);
});
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});
// Get employees
app.get('/api/employees', async (req, res) => {
    try {
        console.log('Fetching employees...');
        const result = await pool.query('SELECT * FROM employees');
        console.log('Employees found:', result.rows.length);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching employees:', error.message);
        res.status(500).json({ error: error.message });
    }
});
// Create employee
app.post('/api/employees', async (req, res) => {
    try {
        const { name, email, position, department, salary, hire_date } = req.body;
        console.log('Creating employee:', { name, email, position, department, salary });
        const result = await pool.query('INSERT INTO employees (name, email, position, department, salary, hire_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, email, position, department, salary, hire_date || new Date().toISOString().split('T')[0]]);
        console.log('Employee created:', result.rows[0]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating employee:', error.message);
        res.status(500).json({ error: error.message });
    }
});
// Get payroll
app.get('/api/payroll', async (req, res) => {
    try {
        console.log('Fetching payroll...');
        const result = await pool.query('SELECT * FROM payroll');
        console.log('Payroll found:', result.rows.length);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching payroll:', error.message);
        res.status(500).json({ error: error.message });
    }
});
// Get attendance
app.get('/api/attendance', async (req, res) => {
    try {
        console.log('Fetching attendance...');
        const result = await pool.query('SELECT * FROM attendance');
        console.log('Attendance found:', result.rows.length);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching attendance:', error.message);
        res.status(500).json({ error: error.message });
    }
});
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const server = app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/api`);
    // Test connection
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('✓ Database connected successfully at:', result.rows[0].now);
    }
    catch (error) {
        console.error('✗ Database connection failed:', error.message);
        process.exit(1);
    }
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    server.close(() => {
        pool.end();
        process.exit(0);
    });
});
//# sourceMappingURL=index.js.map