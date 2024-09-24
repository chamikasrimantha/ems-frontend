import React, { useEffect, useRef, useState } from 'react';
import { getAllEmployees } from '../../../services/api/employee.service';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { ButtonBase } from '@mui/material';
import Footer from '../../../components/footer/Footer';
import ReactToPrint from 'react-to-print';
import PrintEmpByEPFNoOrder from '../../admin/admin.employees/PrintEmpByEPFNoOrder'; // Import the print component
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function SuperAdminEmployees() {
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term

    const fetchAllEmployees = async () => {
        const response = await getAllEmployees();
        setEmployees(response.data);
        setSortedEmployees(response.data);
    };

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    const navigate = useNavigate();

    const handleClickOpenGet = () => {
        navigate("/superadmin/employees-by-department");
    };

    const handleViewClick = (id) => {
        console.log('View employee with ID:', id);
    };

    // Function to sort employees by EPF number
    const handleSortByEPF = () => {
        const filtered = employees.filter(employee => employee.epf);
        const sorted = [...filtered].sort((a, b) => a.epf - b.epf);
        setSortedEmployees(sorted);
    };

    // Reference for printing
    const componentRef = useRef();

    const handleClickOpen = () => {
        navigate("/superadmin/add-employee");
    };

    // Function to handle search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter employees based on search term
    const filteredEmployees = sortedEmployees.filter(employee => {
        // Ensure employee properties exist before checking
        return (
            employee.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.epf?.toString().includes(searchTerm) || // Check if EPF is a string
            employee.mobile?.toString().includes(searchTerm) || // Check if mobile is a string
            employee.designation?.toLowerCase().includes(searchTerm.toLowerCase()) // check if designation is a string
        );
    });

    return (
        <div>
            <SuperAdminNavBar />

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
                    <div>
                        <Button
                            style={{ backgroundColor: 'lightsalmon', border: 'none' }}
                            onClick={fetchAllEmployees} // Sort employees by Emp ID when clicked
                        >
                            Sort by Emp ID
                        </Button>

                        <Button
                            style={{ marginLeft: '10px', backgroundColor: 'lightcoral', border: 'none' }}
                            onClick={handleSortByEPF} // Sort employees by EPF when clicked
                        >
                            Sort by EPF No
                        </Button>

                        {/* React-to-print Button */}
                        <ReactToPrint
                            trigger={() => (
                                <Button variant="secondary" style={{ marginLeft: '10px' }}>
                                    Print
                                </Button>
                            )}
                            content={() => componentRef.current} // Pass sorted component for printing
                        />

                        <ButtonBase
                            style={{
                                backgroundColor: '#184D9D',
                                color: 'white',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                marginLeft: '10px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={handleClickOpen}
                        >
                            <AddCircleOutlineIcon style={{ marginRight: '10px' }} />Add new employee
                        </ButtonBase>
                    </div>
                </div>
            </Container>

            {/* Search Bar */}
            <Container fluid>
                <div className="d-flex justify-content-between align-items-center" style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <Form.Group className="">
                        <Form.Control
                            type="text"
                            style={{width: '400px'}}
                            placeholder="Search for an employee . . ."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </div>
            </Container>

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
                        {filteredEmployees.map((employee) => (
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
                                    <Link to={`/superadmin/employees/${employee.id}`} style={{ textDecoration: 'none' }}>
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

            {/* Hidden component for printing */}
            <div style={{ display: 'none' }}>
                <PrintEmpByEPFNoOrder ref={componentRef} employees={sortedEmployees} />
            </div>

            <Footer />
        </div>
    );
}
