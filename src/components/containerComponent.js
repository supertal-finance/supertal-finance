import { useState } from "react";
import AdvComponent from "./advanceComponent";
import CommonComponent from "./commonComponent";
import RIComponent from "./reImbursementComponent";
import SalaryComponent from "./salaryComponent";

import { read, utils } from "xlsx";
import InvComponent from "./invoice";

const ContainerComponent = () => {
    const [buttonShown, setButtonShown] = useState(0);
    const [currentlyShowing, setcurrentlyShowing] = useState('Salary');

    const [rawSalaryData, setRawData] = useState([]);
    const [fixedConsultRate, setConsultingRates] = useState(0);
    const [total_days_in_selected_month, setTotalDays] = useState(0);
    const [conversion_rate, setConversionRate] = useState(0);

    const updateConsultingRate = (newRate) => {
        setConsultingRates(newRate);
    };
    const updateTotalMonthDays = (days) => {
        setTotalDays(days);
    };
    const updateCoversionRate = (rate) => {
        setConversionRate(rate);
    };
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);
                if (json && json.length) {
                    setRawData(json);
                } else {
                    if (rawSalaryData && rawSalaryData.length) {
                        setRawData([]);
                    }
                }
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    return (
        <div style={{ height: '100vh' }}>
            {
                rawSalaryData && rawSalaryData.length && buttonShown > 0 ? <h2 style={{ display: 'block', textAlign: 'center' }}><u>&nbsp;{`${currentlyShowing} Information`}&nbsp;</u></h2> :
                    <h2 style={{ display: 'block', textAlign: 'center' }}><u>&nbsp;Please upload excel sheet to calculate invoice&nbsp;</u></h2>
            }

            <CommonComponent totalEmployees={rawSalaryData.length} updateConsultingRate={updateConsultingRate} updateTotalMonthDays={updateTotalMonthDays} updateCoversionRate={updateCoversionRate}></CommonComponent>
            <br />
            <form>
                <label htmlFor="upload">Upload File</label>
                <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={readUploadFile}
                />
            </form>
            <br />
            {
                rawSalaryData && rawSalaryData.length && buttonShown > 0 ?
                    (
                        <span style={{ display: 'block', textAlign: 'center' }}>
                            {buttonShown !== 1 && <><button onClick={() => { setButtonShown(1); setcurrentlyShowing('Salary') }}>View Salary</button> &nbsp; &nbsp;</>}
                            {buttonShown !== 2 && <><button onClick={() => { setButtonShown(2); setcurrentlyShowing('Reimbursement') }}>View Reimbursement</button> &nbsp; &nbsp;</>}
                            {buttonShown !== 3 && <><button onClick={() => { setButtonShown(3); setcurrentlyShowing('Advance') }}>View Advance</button> &nbsp; &nbsp;</>}
                            {buttonShown !== 4 && <><button onClick={() => { setButtonShown(4); setcurrentlyShowing('Invoice') }}>View Invoice</button> &nbsp; &nbsp;</>}
                            {/* <button >Download</button> */}
                        </span>
                    ) :
                    rawSalaryData && rawSalaryData.length ?
                        (
                            <span style={{ display: 'block', textAlign: 'center' }}>
                                <button onClick={() => { setButtonShown(1); setcurrentlyShowing('Salary') }}>Calculate Invoice</button> &nbsp; &nbsp;
                            </span>
                        )
                        : ''
            }
            <br />
            {buttonShown === 1 && <SalaryComponent salaryData={rawSalaryData} totalDays={total_days_in_selected_month} conversionRate={conversion_rate} consulting_rate={fixedConsultRate}></SalaryComponent>}
            {buttonShown === 2 && <RIComponent conversionRate={conversion_rate}></RIComponent>}
            {buttonShown === 3 && <AdvComponent></AdvComponent>}
            {buttonShown === 4 && <InvComponent></InvComponent>}
            <br />
            <br />

        </div >
    );
};

export default ContainerComponent;