import React, { useState } from 'react';
import { superAdminLogin, getUsersById } from '../../../services/api/user.service';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

export default function SuperAdminSignIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "password": password
        }
        try {
            const response = await superAdminLogin(data);
            if (response.status === 200) {
                const { token, userId } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Now check the user role
                const userResponse = await getUsersById(userId);
                const { role } = userResponse.data;

                if (role === 'SUPERADMIN') {
                    alert("SignIn Successful");
                    navigate("/superadmin/dashboard");
                } else {
                    alert("Unauthorized! Only SUPERADMINs can log in.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                }

                // alert("SignIn Successful");
                // navigate("/superadmin/dashboard");
            } else {
                alert("Username or password is incorrect!");
                console.log("LogIn Error");
            }
        } catch (error) {
            console.error("LogIn Error!", error);
        }
    }

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1a1a2e", // Dark navy blue background
                textAlign: "center",
                color: "#e0e0e0", // Light grey text color
                margin: "0",
                padding: "0",
            }}
        >
            <Paper elevation={3} style={{ padding: "30px", maxWidth: "400px", width: "90%", backgroundColor: "white" }}>
                <Typography variant="h5" gutterBottom style={{ color: "#1a1a2e", fontWeight: "bold" }}>
                    Super Admin - SignIn
                </Typography>
                <Box component="form" onSubmit={login} sx={{ mt: 2 }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: "20px", backgroundColor: "" }}
                        InputProps={{
                            style: { color: "#1a1a2e" },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: "20px", backgroundColor: "" }}
                        InputProps={{
                            style: { color: "#1a1a2e" },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        style={{
                            backgroundColor: "#0f4c75", // Deep blue color
                            color: "#ffffff",
                            padding: "12px 24px",
                            borderRadius: "25px",
                            fontWeight: "bold",
                            textTransform: "none" // Disable uppercase
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
            <footer style={{
                marginTop: "auto",
                padding: "20px",
                backgroundColor: "#0f4c75", // Match footer with button color
                color: "#ffffff",
                width: "100%",
                textAlign: "center",
                position: "absolute",
                bottom: 0,
            }}>
                <Typography variant="body2">© EMS - Benjarong Pvt Ltd. All rights reserved.</Typography>
            </footer>
        </div>
    )
}
