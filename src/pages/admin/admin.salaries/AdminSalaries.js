import React, { useState, useEffect, useRef } from 'react';
import { getAllSalaries, getSalariesByMonth } from '../../../services/api/salary.service';
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

    const filterSalariesByDepartment = (monthSalaries, employeesList) => {
        const employeeIds = employeesList.map(emp => emp.id);
        const filteredSalaries = monthSalaries.filter(salary => employeeIds.includes(salary.employeeEntity.id));
        setSalaries(filteredSalaries);
    };

    const gotoCreate = () => {
        navigate('/admin/create-salary');
    };

    return (
        <div>
            <AdminNavBar />

            <div className="mt-4">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '80%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Salary details</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="mt-2">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '80%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Create new salary sheet</h4>
                                <p style={{ fontSize: '1rem' }}>Click 'Create' to create a new salary sheet.</p>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={gotoCreate}
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '80%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Select Month and Department</h4>
                                <p style={{ fontSize: '1rem' }}>Please select month & department and then click on 'Load' button to get salary details.</p>
                                <Form.Control
                                    as="select"
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                    className="mb-3"
                                >
                                    <option value="">Select a month</option>
                                    {months.map(month => (
                                        <option key={month.id} value={month.id}>
                                            {month.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control
                                    as="select"
                                    value={selectedDepartment}
                                    onChange={handleDepartmentChange}
                                >
                                    <option value="">Select a department</option>
                                    {departments.map(department => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={fetchSalariesByMonthAndDepartment}
                                        className="mt-3"
                                    >
                                        Load
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col md={12} style={{ width: isMobile ? '100%' : '80%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Salary Sheet</h4>
                                <p>{departments.find(dept => dept.id === parseInt(selectedDepartment))?.name || ''} - {selectedMonthName}</p>
                                <Table striped bordered hover responsive className="mt-3" style={{ fontSize: '0.75rem' }}>
                                    <thead>
                                        <tr>
                                            <th>Employee ID</th>
                                            <th>Employee Name</th>
                                            <th>Department</th>
                                            <th>EPF No</th>
                                            <th>Basic Salary</th>
                                            <th>Budgetary Relief Allowance</th>
                                            <th>No Pay</th>
                                            <th>Total For EPF</th>
                                            <th>Normal Overtime</th>
                                            <th>Double Overtime</th>
                                            <th>Gross Salary</th>
                                            <th>8% EPF</th>
                                            <th>Cash Float</th>
                                            <th>Staff Loan</th>
                                            <th>Staff Debtors</th>
                                            <th>Salary Advance</th>
                                            <th>Total Deduction</th>
                                            <th>Balance Pay</th>
                                            <th>12% EPF</th>
                                            <th>3% ETF</th>
                                            <th>20% EPF</th>
                                            <th>50% on Basic</th>
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
                                                <td>{parseFloat(salary.basicSalary).toFixed(2)}</td>
                                                <td>{parseFloat(salary.budgetaryReliefAllowance).toFixed(2)}</td>
                                                <td>{parseFloat(salary.noPay).toFixed(2)}</td>
                                                <td>{parseFloat(salary.totalForEpf).toFixed(2)}</td>
                                                <td>{parseFloat((((salary.basicSalary + salary.budgetaryReliefAllowance) / 240) * salary.normalOverTime) * 1.5).toFixed(2)}</td>
                                                <td>{parseFloat(salary.doubleOverTime).toFixed(2)}</td>
                                                <td>{parseFloat(salary.grossSalary).toFixed(2)}</td>
                                                <td>{parseFloat(salary.eightPresentEpf).toFixed(2)}</td>
                                                <td>{parseFloat(salary.cashFloat).toFixed(2)}</td>
                                                <td>{parseFloat(salary.staffLoan).toFixed(2)}</td>
                                                <td>{parseFloat(salary.staffDebtors).toFixed(2)}</td>
                                                <td>{parseFloat(salary.salaryAdvance).toFixed(2)}</td>
                                                <td>{parseFloat(salary.totalDetuction).toFixed(2)}</td>
                                                <td>{parseFloat(salary.balancePay).toFixed(2)}</td>
                                                <td>{parseFloat(salary.twelvePresentEpf).toFixed(2)}</td>
                                                <td>{parseFloat(salary.threePresentEtf).toFixed(2)}</td>
                                                <td>{parseFloat(salary.twentyPresentEpf).toFixed(2)}</td>
                                                <td>{parseFloat(salary.fiftyPresentOnBasic).toFixed(2)}</td>
                                                <td>{parseFloat(salary.totalSalary).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <ReactToPrint
                                    trigger={() => <Button className="mt-3" variant="contained" color="primary">Print</Button>}
                                    content={() => printRef.current}
                                    pageStyle="@media print { @page { size: landscape; } body { margin: 0; } }"
                                />
                                {/* <ReactToPrint
                                    trigger={() => (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="mt-3"
                                        >
                                            Print Salary Sheet
                                        </Button>
                                    )}
                                    content={() => printRef.current}
                                /> */}
                                <div style={{ display: 'none' }}>
                                    <SalarySheetPrint
                                        ref={printRef}
                                        salaries={salaries}
                                        monthName={selectedMonthName}
                                        departmentName={departments.find(dept => dept.id === parseInt(selectedDepartment))?.name || ''}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </div>
    );
}
