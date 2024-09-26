import React, { useState, useEffect, useRef } from 'react';
import { getSalariesByMonth, deleteSalary } from '../../../services/api/salary.service';
import { getAllMonths } from '../../../services/api/month.service';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';
import { Col, Container, Row, Form, Table } from 'react-bootstrap';
import { Button, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import SalarySheetEPFNoOrderPrint from '../../admin/admin.salaries/SalarySheetEPFNoOrderPrint';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';

export default function SalarySheetByEPFNoOrder() {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [months, setMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedMonthName, setSelectedMonthName] = useState('');
    const [salaries, setSalaries] = useState([]);
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
    }, []);

    const fetchAllMonths = async () => {
        const response = await getAllMonths();
        setMonths(response.data);
    };

    const fetchSalariesByMonth = async () => {
        if (selectedMonth) {
            const salaryResponse = await getSalariesByMonth(selectedMonth);
            // Filter out only "PERMANENT" employees
            const permanentSalaries = salaryResponse.data.filter(salary => salary.employeeEntity.type === 'PERMANENT');
            // Sort the filtered salaries by EPF number (ascending order)
            const sortedSalaries = permanentSalaries.sort((a, b) => a.employeeEntity.epf - b.employeeEntity.epf);
            setSalaries(sortedSalaries);
        }
    };

    const handleMonthChange = (e) => {
        const monthId = e.target.value;
        setSelectedMonth(monthId);
        const selectedMonthObj = months.find(month => month.id.toString() === monthId);
        setSelectedMonthName(selectedMonthObj ? selectedMonthObj.name : '');
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

    return (
        <div>
            <SuperAdminNavBar />

            <div className="mt-3">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={square1Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Salary sheet details by EPF no order</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col md={6} style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={squareStyle}>
                                <p style={{ fontSize: '1rem' }}>Please select month and click on 'Load' button to retrieve salary details into the table.</p>
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
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={fetchSalariesByMonth}
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
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Salary Sheet By EPF No Order</h4>
                                <p>{selectedMonthName} | EPF Number Order</p>
                                <Table striped bordered hover responsive className="mt-3" style={{ fontSize: '0.75rem' }}>
                                    <thead>
                                        <tr>
                                            <th>Employee ID</th>
                                            <th>Employee Name</th>
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
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salaries.map(salary => (
                                            <tr key={salary.id}>
                                                <td>{salary.employeeEntity.id}</td>
                                                <td>{salary.employeeEntity.firstname} {salary.employeeEntity.lastname}</td>
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
                                                <td><Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleDelete(salary.id)}
                                                    className="ml-2"
                                                >
                                                    Delete
                                                </Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <ReactToPrint
                                    trigger={() => <Button className="mt-3" variant="contained" color="primary">Print</Button>}
                                    content={() => printRef.current}
                                    pageStyle="@media print { @page { size: landscape; } body { margin: 0; } }"
                                />
                                <div style={{ display: 'none' }}>
                                    <SalarySheetEPFNoOrderPrint
                                        ref={printRef}
                                        salaries={salaries}
                                        monthName={selectedMonthName}
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
