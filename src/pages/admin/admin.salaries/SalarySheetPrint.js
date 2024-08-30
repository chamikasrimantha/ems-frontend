// src/components/SalaryPrint.js

import React from 'react';
import { Table } from 'react-bootstrap';

const SalarySheetPrint = React.forwardRef(({ salaries, selectedMonthName }, ref) => (
    <div ref={ref} style={{ width: '100%', padding: '10px' }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>Benjarong Pvt Ltd - Salary Sheet {selectedMonthName}</h4>
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
                        <td>{parseFloat(salary.normalOverTime).toFixed(2)}</td>
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
            </tbody>
        </Table>
    </div>
));

export default SalarySheetPrint;
