// src/components/SalaryPrint.js

import React from 'react';
import { Table } from 'react-bootstrap';

const TransferListPrint = React.forwardRef(({ salaries, monthName, departmentName }, ref) => {

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    // Calculating the sum for each column
    const totals = salaries.reduce((acc, salary) => {
        acc.totalSalary += parseFloat(salary.totalSalary);
        return acc;
    }, {
        totalSalary: 0,
    });

    return (
        <div ref={ref} style={{ width: '100%', padding: '10px' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>Benjarong Pvt Ltd</h4>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>{departmentName} - Salary transfer sheet {monthName}</h4>
            <Table bordered hover size="sm" style={{ borderCollapse: 'collapse', border: '1px solid #000', width: '100%', fontSize: '12px', wordWrap: 'break-word' }}>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Bank</th>
                        <th>Account No</th>
                        <th>Mobile No</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {salaries.map(salary => (
                        <tr key={salary.id}>
                            <td>{salary.employeeEntity.id}</td>
                            <td>{salary.employeeEntity.firstname} {salary.employeeEntity.lastname}</td>
                            <td>{salary.employeeEntity.bankname}</td>
                            <td>{salary.employeeEntity.bank}</td>
                            <td>{salary.employeeEntity.mobile}</td>
                            <td style={{ textAlign: 'right' }}>{formatNumber(salary.totalSalary)}</td>
                        </tr>
                    ))}
                    {/* Total row */}
                    <tr style={{ fontWeight: 'bold' }}>
                        <td colSpan="5">Totals</td>
                        <td style={{textAlign: 'right'}}>{formatNumber(totals.totalSalary)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
});

export default TransferListPrint;
