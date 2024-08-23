import React, { useEffect, useState } from 'react';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../../../services/api/department.service';
import SuperAdminNavBar from '../../../components/navbar/SuperAdminNavBar';
import { Col, Container, Row } from 'react-bootstrap';
import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Footer from '../../../components/footer/Footer';
import DepartmentCard from '../../../components/department/DepartmentCard';

export default function SuperAdminDepartment() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [departments, setDepartments] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editDepartmentId, setEditDepartmentId] = useState(null);

    const fetchAllDepartments = async () => {
        const response = await getAllDepartments();
        setDepartments(response.data);
        console.log(response);
    };

    useEffect(() => {
        fetchAllDepartments();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setName("");
        setDescription("");
    };

    const handleEditClick = (department) => {
        setName(department.name);
        setDescription(department.description);
        setEditDepartmentId(department.id);
        setEditMode(true);
        setOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name,
            description,
        };
        let response;
        if (editMode) {
            response = await updateDepartment(editDepartmentId, data);
        } else {
            response = await createDepartment(data);
        }
        if (response.status === 200) {
            alert(editMode ? "Department updated" : "Department added");
            fetchAllDepartments(); // Refresh departments list
            handleClose();
        } else {
            console.error("Error saving department", response);
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        const response = await deleteDepartment(id);
        if (response.status === 200) {
            alert("Department deleted");
            fetchAllDepartments(); // Refresh the department list
        } else {
            console.error("Failed to delete department");
        }
    };

    return (
        <div>
            <SuperAdminNavBar />

            {/* Top */}
            <Container fluid>
                <div className="d-flex justify-content-between align-items-center mt-4" style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <div>
                        <h4 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.25rem' }}>Manage your departments</h4>
                        <p style={{ textAlign: 'left' }}>Click on each department to edit/ update or delete</p>
                    </div>
                    <div>
                        <ButtonBase
                            style={{
                                backgroundColor: '#184D9D',
                                color: 'white',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={handleClickOpen}
                        >
                            <AddCircleOutlineIcon style={{ marginRight: '10px' }} />Add new department
                        </ButtonBase>
                    </div>
                </div>
            </Container>

            {/* Departments */}
            <Container fluid>
                <Row style={{ marginLeft: '02%', marginRight: '02%', marginTop: '10px' }} xs={1} md={3} className="g-1 justify-content-center">
                    {departments.map((department, index) => (
                        <Col key={index} className="d-flex justify-content-center">
                            <DepartmentCard
                                department={department}
                                onEdit={() => handleEditClick(department)} // Pass edit function to card
                                onDelete={() => handleDelete(department.id)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            <br /><br />

            <Footer />

            {/* Add/Edit Department Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? "Edit Department" : "Add New Department"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editMode ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
