import React, { useEffect, useState } from 'react';
import { getUsersById, updateAdmin } from '../../../services/api/user.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, useMediaQuery } from '@mui/material';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../../../components/footer/Footer';

export default function SuperAdminViewAll() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");

    const isMobile = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        const fetchAdmin = async () => {
            const response = await getUsersById(id);
            const userData = response.data;
            setAdmin(userData);
            setUsername(userData.username);
            setEmail(userData.email);
            setPassword(userData.password);
            setFullname(userData.fullname);
        };

        fetchAdmin();
    }, [id]);

    const handleUpdate = async () => {
        const updatedData = {
            username,
            email,
            password,
            fullname,
        };

        const response = await updateAdmin(id, updatedData);
        if (response.status === 200) {
            alert("User updated successfully");
            setIsEditing(false);
            setAdmin(updatedData);
        } else {
            alert("Failed to update user");
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
            <SuperAdminNavBar />

            <div className='mt-4'>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '70%' }}>
                            <div style={squareStyle}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Super Admin/ Admin details</h4>
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
                                        label="Full Name"
                                        value={fullname}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setFullname(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <TextField
                                        label="Username"
                                        value={username}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <TextField
                                        label="Email"
                                        value={email}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditing}
                                        style={{ marginBottom: '10px' }}
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
                                            {/* <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </Button> */}
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

                <br/><br/><br/>

                <Footer />
            </div>
        </div>
    )
}
