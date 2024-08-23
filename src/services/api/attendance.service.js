import axios from "axios";

export const uploadAttendanceFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/attendance`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        console.log("Error while uploading attendance file");
        return error;
    }
}

export const getAllAttendances = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/attendances`
        );
        return response;
    } catch (error) {
        console.log("Error while getting all attendances");
        return error;
    }
}

export const getAttendancesByEmployee = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/employees/${id}/attendances`
        );
        return response;
    } catch (error) {
        console.log("Error while getting attendances by employee");
        return error;
    }
}

export const getAttendancesByEmployeeAndDateRange = async (employeeId, startDate, endDate) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/attendance/employee/${employeeId}/range`, 
            { 
                params: { 
                    startDate: startDate, 
                    endDate: endDate 
                } 
            }
        );
        return response;
    } catch (error) {
        console.log("Error while getting attendances by employee and date range");
        return error;
    }
}

export const getAttendancesByDateRange = async (startDate, endDate) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/attendance/range`, 
            { 
                params: { 
                    startDate: startDate, 
                    endDate: endDate 
                } 
            }
        );
        return response;
    } catch (error) {
        console.log("Error while getting attendances by date range");
        return error;
    }
}