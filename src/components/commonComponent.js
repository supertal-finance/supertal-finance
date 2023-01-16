import { useEffect, useState } from "react";


const CommonComponent = (props) => {

    const getDaysInFeb = () => {
        const year = (new Date()).getFullYear();
        return year % 4 === 0 ? 29 : 28;
    }
    const months = {
        0: { name: 'January', days: 31 },
        1: { name: 'February', days: getDaysInFeb() },
        2: { name: 'March', days: 31 },
        3: { name: 'April', days: 30 },
        4: { name: 'May', days: 31 },
        5: { name: 'June', days: 30 },
        6: { name: 'July', days: 31 },
        7: { name: 'August', days: 31 },
        8: { name: 'September', days: 30 },
        9: { name: 'October', days: 31 },
        10: { name: 'November', days: 30 },
        11: { name: 'December', days: 31 },
    };
    const rates = {
        'uti': 'USD to INR',
        'itu': 'INR to USD',
    }

    const [totalEmployees, setTotalEmployees] = useState(props.totalEmployees);
    const [fixConsultingRate, setConsultingRate] = useState(4000);
    const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth());
    const [selectedConversionFormat, setSelectedConversionFormat] = useState('uti');
    const [appliedConversionRates, setAppliedConversionRates] = useState(81);
    // const [rawSalaryData, setRawData] = useState([]);

    useEffect(() => { 
        props.updateConsultingRate(fixConsultingRate);
        props.updateTotalMonthDays(months[selectedMonth].days);
        props.updateCoversionRate(appliedConversionRates);
    }, [])

    

    return (
        <div>
            <table style={{ border: '1px solid black' }}>
                <tbody>
                    <tr>
                        <td className="commonLeftCol"><b>No. of Employees</b></td >
                        <td className="commonMidCol"></td>
                        <td className="commonRightCol"><input style={{ border: '0px', textAlign: 'right' }} value={totalEmployees} onChange={(e) => setTotalEmployees(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td className="commonLeftCol"><b>Fixed Consulting Rate</b></td>
                        <td className="commonMidCol">USD</td>
                        <td className="commonRightCol"><input style={{ border: '0px', textAlign: 'right' }} value={fixConsultingRate} onChange={(e) => { setConsultingRate(e.target.value); props.updateConsultingRate(!isNaN(e.target.value) ? 0 : e.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td className="commonLeftCol"><b>Month</b></td>
                        <td className="commonMidCol">
                            <select value={selectedMonth} onChange={(e) => { setSelectedMonth(e.target.value); props.updateTotalMonthDays(months[e.target.value].days) }}>
                                {
                                    Object.keys(months).map(mon => <option value={mon}>{months[mon].name}</option>)
                                }
                            </select>
                        </td>
                        <td className="commonRightCol">{months[selectedMonth].days} Days</td>
                    </tr>
                    <tr>
                        <td className="commonLeftCol"><b>Conversion Rate</b></td>
                        <td className="commonMidCol">
                            <select value={selectedConversionFormat} onChange={(e) => setSelectedConversionFormat(e.target.value)}>
                                {
                                    Object.keys(rates).map(rate => <option value={rate}>{rates[rate]}</option>)
                                }
                            </select>
                        </td>
                        <td className="commonRightCol"><input style={{ border: '0px', textAlign: 'right' }} value={appliedConversionRates} onChange={(e) => { setAppliedConversionRates(e.target.value); props.updateCoversionRate(e.target.value) }} /></td>
                    </tr>
                </tbody>

            </table>

        </div >
    );
};

export default CommonComponent;