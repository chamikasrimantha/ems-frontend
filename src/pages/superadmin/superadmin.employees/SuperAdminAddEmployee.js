import React from 'react';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import Footer from '../../../components/footer/Footer';
import AddEmployee from '../../../components/employee/AddEmployee';

export default function SuperAdminAddEmployee() {
    return (
        <div>
            <SuperAdminNavBar />
            <AddEmployee />
            <br/><br/>
            <Footer />
        </div>
    )
}
