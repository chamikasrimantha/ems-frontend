import React from 'react';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import Footer from '../../../components/footer/Footer';
import AdminProfileCard from '../../../components/profile/AdminProfileCard';

export default function AdminProfile() {

    return (
        <div>
            <AdminNavBar />
            <AdminProfileCard />
            <Footer />
        </div>
    )
}
