import axios from "axios";

export const createDepartment = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/departments`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while creating department");
        return error;
    }
}

export const getAllDepartments = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/departments`
        );
        return response;
    } catch (error) {
        console.log("Error while getting all departments");
        return error;
    }
}

export const getDepartmentById = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/departments/${id}`
        );
        return response;
    } catch (error) {
        console.log("Error while getting department by id");
        return error;
    }
}

export const updateDepartment = async (id, data) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/departments/${id}`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while updating deparment");
        return error;
    }
}

export const deleteDepartment = async (id) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/departments/${id}`
        );
        return response;
    } catch (error) {
        console.log("Error while deleting department");
        return error;
    }
}