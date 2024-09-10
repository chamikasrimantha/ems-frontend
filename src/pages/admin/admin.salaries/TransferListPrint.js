// src/components/SalaryPrint.js

import React from 'react';
import { Table } from 'react-bootstrap';

const TransferListPrint = React.forwardRef(({ salaries, monthName, departmentName }, ref) => (
    <div ref={ref} style={{ width: '100%', padding: '10px' }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>Benjarong Pvt Ltd</h4>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>{departmentName} - Salary transfer sheet {monthName}</h4>
        <Table bordered hover size="sm" style={{ width: '100%', fontSize: '12px', wordWrap: 'break-word' }}>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Bank</th>
                    <th>Account No</th>
                    <th>Amount</th>
                    <th>Mobile No</th>
                </tr>
            </thead>
            <tbody>
                {salaries.map(salary => (
                    <tr key={salary.id}>
                        <td>{salary.employeeEntity.id}</td>
                        <td>{salary.employeeEntity.firstname} {salary.employeeEntity.lastname}</td>
                        <td>{salary.employeeEntity.bankname}</td>
                        <td>{salary.employeeEntity.bank}</td>
                        <td>{parseFloat(salary.totalSalary).toFixed(2)}</td>
                        <td>{salary.employeeEntity.mobile}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
));

export default TransferListPrint;
