import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <div style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '10px' }}>
            <h1 style={{ marginTop: '20px', textAlign: 'center', fontSize: '24px', marginBottom: '30px' }}>BENJARONG.lk</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
                <div style={{ borderRadius: '50%', backgroundColor: 'white', padding: '10px', margin: '10px', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaFacebookF style={{ color: '#043E96', cursor: 'pointer' }} />
                </div>
                <div style={{ borderRadius: '50%', backgroundColor: 'white', padding: '10px', margin: '10px', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaInstagram style={{ color: '#043E96', cursor: 'pointer' }} />
                </div>
                <div style={{ borderRadius: '50%', backgroundColor: 'white', padding: '10px', margin: '10px', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaLinkedinIn style={{ color: '#043E96', cursor: 'pointer' }} />
                </div>
                <div style={{ borderRadius: '50%', backgroundColor: 'white', padding: '10px', margin: '10px', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaTwitter style={{ color: '#043E96', cursor: 'pointer' }} />
                </div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <a href="#privacy-policy" style={{ color: 'white', marginRight: '30px', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="#terms-conditions" style={{ color: 'white', marginRight: '30px', textDecoration: 'none' }}>Terms and Conditions</a>
                <a href="#cookies" style={{ color: 'white', textDecoration: 'none' }}>Cookies</a>
            </div>
            <p style={{ textAlign: 'center', fontSize: '12px' }}>Copyright © EMS - Benjarong Pvt Ltd. All rights reserved.</p>
        </div>
    )
}