import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../../../services/api/employee.service';
import { getAllAdmins } from '../../../services/api/user.service';
import { getAllSalaries } from '../../../services/api/salary.service';
import { getAllDepartments } from '../../../services/api/department.service';
import { Col, Container, Row } from 'react-bootstrap';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';
import EmployeeCard from '../../../components/employee/EmployeeCard';

export default function AdminDashboard() {

    const [employees, setEmployees] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {

        async function fetchAllEmployees() {
            try {
                const employeeResponse = await getAllEmployees();
                setEmployees(employeeResponse.data);
            } catch (error) {
                console.error("Error fetching employees", error);
            }
        }

        async function fetchAllAdmins() {
            try {
                const adminResponse = await getAllAdmins();
                setAdmins(adminResponse.data);
            } catch (error) {
                console.error("Error fetching admins", error);
            }
        }

        async function fetchAllSalaries() {
            try {
                const salaryResponse = await getAllSalaries();
                setSalaries(salaryResponse.data);
            } catch (error) {
                console.error("Error fetching salaries", error);
            }
        }

        async function fetchAllDepartments() {
            try {
                const departmentResponse = await getAllDepartments();
                setDepartments(departmentResponse.data);
            } catch (error) {
                console.error("Error fetching departments", error);
            }
        }

        fetchAllEmployees();
        fetchAllAdmins();
        fetchAllSalaries();
        fetchAllDepartments();
    }, []);

    const totalEmployees = employees.length;
    const totalAdmins = admins.length;
    const totalDepartments = departments.length;
    const totalTransactions = salaries.reduce((sum, salary) => sum + salary.totalSalary, 0);

    const DashboardCard = ({ title, value }) => {
        return (
            <Card style={{ backgroundColor: '#0f4c75', color: 'white', margin: '10px' }}>
                <CardContent>
                    <Typography variant="h4" component="div">
                        {value}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    return (
        <div>
            <AdminNavBar />

            <Box display="flex" justifyContent="center" style={{ margin: '20px', marginLeft: '5%', marginRight: '5%' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard title="Total Employees" value={totalEmployees} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard title="Total Admins" value={totalAdmins} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard title="Total Departments" value={totalDepartments} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard title="Total Transactions" value={parseFloat(totalTransactions).toFixed(2)} />
                    </Grid>
                </Grid>
            </Box>

            {/* recent employees */}
            <Container fluid>
                <div className="text-center mt-4" style={{ marginLeft: '5%' }}>
                    <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Recent employees joined</h4>
                    <p style={{ textAlign: 'left' }}>Recent employees joined.</p>
                </div>
                <Row style={{ marginLeft: '4%', marginRight: '4%' }} xs={1} md={3} className="g-1 justify-content-center">
                    {employees.slice(-3).map((employee, index) => (
                        <Col key={index} className="d-flex justify-content-center">
                            <EmployeeCard employee={employee} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <br/><br/><br/>
            <Footer />
        </div>
    )
}
