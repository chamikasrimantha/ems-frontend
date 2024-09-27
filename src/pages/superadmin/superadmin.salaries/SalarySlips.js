import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../../components/footer/Footer';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllSalaries, getSalariesByMonth, updateSalary, deleteSalary } from '../../../services/api/salary.service';
import { getAllMonths } from '../../../services/api/month.service';
import { getEmployeesByDepartments } from '../../../services/api/employee.service';
import { getAllDepartments } from '../../../services/api/department.service';
import ReactToPrint from 'react-to-print';
import SlipPrint from '../../admin/admin.salaries/SlipPrint';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';

export default function SalarySlips() {

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    const isMobile = useMediaQuery('(max-width: 600px)');
    const [months, setMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedMonthName, setSelectedMonthName] = useState('');
    const [salaries, setSalaries] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [employees, setEmployees] = useState([]);
    const [employeeType, setEmployeeType] = useState('');
    const [apiitValue, setApiitValue] = useState({});
    const [dateValue, setDateValue] = useState({});
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

    const handleApiitChange = (salaryId, value) => {
        setApiitValue(prevState => ({
            ...prevState,
            [salaryId]: parseFloat(value) || 0,
        }));
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDateValue(selectedDate);  // Set global date value for all salaries
    };

    const calculateTotalDeduction = (salary) => {
        const apiit = apiitValue[salary.id] || 0;
        return (salary.totalDetuction) + apiit;
    };

    const calculateTotalAddition = (salary) => {
        return ((((salary.basicSalary + salary.budgetaryReliefAllowance) / 240) * salary.normalOverTime) * 1.5) + (salary.doubleOverTime);
    };

    const calculateNetSalary = (salary) => {
        const totalDeduction = calculateTotalDeduction(salary);
        return (salary.grossSalary) - totalDeduction;
    };

    return (
        <div>
            <SuperAdminNavBar />

            <div className="mt-3">
                <Container fluid>

                    <Row className="justify-content-center">
                        <Col md={6} style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square1Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Salary slip details</h4>
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

                </Container>
            </div>

            <div className="mt-3">
                <Container fluid>

                    <Row className="justify-content-center mt-3">
                        <Col md={6} style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={squareStyle}>
                                {/* <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Get Salary Summary Details</h4> */}
                                <p style={{ fontSize: '1rem' }}>Please select month, date, department & type and then click on 'Load' button to retrieve salary slips.</p>
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
                                    type="date"
                                    value={dateValue || ''}
                                    onChange={handleDateChange}
                                    className="mb-3"
                                />
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
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Salary slips</h4>
                                <p>{departments.find(dept => dept.id === parseInt(selectedDepartment))?.name || ''} - {selectedMonthName} | {employeeType} Staff</p>
                                {salaries.map(salary => (
                                    <Table striped bordered hover responsive className="mt-3" style={{ fontSize: '0.85rem', border: '2px solid black', width: '80%', margin: '0 auto', marginBottom: '40px' }}>
                                        <thead>
                                            <tr>
                                                <th colSpan="4" style={{ backgroundColor: '', color: 'black', textAlign: 'left', fontSize: '1.2rem', padding: '10px' }}>
                                                    Benjarong Pvt Ltd - {departments.find(dept => dept.id === parseInt(selectedDepartment))?.name || ''}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '10px', fontWeight: 'bold' }}>Employee Name:</td>
                                                <td>{salary.employeeEntity.surname} {salary.employeeEntity.firstname} {salary.employeeEntity.lastname}</td>
                                                <td style={{ padding: '10px', fontWeight: 'bold' }}>Date:</td>
                                                <td>
                                                    <Form.Control
                                                        type="date"
                                                        style={{ height: '30px' }}
                                                        value={dateValue || ''}
                                                        readOnly
                                                    // className="mb-3"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '10px', fontWeight: 'bold' }}>EPF No:</td>
                                                <td>{salary.employeeEntity.epf}</td>
                                                <td style={{ padding: '10px', fontWeight: 'bold' }}>Month:</td>
                                                <td>{salary.monthEntity.name}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                <td style={{ padding: '10px', fontWeight: '' }}>Basic Salary:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.employeeEntity.basicSalary)}</td>
                                                <td colSpan="2" style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>Additions</td>
                                                {/* <td>[Additions]</td> */}
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '10px', fontWeight: '' }}>Budgetary Relief Allowance:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.employeeEntity.budgetaryReliefAllowance)}</td>
                                                <td style={{ padding: '10px', fontWeight: '' }}>Normal OT:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber((((salary.basicSalary + salary.budgetaryReliefAllowance) / 240) * salary.normalOverTime) * 1.5)}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                <td style={{ padding: '10px', fontWeight: '' }}>No Pay:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.noPay)}</td>
                                                <td style={{ padding: '10px', fontWeight: '' }}>Double OT:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.doubleOverTime)}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '10px', fontWeight: 'bold' }}>(A) Total Salary:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.totalForEpf)}</td>
                                                <td style={{ padding: '10px', fontWeight: 'bold' }}>(B) Total Additions:</td>
                                                <td colSpan="2" style={{textAlign: 'right'}}>{formatNumber(calculateTotalAddition(salary))}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ padding: '10px', fontWeight: 'bold' }}>(A+B) Gross Pay:</td>
                                                <td colSpan="2" style={{textAlign: 'right'}}>{formatNumber(salary.grossSalary)}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                <td colSpan="4" style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>Less (Deductions)</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '10px', fontWeight: '' }}>EPF 8%</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.eightPresentEpf)}</td>
                                                <td style={{ padding: '10px', fontWeight: '' }}>APIIT:</td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        style={{ height: '30px' }}
                                                        value={apiitValue[salary.id] || 0.00}
                                                        onChange={(e) => handleApiitChange(salary.id, e.target.value)}
                                                    // className="mb-3"
                                                    />
                                                </td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                <td style={{ padding: '10px', fontWeight: '' }}>Salary Advance:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.salaryAdvance)}</td>
                                                <td style={{ padding: '10px', fontWeight: '' }}>Loan:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.staffLoan)}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                <td style={{ padding: '10px', fontWeight: '' }}>Cash Float:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.cashFloat)}</td>
                                                <td style={{ padding: '10px', fontWeight: '' }}>Staff Debtors:</td>
                                                <td style={{textAlign: 'right'}}>{formatNumber(salary.staffDebtors)}</td>
                                            </tr>
                                            {/* <tr>
                                            <td style={{ padding: '10px', fontWeight: '' }}>Stamps:</td>
                                            <td></td>
                                            <td style={{ padding: '10px', fontWeight: '' }}>Other Deduction:</td>
                                            <td></td>
                                        </tr> */}
                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                <td colSpan="2" style={{ padding: '10px', fontWeight: 'bold' }}>(C) Total Deduction:</td>
                                                <td colSpan="2" style={{textAlign: 'right'}}>{formatNumber(calculateTotalDeduction(salary))}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                <td colSpan="2" style={{ padding: '10px', fontWeight: 'bold' }}>(A+B-C) Net Salary:</td>
                                                <td colSpan="2" style={{textAlign: 'right'}}>{formatNumber(calculateNetSalary(salary))}</td>
                                            </tr>
                                            <tr style={{ height: '20px' }}>
                                                <td colSpan="2">
                                                    <td style={{ padding: '10px', textAlign: 'left' }}>
                                                        EPF 12%: {parseFloat(salary.twelvePresentEpf).toFixed(2)}
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'left' }}>
                                                        EPF 20%: {parseFloat(salary.twentyPresentEpf).toFixed(2)}
                                                    </td>
                                                    <td style={{ padding: '10px', textAlign: 'left' }}>
                                                        ETF 3%: {parseFloat(salary.threePresentEtf).toFixed(2)}
                                                    </td>
                                                </td>

                                                <td colSpan="2" style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                                                    Signature: ____________________________________
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                ))}
                                <br />
                                <ReactToPrint
                                    trigger={() => <Button variant="contained" color="primary">Print Salary Slips</Button>}
                                    content={() => printRef.current}
                                    pageStyle={`@page { margin: 20mm !important; }`}
                                />
                                <div style={{ display: 'none' }}>
                                    <SlipPrint departmentName={departments.find(dept => dept.id === parseInt(selectedDepartment))?.name || ''} salaries={salaries.map(salary => ({
                                        ...salary,
                                        dateValue: dateValue || '',
                                        apiitValue: apiitValue[salary.id] || 0,
                                        totalDeduction: calculateTotalDeduction(salary),
                                        totalAddition: calculateTotalAddition(salary),
                                        netSalary: calculateNetSalary(salary),
                                    }))} ref={printRef} />
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
