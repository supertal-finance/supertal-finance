// import { useEffect, useState } from "react";

const AdvComponent = (props) => {

    // let usdToInrRate = parseFloat(81.50);
    const getFormattedNum = (number) => {
        return number.toLocaleString("en-US");
    }
    const data_inr = [
        { s_no: 1, name: 'E1', doj: '01/21/2020', ctc_inr: 4825594.8 },
        { s_no: 2, name: 'E2', doj: '04/07/2020', ctc_inr: 520000 },
        { s_no: 3, name: 'E3', doj: '16/04/2022', ctc_inr: 11550000 },
        { s_no: 4, name: 'E4', doj: '07/09/2020', ctc_inr: 1000000 },
        { s_no: 5, name: 'E5', doj: '07/09/2020', ctc_inr: 2500000.5 },
        { s_no: 6, name: 'E6', doj: '05/11/2021', ctc_inr: 8000000.5 },
        { s_no: 7, name: 'E7', doj: '15/12/2021', ctc_inr: 4825594.8 },
    ];
    let total_inr_advance = parseFloat(0);
    data_inr.forEach(dt => {
        const ctc = parseFloat(dt.ctc_inr);
        const monthly = parseFloat(ctc / parseFloat(12));
        const advance = parseFloat(monthly * 2);
        total_inr_advance += parseFloat(advance);
        dt.monthly = monthly.toFixed(2);
        dt.advance = monthly.toFixed(2);
    });
    total_inr_advance = total_inr_advance.toFixed(2);


    const data_usd = [
        { s_no: 1, name: 'D1', doj: '14/03/2022', ctc_usd: 48000 },
        { s_no: 2, name: 'D2', doj: '04/04/2022', ctc_usd: 192000 },
        { s_no: 3, name: 'D3', doj: '16/05/2022', ctc_usd: 39600 }

    ];
    let total_usd_advance = parseFloat(0);
    data_usd.forEach(dt => {
        const ctc = parseFloat(dt.ctc_usd);
        const monthly = parseFloat(ctc / parseFloat(12));
        const advance = parseFloat(monthly * 2);
        total_usd_advance += parseFloat(advance);
        dt.monthly = monthly.toFixed(2);
        dt.advance = monthly.toFixed(2);
    });
    total_usd_advance = total_usd_advance.toFixed(2);

    return (
        <div style={{ margin: '0px 0px 20px 0px' }}>
            <table>
                <caption style={{ backgroundColor: 'grey' }}><b>Advance Summary (2 Month Advance)</b></caption>
                <thead style={{ backgroundColor: 'grey' }}>
                    <tr>
                        <th className="advH0">SI. NO.</th>
                        <th className="advH1">Employee List</th>
                        <th className="advH2">DOJ</th>
                        <th className="advH3">CTC(INR)</th>
                        <th className="advH4">Monthly Salary(INR)</th>
                        <th className="advH5">Advanced Deposited</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data_inr.map(ri => {
                            return (
                                <tr>
                                    <td className="riCol1">{ri.s_no}</td>
                                    <td className="riCol2">{ri.name}</td>
                                    <td className="riCol3">{ri.doj}</td>
                                    <td className="riCol4">{getFormattedNum(ri.ctc_inr)}</td>
                                    <td className="riCol5">{getFormattedNum(ri.monthly)}</td>
                                    <td className="riCol5">{getFormattedNum(ri.advance)}</td>
                                </tr>)
                        })
                    }

                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td className="riCol3"><b>Total</b></td>
                        <td className="riCol4"><b>{getFormattedNum(total_inr_advance)}</b></td>
                    </tr>
                </tbody>
            </table>

            <br />
            <br />

            <table>
                <caption style={{ backgroundColor: 'grey' }}><b>Advance Summary (2 Month Advance)</b></caption>
                <thead style={{ backgroundColor: 'grey' }}>
                    <tr>
                        <th className="advH0">SI. NO.</th>
                        <th className="advH1usd">Employee List</th>
                        <th className="advH2">DOJ</th>
                        <th className="advH3">CTC(USD)</th>
                        <th className="advH4">Monthly Salary(USD)</th>
                        <th className="advH4">Advanced Deposited</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data_usd.map(ri => {
                            return (
                                <tr>
                                    <td className="riCol1">{ri.s_no}</td>
                                    <td className="riCol2">{ri.name}</td>
                                    <td className="riCol3">{ri.doj}</td>
                                    <td className="riCol4">${getFormattedNum(ri.ctc_usd)}</td>
                                    <td className="riCol5">${getFormattedNum(ri.monthly)}</td>
                                    <td className="riCol5">${getFormattedNum(ri.advance)}</td>
                                </tr>)
                        })
                    }

                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td className="riCol3"><b>Total</b></td>
                        <td className="riCol4"><b>${getFormattedNum(total_usd_advance)}</b></td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

export default AdvComponent;