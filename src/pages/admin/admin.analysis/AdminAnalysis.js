import React from 'react';
import Footer from '../../../components/footer/Footer';
import AdminNavBar from '../../../components/navbar/AdminNavBar';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export default function AdminAnalysis() {

    // Custom styles
    const styles = {
        card: {
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            marginBottom: '1.5rem',
        },
        cardHover: {
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
        },
        header: {
            color: '#333',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        paragraph: {
            color: '#555',
            fontSize: '1.1rem',
            textAlign: 'center',
        },
        button: {
            display: 'inline-block',
            padding: '12px 25px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#043E96',
            borderRadius: '30px',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            margin: '10px',
        },
        buttonHover: {
            backgroundColor: '#2F5E99',
            transform: 'scale(1.05)',
        },
        cardBody: {
            padding: '20px',
        },
        listItem: {
            marginBottom: '1rem',
            fontSize: '1.1rem',
        },
        cardTitle: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
        nestedCard: {
            borderRadius: '8px',
            marginBottom: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
        },
        nestedCardHeader: {
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            fontSize: '1.2rem',
        },
    };

    return (
        <div>
            <AdminNavBar />

            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={10}>
                        {/* Contact Us Section */}
                        <Card
                            style={styles.card}
                            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = styles.card.boxShadow)}
                        >
                            <Card.Body style={styles.cardBody}>
                                <h4 style={styles.header}>Contact Us</h4>
                                <p style={styles.paragraph}>
                                    For inquiries, feel free to get in touch with us. Extra features are available on request!
                                </p>

                                <div className="text-center">
                                    <a
                                        style={styles.button}
                                        href="mailto:easycattechnologies@gmail.com"
                                    >
                                        Email Us
                                    </a>
                                </div>

                                <div className="text-center mt-4">
                                    <a
                                        style={styles.button}
                                        href="https://www.easycat.live"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visit Our Website
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Employee & Salary Management System Section */}
                        <Card
                            style={styles.card}
                            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = styles.card.boxShadow)}
                        >
                            <Card.Body style={styles.cardBody}>
                                <h5 style={styles.header}>Employee & Salary Management System</h5>
                                <p style={styles.paragraph}>
                                    This system is designed to help organizations manage employee details and salaries efficiently. Below are some of its key features:
                                </p>

                                <Row>

                                    {/* Department management Feature */}
                                    <Col md={6}>
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>Department Management</h6>
                                                <p>Manage and update department details.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Employee Data Management Feature */}
                                    <Col md={6}>
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>Employee Data Management</h6>
                                                <p>Manage and update employee profiles, roles, and contact details.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* SUPERADMIN & ADMIN management Feature */}
                                    <Col md={6}>
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>System Management</h6>
                                                <p>Manage and update SUPERADMIN & ADMIN details.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Salary Processing Feature */}
                                    <Col md={6}>
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>Salary Processing & Calculation</h6>
                                                <p>Calculate and process employee salaries based on hours worked or fixed amounts.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Payroll Generation Feature */}
                                    <Col md={6}>
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>Payroll Generation</h6>
                                                <p>Generate payslips, allowance slips, and salary sheets for employees.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Attendance & Leave Management */}
                                    <Col md={6}>
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>Attendance Management</h6>
                                                <p>Track attendances efficiently.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>


                            </Card.Body>
                        </Card>

                        {/* Extra Features Section */}

                        <Card
                            style={styles.card}
                            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = styles.card.boxShadow)}
                        >
                            <Card.Body style={styles.cardBody}>
                                <h5 style={styles.header} className="mb-4">
                                    Extra Features Available on Request
                                </h5>
                                <Row>
                                    {/* Analysis Feature */}
                                    <Col md={4} className="mb-4">
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>Advanced Analytics</h6>
                                                <p>Gain insights from employee performance, attendance, and salary distribution.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Custom Reports Feature */}
                                    <Col md={4} className="mb-4">
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>Custom Reports</h6>
                                                <p>Generate customized reports based on various employee and salary parameters.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Feature Customization */}
                                    <Col md={4} className="mb-4">
                                        <Card style={styles.nestedCard}>
                                            <Card.Body>
                                                <h6 style={styles.nestedCardHeader}>Feature Customization</h6>
                                                <p>Customize the system with additional features tailored to your organization's needs.</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <a style={styles.button} href="mailto:easycattechnologies@gmail.com">
                                        Request
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    )
}
