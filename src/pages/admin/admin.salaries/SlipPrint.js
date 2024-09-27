import React, { forwardRef } from 'react';
import { Table } from 'react-bootstrap';

const SlipPrint = forwardRef(({ salaries, departmentName }, ref) => {

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    const tableStyle = {
        width: '100%',
        marginBottom: '5px',
        fontSize: '12px',
        wordWrap: 'break-word',
        fontFamily: 'Times New Roman, Times, serif',
        borderCollapse: 'collapse', // Ensure borders collapse into a single line
        border: '1px solid #000', // Darker border color and increased thickness
    };

    const cellStyle = {
        padding: '3px',
        fontFamily: 'Times New Roman, Times, serif', // Add this line
    };

    const headerStyle = {
        textAlign: 'center',
        fontSize: '0.75rem',
        fontFamily: 'Times New Roman, Times, serif', // Add this line
    };

    const sectionStyle = {
        marginBottom: '10px',
    };

    return (
        <div ref={ref} style={{ padding: '5px' }}>
            {salaries.map((salary, index) => (
                <div key={salary.id} style={{ pageBreakAfter: (index + 1) % 2 === 0 ? 'always' : 'auto', marginBottom: '30px' }}>
                    <Table bordered hover size="sm" style={tableStyle}>
                        <thead>
                            <tr>
                                <th colSpan="4" style={{ ...headerStyle, textAlign: 'left' }}>
                                    Benjarong Pvt Ltd | {departmentName}
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
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.employeeEntity.basicSalary)}</td>
                                <td style={{ ...cellStyle, fontWeight: 'bold', textAlign: 'center' }} colSpan="2">Additions</td>
                            </tr>
                            <tr>
                                <td style={cellStyle}>Budgetary Relief Allowance:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.employeeEntity.budgetaryReliefAllowance)}</td>
                                <td style={cellStyle}>Normal OT:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber((((salary.basicSalary + salary.budgetaryReliefAllowance) / 240) * salary.normalOverTime) * 1.5)}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={cellStyle}>No Pay:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.noPay)}</td>
                                <td style={cellStyle}>Double OT:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.doubleOverTime)}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={{ ...cellStyle, fontWeight: 'bold' }}>(A) Total Salary:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.totalForEpf)}</td>
                                <td style={{ ...cellStyle, fontWeight: 'bold' }}>(B) Total Additions:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.totalAddition)}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>(A+B) Gross Pay:</td>
                                <td colSpan="2" style={{ textAlign: 'right' }}>{formatNumber(salary.grossSalary)}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td colSpan="4" style={{ ...cellStyle, fontWeight: 'bold', textAlign: 'center' }}>Less (Deductions)</td>
                            </tr>
                            <tr>
                                <td style={cellStyle}>EPF 8%</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.eightPresentEpf)}</td>
                                <td style={cellStyle}>APIIT:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.apiitValue)}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={cellStyle}>Salary Advance:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.salaryAdvance)}</td>
                                <td style={cellStyle}>Loan:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.staffLoan)}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={cellStyle}>Cash Float:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.cashFloat)}</td>
                                <td style={cellStyle}>Staff Debtors:</td>
                                <td style={{ textAlign: 'right' }}>{formatNumber(salary.staffDebtors)}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>(C) Total Deduction:</td>
                                <td colSpan="2" style={{ textAlign: 'right' }}>{formatNumber(salary.totalDeduction)}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>(A+B-C) Net Salary:</td>
                                <td colSpan="2" style={{ textAlign: 'right' }}>{formatNumber(salary.netSalary)}</td>
                            </tr>
                            <tr style={{ height: '20px' }}>
                                <td colSpan="2">
                                    <td style={{ padding: '10px', textAlign: 'left' }}>
                                        EPF 12%: {formatNumber(salary.twelvePresentEpf)}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'left' }}>
                                        EPF 20%: {formatNumber(salary.twentyPresentEpf)}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'left' }}>
                                        ETF 3%: {formatNumber(salary.threePresentEtf)}
                                    </td>
                                </td>

                                <td colSpan="2" style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                                    Signature: ____________________________________
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
