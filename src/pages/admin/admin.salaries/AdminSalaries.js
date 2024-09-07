import React, { useState, useEffect, useRef } from 'react';
import { getAllSalaries, getSalariesByMonth, updateSalary, deleteSalary } from '../../../services/api/salary.service';
import { getAllMonths } from '../../../services/api/month.service';
import { getEmployeesByDepartments } from '../../../services/api/employee.service';
import { getAllDepartments } from '../../../services/api/department.service';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';
import { Col, Container, Row, Form, Table } from 'react-bootstrap';
import { Button, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import SalarySheetPrint from './SalarySheetPrint';

export default function AdminSalaries() {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [months, setMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedMonthName, setSelectedMonthName] = useState('');
    const [salaries, setSalaries] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [employees, setEmployees] = useState([]);
    const [employeeType, setEmployeeType] = useState('');
    const navigate = useNavigate();

    const printRef = useRef();

    const squareStyle = {
        backgroundColor: 'white',
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'left',
    };

    const square1Style = {
        backgroundColor: '#0f4c75',
        color: "white",
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'left',
    };

    const square2Style = {
        backgroundColor: 'lightgrey',
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'left',
    };

    useEffect(() => {
        fetchAllMonths();
        fetchAllDepartments();
    }, []);

    const fetchAllMonths = async () => {
        const response = await getAllMonths();
        setMonths(response.data);
    };

    const fetchAllDepartments = async () => {
        const response = await getAllDepartments();
        setDepartments(response.data);
    };

    const fetchSalariesByMonthAndDepartment = async () => {
        if (selectedMonth && selectedDepartment) {
            const salaryResponse = await getSalariesByMonth(selectedMonth);
            const employeeResponse = await getEmployeesByDepartments(selectedDepartment);
            filterSalariesByDepartment(salaryResponse.data, employeeResponse.data);
        }
    };

    const handleMonthChange = (e) => {
        const monthId = e.target.value;
        setSelectedMonth(monthId);
        const selectedMonthObj = months.find(month => month.id.toString() === monthId);
        setSelectedMonthName(selectedMonthObj ? selectedMonthObj.name : '');
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleEmployeeTypeChange = (e) => {
        setEmployeeType(e.target.value); // Update state on type selection
    };

    const filterSalariesByDepartment = (monthSalaries, employeesList) => {
        const employeeIds = employeesList.filter(emp => emp.type === employeeType).map(emp => emp.id);
        const filteredSalaries = monthSalaries.filter(salary => employeeIds.includes(salary.employeeEntity.id));
        setSalaries(filteredSalaries);
    };

    const handleDelete = async (salaryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            const response = await deleteSalary(salaryId);
            setSalaries(salaries.filter(salary => salary.id !== salaryId));
            if (response.status === 200) {
                alert("Salary deleted successfully");
                navigate('/admin/salaries');
            } else {
                alert("Failed to delete salary");
            }
        }
    };

    const gotoCreate = () => {
        navigate('/admin/create-salary');
    };

    const gotoSummary = () => {
        navigate('/admin/salaries/summary');
    }

    const gotoSheet = () => {
        navigate('/admin/salaries/sheet');
    }

    const gotoSlips = () => {
        navigate('/admin/salaries/slips');
    }

    return (
        <div>
            <AdminNavBar />

            <div className="mt-3">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square1Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>+ Create new salary sheet</h4>
                                <p style={{ fontSize: '1rem' }}>Click 'Create' to create a new salary sheet.</p>
                                <Box>
                                    <Button
                                        variant="contained"
                                        style={{backgroundColor: 'white', color: 'black'}}
                                        onClick={gotoCreate}
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square2Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>+ Get salary sheet details</h4>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={gotoSheet}
                                    >
                                        Get
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square2Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>+ Get salary summary details</h4>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={gotoSummary}
                                    >
                                        Get
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square2Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>+ Get salary slips</h4>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={gotoSlips}
                                    >
                                        Get
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square2Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>+ Get allowance slips</h4>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={gotoSlips}
                                    >
                                        Get
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square2Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>+ Get salary transfer list</h4>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={gotoSlips}
                                    >
                                        Get
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>

            <Footer />
        </div>
    );
}
