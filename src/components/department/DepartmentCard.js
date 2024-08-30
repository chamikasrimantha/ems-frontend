import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { updateDepartment, deleteDepartment } from '../../services/api/department.service';

const DepartmentCard = ({ department, onEdit, onDelete }) => {
  // Inline styles
  const cardStyle = {
    margin: '10px',
    padding: '15px',
    maxWidth: '330px',
    borderRadius: '8px',
    border: '0.1px solid #DEDDDD',
  };

  const nameStyle = {
    fontWeight: 'bold',
    marginBottom: '8px',
    textAlign: 'left',
  };

  const descriptionStyle = {
    marginTop: '12px',
    textAlign: 'left',
  };

  return (
    <div className="mb-3" style={cardStyle}>
      <CardContent>
        <Typography variant="h6" style={nameStyle}>
          {department.name}
        </Typography>
        <Typography variant="body1" style={descriptionStyle}>
          {department.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '12px', marginRight: '10px' }}
          onClick={onEdit} // Trigger edit action
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: '12px' }}
          onClick={onDelete} // Trigger delete action
        >
          Delete
        </Button>
      </CardContent>
    </div>
  );
};

export default DepartmentCard;
