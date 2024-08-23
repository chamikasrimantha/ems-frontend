import axios from "axios";

export const addEmployee = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/employees`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while adding employee");
        return error;
    }
}

export const getAllEmployees = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/employees`
        );
        return response;
    } catch (error) {
        console.log("Error while getting all employees");
        return error;
    }
}

export const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/employees/${id}`
        );
        return response;
    } catch (error) {
        console.log("Error while getting employee by id");
        return error;
    }
}

export const updateEmployee = async (id, data) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/employees/${id}`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while updating employee");
        return error;
    }
}

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/employees/${id}`
        );
        return response;
    } catch (error) {
        console.log("Error while deleting employee");
        return error;
    }
}

export const getEmployeesByDepartments = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/departments/${id}/employees`
        );
        return response;
    } catch (error) {
        console.log("Error while getting employees by departments");
        return error;
    }
}