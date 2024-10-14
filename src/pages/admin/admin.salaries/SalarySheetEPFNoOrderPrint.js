import React from 'react';
import { Table } from 'react-bootstrap';

const SalarySheetEPFNoOrderPrint = React.forwardRef(({ salaries, monthName }, ref) => {
    // Function to format numbers with commas
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    // Calculating the sum for each column
    const totals = salaries.reduce((acc, salary) => {
        acc.basicSalary += parseFloat(salary.basicSalary);
        acc.budgetaryReliefAllowance += parseFloat(salary.budgetaryReliefAllowance);
        acc.noPay += parseFloat(salary.noPay);
        acc.totalForEpf += parseFloat(salary.totalForEpf);
        acc.normalOverTime += (((salary.basicSalary + salary.budgetaryReliefAllowance) / 240) * salary.normalOverTime) * 1.5;
        acc.doubleOverTime += parseFloat(salary.doubleOverTime);
        acc.grossSalary += parseFloat(salary.grossSalary);
        acc.eightPresentEpf += parseFloat(salary.eightPresentEpf);
        acc.cashFloat += parseFloat(salary.cashFloat);
        acc.staffLoan += parseFloat(salary.staffLoan);
        acc.staffDebtors += parseFloat(salary.staffDebtors);
        acc.salaryAdvance += parseFloat(salary.salaryAdvance);
        acc.totalDeduction += parseFloat(salary.totalDetuction);
        acc.balancePay += parseFloat(salary.balancePay);
        acc.twelvePresentEpf += parseFloat(salary.twelvePresentEpf);
        acc.threePresentEtf += parseFloat(salary.threePresentEtf);
        acc.twentyPresentEpf += parseFloat(salary.twentyPresentEpf);
        acc.fiftyPresentOnBasic += parseFloat(salary.fiftyPresentOnBasic);
        acc.totalSalary += parseFloat(salary.totalSalary);
        return acc;
    }, {
        basicSalary: 0,
        budgetaryReliefAllowance: 0,
        noPay: 0,
        totalForEpf: 0,
        normalOverTime: 0,
        doubleOverTime: 0,
        grossSalary: 0,
        eightPresentEpf: 0,
        cashFloat: 0,
        staffLoan: 0,
        staffDebtors: 0,
        salaryAdvance: 0,
        totalDeduction: 0,
        balancePay: 0,
        twelvePresentEpf: 0,
        threePresentEtf: 0,
        twentyPresentEpf: 0,
        fiftyPresentOnBasic: 0,
        totalSalary: 0,
    });

    return (
        <div ref={ref} style={{ width: '100%', padding: '10px' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>Benjarong Pvt Ltd</h4>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>Salary Sheet {monthName} | EPF No Order</h4>
            <Table bordered hover size="sm" style={{ borderCollapse: 'collapse', border: '1px solid #000', width: '100%', fontSize: '12px', wordWrap: 'break-word' }}>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>EPF No</th>
                        <th>Basic Salary</th>
                        <th>Budgetary Relief Allowance</th>
                        <th>No Pay</th>
                        <th>Total For EPF</th>
                        <th>Normal Overtime</th>
                        <th>Double Overtime</th>
                        <th>Gross Salary</th>
                        <th>8% EPF</th>
                        <th>Cash Float</th>
                        <th>Staff Loan</th>
                        <th>Staff Debtors</th>
                        <th>Salary Advance</th>
                        <th>Total Deduction</th>
                        <th>Balance Pay</th>
                        <th>12% EPF</th>
                        <th>3% ETF</th>
                        <th>20% EPF</th>
                    </tr>
                </thead>
                <tbody>
                    {salaries.map(salary => (
                        <tr key={salary.id}>
                            <td>{salary.employeeEntity.id}</td>
                            <td>{salary.employeeEntity.firstname} {salary.employeeEntity.lastname}</td>
                            <td>{salary.employeeEntity.departmentEntity.name}</td>
                            <td>{salary.employeeEntity.epf}</td>
                            <td>{formatNumber(salary.basicSalary)}</td>
                            <td>{formatNumber(salary.budgetaryReliefAllowance)}</td>
                            <td>{formatNumber(salary.noPay)}</td>
                            <td>{formatNumber(salary.totalForEpf)}</td>
                            <td>{formatNumber((((salary.basicSalary + salary.budgetaryReliefAllowance) / 240) * salary.normalOverTime) * 1.5)}</td>
                            <td>{formatNumber(salary.doubleOverTime)}</td>
                            <td>{formatNumber(salary.grossSalary)}</td>
                            <td>{formatNumber(salary.eightPresentEpf)}</td>
                            <td>{formatNumber(salary.cashFloat)}</td>
                            <td>{formatNumber(salary.staffLoan)}</td>
                            <td>{formatNumber(salary.staffDebtors)}</td>
                            <td>{formatNumber(salary.salaryAdvance)}</td>
                            <td>{formatNumber(salary.totalDetuction)}</td>
                            <td>{formatNumber(salary.balancePay)}</td>
                            <td>{formatNumber(salary.twelvePresentEpf)}</td>
                            <td>{formatNumber(salary.threePresentEtf)}</td>
                            <td>{formatNumber(salary.twentyPresentEpf)}</td>
                        </tr>
                    ))}
                    {/* Total row */}
                    <tr style={{ fontWeight: 'bold' }}>
                        <td colSpan="4">Totals</td>
                        <td>{formatNumber(totals.basicSalary)}</td>
                        <td>{formatNumber(totals.budgetaryReliefAllowance)}</td>
                        <td>{formatNumber(totals.noPay)}</td>
                        <td>{formatNumber(totals.totalForEpf)}</td>
                        <td>{formatNumber(totals.normalOverTime)}</td>
                        <td>{formatNumber(totals.doubleOverTime)}</td>
                        <td>{formatNumber(totals.grossSalary)}</td>
                        <td>{formatNumber(totals.eightPresentEpf)}</td>
                        <td>{formatNumber(totals.cashFloat)}</td>
                        <td>{formatNumber(totals.staffLoan)}</td>
                        <td>{formatNumber(totals.staffDebtors)}</td>
                        <td>{formatNumber(totals.salaryAdvance)}</td>
                        <td>{formatNumber(totals.totalDeduction)}</td>
                        <td>{formatNumber(totals.balancePay)}</td>
                        <td>{formatNumber(totals.twelvePresentEpf)}</td>
                        <td>{formatNumber(totals.threePresentEtf)}</td>
                        <td>{formatNumber(totals.twentyPresentEpf)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
});

export default SalarySheetEPFNoOrderPrint;
