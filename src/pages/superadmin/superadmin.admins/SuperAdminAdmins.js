import React, { useEffect, useState } from 'react';
import { getAllAdmins, getAllSuperAdmins } from '../../../services/api/user.service';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import { Button, Container, Table } from 'react-bootstrap';
import { ButtonBase } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Footer from '../../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom';

export default function SuperAdminAdmins() {

    const [admins, setAdmins] = useState([]);
    const [superadmins, setSuperadmins] = useState([]);

    const fetchAllAdmins = async () => {
        const response = await getAllAdmins();
        setAdmins(response.data);
        console.log(response);
    }

    const fetchAllSuperAdmins = async () => {
        const response = await getAllSuperAdmins();
        setSuperadmins(response.data);
        console.log(response);
    }

    useEffect(() => {
        fetchAllAdmins();
        fetchAllSuperAdmins();
    }, []);

    const navigate = useNavigate();

    const handleClickOpenAdmin = () => {
        navigate("/superadmin/add-admin")
    };

    const handleClickOpenSuperAdmin = () => {
        navigate("/superadmin/add-superadmin");
    }

    const handleViewClickAdmin = (id) => {
        // Handle the view button click
        console.log('View admin with ID:', id);
    };

    const handleViewClickSuperAdmin = (id) => {
        console.log('View Super Admin with:', id);
    }

    return (
        <div>
            <SuperAdminNavBar />

            {/* Top */}
            <Container fluid>
                <div className="d-flex justify-content-between align-items-center mt-4" style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <div>
                        <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Manage admins</h4>
                        <p style={{ textAlign: 'left' }}>Click on each admin to edit/ update or delete</p>
                    </div>
                    <div>
                        <ButtonBase
                            style={{
                                backgroundColor: '#184D9D',
                                color: 'white',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={handleClickOpenAdmin}
                        >
                            <AddCircleOutlineIcon style={{ marginRight: '10px' }} />Add new admin
                        </ButtonBase>
                    </div>
                </div>
            </Container>

            <Container>
                <Table striped bordered hover style={{ marginBottom: '30px', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.id}</td>
                                <td>{admin.fullname}</td>
                                <td>{admin.username}</td>
                                <td>{admin.email}</td>
                                <td>{admin.role}</td>
                                <td>
                                    <Link to={`/superadmin/admins/${admin.id}`} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleViewClickAdmin(admin.id)}
                                        >
                                            View
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            {/* Top */}
            <Container fluid>
                <div className="d-flex justify-content-between align-items-center mt-4" style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <div>
                        <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Manage super admins</h4>
                        <p style={{ textAlign: 'left' }}>Click on each super admin to edit/ update or delete</p>
                    </div>
                    <div>
                        <ButtonBase
                            style={{
                                backgroundColor: '#184D9D',
                                color: 'white',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={handleClickOpenSuperAdmin}
                        >
                            <AddCircleOutlineIcon style={{ marginRight: '10px' }} />Add new super admin
                        </ButtonBase>
                    </div>
                </div>
            </Container>

            <Container>
                <Table striped bordered hover style={{ marginBottom: '30px', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {superadmins.map((superadmin) => (
                            <tr key={superadmin.id}>
                                <td>{superadmin.id}</td>
                                <td>{superadmin.fullname}</td>
                                <td>{superadmin.username}</td>
                                <td>{superadmin.email}</td>
                                <td>{superadmin.role}</td>
                                <td>
                                    <Link to={`/superadmin/admins/${superadmin.id}`} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleViewClickSuperAdmin(superadmin.id)}
                                        >
                                            View
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <br /><br />

            <Footer />

        </div>
    )
}
