import React, { forwardRef } from 'react';
import { Container, Table } from 'react-bootstrap';

const AttendancePDF = forwardRef(({ attendanceData, calculateTotalHours }, ref) => {
    return (
        <div ref={ref} style={{ width: '100%', padding: '10px' }}>
            <Container fluid>
                <h2>Attendance Report</h2>
                <Table striped bordered hover style={{ marginTop: '20px', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Date</th>
                            <th>Attendance Status</th>
                            <th>Hours Worked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((attendance) => (
                            <tr key={attendance.id}>
                                <td>{attendance.employee.firstname} {attendance.employee.lastname}</td>
                                <td>{attendance.date}</td>
                                <td>{attendance.isPresent ? 'Present' : 'Absent'}</td>
                                <td>{attendance.hours}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr style={{ backgroundColor: 'lightgray' }}>
                            <td colSpan={3} style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Total Hours Worked</td>
                            <td style={{ fontSize: '1rem', fontWeight: 'bold' }}>{calculateTotalHours()}</td>
                        </tr>
                    </tfoot>
                </Table>
            </Container>
        </div>
    );
});

export default AttendancePDF;
