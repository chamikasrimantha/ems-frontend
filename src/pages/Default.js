import React from "react";
import { Button, Typography, Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Default = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small or extra-small

    const navigate = useNavigate();

    const gotoSuperAdminSignIn = () => {
        navigate('/superadmin/signin');
    }

    const gotoAdminSignIn = () => {
        navigate('/admin/signin');
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
            <Typography variant="h2" component="h1" gutterBottom style={{ color: "#f5f5f5", fontWeight: "bold" }}>
                EMS
            </Typography>
            <Box mt={4}>
                <Grid container spacing={2} direction={isMobile ? "column" : "row"} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            size="large"
                            style={{
                                backgroundColor: "#0f4c75", // Deep blue color
                                color: "#ffffff",
                                marginBottom: isMobile ? "15px" : "0", // Add margin on mobile view
                                padding: "12px 24px",
                                borderRadius: "25px", // Rounded buttons
                                fontWeight: "bold",
                                textTransform: "none" // Disable uppercase
                            }}
                            onClick={gotoSuperAdminSignIn}
                        >
                            Login as Super Admin
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="large"
                            style={{
                                backgroundColor: "#3282b8", // Lighter blue color
                                color: "#ffffff",
                                padding: "12px 24px",
                                borderRadius: "25px",
                                fontWeight: "bold",
                                textTransform: "none"
                            }}
                            onClick={gotoAdminSignIn}
                        >
                            Login as Admin
                        </Button>
                    </Grid>
                </Grid>
            </Box>
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
    );
}

export default Default;
