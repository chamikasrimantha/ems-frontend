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
        // const travellingAllow = parseFloat(updatedSalaryDetails[index].travellingAllowance) || 0;
        // const specialAllowance = parseFloat(updatedSalaryDetails[index].specialAllowance) || 0;
        const serviceCharges = parseFloat(updatedSalaryDetails[index].serviceCharges) || 0;
        const sc = parseFloat(updatedSalaryDetails[index].sc) || 0;
        const noPayDays = parseFloat(updatedSalaryDetails[index].noPayDays) || 0;
        const leaveDays = parseFloat(updatedSalaryDetails[index].leaveDays) || 0;
        const normalOverTime = parseFloat(updatedSalaryDetails[index].normalOverTime) || 0;
        const cashFloat = parseFloat(updatedSalaryDetails[index].cashFloat) || 0;
        const staffLoan = parseFloat(updatedSalaryDetails[index].staffLoan) || 0;
        const staffDebtors = parseFloat(updatedSalaryDetails[index].staffDebtors) || 0;
        const salaryAdvance = parseFloat(updatedSalaryDetails[index].salaryAdvance) || 0;
        const doubleOverTime = parseFloat(updatedSalaryDetails[index].doubleOverTime) || 0;

        const noPay = ((basicSalary + budgetaryReliefAllowance) / 30) * noPayDays;
        const noOfDays = 30 - (noPayDays + leaveDays);
        const totalForEpf = (basicSalary + budgetaryReliefAllowance) - noPay;
        const normalOverTimeCash = (((basicSalary + budgetaryReliefAllowance) / 240) * normalOverTime) * 1.5;
        const grossSalary = (totalForEpf + normalOverTimeCash) + doubleOverTime;

        const employeeType = updatedSalaryDetails[index].type;
        const eightPresentEpf = employeeType === 'PERMANENT' ? totalForEpf * 0.08 : 0.00;
        const twelvePresentEpf = employeeType === 'PERMANENT' ? totalForEpf * 0.12 : '0';
        const threePresentEtf = employeeType === 'PERMANENT' ? totalForEpf * 0.03 : '0';
        const twentyPresentEpf = employeeType === 'PERMANENT' ? totalForEpf * 0.2 : '0';
        const fiftyPresentOnBasic = basicSalary * 0.50;

        const travellingAllow = updatedSalaryDetails[index].travellingAllow;
        const specialAllow = updatedSalaryDetails[index].specialAllow;

        const travellingAllowance = (travellingAllow / 30) * noOfDays;
        const specialAllowance = (specialAllow / 30) * noOfDays;

        const totalDetuction = (
            eightPresentEpf +
            cashFloat +
            staffLoan +
            staffDebtors +
            salaryAdvance
        );

        const balancePay = (grossSalary - totalDetuction);

        const totalSalary = (balancePay + travellingAllowance + specialAllowance + serviceCharges);

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
            noOfDays: noOfDays.toFixed(2),
            travellingAllowance: travellingAllowance.toFixed(2),
            specialAllowance: specialAllowance.toFixed(2),
            serviceCharges: serviceCharges.toFixed(2),
            totalSalary: totalSalary.toFixed(2),
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
                const leaveDays = 0;
                const normalOverTime = 0;  // This will be updated by handleInputChange
                const cashFloat = 0;  // This will be updated by handleInputChange
                const staffLoan = 0;  // This will be updated by handleInputChange
                const staffDebtors = 0;  // This will be updated by handleInputChange
                const salaryAdvance = 0;  // This will be updated by handleInputChange
                const doubleOverTime = 0;
                const serviceCharges = 0;
                const sc = 0;

                const noPay = ((basicSalary + budgetaryReliefAllowance) / 30) * noPayDays;
                const totalForEpf = (basicSalary + budgetaryReliefAllowance) - noPay;

                const noOfDays = 30 - (noPayDays + leaveDays);

                const travellingAllowance = (employee.travellingAllowance / 30) * noOfDays;
                const specialAllowance = (employee.specialAllowance / 30) * noOfDays;

                const totalHoursWorked = attendances.reduce((acc, attendance) => acc + (attendance.hoursWorked || 0), 0);
                const normalOverTimeHours = Math.max(0, totalHoursWorked - 240);
                const normalOverTimeCash = ((basicSalary + budgetaryReliefAllowance) / 240) * normalOverTimeHours * 1.5;

                const grossSalary = (totalForEpf + normalOverTimeCash) + doubleOverTime;;

                const eightPresentEpf = employee.type === 'PERMANENT' ? totalForEpf * 0.08 : 0.00;
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

                const totalSalary = (balancePay + travellingAllowance + specialAllowance + serviceCharges);

                return {
                    employeeId: employee.id,
                    firstname: employee.firstname,
                    type: employee.type,
                    lastname: employee.lastname,
                    travellingAllow: employee.travellingAllowance,
                    specialAllow: employee.specialAllowance,
                    basicSalary: basicSalary,
                    budgetaryReliefAllowance: budgetaryReliefAllowance.toFixed(2),
                    noPay: noPay.toFixed(2),
                    noOfDays: noOfDays.toFixed(2),
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
                    sc: sc,
                    travellingAllowance: travellingAllowance.toFixed(2),
                    specialAllowance: specialAllowance.toFixed(2),
                    serviceCharges: serviceCharges.toFixed(2),
                    totalSalary: totalSalary.toFixed(2),
                    date: new Date().toISOString().split('T')[0],  // Current date in YYYY-MM-DD format
                    monthId,
                };
            })
        );

        setSalaryDetails(calculatedData);
    };

    // const addSalary = async (event) => {
    //     event.preventDefault();
    //     try {
    //         for (const salary of salaryDetails) {
    //             await saveSalary(salary);
    //         }
    //         alert("Salaries added successfully!");
    //     } catch (error) {
    //         console.error("Error while adding salaries", error);
    //         alert("Error while adding salaries");
    //     }
    // };

    const addSalary = async (index) => {
        try {
            const salary = salaryDetails[index];
            await saveSalary(salary);
            alert(`Salary for ${salary.firstname} ${salary.lastname} added successfully!`);
        } catch (error) {
            console.error("Error while adding salary", error);
            alert("Error while adding salary");
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

    const square1Style = {
        backgroundColor: '#0f4c75',
        color: "white",
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
                            <div style={square1Style}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Create new salary sheet</h4>
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

                                    <br /><br/>
                                    {salaryDetails.length > 0 && (
                                        <div style={{
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            position: "relative",
                                            overflow: "auto", // Allows both horizontal and vertical scrolling
                                            maxHeight: "450px" // Restricts vertical height
                                        }}>
                                            <Table striped bordered hover className="mb-0" style={{ minWidth: "1500px" }}>
                                                <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 2 }}>
                                                    <tr>
                                                        <th style={{ minWidth: "120px" }}>Employee ID</th>
                                                        <th style={{ minWidth: "150px" }}>Name</th>
                                                        <th style={{ minWidth: "120px" }}>Basic Salary</th>
                                                        <th style={{ minWidth: "180px" }}>Budgetary Relief Allowance</th>
                                                        <th style={{ minWidth: "120px" }}>No Pay Days</th>
                                                        <th style={{ minWidth: "120px" }}>No Pay</th>
                                                        <th style={{ minWidth: "120px" }}>Leave Days</th>
                                                        <th style={{ minWidth: "120px" }}>No Of Days</th>
                                                        <th style={{ minWidth: "120px" }}>Gross Salary</th>
                                                        <th style={{ minWidth: "120px" }}>Total for EPF</th>
                                                        <th style={{ minWidth: "140px" }}>Normal OT Hours</th>
                                                        <th style={{ minWidth: "140px" }}>Normal OT Cash</th>
                                                        <th style={{ minWidth: "120px" }}>Double OT</th>
                                                        <th style={{ minWidth: "120px" }}>8% EPF</th>
                                                        <th style={{ minWidth: "120px" }}>Cash Float</th>
                                                        <th style={{ minWidth: "120px" }}>Staff Loan</th>
                                                        <th style={{ minWidth: "120px" }}>Staff Debtors</th>
                                                        <th style={{ minWidth: "140px" }}>Salary Advance</th>
                                                        <th style={{ minWidth: "140px" }}>Total Deduction</th>
                                                        <th style={{ minWidth: "120px" }}>Balance Pay</th>
                                                        <th style={{ minWidth: "120px" }}>12% EPF</th>
                                                        <th style={{ minWidth: "120px" }}>3% ETF</th>
                                                        <th style={{ minWidth: "120px" }}>20% EPF</th>
                                                        <th style={{ minWidth: "120px" }}>S/C %</th>
                                                        <th style={{ minWidth: "170px" }}>Travelling Allowance</th>
                                                        <th style={{ minWidth: "160px" }}>Special Allowance</th>
                                                        <th style={{ minWidth: "150px" }}>Service Charges</th>
                                                        <th style={{ minWidth: "120px" }}>Total Salary</th>
                                                        <th style={{ minWidth: "100px" }}>#</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {salaryDetails.map((details, index) => (
                                                        <tr key={index}>
                                                            <td style={{ minWidth: "120px" }}>{details.employeeId}</td>
                                                            <td style={{ minWidth: "150px" }}>{details.firstname} {details.lastname}</td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.basicSalary).toFixed(2)}</td>
                                                            <td style={{ minWidth: "180px" }}>{parseFloat(details.budgetaryReliefAllowance).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.noPayDays).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'noPayDays', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.noPay).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.leaveDays).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'leaveDays', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.noOfDays).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.grossSalary).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.totalForEpf).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.normalOverTime).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'normalOverTime', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "140px" }}>{parseFloat(details.normalOverTimeCash).toFixed(2)}</td>
                                                            <td style={{ minWidth: "140px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.doubleOverTime).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'doubleOverTime', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.eightPresentEpf).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.cashFloat).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'cashFloat', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "120px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.staffLoan).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'staffLoan', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "120px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.staffDebtors).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'staffDebtors', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "140px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.salaryAdvance).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'salaryAdvance', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "140px" }}>{parseFloat(details.totalDetuction).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.balancePay).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.twelvePresentEpf).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.threePresentEtf).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.twentyPresentEpf).toFixed(2)}</td>
                                                            <td style={{ minWidth: "120px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.sc).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'sc', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "170px" }}>{parseFloat(details.travellingAllowance).toFixed(2)}</td>
                                                            <td style={{ minWidth: "160px" }}>{parseFloat(details.specialAllowance).toFixed(2)}</td>
                                                            <td style={{ minWidth: "150px" }}>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={parseFloat(details.serviceCharges).toFixed(2)}
                                                                    style={{ width: '100px' }}
                                                                    onChange={(e) => handleInputChange(index, 'serviceCharges', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: "120px" }}>{parseFloat(details.totalSalary).toFixed(2)}</td>
                                                            <td style={{ minWidth: "100px" }}><Button style={{ backgroundColor: 'lightgreen' }} variant="primary" className="mt-3" onClick={() => addSalary(index)}>Save</Button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table></div>
                                    )}


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
