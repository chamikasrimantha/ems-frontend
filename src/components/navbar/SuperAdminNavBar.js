import React from 'react';
import { Navbar, Container, Nav, OverlayTrigger, Tooltip, Dropdown, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function SuperAdminNavBar() {

    const navigate = useNavigate();

    const dashboard = () => {
        navigate('/superadmin/dashboard');
    }

    const employees = () => {
        navigate('/superadmin/employees');
    }

    const salaries = () => {
        navigate('/superadmin/salaries');
    }

    const admins = () => {
        navigate('/superadmin/admins');
    }

    const departments = () => {
        navigate('/superadmin/departments');
    }

    // const months = () => {
    //     navigate('/superadmin/months');
    // }

    const analysis = () => {
        navigate('/superadmin/analysis');
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/superadmin/signin');
    }

    const gotoSignIn = () => {
        navigate('/superadmin/signin');
    }

    const gotoSignUp = () => {
        navigate('/superadmin/signup');
    }

    const gotoProfile = () => {
        navigate('/superadmin/profile');
    }

    const isSignedIn = !!localStorage.getItem('token');

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#1a1a2e', minHeight: '70px' }} variant="dark">
            <Container>
                <Navbar.Brand href="" onClick={dashboard} style={{ color: 'white', fontStyle: 'italic', fontWeight: 500, cursor: 'pointer' }}>
                    BENJARONG.lk
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="" onClick={dashboard} style={{ color: 'white', marginRight: '30px' }}>Dashboard</Nav.Link>
                        <Nav.Link href="" onClick={departments} style={{ color: 'white', marginRight: '30px' }}>Departments</Nav.Link>
                        {/* <Nav.Link href="" onClick={months} style={{ color: 'white', marginRight: '30px' }}>Months</Nav.Link> */}
                        <Nav.Link href="" onClick={employees} style={{ color: 'white', marginRight: '30px' }}>Employees</Nav.Link>
                        <Nav.Link href="" onClick={salaries} style={{ color: 'white', marginRight: '30px' }}>Salaries</Nav.Link>
                        <Nav.Link href="" onClick={admins} style={{ color: 'white', marginRight: '30px' }}>Admins</Nav.Link>
                        <Nav.Link href="" onClick={analysis} style={{ color: 'white', marginRight: '30px' }}>Analysis</Nav.Link>
                    </Nav>
                    <Nav>
                        {isSignedIn ? (
                            <Dropdown align="end">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-bottom">Super Admin settings</Tooltip>}
                                >
                                    <Dropdown.Toggle as="div" style={{ color: 'white', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <FaUserCircle size={30} />
                                    </Dropdown.Toggle>
                                </OverlayTrigger>
                                <Dropdown.Menu style={{ minWidth: '200px', right: 0, left: 'auto' }}>
                                    <Dropdown.Item onClick={gotoProfile} href="">My profile settings</Dropdown.Item>
                                    <Dropdown.Item onClick={logout} href="">Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Button onClick={gotoSignIn} variant="light" style={{ color: '#043E96' }}>Sign In</Button>
                                {/* <Button onClick={gotoSignUp} variant="light" style={{ color: '#043E96' }}>Sign Up</Button> */}
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}