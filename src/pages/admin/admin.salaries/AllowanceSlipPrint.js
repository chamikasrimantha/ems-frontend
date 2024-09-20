import React, { forwardRef } from 'react';
import { Table } from 'react-bootstrap';

const AllowanceSlipPrint = forwardRef(({ salaries, departmentName }, ref) => {

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    const tableStyle = {
        width: '100%',
        height: '30%',
        marginBottom: '5px',
        fontSize: '10px',
        wordWrap: 'break-word',
        fontFamily: 'Times New Roman, Times, serif',
        borderCollapse: 'collapse', // Ensure borders collapse into a single line
        border: '1px solid #000', // Darker border color and increased thickness
    };

    const cellStyle = {
        padding: '5px',
        fontFamily: 'Times New Roman, Times, serif', // Add this line
    };

    const headerStyle = {
        textAlign: 'center',
        fontSize: '0.75rem',
        fontFamily: 'Times New Roman, Times, serif', // Add this line
    };

    const headerStyle1 = {
        textAlign: 'center',
        fontSize: '0.65rem',
        fontFamily: 'Times New Roman, Times, serif', // Add this line
    };

    const sectionStyle = {
        marginBottom: '10px',
    };

    return (
        <div ref={ref} style={{ padding: '1px' }}>
            {salaries.map((salary, index) => (
                <div key={salary.id} style={{ pageBreakAfter: (index + 1) % 3 === 0 ? 'always' : 'auto', marginBottom: '10px' }}>
                    <Table bordered hover size="sm" style={tableStyle}>
                        <thead>
                            <tr>
                                <th colSpan="4" style={{ ...headerStyle, textAlign: 'left' }}>
                                    Benjarong Pvt Ltd - {departmentName}
                                </th>
                            </tr>
                            <tr>
                                <th colSpan="4" style={{ ...headerStyle1, textAlign: 'left' }}>
                                    CASH/ ONLINE/ CHEQUE PAYMENT VOUCHER
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ ...cellStyle }}>Employee Name:</td>
                                <td>{salary.employeeEntity.surname} {salary.employeeEntity.firstname} {salary.employeeEntity.lastname}</td>
                                <td style={{ ...cellStyle }}>Date:</td>
                                <td>{salary.dateValue}</td>
                            </tr>
                            <tr>
                                <td style={{ ...cellStyle }}>Designation:</td>
                                <td>{salary.employeeEntity.designation}</td>
                                <td style={{ ...cellStyle }}>Month:</td>
                                <td>{salary.monthEntity.name}</td>
                            </tr>

                            <tr style={{ height: '20px' }}>
                                <th colSpan="2" style={{ ...cellStyle, fontWeight: 'bold', textAlign: 'center' }}>Particulars</th>
                                <th colSpan="2" style={{ ...cellStyle, fontWeight: 'bold', textAlign: 'center' }}>Amount</th>
                            </tr>

                            <tr style={{ height: '20px' }}>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>Special allowance: </td>
                                <td colSpan="2" style={{ ...cellStyle, textAlign: 'right' }}>{formatNumber(salary.specialAllowance)}</td>
                            </tr>

                            <tr style={{ height: '20px' }}>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>Travelling allowance: </td>
                                <td colSpan="2" style={{ ...cellStyle, textAlign: 'right' }}>{formatNumber(salary.travellingAllowance)}</td>
                            </tr>

                            <tr style={{ height: '20px' }}>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>Service charges: </td>
                                <td colSpan="2" style={{ ...cellStyle, textAlign: 'right' }}>{formatNumber(salary.serviceCharges)}</td>
                            </tr>

                            <tr style={{ height: '20px' }}>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold' }}>Total: </td>
                                <td colSpan="2" style={{ ...cellStyle, fontWeight: 'bold', textAlign: 'right' }}>{formatNumber((salary.specialAllowance) + (salary.travellingAllowance) + (salary.serviceCharges))}</td>
                            </tr>

                            <tr style={{ height: '20px' }}>
                                <td colSpan="2" style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                                    Prepared by: ____________________________________
                                </td>

                                <td colSpan="2" style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                                    Received by: ____________________________________
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
});

export default AllowanceSlipPrint;
