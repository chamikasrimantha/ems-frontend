import React, { forwardRef } from 'react';
import { Container, Table } from 'react-bootstrap';

const AdminPrintEmployeeDetails = forwardRef(({ departments, selectedDepartments, employees }, ref) => {
    const getDepartmentNames = () => {
        // Ensure this function returns correct department names
        const selectedDeptIds = selectedDepartments.map(id => parseInt(id)); // Convert IDs to integers if needed
        return departments
            .filter(dept => selectedDeptIds.includes(dept.id))
            .map(dept => dept.name)
            .join(', ');
    };

    return (
        <div ref={ref} style={{ width: '100%', padding: '10px' }}>
            <Container fluid>
                <h2 style={{ fontSize: '1rem', textAlign: 'left', marginTop: '20px' }}>
                    Employees of {getDepartmentNames()}
                </h2>
                <Table bordered hover size="sm" style={{ width: '100%', fontSize: '12px', wordWrap: 'break-word' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Email</th>
                            <th>NIC</th>
                            <th>Phone No</th>
                            <th>DOB</th>
                            <th>WEF</th>
                            <th>EPF</th>
                            <th>Type</th>
                            <th>Basic Salary</th>
                            <th>Special Allowance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{`${employee.firstname} ${employee.lastname}`}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.nic}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.dob}</td>
                                    <td>{employee.wef}</td>
                                    <td>{employee.epf}</td>
                                    <td>{employee.type}</td>
                                    <td>{employee.basicSalary}</td>
                                    <td>{employee.specialAllowance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                    No employees to display
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
});

export default AdminPrintEmployeeDetails;
