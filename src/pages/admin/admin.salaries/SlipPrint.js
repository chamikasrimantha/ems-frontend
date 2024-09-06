import React, { forwardRef } from 'react';
import { Table } from 'react-bootstrap';

const SlipPrint = forwardRef(({ salaries, departmentName }, ref) => {

    const tableStyle = {
        width: '100%',
        marginBottom: '5px',
        fontSize: '10px',
        wordWrap: 'break-word',
    };

    const cellStyle = {
        padding: '5px',
    };

    const headerStyle = {
        textAlign: 'center',
        fontSize: '0.75rem',
    };

    const sectionStyle = {
        marginBottom: '10px',
    };

    return (
        <div ref={ref} style={{ padding: '5px' }}>
            {salaries.map((salary, index) => (
                <div key={salary.id} style={{ pageBreakAfter: (index + 1) % 2 === 0 ? 'always' : 'auto', marginBottom: '40px' }}>
                    <Table bordered hover size="sm" style={tableStyle}>
                        <thead>
                            <tr>
                                <th colSpan="4" style={{ ...headerStyle, textAlign: 'left' }}>
                                    Benjarong Pvt Ltd - {departmentName}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ ...cellStyle, fontWeight: 'bold' }}>Employee Name:</td>
                                <td>{salary.employeeEntity.surname} {salary.employeeEntity.firstname} {salary.employeeEntity.lastname}</td>
                                <td style={{ ...cellStyle, fontWeight: 'bold' }}>Date:</td>
                                <td>{salary.dateValue}</td>
                            </tr>
                            <tr>
                                <td style={{ ...cellStyle, fontWeight: 'bold' }}>EPF No:</td>
                                <td>{salary.employeeEntity.epf}</td>
                                <td style={{ ...cellStyle, fontWeight: 'bold' }}>Month:</td>
                                <td>{salary.monthEntity.name}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={cellStyle}>Basic Salary:</td>
                                <td>{salary.employeeEntity.basicSalary}</td>
                                <td style={{ ...cellStyle, fontWeight: 'bold', textAlign: 'center' }} colSpan="2">Additions</td>
                            </tr>
                            <tr>
                                <td style={cellStyle}>Budgetary Relief Allowance:</td>
                                <td>{salary.employeeEntity.budgetaryReliefAllowance}</td>
                                <td style={cellStyle}>Normal OT:</td>
                                <td>{salary.normalOverTime}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={cellStyle}>No Pay:</td>
                                <td>{salary.noPay}</td>
                                <td style={cellStyle}>Double OT:</td>
                                <td>{salary.doubleOverTime}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={{ ...cellStyle, fontWeight: 'bold' }}>Total Salary:</td>
                                <td>{salary.totalForEpf}</td>
                                <td style={{ ...cellStyle, fontWeight: 'bold' }}>Total Additions:</td>
                                <td>{salary.totalAddition}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>Gross Pay:</td>
                                <td colSpan="2">{salary.grossSalary}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td colSpan="4" style={{ ...cellStyle, fontWeight: 'bold', textAlign: 'center' }}>Less (Deductions)</td>
                            </tr>
                            <tr>
                                <td style={cellStyle}>EPF 8%</td>
                                <td>{salary.eightPresentEpf}</td>
                                <td style={cellStyle}>APIIT:</td>
                                <td>{salary.apiitValue}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={cellStyle}>Salary Advance:</td>
                                <td>{salary.salaryAdvance}</td>
                                <td style={cellStyle}>Loan:</td>
                                <td>{salary.staffLoan}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>Total Deduction:</td>
                                <td colSpan="2">{salary.totalDeduction}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>Net Salary:</td>
                                <td colSpan="2">{salary.netSalary}</td>
                            </tr>
                            <tr>
                                <td colSpan="4" style={{ ...cellStyle, textAlign: 'right', fontWeight: 'bold' }}>
                                    Signature: ____________________
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
});

export default SlipPrint;
