import React from 'react';
import { Table } from 'react-bootstrap';

const SalarySheetPrint = React.forwardRef(({ salaries, monthName, departmentName, type }, ref) => {
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
            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>{departmentName} - Salary Sheet {monthName} | {type} Staff</h4>
            <Table striped bordered hover size="sm" style={{ width: '100%', fontSize: '12px', wordWrap: 'break-word' }}>
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
                        <th>50% on Basic</th>
                        <th>Total Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {salaries.map(salary => (
                        <tr key={salary.id}>
                            <td>{salary.employeeEntity.id}</td>
                            <td>{salary.employeeEntity.firstname} {salary.employeeEntity.lastname}</td>
                            <td>{salary.employeeEntity.departmentEntity.name}</td>
                            <td>{salary.employeeEntity.epf}</td>
                            <td>{parseFloat(salary.basicSalary).toFixed(2)}</td>
                            <td>{parseFloat(salary.budgetaryReliefAllowance).toFixed(2)}</td>
                            <td>{parseFloat(salary.noPay).toFixed(2)}</td>
                            <td>{parseFloat(salary.totalForEpf).toFixed(2)}</td>
                            <td>{parseFloat((((salary.basicSalary + salary.budgetaryReliefAllowance) / 240) * salary.normalOverTime) * 1.5).toFixed(2)}</td>
                            <td>{parseFloat(salary.doubleOverTime).toFixed(2)}</td>
                            <td>{parseFloat(salary.grossSalary).toFixed(2)}</td>
                            <td>{parseFloat(salary.eightPresentEpf).toFixed(2)}</td>
                            <td>{parseFloat(salary.cashFloat).toFixed(2)}</td>
                            <td>{parseFloat(salary.staffLoan).toFixed(2)}</td>
                            <td>{parseFloat(salary.staffDebtors).toFixed(2)}</td>
                            <td>{parseFloat(salary.salaryAdvance).toFixed(2)}</td>
                            <td>{parseFloat(salary.totalDetuction).toFixed(2)}</td>
                            <td>{parseFloat(salary.balancePay).toFixed(2)}</td>
                            <td>{parseFloat(salary.twelvePresentEpf).toFixed(2)}</td>
                            <td>{parseFloat(salary.threePresentEtf).toFixed(2)}</td>
                            <td>{parseFloat(salary.twentyPresentEpf).toFixed(2)}</td>
                            <td>{parseFloat(salary.fiftyPresentOnBasic).toFixed(2)}</td>
                            <td>{parseFloat(salary.totalSalary).toFixed(2)}</td>
                        </tr>
                    ))}
                    {/* Total row */}
                    <tr style={{ fontWeight: 'bold' }}>
                        <td colSpan="4">Totals</td>
                        <td>{totals.basicSalary.toFixed(2)}</td>
                        <td>{totals.budgetaryReliefAllowance.toFixed(2)}</td>
                        <td>{totals.noPay.toFixed(2)}</td>
                        <td>{totals.totalForEpf.toFixed(2)}</td>
                        <td>{totals.normalOverTime.toFixed(2)}</td>
                        <td>{totals.doubleOverTime.toFixed(2)}</td>
                        <td>{totals.grossSalary.toFixed(2)}</td>
                        <td>{totals.eightPresentEpf.toFixed(2)}</td>
                        <td>{totals.cashFloat.toFixed(2)}</td>
                        <td>{totals.staffLoan.toFixed(2)}</td>
                        <td>{totals.staffDebtors.toFixed(2)}</td>
                        <td>{totals.salaryAdvance.toFixed(2)}</td>
                        <td>{totals.totalDeduction.toFixed(2)}</td>
                        <td>{totals.balancePay.toFixed(2)}</td>
                        <td>{totals.twelvePresentEpf.toFixed(2)}</td>
                        <td>{totals.threePresentEtf.toFixed(2)}</td>
                        <td>{totals.twentyPresentEpf.toFixed(2)}</td>
                        <td>{totals.fiftyPresentOnBasic.toFixed(2)}</td>
                        <td>{totals.totalSalary.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
});

export default SalarySheetPrint;
