import axios from "axios";

export const addMonth = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/month`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while adding month");
        return error;
    }
}

export const getAllMonths = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/month`
        );
        return response;
    } catch (error) {
        console.log("Error while getting all months");
        return error;
    }
}

export const updateMonth = async (id, data) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/month/${id}`,
            data
        );
        return response;
    } catch (error) {
        console.log("Error while updating month");
        return error;
    }
}

export const deleteMonth = async (id) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/month/${id}`
        );
        return response;
    } catch (error) {
        console.log("Error while deleting month");
        return error;
    }
}