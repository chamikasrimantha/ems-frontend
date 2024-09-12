import React from 'react';
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const SuperAdminProtectedRoutes = () => {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    if (!token) {
        navigate('/superadmin/signin');
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return <Outlet />

}

export default SuperAdminProtectedRoutes;