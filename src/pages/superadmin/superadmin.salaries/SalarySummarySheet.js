import React, { useEffect, useRef, useState } from 'react';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';
import { Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllSalaries, getSalariesByMonth, updateSalary, deleteSalary } from '../../../services/api/salary.service';
import { getAllMonths } from '../../../services/api/month.service';
import { getEmployeesByDepartments } from '../../../services/api/employee.service';
import { getAllDepartments } from '../../../services/api/department.service';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Box } from '@mui/system';
import ReactToPrint from 'react-to-print';
import SalarySummarySheetPrint from '../../admin/admin.salaries/SalarySummarySheetPrint';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';

export default function SalarySummarySheet() {

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
        backgroundColor: 'white',
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'left',
    };

    const square2Style = {
        backgroundColor: '#0f4c75',
        color: "white",
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

    const gotoCreate = () => {
        navigate('/admin/create-salary');
    };

    return (
        <div>
            <SuperAdminNavBar />

            <div className="mt-3">
                <Container fluid>

                    <Row className="justify-content-center">
                        <Col md={6} style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square2Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Salary summary details</h4>
                                {/* <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={gotoSummary}
                                    >
                                        Get
                                    </Button>
                                </Box> */}
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col md={6} style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square1Style}>
                                {/* <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Get Salary Summary Details</h4> */}
                                <p style={{ fontSize: '1rem' }}>Please select month, department & type and then click on 'Load' button to retrieve salary summary details into the table.</p>
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
                                    className="mb-3"
                                >
                                    <option value="">Select a department</option>
                                    {departments.map(department => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control
                                    as="select"
                                    value={employeeType}
                                    onChange={handleEmployeeTypeChange}
                                >
                                    <option value="">Select employee type</option>
                                    <option value="PROBATION">PROBATION</option>
                                    <option value="PERMANENT">PERMANENT</option>
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
                        <Col md={12} style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Salary Summary Sheet</h4>
                                <p>{departments.find(dept => dept.id === parseInt(selectedDepartment))?.name || ''} - {selectedMonthName} | {employeeType} Staff</p>
                                <Table striped bordered hover responsive className="mt-3" style={{ fontSize: '0.75rem' }}>
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
                                                <td>{parseFloat(salary.noOfDays).toFixed(2)}</td>
                                                <td>{salary.sc}</td>
                                                <td>{parseFloat(salary.travellingAllowance).toFixed(2)}</td>
                                                <td>{parseFloat(salary.specialAllowance).toFixed(2)}</td>
                                                <td>{parseFloat(salary.balancePay).toFixed(2)}</td>
                                                <td>{parseFloat(salary.serviceCharges).toFixed(2)}</td>
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
                                    <SalarySummarySheetPrint
                                        ref={printRef}
                                        salaries={salaries}
                                        monthName={selectedMonthName}
                                        type={employeeType}
                                        departmentName={departments.find(dept => dept.id === parseInt(selectedDepartment))?.name || ''}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <br /><br /><br />
            <Footer />
        </div>
    )
}
