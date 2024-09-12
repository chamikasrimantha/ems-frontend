import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Card, CardContent, CardActions } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

export default function EmployeeCardAdminSide({ employee }) {
    const {
        id,
        firstname,
        lastname,
        dob,
        email,
        age,
        nic,
        designation
    } = employee;

    const isMobile = useMediaQuery('(max-width:600px)');

    const cardStyle = {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        border: '0.1px solid #DEDDDD',
        padding: '16px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    };

    const sectionStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align items flex-start for more space on the left
        flexDirection: isMobile ? 'column' : 'row',
    };

    const leftSection = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: '1.5', // Larger left section
        // marginBottom: isMobile ? '16px' : '0',
        minWidth: 0, // Allow text to overflow and ellipsis if needed
    };

    const rightSection = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        // backgroundColor: '#1B68DD',
        // borderRadius: '10px',
        // padding: '10px',
        // color: 'white',
        flex: '1',
        // marginBottom: isMobile ? '0' : '10px',
        marginLeft: isMobile ? '0' : '20px',
    };

    const buttonContainerStyle = {
        marginLeft: '10px',
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '0px',
    };

    const textEllipsisStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    return (
        <div>
            <Card style={cardStyle}>
                <CardContent style={sectionStyle}>
                    <div style={leftSection}>
                        <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '1.25rem', ...textEllipsisStyle }}>
                            {firstname} {lastname}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '10px', fontSize: '1rem', ...textEllipsisStyle }} color="textSecondary">
                            <b>Email:</b> {email}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '10px', fontSize: '1rem', ...textEllipsisStyle }} color="textSecondary">
                            <b>Dob:</b> {dob}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '10px', fontSize: '1rem', ...textEllipsisStyle }} color="textSecondary">
                            <b>Age:</b> {age}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '10px', fontSize: '1rem', ...textEllipsisStyle }} color="textSecondary">
                            <b>NIC:</b> {nic}
                        </Typography>
                        <Typography variant="h6" style={{ marginTop: '10px', fontSize: '1rem', ...textEllipsisStyle }} color="textSecondary">
                            <b>Designation:</b> {designation}
                        </Typography>
                    </div>
                    {/* <div style={rightSection}>
                        <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                            {propertyName}
                        </Typography>
                        <Typography variant="h6" style={{ marginTop: '10px', fontSize: '1rem' }} color="textSecondary">
                            <b>Price:</b> {totalPrice} LKR
                        </Typography>
                    </div> */}
                </CardContent>
                <CardActions style={buttonContainerStyle}>
                    <Link to={`/admin/employees/${id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" size="small">
                            View
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    );
}
