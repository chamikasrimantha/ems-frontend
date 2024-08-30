import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../../../services/api/employee.service';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Table } from 'react-bootstrap';
import { ButtonBase } from '@mui/material';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';

export default function AdminEmployees() {

    const [employees, setEmployees] = useState([]);

    const fetchAllEmployees = async () => {
        const response = await getAllEmployees();
        setEmployees(response.data);
        console.log(response);
    }

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    const navigate = useNavigate();

    const handleClickOpenGet = () => {
        navigate("/admin/employees-by-department");
    }

    const handleViewClick = (id) => {
        // Handle the view button click
        console.log('View employee with ID:', id);
    };

    return (
        <div>
            <AdminNavBar />

            {/* Top */}
            <Container fluid>
                <div className="d-flex justify-content-between align-items-center mt-4" style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <div>
                        <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Get employees by department</h4>
                        <p style={{ textAlign: 'left' }}>Click on Get employee by department button to see employee details by department</p>
                    </div>
                    <div>
                        <ButtonBase
                            style={{
                                backgroundColor: '#184D9D',
                                color: 'white',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={handleClickOpenGet}
                        >
                            Get employees by department
                        </ButtonBase>
                    </div>
                </div>
            </Container>

            <hr style={{ marginLeft: '6%', marginRight: '6%' }} />

            {/* Top */}
            <Container fluid>
                <div className="d-flex justify-content-between align-items-center mt-4" style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <div>
                        <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>View employees</h4>
                        <p style={{ textAlign: 'left' }}>Click on view button to view employee details</p>
                    </div>
                    {/* <div>
                        <ButtonBase
                            style={{
                                backgroundColor: '#184D9D',
                                color: 'white',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={handleClickOpen}
                        >
                            <AddCircleOutlineIcon style={{ marginRight: '10px' }} />Add new employee
                        </ButtonBase>
                    </div> */}
                </div>
            </Container>

            <Container>
                <Table striped bordered hover style={{ marginBottom: '30px', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{`${employee.firstname} ${employee.lastname}`}</td>
                                <td>{employee?.departmentEntity?.name}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>
                                    <Link to={`/admin/employees/${employee.id}`} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleViewClick(employee.id)}
                                        >
                                            View
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <br /><br /><br />

            <Footer />

        </div>
    )
}
