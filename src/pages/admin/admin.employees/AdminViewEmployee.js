import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee, deleteEmployee } from '../../../services/api/employee.service';
import { Button, TextField, Container, useMediaQuery, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import Footer from '../../../components/footer/Footer';
import { Col, Row, Table } from 'react-bootstrap';
import AdminIssueLetter from './AdminIssueLetter';
import ReactToPrint from 'react-to-print';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import { getSalariesByEmployee } from '../../../services/api/salary.service';

export default function AdminViewEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [salaries, setSalaries] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const componentRef = useRef();

    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

    // Employee fields
    const [surname, setSurname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");
    const [epf, setEpf] = useState("");
    const [wef, setWef] = useState("");
    const [designation, setDesignation] = useState("");
    const [type, setType] = useState("");
    const [mobile, setMobile] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [budgetaryReliefAllowance, setBudgetaryReliefAllowance] = useState("");
    const [travellingAllowance, setTravellingAllowance] = useState("");
    const [specialAllowance, setSpecialAllowance] = useState("");
    const [bankname, setBankname] = useState("");
    const [bank, setBank] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const isMobile = useMediaQuery('(max-width: 600px)');

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    const fetchSalariesByEmployee = async () => {
        const response = await getSalariesByEmployee(id);
        setSalaries(response.data);
        console.log(response);
    }

    useEffect(() => {
        fetchSalariesByEmployee();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await getEmployeeById(id);
            const empData = response.data;
            setEmployee(empData);
            setSurname(empData.surname);
            setFirstname(empData.firstname);
            setLastname(empData.lastname);
            setDob(empData.dob);
            setEmail(empData.email);
            setAge(empData.age);
            setNic(empData.nic);
            setAddress(empData.address);
            setEpf(empData.epf);
            setWef(empData.wef);
            setDesignation(empData.designation);
            setType(empData.type);
            setMobile(empData.mobile);
            setBasicSalary(empData.basicSalary);
            setBudgetaryReliefAllowance(empData.budgetaryReliefAllowance);
            setTravellingAllowance(empData.travellingAllowance);
            setSpecialAllowance(empData.specialAllowance);
            setBankname(empData.bankname);
            setBank(empData.bank);
            setDepartmentId(empData.departmentId);
        };

        fetchEmployee();
    }, [id]);

    const handleUpdate = async () => {
        const updatedData = {
            surname,
            firstname,
            lastname,
            dob,
            email,
            age,
            nic,
            address,
            epf,
            wef,
            designation,
            type,
            mobile,
            basicSalary,
            budgetaryReliefAllowance,
            travellingAllowance,
            specialAllowance,
            bankname,
            bank,
            departmentId,
        };

        const response = await updateEmployee(id, updatedData);
        if (response.status === 200) {
            alert("Employee updated successfully");
            setIsEditing(false);
            setEmployee(updatedData);
        } else {
            alert("Failed to update employee");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            const response = await deleteEmployee(id);
            if (response.status === 200) {
                alert("Employee deleted successfully");
                navigate('/superadmin/employees');
            } else {
                alert("Failed to delete employee");
            }
        }
    };

    const squareStyle = {
        backgroundColor: 'white',
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '02px',
        textAlign: 'left',
    };

    return (
        <div>
            <AdminNavBar />

            <div className='mt-4'>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Employee details</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>

                                <div style={{ marginTop: '20px' }}>
                                    <TextField
                                        label="Surname"
                                        value={surname}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setSurname(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '10px', marginBottom: '20px', width: '32%' }}
                                    />
                                    <TextField
                                        label="First Name"
                                        value={firstname}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setFirstname(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '10px', marginBottom: '20px', width: '32%' }}
                                    />
                                    <TextField
                                        label="Last Name"
                                        value={lastname}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setLastname(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px', width: '32%' }}
                                    />
                                    <TextField
                                        label="Date of Birth"
                                        value={dob}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setDob(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '10px', marginBottom: '20px', width: '30%' }}
                                    />
                                    <TextField
                                        label="Email"
                                        value={email}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px', width: '68%' }}
                                    />
                                    <TextField
                                        label="Age"
                                        value={age}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setAge(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '10px', marginBottom: '20px', width: '30%' }}
                                    />
                                    <TextField
                                        label="NIC"
                                        value={nic}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setNic(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px', width: '68%' }}
                                    />
                                    <TextField
                                        label="Address"
                                        value={address}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setAddress(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px' }}
                                    />
                                    <TextField
                                        label="Epf"
                                        value={epf}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setEpf(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '10px', marginBottom: '20px', width: '30%' }}
                                    />
                                    <TextField
                                        label="Wef"
                                        value={wef}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setWef(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px', width: '68%' }}
                                    />
                                    <TextField
                                        label="Designation"
                                        value={designation}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setDesignation(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px' }}
                                    />
                                    <FormControl fullWidth margin="dense" variant="outlined">
                                        <InputLabel>Employee type</InputLabel>
                                        <Select
                                            name="Employee type"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            label="Employee type"
                                            className="mb-3"
                                            disabled={!isEditing}
                                            fullWidth
                                        >
                                            <MenuItem value="PROBATION">PROBATION</MenuItem>
                                            <MenuItem value="PERMANENT">PERMANENT</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Mobile"
                                        value={mobile}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setMobile(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '10px', marginBottom: '20px', width: '49%' }}
                                    />
                                    <TextField
                                        label="Basic salary"
                                        value={basicSalary}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setBasicSalary(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px', width: '49%' }}
                                    />
                                    <TextField
                                        label="Budgetary relief allowance"
                                        value={budgetaryReliefAllowance}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setBudgetaryReliefAllowance(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '9px', marginBottom: '20px', width: '33%' }}
                                    />
                                    <TextField
                                        label="Travelling allowance"
                                        value={travellingAllowance}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setTravellingAllowance(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '9px', marginBottom: '20px', width: '32%' }}
                                    />
                                    <TextField
                                        label="Special allowance"
                                        value={specialAllowance}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setSpecialAllowance(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px', width: '32%' }}
                                    />
                                    <TextField
                                        label="Bank Name"
                                        value={bankname}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setBankname(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginRight: '10px', marginBottom: '20px', width: '60%' }}
                                    />
                                    <TextField
                                        label="Bank Acc No"
                                        value={bank}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setBank(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '20px', width: '38%' }}
                                    />
                                    {/* Add other fields similarly */}

                                    {/* Buttons */}
                                    {!isEditing ? (
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setIsEditing(true)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleDelete}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Delete
                                            </Button>
                                            <ReactToPrint
                                                trigger={() => (
                                                    <Button
                                                        variant="contained"
                                                        
                                                        style={{ marginRight: '10px', backgroundColor: 'green' }}
                                                    >
                                                        Issue Joining Letter
                                                    </Button>
                                                )}
                                                content={() => componentRef.current}
                                            />
                                        </div>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleUpdate}
                                        >
                                            Save Changes
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>{surname} {firstname} {lastname}'s salary list</h4>
                                <br />
                                <Table bordered hover style={{ width: '100%', fontSize: '15px', wordWrap: 'break-word' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Month</th>
                                            {/* <th style={{ textAlign: 'center' }}>Gross Salary</th>
                                            <th style={{ textAlign: 'center' }}>Total Deduction</th>
                                            <th style={{ textAlign: 'center' }}>Special Allowance</th>
                                            <th style={{ textAlign: 'center' }}>Travelling Allowance</th>
                                            <th style={{ textAlign: 'center' }}>Service Charges</th> */}
                                            <th style={{ textAlign: 'center' }}>Salary (Total)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salaries.map((salary) => (
                                            <tr key={salary.id}>
                                                <td>{salary.monthEntity.name}</td>
                                                {/* <td style={{ textAlign: 'right' }}>{formatNumber(salary.grossSalary)}</td>
                                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.totalDetuction)}</td>
                                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.specialAllowance)}</td>
                                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.travellingAllowance)}</td>
                                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.serviceCharges)}</td> */}
                                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.totalSalary)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>

                {/* Print component */}
                <div style={{ display: 'none' }}>
                    <AdminIssueLetter date={currentDate} ref={componentRef} employee={employee} />
                </div>

                <Footer />
            </div>
        </div>
    );
}
