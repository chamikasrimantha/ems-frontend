import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { ButtonBase, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import Footer from '../../../components/footer/Footer';
import { getEmployeesByDepartments } from '../../../services/api/employee.service';
import { getAllDepartments } from '../../../services/api/department.service';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import AdminPrintEmployeeDetails from './AdminPrintEmployeeDetails';
import AdminNavBar from '../../../components/navbar/AdminNavBar';

export default function AdminGetEmployeesByDepartment() {

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };
    
    const [departments, setDepartments] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const componentRef = useRef();

    const fetchAllDepartments = async () => {
        const response = await getAllDepartments();
        setDepartments(response.data);
    };

    const fetchEmployeesByDepartment = async (departmentIds) => {
        const response = await getEmployeesByDepartments(departmentIds);
        setEmployees(response.data);
    };

    useEffect(() => {
        fetchAllDepartments();
    }, []);

    useEffect(() => {
        if (selectedDepartments.length > 0) {
            fetchEmployeesByDepartment(selectedDepartments);
        } else {
            setEmployees([]);
        }
    }, [selectedDepartments]);

    const handleDepartmentChange = (event) => {
        const departmentId = event.target.value;
        const updatedSelection = event.target.checked
            ? [...selectedDepartments, departmentId]
            : selectedDepartments.filter(id => id !== departmentId);
        console.log('Selected Departments:', updatedSelection);
        setSelectedDepartments(updatedSelection);
    };

    return (
        <div>
            <AdminNavBar />

            {/* Top */}
            <Container fluid>
                <div className="d-flex justify-content-between align-items-center mt-4" style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <div>
                        <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Filter employees by department</h4>
                    </div>
                    <div>
                        <ReactToPrint
                            trigger={() => (
                                <ButtonBase
                                    style={{
                                        backgroundColor: '#184D9D',
                                        color: 'white',
                                        borderRadius: '8px',
                                        padding: '8px 12px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Print
                                </ButtonBase>
                            )}
                            content={() => componentRef.current}
                        />
                    </div>
                </div>
            </Container>

            <Container fluid>
                <FormGroup row style={{ marginLeft: '5%', marginRight: '5%', marginTop: '10px' }}>
                    {departments.map((department) => (
                        <FormControlLabel
                            key={department.id}
                            control={
                                <Checkbox
                                    value={department.id}
                                    onChange={handleDepartmentChange}
                                    color="primary"
                                />
                            }
                            label={department.name}
                        />
                    ))}
                </FormGroup>
            </Container>

            {/* Table display and printing */}
            <Container>
                <Table striped bordered hover style={{ marginBottom: '30px', marginTop: '20px' }}>
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
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.epf}</td>
                                    <td style={{ textAlign: 'left' }}>{`${employee.firstname} ${employee.lastname}`}</td>
                                    <td style={{ textAlign: 'left' }}>{employee.designation}</td>
                                    <td>{employee.mobile}</td>
                                    <td style={{ textAlign: 'right' }}>{formatNumber(employee.basicSalary)}</td>
                                    <td style={{ textAlign: 'right' }}>{formatNumber(employee.budgetaryReliefAllowance)}</td>
                                    <td style={{ textAlign: 'right' }}>{formatNumber(employee.specialAllowance)}</td>
                                    <td>
                                        <Link to={`/admin/employees/${employee.id}`} style={{ textDecoration: 'none' }}>
                                            <Button variant="primary">View</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>
                                    No employees to display
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {/* Print content */}
                <div style={{ display: 'none' }}>
                    <AdminPrintEmployeeDetails
                        ref={componentRef}
                        departments={departments}
                        selectedDepartments={selectedDepartments}
                        employees={employees}
                    />
                </div>
            </Container>

            <Footer />
        </div>
    );
}
