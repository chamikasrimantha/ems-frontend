import React from 'react';
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const AdminProtectedRoutes = () => {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    if (!token) {
        navigate('/admin/signin');
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return <Outlet />

}

export default AdminProtectedRoutes;