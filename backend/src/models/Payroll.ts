export interface Payroll {
    id: string;
    employeeId: string;
    salary: number;
    deductions: number;
    netPay: number;
    payDate: string; // formatted as YYYY-MM-DD
}

export class PayrollModel {
    constructor(public payroll: Payroll) {}

    calculateNetPay(): number {
        return this.payroll.salary - this.payroll.deductions;
    }
}