import axios from "axios";

export const saveSalary = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/salaries`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while saving salary");
        return error;
    }
}

export const getAllSalaries = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/salaries`
        );
        return response;
    } catch (error) {
        console.log("Error while getting all salaries");
        return error;
    }
}

export const getSalariesById = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/salaries/${id}`
        );
        return response;
    } catch (error) {
        console.log("Error while getting salaries by id");
        return error;
    }
}

export const updateSalary = async (id, data) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/salaries/${id}`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while updating salary");
        return error;
    }
}

export const deleteSalary = async (id) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/salaries/${id}`
        );
        return response;
    } catch (error) {
        console.log("Error while deleting salary");
        return error;
    }
}

export const getSalariesByEmployee = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/employees/${id}/salaries`
        );
        return response;
    } catch (error) {
        console.log("Error while getting salaries by employee");
        return error;
    }
}

export const getSalariesByMonth = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/month/${id}/salaries`
        );
        return response;
    } catch (error) {
        console.log("Error while getting salaries by month");
        return error;
    }
}