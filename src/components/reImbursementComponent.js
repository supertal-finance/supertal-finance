// import { useEffect, useState } from "react";

const RIComponent = (props) => {
    const data = [
        { s_no: 1, name: 'E1', purpose: 'Laptop (M1-8GB/256)', usd_amt: 100 },
        { s_no: 2, name: 'E2', purpose: 'Laptop (M1-8GB/256)', usd_amt: 100 },
        { s_no: 3, name: 'E3', purpose: 'Laptop (M1-8GB/256)', usd_amt: 200 },
        { s_no: 4, name: 'E4', purpose: 'Laptop (M1-8GB/512)', usd_amt: 100 },
        { s_no: 5, name: 'E5', purpose: 'Laptop (M1-8GB/256)', usd_amt: 200 },
        { s_no: 6, name: 'E6', purpose: 'Laptop (M1-8GB/512)', usd_amt: 100 },
        { s_no: 7, name: 'E7', purpose: 'Laptop (M1-8GB/256)', usd_amt: 100 },
        { s_no: 8, name: 'E8', purpose: 'Laptop (M1-8GB/256)', usd_amt: 200 },
        { s_no: 9, name: 'E9', purpose: 'Laptop (M1-8GB/512)', usd_amt: 100 },
        { s_no: 10, name: 'E10', purpose: 'Laptop (M1-8GB/256)', usd_amt: 200 }
    ];

    const total_ust = 1400;
    // let usdToInrRate = 81.50;
    return (
        <div style={{ margin: '0px 0px 20px 0px' }}>
            <table>
                <caption style={{ backgroundColor: 'grey' }}><b>Reimbursements</b></caption>
                <thead style={{ backgroundColor: 'grey' }}>
                    <tr>
                        <th>SI. NO.</th>
                        <th>Name</th>
                        <th>Purpose</th>
                        <th>Amount in USD</th>
                        <th>Amount in INR</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data.map(ri => {
                            return (
                                <tr>
                                    <td className="riCol1">{ri.s_no}</td>
                                    <td className="riCol2">{ri.name}</td>
                                    <td className="riCol3">{ri.purpose}</td>
                                    <td className="riCol4">{ri.usd_amt}.00</td>
                                    <td className="riCol5">{ri.usd_amt * props.conversionRate}.00</td>
                                </tr>)
                        })
                    }
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td className="riCol3"><b>Total</b></td>
                        <td className="riCol4"><b>{total_ust}.00</b></td>
                        <td className="riCol5"><b>{total_ust * props.conversionRate}.00</b></td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

export default RIComponent;