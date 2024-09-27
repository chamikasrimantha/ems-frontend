import React from 'react';
import { Table } from 'react-bootstrap';

const PrintEmpByEPFNoOrder = React.forwardRef((props, ref) => {
    const { employees } = props; // Receive employees as props

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    return (
        <div ref={ref} style={{ width: '100%', padding: '10px' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'left' }}>Employees </h4>
            <Table bordered hover size="sm" style={{ width: '100%', fontSize: '12px', wordWrap: 'break-word' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>EPF</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Phone No</th>
                        <th>Basic</th>
                        <th>Bud. Rel. Allow.</th>
                        <th>Special Allowance</th>
                        <th>Travelling Allowance</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.epf}</td>
                            <td style={{ textAlign: 'left' }}>{`${employee.firstname} ${employee.lastname}`}</td>
                            <td style={{ textAlign: 'left' }}>{employee.designation}</td>
                            <td>{employee.mobile}</td>
                            <td style={{ textAlign: 'right' }}>{formatNumber(employee.basicSalary)}</td>
                            <td style={{ textAlign: 'right' }}>{formatNumber(employee.budgetaryReliefAllowance)}</td>
                            <td style={{ textAlign: 'right' }}>{formatNumber(employee.specialAllowance)}</td>
                            <td style={{ textAlign: 'right' }}>{formatNumber(employee.travellingAllowance)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
});

export default PrintEmpByEPFNoOrder;
