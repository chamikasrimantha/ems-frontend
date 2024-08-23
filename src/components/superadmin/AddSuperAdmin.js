import React, { useState } from 'react';
import { superAdminRegister } from '../../services/api/user.service';
import { useNavigate } from 'react-router-dom';
import { TextField, useMediaQuery } from '@mui/material';
import { Button, Col, Container, Row } from 'react-bootstrap';

export default function AddSuperAdmin() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");

    const navigate = useNavigate();

    const isMobile = useMediaQuery('(max-width: 600px)');

    const handleConfirm = async (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "email": email,
            "password": password,
            "fullname": fullname
        }
        const response = await superAdminRegister(data);
        if (response.status === 200) {
            alert("Super Admin added successfully!");
            navigate('/superadmin/admins')
        } else {
            alert("Error while adding super admin");
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
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Create new super admin account</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <TextField value={fullname} onChange={(e) => setFullname(e.target.value)} label="Full Name" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" className="mb-3" fullWidth />
                                <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" type='password' className="mb-3" fullWidth />
                                <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" className="mb-3" fullWidth />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <Button style={{ textAlign: 'left' }} variant="primary" onClick={handleConfirm}>
                                    Create new super admin account
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
