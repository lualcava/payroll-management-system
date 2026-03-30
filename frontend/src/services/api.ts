import axios from 'axios';

// Create an instance of axios with default settings
const api = axios.create({
    baseURL: 'https://api.yourservice.com/', // Replace with your API base URL
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        // Add other headers if needed
    }
});

// API endpoints for employees
export const getEmployees = () => api.get('/employees');
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const createEmployee = (data) => api.post('/employees', data);

// API endpoints for payroll
export const getPayrolls = () => api.get('/payroll');
export const getPayrollById = (id) => api.get(`/payroll/${id}`);
export const createPayroll = (data) => api.post('/payroll', data);

// API endpoints for attendance
export const getAttendances = () => api.get('/attendance');
export const getAttendanceById = (id) => api.get(`/attendance/${id}`);
export const createAttendance = (data) => api.post('/attendance', data);

export default api;