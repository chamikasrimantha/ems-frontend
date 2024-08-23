import React, { useEffect, useState } from 'react';
import { addEmployee } from '../../services/api/employee.service';
import { getAllDepartments } from '../../services/api/department.service';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function AddEmployee() {

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
    const [departmentId, setDepartmentId] = useState("");

    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    const isMobile = useMediaQuery('(max-width: 600px)');

    const fetchAllDepartments = async () => {
        const response = await getAllDepartments();
        setDepartments(response.data);
        console.log(response);
    }

    useEffect(() => {
        fetchAllDepartments();
    }, []);

    const handleConfirm = async (event) => {
        event.preventDefault();
        const data = {
            "surname": surname,
            "firstname": firstname,
            "lastname": lastname,
            "dob": dob,
            "email": email,
            "age": age,
            "nic": nic,
            "address": address,
            "epf": epf,
            "wef": wef,
            "designation": designation,
            "mobile": mobile,
            "type": type,
            "basicSalary": basicSalary,
            "budgetaryReliefAllowance": budgetaryReliefAllowance,
            "departmentId": departmentId
        }
        const response = await addEmployee(data);
        if (response.status === 200) {
            alert("Employee added successfully!");
            navigate('/superadmin/employees')
        } else {
            alert("Error while adding employee");
        }
    }

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
            <div className="mt-4">
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
                                <TextField value={surname} onChange={(e) => setSurname(e.target.value)} label="Surname" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={firstname} onChange={(e) => setFirstname(e.target.value)} label="First Name" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={lastname} onChange={(e) => setLastname(e.target.value)} label="Last Name" variant="outlined" className="mb-3" fullWidth />
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <InputLabel>Select department</InputLabel>
                                    <Select
                                        name="Select department"
                                        value={departmentId}
                                        onChange={(e) => setDepartmentId(e.target.value)}
                                        label="Select department"
                                        className="mb-3"
                                        fullWidth
                                    >
                                        {departments && departments.map((department) => (
                                            <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <InputLabel>Select employee type</InputLabel>
                                    <Select
                                        name="Select employee type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        label="Select employee type"
                                        className="mb-3"
                                        fullWidth
                                    >
                                        <MenuItem value="PROBATION">PROBATION</MenuItem>
                                        <MenuItem value="PERMANENT">PERMANENT</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Col>
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <label style={{ marginRight: '10px' }}>Date of birth:</label>
                                <DatePicker
                                    selected={dob}
                                    onChange={(date) => setDob(date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control"
                                />
                                <br /><br />
                                <label style={{ marginRight: '10px' }}>Wef:</label>
                                <DatePicker
                                    selected={wef}
                                    onChange={(date) => setWef(date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control"
                                />
                            </div>
                        </Col>
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={nic} onChange={(e) => setNic(e.target.value)} label="NIC" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={age} onChange={(e) => setAge(e.target.value)} label="Age" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={address} onChange={(e) => setAddress(e.target.value)} label="Address" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={mobile} onChange={(e) => setMobile(e.target.value)} label="Mobile" variant="outlined" className="mb-3" fullWidth />
                            </div>
                        </Col>
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <TextField value={epf} onChange={(e) => setEpf(e.target.value)} label="Epf number" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={designation} onChange={(e) => setDesignation(e.target.value)} label="Designation" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} label="Basic salary" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={budgetaryReliefAllowance} onChange={(e) => setBudgetaryReliefAllowance(e.target.value)} label="Budgetary relief allowance" variant="outlined" className="mb-3" fullWidth />
                            </div>
                        </Col>
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <Button style={{ textAlign: 'left' }} variant="primary" onClick={handleConfirm}>
                                    Add Employee
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
