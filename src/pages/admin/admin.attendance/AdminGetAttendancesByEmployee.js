import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Button, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, InputLabel, FormControl, useMediaQuery } from '@mui/material';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';
import { getAllEmployees } from '../../../services/api/employee.service';
import { getAttendancesByEmployeeAndDateRange } from '../../../services/api/attendance.service';
import { Col, Row } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import AttendancePDF from './AttendancePDF';

export default function AdminGetAttendancesByEmployee() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const isMobile = useMediaQuery('(max-width: 600px)');
    const pdfRef = useRef();

    useEffect(() => {
        // Fetch all employees when the component mounts
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleFetchAttendances = async () => {
        if (selectedEmployee && startDate && endDate) {
            try {
                const response = await getAttendancesByEmployeeAndDateRange(selectedEmployee, startDate, endDate);
                if (response.status === 200) {
                    setAttendanceData(response.data);
                    setFetchError(null);
                } else {
                    setFetchError("Failed to retrieve attendance data.");
                }
            } catch (error) {
                setFetchError("An error occurred while fetching attendance data.");
            }
        } else {
            setFetchError("Please select an employee and both start and end dates.");
        }
    };

    const handlePrint = useReactToPrint({
        content: () => pdfRef.current,
    });

    const squareStyle = {
        backgroundColor: 'white',
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'left',
    };

    const calculateTotalHours = () => {
        return attendanceData.reduce((total, attendance) => total + (attendance.hours || 0), 0);
    };

    return (
        <div>
            <AdminNavBar />

            <div className="mt-4">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Get Attendance by Employee and Date Range</h4>
                                <Box mt={4}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Select Employee</InputLabel>
                                        <Select
                                            value={selectedEmployee}
                                            style={{ marginBottom: '5px' }}
                                            onChange={(e) => setSelectedEmployee(e.target.value)}
                                        >
                                            {employees.map((employee) => (
                                                <MenuItem key={employee.id} value={employee.id}>
                                                    {employee.firstname} {employee.lastname}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                        <input
                                            type="date"
                                            className="form-control"
                                            style={{ marginLeft: '10px' }}
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ marginLeft: '10px' }}
                                            onClick={handleFetchAttendances}
                                        >
                                            GET
                                        </Button>
                                    </Box>
                                </Box>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="mt-2">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                {fetchError && <Alert severity="error" style={{ marginTop: '20px' }}>{fetchError}</Alert>}
                                {attendanceData.length > 0 && (
                                    <div>
                                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Employee Name</TableCell>
                                                        <TableCell>Date</TableCell>
                                                        <TableCell>Attendance Status</TableCell>
                                                        <TableCell>Hours Worked</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {attendanceData.map((attendance) => (
                                                        <TableRow key={attendance.id}>
                                                            <TableCell>{attendance.employee.firstname} {attendance.employee.lastname}</TableCell>
                                                            <TableCell>{attendance.date}</TableCell>
                                                            <TableCell>{attendance.isPresent ? 'Present' : 'Absent'}</TableCell>
                                                            <TableCell>{attendance.hours}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="right" style={{ fontWeight: 'bold' }}>Total Hours Worked</TableCell>
                                                        <TableCell style={{ fontWeight: 'bold' }}>{calculateTotalHours()}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handlePrint}
                                            style={{ marginTop: '20px' }}
                                        >
                                            GENERATE PDF
                                        </Button>
                                        <div style={{ display: 'none' }}>
                                            <AttendancePDF ref={pdfRef} attendanceData={attendanceData} calculateTotalHours={calculateTotalHours}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>

            </Container>
            <Footer />
        </div>
    );
}
