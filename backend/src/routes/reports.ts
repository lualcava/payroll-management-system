// reports.ts

import { Router } from 'express';
import { generatePayrollReport } from '../services/payrollService';

const router = Router();

/**
 * @route GET /reports/payroll
 * @desc Generate payroll report
 * @access Public
 */
router.get('/payroll', async (req, res) => {
    try {
        const report = await generatePayrollReport();
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
});

export default router;