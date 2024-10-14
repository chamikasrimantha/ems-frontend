// src/components/SalaryPrint.js

import React from 'react';
import { Table } from 'react-bootstrap';

const SalarySummarySheetPrint = React.forwardRef(({ salaries, monthName, departmentName, type }, ref) => {

    // Function to format numbers with commas
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

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
            <Table bordered hover size="sm" style={{ borderCollapse: 'collapse', border: '1px solid #000', width: '100%', fontSize: '12px', wordWrap: 'break-word' }}>
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
                            <td>{formatNumber(salary.noOfDays)}</td>
                            <td>{salary.sc}%</td>
                            <td>{formatNumber(salary.travellingAllowance)}</td>
                            <td>{formatNumber(salary.specialAllowance)}</td>
                            <td>{formatNumber(salary.balancePay)}</td>
                            <td>{formatNumber(salary.serviceCharges)}</td>
                            <td>{formatNumber(salary.totalSalary)}</td>
                        </tr>
                    ))}
                    {/* Total row */}
                    <tr style={{ fontWeight: 'bold' }}>
                        <td colSpan="6">Totals</td>
                        <td>{formatNumber(totals.travellingAllowance)}</td>
                        <td>{formatNumber(totals.specialAllowance)}</td>
                        <td>{formatNumber(totals.balancePay)}</td>
                        <td>{formatNumber(totals.serviceCharges)}</td>
                        <td>{formatNumber(totals.totalSalary)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
});

export default SalarySummarySheetPrint;
