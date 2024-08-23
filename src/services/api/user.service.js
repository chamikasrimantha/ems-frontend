import axios from "axios";

export const superAdminRegister = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/superadmin/register`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while registering a new superadmin", error);
        return error;
    }
}

export const superAdminLogin = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/superadmin/login`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while superadmin login");
        return error;
    }
}

export const adminRegister = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/admin/register`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while registering a new admin");
        return error;
    }
}

export const adminLogin = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/admin/login`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while admin login");
        return error;
    }
}

export const getUsersById = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${id}`
        );
        return response;
    } catch (error) {
        console.log("Error while getting users by id");
        return error;
    }
}

export const getAllSuperAdmins = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/superadmin`
        );
        return response;
    } catch (error) {
        console.log("Error while getting all superadmins");
        return error;
    }
}

export const getAllAdmins = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/admin`
        );
        return response;
    } catch (error) {
        console.log("Error while getting all admins");
        return error;
    }
}

export const updateSuperAdmin = async (id, data) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/superadmin/${id}`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while updating super admin");
        return error;
    }
}

export const updateAdmin = async (id, data) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/${id}`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while updating admin");
        return error;
    }
}

export const changeSuperAdminPassword = async (id, password) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/superadmin/${id}/change-password`,
            password
        );
        return response;
    } catch (error) {
        console.log("Error while changing superadmin password");
        return error;
    }
}

export const changeAdminPassword = async (id, password) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/${id}/change-password`,
            password
        );
        return response;
    } catch (error) {
        console.log("Error while changing admin password");
        return error;
    }
}