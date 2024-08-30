import React, { useState } from 'react';
import { Button, Container, Typography, Box, Alert, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { uploadAttendanceFile, getAttendancesByDateRange } from '../../../services/api/attendance.service';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminUploadAttendance() {
    const [file, setFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [open, setOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const navigate = useNavigate();

    const handleUpload = async () => {
        if (file) {
            try {
                const response = await uploadAttendanceFile(file);
                if (response.status === 200) {
                    setUploadSuccess("Attendance data uploaded successfully.");
                    alert("Attendance data uploaded successfully!");
                    setUploadError(null);
                    setOpen(false); // Close the dialog on success
                } else {
                    setUploadSuccess(null);
                    setUploadError("Failed to upload attendance data.");
                }
            } catch (error) {
                setUploadSuccess(null);
                setUploadError("An error occurred during upload.");
            }
        } else {
            setUploadError("Please select a file to upload.");
        }
    };

    const handleFetchAttendances = async () => {
        if (startDate && endDate) {
            try {
                const response = await getAttendancesByDateRange(startDate, endDate);
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
            setFetchError("Please select both start and end dates.");
        }
    };

    const gotoPg = () => {
        navigate('/admin/attendance-by-employee');
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Attendance details</h4>
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
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Upload attendance</h4>
                                <p style={{ fontSize: '1rem' }}>Click 'Upload' to select and upload an attendance file.</p>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOpen}
                                    >
                                        Upload
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Attendance</DialogTitle>
                <DialogContent>
                    <input
                        accept=".xlsx, .xls"
                        style={{ display: 'none' }}
                        id="upload-button-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Choose File
                        </Button>
                    </label>
                    {file && (
                        <Typography variant="body1" style={{ marginTop: '10px' }}>
                            Selected File: {file.name}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} color="secondary">
                        Upload
                    </Button>
                </DialogActions>
                {uploadSuccess && <Alert severity="success">{uploadSuccess}</Alert>}
                {uploadError && <Alert severity="error">{uploadError}</Alert>}
            </Dialog>

            <div className="mt-2">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>View Attendance by Employee & Date Range</h4>
                            <p style={{ fontSize: '1rem' }}>Click 'Get now' to get attendances by employee & date range.</p>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={gotoPg}
                                    >
                                        Get now
                                    </Button>
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
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>View Attendance by Date Range</h4>
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
                                {fetchError && <Alert severity="error" style={{ marginTop: '20px' }}>{fetchError}</Alert>}
                                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Employee ID</TableCell>
                                                <TableCell>Employee Name</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Attendance Status</TableCell>
                                                <TableCell>Hours Worked</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {attendanceData.map((attendance) => (
                                                <TableRow key={attendance.id}>
                                                    <TableCell>{attendance.employee.id}</TableCell>
                                                    <TableCell>{attendance.employee.firstname} {attendance.employee.lastname}</TableCell>
                                                    <TableCell>{attendance.date}</TableCell>
                                                    <TableCell>{attendance.isPresent ? 'Present' : 'Absent'}</TableCell>
                                                    <TableCell>{attendance.hours}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </div>
    );
}
