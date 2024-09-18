import React from 'react';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import Footer from '../../../components/footer/Footer';
import SuperAdminProfileCard from '../../../components/profile/SuperAdminProfileCard';

export default function SuperAdminProfile() {

  return (
    <div>
        <SuperAdminNavBar />
        <SuperAdminProfileCard />
        <Footer />
    </div>
  )
}
