import React from 'react';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import AddAdmin from '../../../components/admin/AddAdmin';
import Footer from '../../../components/footer/Footer';

export default function SuperAdminAddAdmins() {

    return (
        <div>
            <SuperAdminNavBar />
            <AddAdmin />
            <br/><br/><br/>
            <Footer />
        </div>
    )
}
