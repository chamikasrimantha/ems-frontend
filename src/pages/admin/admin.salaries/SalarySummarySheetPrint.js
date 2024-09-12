// src/components/SalaryPrint.js

import React from 'react';
import { Table } from 'react-bootstrap';

const SalarySummarySheetPrint = React.forwardRef(({ salaries, monthName, departmentName, type }, ref) => {

    // Calculating the sum for each column
    const totals = salaries.reduce((acc, salary) => {
        acc.noOfDays += parseFloat(salary.noOfDays);
        acc.travellingAllowance += parseFloat(salary.travellingAllowance);
        acc.specialAllowance += parseFloat(salary.specialAllowance);
        acc.balancePay += parseFloat(salary.balancePay);
        acc.serviceCharges += parseFloat(salary.serviceCharges);
        acc.totalSalary += parseFloat(salary.totalSalary);
        return acc;
    }, {
        noOfDays: 0,
        travellingAllowance: 0,
        specialAllowance: 0,
        balancePay: 0,
        serviceCharges: 0,
        totalSalary: 0,
    });

    return (
        <div ref={ref} style={{ width: '100%', padding: '10px' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>Benjarong Pvt Ltd</h4>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>{departmentName} - Salary Sumamry Sheet {monthName} | {type} Staff</h4>
            <Table striped bordered hover size="sm" style={{ width: '100%', fontSize: '12px', wordWrap: 'break-word' }}>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>EPF No</th>
                        <th>No Of Days</th>
                        <th>S/C %</th>
                        <th>Travelling Allowance</th>
                        <th>Special Allowance</th>
                        <th>Balance Pay</th>
                        <th>Service Charges</th>
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
                            <td>{parseFloat(salary.noOfDays).toFixed(2)}</td>
                            <td>{salary.sc}%</td>
                            <td>{parseFloat(salary.travellingAllowance).toFixed(2)}</td>
                            <td>{parseFloat(salary.specialAllowance).toFixed(2)}</td>
                            <td>{parseFloat(salary.balancePay).toFixed(2)}</td>
                            <td>{parseFloat(salary.serviceCharges).toFixed(2)}</td>
                            <td>{parseFloat(salary.totalSalary).toFixed(2)}</td>
                        </tr>
                    ))}
                    {/* Total row */}
                    <tr style={{ fontWeight: 'bold' }}>
                        <td colSpan="4">Totals</td>
                        <td>{totals.noOfDays.toFixed(2)}</td>
                        <td> N/A </td>
                        <td>{totals.travellingAllowance.toFixed(2)}</td>
                        <td>{totals.specialAllowance.toFixed(2)}</td>
                        <td>{totals.balancePay.toFixed(2)}</td>
                        <td>{totals.serviceCharges.toFixed(2)}</td>
                        <td>{totals.totalSalary.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
});

export default SalarySummarySheetPrint;
