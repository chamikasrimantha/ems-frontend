import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../../../services/api/employee.service';
import { Button, Container, Typography } from '@mui/material';
import ReactToPrint from 'react-to-print';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import Footer from '../../../components/footer/Footer';

const SuperAdminIssueLetter = React.forwardRef(({ employee, date }, ref) => (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Typography gutterBottom>
            Benjarong Pvt Ltd
            <br />
            291/A, Havelock road
            <br />
            Colombo
            <br />
            {date}
        </Typography>
        {/* <Typography gutterBottom>
            {employee?.firstname} {employee?.lastname}
            <br />
            {employee?.address}
        </Typography> */}
        <br />
        <Typography gutterBottom>
            Dear {employee?.firstname} {employee?.lastname},
        </Typography>
        <br />
        <Typography paragraph>
            We are pleased to offer you the position of {employee?.designation} at Benjarong Pvt Ltd ({employee?.departmentEntity?.name}). We are excited about the potential that you bring to our team and look forward to your contributions.
        </Typography>
        <Typography paragraph>
            Your joining date is scheduled for {employee?.wef}. As discussed, your initial salary will be {employee?.basicSalary} with a budgetary relief allowance of {employee?.budgetaryReliefAllowance}. Please review the attached documents for further details.
        </Typography>
        <Typography paragraph>
            We welcome you to our company and hope you have a successful career with us. If you have any questions or need further assistance, please do not hesitate to contact us.
        </Typography>
        <br />
        <Typography paragraph>
            Best Regards,
            <br />
            Human Resources,
            <br />
            Benjarong Pvt Ltd
        </Typography>
    </div>
));

export default SuperAdminIssueLetter;