// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";

const SalaryComponent = (props) => {
    const highlightColor = '#f7d493';
    const secondHighlightColor = '#94cddf';
    // const getFormattedNum = (number) => {
    //     return number.toLocaleString("en-US");
    // };
    const getTotalPayableSalary = (annual_ctc, total_days, working_days) => {
        return parseFloat(((annual_ctc / 12) / total_days) * working_days).toFixed(2);
    };

    const [final_inr_salary, setInrSalary] = useState([]);
    const [final_usd_salary, setUsdSalary] = useState([]);
    const [allTotals, setTotals] = useState({});

    useEffect(() => {
        const jsonData = props.salaryData;
        if (jsonData && jsonData.length) {
            const inrEmps = [];
            const usdEmps = [];
            let total_inr_ctc = 0;
            let total_usd_ctc = 0;
            let total_inr_monthly_ctc = 0;
            let total_usd_monthly_ctc = 0;

            let total_inr_monthly_payable = 0;
            let total_usd_monthly_payable = 0;

            jsonData.forEach(empData => {
                const name = empData['Full name'];
                if (name) {
                    const dataObj = {
                        s_no: empData['Serial No.'],
                        name: empData['Full name'],
                        designation: empData['Designation'],
                        doj: '21/01/2022',//currently data not available in list
                        dor: '',//currently data not available in list
                        working_days: empData['Paid days'],
                        ann_ctc: empData[' total employee cost'],
                        monthly_ctc: (parseFloat(empData[' total employee cost']) / 12).toFixed(2),
                        bonus: '',
                        arrears: '',
                        other_payout: '',
                        reimbursements: '',
                        total_payable: getTotalPayableSalary(empData[' total employee cost'], props.totalDays, empData['Paid days']),
                        remarks: ''
                    };

                    if (name.charAt(0) === 'E') {
                        dataObj.currency = 'INR';
                        total_inr_ctc += parseFloat(dataObj.ann_ctc);
                        total_inr_monthly_ctc += parseFloat(dataObj.monthly_ctc);
                        total_inr_monthly_payable += parseFloat(dataObj.total_payable);
                        inrEmps.push(dataObj);
                    } else {
                        dataObj.currency = 'USD';
                        total_usd_ctc += parseFloat(dataObj.ann_ctc);
                        total_usd_monthly_ctc += parseFloat(dataObj.monthly_ctc);
                        total_usd_monthly_payable += parseFloat(dataObj.total_payable);
                        usdEmps.push(dataObj);
                    }
                }

            });

            setInrSalary(inrEmps);
            setUsdSalary(usdEmps);

            const grossTotalInr = parseFloat(parseFloat(total_inr_monthly_payable) + parseFloat(total_usd_monthly_payable * props.conversionRate)).toFixed(2);

            const grossTotalUsd = parseFloat(grossTotalInr / props.conversionRate).toFixed(2);

            const totalInvoiceInr = parseFloat(parseFloat(grossTotalInr) + (props.consulting_rate * props.conversionRate)).toFixed(2);
            const totalInvoiceUsd = parseFloat(totalInvoiceInr / props.conversionRate).toFixed(2);
            setTotals({
                total_inr_ctc,
                total_usd_ctc,
                total_inr_monthly_ctc,
                total_usd_monthly_ctc,
                total_inr_monthly_payable,
                total_usd_monthly_payable,
                grossTotalInr,
                grossTotalUsd,
                totalInvoiceUsd,
                totalInvoiceInr
            });
        }

    }, [props.salaryData, props.totalDays, props.conversionRate, props.consulting_rate]);


    return (
        <div>
            {
                final_inr_salary && final_inr_salary.length &&
                <table>
                    <thead style={{ backgroundColor: highlightColor }}>
                        <tr>
                            <th style={{ padding: '10px 15px' }}><b>SI. No.</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Name</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Designation</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Date of Joining</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Date of Relieving</b></th>
                            <th style={{ padding: '10px 15px' }}><b>No. of Days(In a Month)</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Working Days(In a Month)</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Currency</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Current Annual CTC</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Monthly CTC</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Bonus</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Arrears</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Other Payout</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Total Salary</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Reimbursement</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Pay-out Amount (INR)</b></th>
                            <th style={{ padding: '10px 15px', backgroundColor: secondHighlightColor }}><b>Remarks</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            final_inr_salary.map((emp, index) => (
                                <tr>
                                    <td className="salCol1">{emp.s_no}</td>
                                    <td>{emp.name}</td>
                                    <td className="salCol3">{emp.designation}</td>
                                    <td className="salCol4">{emp.doj}</td>
                                    <td>{emp.dor}</td>
                                    <td className="salCol67">{props.totalDays}</td>
                                    <td className="salCol67">{emp.working_days}</td>
                                    <td className="salCol67">{emp.currency}</td>
                                    <td className="salCol9">{emp.ann_ctc}</td>
                                    <td className="salCol9">{emp.monthly_ctc}</td>
                                    <td>{emp.bonus}</td>
                                    <td>{emp.arrears}</td>
                                    <td>{emp.other_payout}</td>
                                    <td className="salCol9">{emp.total_payable}</td>
                                    <td>{emp.reimbursements}</td>
                                    <td className="salCol9">{emp.total_payable}</td>
                                    <td className="salCol17"><input style={{ border: 0 }} type="text" value={emp.remarks} onChange={(e) => {
                                        setInrSalary((prevState) => {
                                            const newArr = [...prevState];
                                            newArr[index].remarks = e.target.value;
                                            return newArr;
                                        })
                                    }} /></td>
                                </tr>
                            ))
                        }
                        {
                            final_inr_salary && final_inr_salary.length ?
                                (
                                    <>
                                        <tr style={{ backgroundColor: highlightColor }}>
                                            <td colSpan="7" className="salTotalSalaryHeading"><b>Total Salary (A)&nbsp;</b></td>
                                            <td className="salCol67"><b>INR</b></td>
                                            <td className="salCol9"><b>{allTotals.total_inr_ctc}</b></td>
                                            <td className="salCol9"><b>{allTotals.total_inr_monthly_ctc}</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>{allTotals.total_inr_monthly_ctc}</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>{allTotals.total_inr_monthly_payable}</b></td>
                                        </tr>

                                        <tr>
                                            <td colSpan="13" className="salTotalSalaryHeading"><b>USD Value&nbsp;</b></td>
                                            <td className="salCol9"><b>{parseFloat(allTotals.total_inr_monthly_ctc / props.conversionRate).toFixed(2)}</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>{parseFloat(allTotals.total_inr_monthly_payable / props.conversionRate).toFixed(2)}</b></td>
                                        </tr>
                                    </>
                                ) : ''
                        }
                    </tbody>
                </table>
            }
            {
                final_usd_salary && final_usd_salary.length &&
                <table>
                    <thead style={{ backgroundColor: highlightColor }}>
                        <tr>
                            <th style={{ padding: '10px 15px' }}><b>SI. No.</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Name</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Designation</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Date of Joining</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Date of Relieving</b></th>
                            <th style={{ padding: '10px 15px' }}><b>No. of Days(In a Month)</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Working Days(In a Month)</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Currency</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Current Annual CTC</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Monthly CTC</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Bonus</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Arrears</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Other Payout</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Total Salary</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Reimbursement</b></th>
                            <th style={{ padding: '10px 15px' }}><b>Pay-out Amount (USD)</b></th>
                            <th style={{ padding: '10px 15px', backgroundColor: secondHighlightColor }}><b>Remarks</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            final_usd_salary.map((emp, index) => (
                                <tr>
                                    <td className="salCol1">{emp.s_no}</td>
                                    <td>{emp.name}</td>
                                    <td className="salCol3">{emp.designation}</td>
                                    <td className="salCol4">{emp.doj}</td>
                                    <td>{emp.dor}</td>
                                    <td className="salCol67">{props.totalDays}</td>
                                    <td className="salCol67">{emp.working_days}</td>
                                    <td className="salCol67">{emp.currency}</td>
                                    <td className="salCol9">{emp.ann_ctc}</td>
                                    <td className="salCol9">{emp.monthly_ctc}</td>
                                    <td>{emp.bonus}</td>
                                    <td>{emp.arrears}</td>
                                    <td>{emp.other_payout}</td>
                                    <td className="salCol9">{emp.total_payable}</td>
                                    <td>{emp.reimbursements}</td>
                                    <td className="salCol9">{emp.total_payable}</td>
                                    <td className="salCol17"><input style={{ border: 0 }} type="text" value={emp.remarks} onChange={(e) => {
                                        setUsdSalary((prevState) => {
                                            const newArr = [...prevState];
                                            newArr[index].remarks = e.target.value;
                                            return newArr;
                                        })
                                    }} /></td>
                                </tr>
                            ))
                        }
                        {
                            final_usd_salary && final_usd_salary.length ?
                                (
                                    <>
                                        <tr style={{ backgroundColor: highlightColor }}>
                                            <td colSpan="7" className="salTotalSalaryHeading"><b>Total Salary (B)&nbsp;</b></td>
                                            <td className="salCol67"><b>USD</b></td>
                                            <td className="salCol9"><b>{allTotals.total_usd_ctc}</b></td>
                                            <td className="salCol9"><b>{allTotals.total_usd_monthly_ctc}</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>{allTotals.total_usd_monthly_ctc}</b></td>
                                            <td className="salCol9"><b>0.00</b></td>
                                            <td className="salCol9"><b>{allTotals.total_usd_monthly_payable}</b></td>
                                            <td style={{ textAlign: 'left', backgroundColor: secondHighlightColor }}><b>USD Value</b></td>
                                        </tr>

                                        <tr>
                                            <td className="salLastRows" colSpan="7">Other Reimbursements/Expenses Paid by Supertal (C )</td>
                                            <td className="salLastRows" colSpan="8">INR</td>
                                            <td className="salLastRows" ></td>
                                            <td className="salLastRows" ><b>$0.00</b></td>
                                        </tr>

                                        <tr>
                                            <td className="salLastRows" colSpan="7">Laptop Charges (Refer Reimbursement Sheet for detail Break-up)(D)</td>
                                            <td className="salLastRows" colSpan="8">INR</td>
                                            <td className="salLastRows" >0.00</td>
                                            <td className="salLastRows" ><b>$0.00</b></td>
                                        </tr>
                                        <tr>
                                            <td className="salLastRows" colSpan="7"><b>Gross Total (A+B+C+D)</b></td>
                                            <td className="salLastRows" colSpan="8"><b>INR</b></td>
                                            <td className="salLastRows" ><b>{allTotals.grossTotalInr}</b></td>
                                            <td className="salLastRows" ><b>${allTotals.grossTotalUsd}</b></td>
                                        </tr>
                                        <tr>
                                            <td className="salLastRows" colSpan="7">Consulting Charges</td>
                                            <td className="salLastRows" colSpan="8">INR</td>
                                            <td className="salLastRows" >{(parseFloat(props.consulting_rate * props.conversionRate)).toFixed(2)}</td>
                                            <td className="salLastRows" ><b>${props.consulting_rate}</b></td>
                                        </tr>
                                        <tr>
                                            <td className="salLastRows" colSpan="7"><b>Total Invoice Amount</b></td>
                                            <td className="salLastRows" colSpan="8">INR</td>
                                            <td className="salLastRows" >{allTotals.totalInvoiceInr}</td>
                                            <td className="salLastRows" ><b>${allTotals.totalInvoiceUsd}</b></td>
                                        </tr>
                                        <tr>
                                            <td className="salLastRows" colSpan="7"><b>Less : Advance Refund</b></td>
                                            <td className="salLastRows" colSpan="8">INR</td>
                                            <td className="salLastRows" >0</td>
                                            <td className="salLastRows" ><b>$0.00</b></td>
                                        </tr>
                                        <tr>
                                            <td className="salLastRows" colSpan="7"><b>Net Invoice Amount</b></td>
                                            <td className="salLastRows" colSpan="8">INR</td>
                                            <td className="salLastRows" >{allTotals.totalInvoiceInr}</td>
                                            <td className="salLastRows" ><b>${allTotals.totalInvoiceUsd}</b></td>
                                        </tr>
                                        <tr>
                                            <td className="salLastRows" colSpan="7"><b>Total Invoice Amount</b></td>
                                            <td className="salLastRows" colSpan="8">USD</td>
                                            <td className="salLastRows" >{allTotals.totalInvoiceUsd}</td>
                                            <td className="salLastRows" ><b></b></td>
                                        </tr>


                                    </>
                                ) : ''
                        }
                    </tbody>
                </table>
            }
        </div >
    );
};

export default SalaryComponent;