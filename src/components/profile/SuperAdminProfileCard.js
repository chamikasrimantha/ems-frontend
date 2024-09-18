import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useMediaQuery, TextField } from '@mui/material';
import { getUsersById, updateSuperAdmin } from '../../services/api/user.service';
import { useNavigate } from 'react-router-dom';

const PersonalDetails = () => {

    const isMobile = useMediaQuery('(max-width: 600px)');
    const [isEditing, setIsEditing] = useState(false);
    const [personalDetails, setPersonalDetails] = useState(null);

    const fetchUserById = async () => {
        const userId = localStorage.getItem('userId');
        const response = await getUsersById(userId);
        setPersonalDetails(response.data);
        console.log(response);
    }

    useEffect(() => {
        fetchUserById();
    }, []);

    const squareStyle = {
        backgroundColor: 'white',
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'left',
    };

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await updateSuperAdmin(userId, personalDetails);
            console.log(response);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <div>
            <Container fluid>
                <div className="text-center mt-4" style={{ marginLeft: '5%' }}>
                    <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Personal details</h4>
                    <p style={{ textAlign: 'left' }}>Update your information and find out how it's used.</p>
                </div>
                <Row className="justify-content-center">
                    <Col md={6} className="mb-0" style={{ width: isMobile ? '100%' : '90%' }}>
                        <div style={squareStyle}>
                            {isEditing ? (
                                <div>
                                    <Row>
                                        <Col>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                name="firstName"
                                                value={personalDetails?.fullname}
                                                onChange={handleChange}
                                                margin="normal"
                                            />
                                        </Col>
                                    </Row>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={personalDetails?.username}
                                        margin="normal"
                                        disabled
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={personalDetails?.email}
                                        onChange={handleChange}
                                        margin="normal"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <p>Name: {personalDetails?.fullname}</p>
                                    <p>Role: {personalDetails?.role}</p>
                                    <p>Username: {personalDetails?.username}</p>
                                    <p>Email: {personalDetails?.email}</p>
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col md={6} className="mb-3" style={{ width: isMobile ? '100%' : '90%' }}>
                        <div style={squareStyle}>
                            {isEditing ? (
                                <Button variant="primary" onClick={handleSaveClick}>
                                    Save
                                </Button>
                            ) : (
                                <Button variant="primary" onClick={handleUpdateClick}>
                                    Update
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const Security = () => {

    const isMobile = useMediaQuery('(max-width: 600px)');

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
            <Container fluid>
                <div className="text-center mt-4" style={{ marginLeft: '5%' }}>
                    <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Security</h4>
                    <p style={{ textAlign: 'left' }}>Update your information and find out how it's used.</p>
                </div>
                <Row className="justify-content-center">
                    <Col md={6} className="mb-0" style={{ width: isMobile ? '100%' : '90%' }}>
                        <div style={squareStyle}>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const Privacy = () => {

    const isMobile = useMediaQuery('(max-width: 600px)');

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
            <Container fluid>
                <div className="text-center mt-4" style={{ marginLeft: '5%' }}>
                    <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Privacy</h4>
                    <p style={{ textAlign: 'left' }}>Update your information and find out how it's used.</p>
                </div>
                <Row className="justify-content-center">
                    <Col md={6} className="mb-0" style={{ width: isMobile ? '100%' : '90%' }}>
                        <div style={squareStyle}>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const DeleteAccount = () => {

    const isMobile = useMediaQuery('(max-width: 600px)');

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
            <Container fluid>
                <div className="text-center mt-4" style={{ marginLeft: '5%' }}>
                    <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Delete account</h4>
                    <p style={{ textAlign: 'left' }}>You can delete your account by clicking on delete button.</p>
                </div>
                <Row className="justify-content-center">
                    <Col md={6} className="mb-0" style={{ width: isMobile ? '100%' : '90%' }}>
                        <div style={squareStyle}>
                            <p>Are you sure you want to delete your account?</p>
                            <Button variant="primary">
                                Yes, delete
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const Logout = () => {

    const isMobile = useMediaQuery('(max-width: 600px)');

    const squareStyle = {
        backgroundColor: 'white',
        border: '1px solid #DEDCDD',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'left',
    };

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/superadmin/signin');
    }

    return (
        <div>
            <Container fluid>
                <div className="text-center mt-4" style={{ marginLeft: '5%' }}>
                    <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Logout</h4>
                    <p style={{ textAlign: 'left' }}>You can logout by clicking on logout button easily.</p>
                </div>
                <Row className="justify-content-center">
                    <Col md={6} className="mb-0" style={{ width: isMobile ? '100%' : '90%' }}>
                        <div style={squareStyle}>
                            <Button variant="primary" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const SuperAdminProfileCard = () => {

    const [activeSection, setActiveSection] = useState('personal-details');

    const buttonStyle = {
        marginTop: '10px',
        fontWeight: 'bold',
        fontSize: '1rem',
        backgroundColor: 'white',
        border: '1px solid #DEDDDD',
        marginBottom: '10px',
        width: '100%',
        height: '70px',
        textAlign: 'left',
        padding: '10px'
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'personal-details':
                return <PersonalDetails />;
            case 'security':
                return <Security />;
            case 'privacy':
                return <Privacy />;
            case 'delete-account':
                return <DeleteAccount />;
            case 'logout':
                return <Logout />;
            default:
                return <PersonalDetails />;
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={3} style={{ borderRight: '1px solid #DEDDDD', padding: '10px' }}>
                    <Button variant="light" style={buttonStyle} onClick={() => setActiveSection('personal-details')}>
                        Personal details
                    </Button>
                    <Button variant="light" style={buttonStyle} onClick={() => setActiveSection('security')}>
                        Security
                    </Button>
                    <Button variant="light" style={buttonStyle} onClick={() => setActiveSection('privacy')}>
                        Privacy
                    </Button>
                    <Button variant="light" style={buttonStyle} onClick={() => setActiveSection('delete-account')}>
                        Delete account
                    </Button>
                    <Button variant="light" style={buttonStyle} onClick={() => setActiveSection('logout')}>
                        Logout
                    </Button>
                </Col>
                <Col xs={9} style={{ padding: '10px' }}>
                    {renderSection()}
                </Col>
            </Row>
        </Container>
    );
};

export default SuperAdminProfileCard;