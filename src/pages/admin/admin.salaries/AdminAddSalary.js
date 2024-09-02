import React, { useEffect, useState } from 'react';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { getAllSalaries, saveSalary } from '../../../services/api/salary.service';
import { getAllEmployees, getEmployeeById } from '../../../services/api/employee.service';
import { addMonth, getAllMonths } from '../../../services/api/month.service';
import { getAttendancesByEmployeeAndDateRange } from '../../../services/api/attendance.service';

export default function AdminAddSalary() {

    const [employees, setEmployees] = useState([]);
    const [months, setMonths] = useState([]);
    const [employee, setEmployee] = useState();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [open, setOpen] = useState(false);

    const [salaryDetails, setSalaryDetails] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [monthId, setMonthId] = useState("");

    const handleDateChange = (e, type) => {
        if (type === "start") setStartDate(e.target.value);
        else setEndDate(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonthId(e.target.value);
    };

    const handleInputChange = (index, field, value) => {
        const updatedSalaryDetails = [...salaryDetails];
        updatedSalaryDetails[index][field] = parseFloat(value) || 0;

        const basicSalary = parseFloat(updatedSalaryDetails[index].basicSalary) || 0;
        const budgetaryReliefAllowance = parseFloat(updatedSalaryDetails[index].budgetaryReliefAllowance) || 0;
        const noPayDays = parseFloat(updatedSalaryDetails[index].noPayDays) || 0;
        const normalOverTime = parseFloat(updatedSalaryDetails[index].normalOverTime) || 0;
        const cashFloat = parseFloat(updatedSalaryDetails[index].cashFloat) || 0;
        const staffLoan = parseFloat(updatedSalaryDetails[index].staffLoan) || 0;
        const staffDebtors = parseFloat(updatedSalaryDetails[index].staffDebtors) || 0;
        const salaryAdvance = parseFloat(updatedSalaryDetails[index].salaryAdvance) || 0;
        const doubleOverTime = parseFloat(updatedSalaryDetails[index].doubleOverTime) || 0;

        const noPay = ((basicSalary + budgetaryReliefAllowance) / 30) * noPayDays;
        const totalForEpf = (basicSalary + budgetaryReliefAllowance) - noPay;
        const normalOverTimeCash = (((basicSalary + budgetaryReliefAllowance) / 240) * normalOverTime) * 1.5;
        const grossSalary = (totalForEpf + normalOverTimeCash) + doubleOverTime;

        const employeeType = updatedSalaryDetails[index].type;
        const eightPresentEpf = employeeType === 'PERMANENT' ? totalForEpf * 0.08 : 0.00;
        const twelvePresentEpf = employeeType === 'PERMANENT' ? totalForEpf * 0.12 : '0';
        const threePresentEtf = employeeType === 'PERMANENT' ? totalForEpf * 0.03 : '0';
        const twentyPresentEpf = employeeType === 'PERMANENT' ? totalForEpf * 0.2 : '0';
        const fiftyPresentOnBasic = basicSalary * 0.50;
        const totalDetuction = (
            eightPresentEpf +
            cashFloat +
            staffLoan +
            staffDebtors +
            salaryAdvance
        );

        const balancePay = (grossSalary - totalDetuction);

        updatedSalaryDetails[index] = {
            ...updatedSalaryDetails[index],
            noPay: noPay.toFixed(2),
            grossSalary: grossSalary.toFixed(2),
            totalForEpf: totalForEpf.toFixed(2),
            normalOverTimeCash: normalOverTimeCash.toFixed(2),
            eightPresentEpf: eightPresentEpf,
            totalDetuction: totalDetuction,
            balancePay: (grossSalary - totalDetuction).toFixed(2),
            twelvePresentEpf: twelvePresentEpf,
            threePresentEtf: threePresentEtf,
            twentyPresentEpf: twentyPresentEpf,
            fiftyPresentOnBasic: fiftyPresentOnBasic.toFixed(2),
            totalSalary: balancePay.toFixed(2),
        };

        setSalaryDetails(updatedSalaryDetails);
    };

    const handleCalculateSalaries = async () => {
        const calculatedData = await Promise.all(
            employees.map(async (employee, index) => {
                const attendanceResponse = await getAttendancesByEmployeeAndDateRange(employee.id, startDate, endDate);
                const attendances = attendanceResponse.data;

                const basicSalary = employee.basicSalary;
                const budgetaryReliefAllowance = employee.budgetaryReliefAllowance;

                console.log(employee.type);

                const noPayDays = 0;  // This will be updated by handleInputChange
                const normalOverTime = 0;  // This will be updated by handleInputChange
                const cashFloat = 0;  // This will be updated by handleInputChange
                const staffLoan = 0;  // This will be updated by handleInputChange
                const staffDebtors = 0;  // This will be updated by handleInputChange
                const salaryAdvance = 0;  // This will be updated by handleInputChange
                const doubleOverTime = 0;

                const noPay = ((basicSalary + budgetaryReliefAllowance) / 30) * noPayDays;
                const totalForEpf = (basicSalary + budgetaryReliefAllowance) - noPay;

                const totalHoursWorked = attendances.reduce((acc, attendance) => acc + (attendance.hoursWorked || 0), 0);
                const normalOverTimeHours = Math.max(0, totalHoursWorked - 240);
                const normalOverTimeCash = ((basicSalary + budgetaryReliefAllowance) / 240) * normalOverTimeHours * 1.5;

                const grossSalary = (totalForEpf + normalOverTimeCash) + doubleOverTime;;

                const eightPresentEpf = employee.type === 'PERMANENT' ? totalForEpf * 0.08 : '0';
                const twelvePresentEpf = employee.type === 'PERMANENT' ? totalForEpf * 0.12 : '0';
                const threePresentEtf = employee.type === 'PERMANENT' ? totalForEpf * 0.03 : '0';
                const twentyPresentEpf = employee.type === 'PERMANENT' ? totalForEpf * 0.2 : '0';
                const totalDetuction = (
                    eightPresentEpf +
                    cashFloat +
                    staffLoan +
                    staffDebtors +
                    salaryAdvance
                );

                const balancePay = grossSalary - totalDetuction;

                return {
                    employeeId: employee.id,
                    firstname: employee.firstname,
                    type: employee.type,
                    lastname: employee.lastname,
                    basicSalary: basicSalary.toFixed(2),
                    budgetaryReliefAllowance: budgetaryReliefAllowance.toFixed(2),
                    noPay: noPay.toFixed(2),
                    grossSalary: grossSalary.toFixed(2),
                    totalForEpf: totalForEpf.toFixed(2),
                    normalOverTime: normalOverTimeCash.toFixed(2),
                    doubleOverTime: 0,  // Will be entered by user
                    eightPresentEpf: eightPresentEpf,
                    cashFloat: cashFloat.toFixed(2),
                    staffLoan: staffLoan.toFixed(2),
                    staffDebtors: staffDebtors.toFixed(2),
                    salaryAdvance: salaryAdvance.toFixed(2),
                    totalDetuction: totalDetuction,
                    balancePay: balancePay.toFixed(2),
                    twelvePresentEpf: twelvePresentEpf,
                    threePresentEtf: threePresentEtf,
                    twentyPresentEpf: twentyPresentEpf,
                    fiftyPresentOnBasic: (basicSalary * 0.50).toFixed(2),
                    totalSalary: balancePay.toFixed(2),
                    date: new Date().toISOString().split('T')[0],  // Current date in YYYY-MM-DD format
                    monthId,
                };
            })
        );

        setSalaryDetails(calculatedData);
    };

    const addSalary = async (event) => {
        event.preventDefault();
        try {
            for (const salary of salaryDetails) {
                await saveSalary(salary);
            }
            alert("Salaries added successfully!");
        } catch (error) {
            console.error("Error while adding salaries", error);
            alert("Error while adding salaries");
        }
    };

    const fetchAllEmployees = async () => {
        const response = await getAllEmployees();
        setEmployees(response.data);
    };

    const fetchAllMonths = async () => {
        const response = await getAllMonths();
        setMonths(response.data);
    };

    useEffect(() => {
        fetchAllEmployees();
        fetchAllMonths();
    }, []);

    const [name, setName] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createMonth = async (event) => {
        event.preventDefault();
        try {
            const month = { name };
            await addMonth(month);
            alert("Month added successfully!");
            fetchAllMonths();
            setName("");
            handleClose();
        } catch (error) {
            console.error("Error while adding month", error);
            alert("Error while adding month");
        }
    };

    const squareStyle = {
        backgroundColor: 'white',
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'left',
    };

    return (
        <div>
            <AdminNavBar />
            <div className="mt-4">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Create new salary card</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="mt-1">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={squareStyle}>
                                <p style={{ fontSize: '1rem' }}>Click 'ADD' to create a new month if not existed.</p>
                                <Box>
                                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>ADD</Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Month</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Month Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={createMonth} color="primary">Add</Button>
                </DialogActions>
            </Dialog>

            <div className="mt-1">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1rem' }}>Salary card</h4>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Select Month</Form.Label>
                                                <Form.Control as="select" value={monthId} onChange={handleMonthChange}>
                                                    <option value="">Select Month</option>
                                                    {months.map(month => (
                                                        <option key={month.id} value={month.id}>{month.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control type="date" value={startDate} onChange={(e) => handleDateChange(e, 'start')} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>End Date</Form.Label>
                                                <Form.Control type="date" value={endDate} onChange={(e) => handleDateChange(e, 'end')} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Button style={{ backgroundColor: 'lightblue', marginRight: '10px' }} variant="secondary" className="mt-3" onClick={handleCalculateSalaries}>Generate Salaries</Button>

                                    {salaryDetails.length > 0 && (
                                        <Table striped bordered hover responsive className="mt-3">
                                            <thead>
                                                <tr>
                                                    <th>Employee ID</th>
                                                    <th>Name</th>
                                                    <th>Basic Salary</th>
                                                    <th>Budgetary Relief Allowance</th>
                                                    <th>No Pay Days</th>
                                                    <th>No Pay</th>
                                                    <th>Gross Salary</th>
                                                    <th>Total for EPF</th>
                                                    <th>Normal OT Hours</th>
                                                    <th>Normal OT Cash</th>
                                                    <th>Double OT</th>
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
                                                    <th>50% On Basic</th>
                                                    <th>Total Salary</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {salaryDetails.map((details, index) => (
                                                    <tr key={index}>
                                                        <td>{details.employeeId}</td>
                                                        <td>{details.firstname} {details.lastname}</td>
                                                        <td>{parseFloat(details.basicSalary).toFixed(2)}</td>
                                                        <td>{parseFloat(details.budgetaryReliefAllowance).toFixed(2)}</td>
                                                        <td>
                                                            <Form.Control
                                                                type="number"
                                                                value={parseFloat(details.noPayDays).toFixed(2)}
                                                                style={{ width: '100px' }}
                                                                onChange={(e) => handleInputChange(index, 'noPayDays', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>{parseFloat(details.noPay).toFixed(2)}</td>
                                                        <td>{parseFloat(details.grossSalary).toFixed(2)}</td>
                                                        <td>{parseFloat(details.totalForEpf).toFixed(2)}</td>
                                                        <td>
                                                            <Form.Control
                                                                type="number"
                                                                value={parseFloat(details.normalOverTime).toFixed(2)}
                                                                style={{ width: '100px' }}
                                                                onChange={(e) => handleInputChange(index, 'normalOverTime', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>{parseFloat(details.normalOverTimeCash).toFixed(2)}</td>
                                                        <td>
                                                            <Form.Control
                                                                type="number"
                                                                value={parseFloat(details.doubleOverTime).toFixed(2)}
                                                                style={{ width: '100px' }}
                                                                onChange={(e) => handleInputChange(index, 'doubleOverTime', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>{parseFloat(details.eightPresentEpf).toFixed(2)}</td>
                                                        <td>
                                                            <Form.Control
                                                                type="number"
                                                                value={parseFloat(details.cashFloat).toFixed(2)}
                                                                style={{ width: '100px' }}
                                                                onChange={(e) => handleInputChange(index, 'cashFloat', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Control
                                                                type="number"
                                                                value={parseFloat(details.staffLoan).toFixed(2)}
                                                                style={{ width: '100px' }}
                                                                onChange={(e) => handleInputChange(index, 'staffLoan', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Control
                                                                type="number"
                                                                value={parseFloat(details.staffDebtors).toFixed(2)}
                                                                style={{ width: '100px' }}
                                                                onChange={(e) => handleInputChange(index, 'staffDebtors', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Control
                                                                type="number"
                                                                value={parseFloat(details.salaryAdvance).toFixed(2)}
                                                                style={{ width: '100px' }}
                                                                onChange={(e) => handleInputChange(index, 'salaryAdvance', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>{parseFloat(details.totalDetuction).toFixed(2)}</td>
                                                        <td>{parseFloat(details.balancePay).toFixed(2)}</td>
                                                        <td>{parseFloat(details.twelvePresentEpf).toFixed(2)}</td>
                                                        <td>{parseFloat(details.threePresentEtf).toFixed(2)}</td>
                                                        <td>{parseFloat(details.twentyPresentEpf).toFixed(2)}</td>
                                                        <td>{parseFloat(details.fiftyPresentOnBasic).toFixed(2)}</td>
                                                        <td>{parseFloat(details.totalSalary).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}

                                    <Button style={{ backgroundColor: 'lightgreen' }} variant="primary" className="mt-3" onClick={addSalary}>Save Salaries</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </div>
    );
}
