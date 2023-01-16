// import { useEffect, useState } from "react";
import supertal_logo from '../supertal_logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



const InvComponent = (props) => {
    const highlightColor = '#f7d493';
    const secondHighlightColor = '#94cddf';

    const generatePdf = async () => {
        html2canvas(document.getElementById("invoice_div")).then(canvas => {
            // document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            // const pdf = new jsPDF({
            //     unit: "in",
            //     format: [10, 10]
            // });
            const pdf = new jsPDF();

            const imgProperties = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight =
                (imgProperties.height * pdfWidth) / imgProperties.width;

            // console.log(`image props -->>`);
            // console.log(`ht-> ${imgProperties.height}......wd-> ${imgProperties.width}`);

            // console.log(`pdf props -->>`);
            // console.log(`ht-> ${pdfHeight}......wd-> ${pdfWidth}`)

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight-80);


            // pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("invoice_pdf.pdf");
        });
    };

    return (
        <div>
            <div id='invoice_div' style={{ margin: '0px 0px 20px 0px',display:'inline-block' }}>
                <table>
                    <thead>
                        <tr>
                            <td style={{ border: 'none' }}>
                                <img src={supertal_logo} alt="logo" style={{ height: 100 }} />
                            </td>
                            <td colSpan="7" className='invoiceHeader' style={{ border: 'none', paddingRight: '50px' }}>
                                <div>
                                    <b style={{ fontSize: "15px" }}>Tax Invoice</b>
                                    <br />
                                    <b style={{ fontSize: "20px", display: 'block' }}>SUPERTAL PTE. LTD.</b>
                                    <b style={{ fontSize: "10px", display: 'block' }}>Regd.	Off.-	6	Raffles	Quay	#	14-07,	Singapore	–	(048580)</b>

                                    <div style={{ fontSize: "13px", marginTop: "5px" }}>
                                        <b style={{ marginRight: '40px' }}>Mob. +91-9999982524</b>
                                        <b>Email:- sparsh@supertal.io</b>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="15" className='invoiceHeader'>
                                <b style={{ fontSize: "12px", display: 'block' }}>GST	NO.	202006535M</b>
                            </td>
                        </tr>
                        <tr>
                            <td className='invoiceHeader' style={{ border: 'none' }}>
                            </td>
                            <td colSpan="10" style={{ border: 'none' }}>
                                <div style={{ margin: "5px 0px 20px 0px" }}>
                                    <b style={{ fontSize: "12px", display: 'block' }}>Invoice No:- SPL372</b>
                                    <b style={{ fontSize: "12px", display: 'block' }}>Date:- 03/Jan/2023</b>
                                    <b style={{ fontSize: "12px", display: 'block' }}>Due Date:- 15/Jan/2023</b>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: 'none', verticalAlign: 'top' }} className="invoiceHeader">
                                <b style={{ fontSize: "14px", padding: "10px" }}>To</b>
                            </td>
                            <td colSpan="10" style={{ border: 'none' }}>
                                <div >
                                    <span style={{ fontSize: "12px", display: 'block' }}>XYZ</span>
                                    <span style={{ fontSize: "12px", display: 'block' }}>abc</span>
                                    <span style={{ fontSize: "12px", display: 'block', margin: "15px 0px 10px 0px" }}>Singapore	79903</span>
                                </div>
                            </td>
                        </tr>

                    </thead>

                    <tbody>
                        <tr style={{ fontSize: "15px" }}>
                            <th>SI. No.</th>
                            <th>Description</th>
                            <th>Currency</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td rowSpan="4" className='invoiceMainContentBody' >1</td>
                            <td className='invoiceMainContentBody' style={{ textAlign: 'left', height: '150px' }}>Consulting	Fee	-	January	2023</td>
                            <td className='invoiceMainContentBody' >USD</td>
                            <td className='invoiceMainContentBody' >1,21,487.74</td>
                        </tr>

                        <tr>
                            <td className='invoiceMainContentCalculations' style={{ textAlign: 'right' }}><b>Taxable Amount</b></td>
                            <td className='invoiceMainContentCalculations' ><b>USD</b></td>
                            <td className='invoiceMainContentCalculations' ><b>1,21,487.74</b></td>
                        </tr>

                        <tr>
                            <td className='invoiceMainContentCalculations' style={{ textAlign: 'right' }}><b>GST	@	8%</b></td>
                            <td className='invoiceMainContentCalculations' ><b>USD</b></td>
                            <td className='invoiceMainContentCalculations' ><b>	9,719.02</b></td>
                        </tr>
                        <tr>
                            <td className='invoiceMainContentCalculations' style={{ textAlign: 'right' }}><b>Invoice	Amount</b></td>
                            <td className='invoiceMainContentCalculations' ><b>USD</b></td>
                            <td className='invoiceMainContentCalculations' ><b>1,31,206.76</b></td>
                        </tr>

                        <tr>
                            <td colSpan="10">
                                <div>
                                    <b style={{ fontSize: '13px' }}><u>USD Bank Detail:-</u></b>
                                    <br />
                                    <div style={{ fontSize: '10px' }}>
                                        <span style={{ display: 'block' }}>Payment	to	be	issued	on	the	name	of	"SUPERTAL	PTE.	LTD.</span>
                                        <span style={{ display: 'block' }}>Bank	Name:	The	Currency	Cloud	Ltd.</span>
                                        <span style={{ display: 'block' }}>Bank	Address:	12	Steward	Street,	The	Steward	Building,	London,	E1	6FQ,	GB</span>
                                        <span style={{ display: 'block' }}>Account	Number:	GB60TCCL04140401441493</span>
                                        <div style={{ display: 'block' }}>
                                            <span >Swift	Code	:-	TCCLGB3L</span>
                                            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                            <span style={{ marginLeft: '180px' }}>On	behalf	of	SUPERTAL	PTE.	LTD.</span>
                                        </div>

                                        <div style={{ display: 'block', padding: '15px 30px 0px 300px', fontSize: "12px" }}>
                                            <b>(Sparsh Ahuja)</b>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br />
                <br />
                <br />
                <br />

                <table>
                    <tbody>
                        <tr style={{ fontSize: "15px", backgroundColor: highlightColor }}>
                            <th>SI. No.</th>
                            <th style={{ width: '300px' }}>Description</th>
                            <th>Currency</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td rowSpan="6" ></td>
                            <td >&nbsp;</td>
                            <td ></td>
                            <td ></td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left', fontSize: '13px' }}>Salary - January 2023</td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}>USD</td>
                            <td style={{ textAlign: 'right', fontSize: '13px' }}>1,21,487.74</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left', fontSize: '13px' }}>Management	Fee</td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}>USD</td>
                            <td style={{ textAlign: 'right', fontSize: '13px' }}>4,200.00</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left', fontSize: '13px' }}>Employee's	Benefits</td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}>USD</td>
                            <td style={{ textAlign: 'right', fontSize: '13px' }}>2,100.00</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left', fontSize: '13px' }}>Less:	Advance	Refund</td>
                            <td rowSpan='2' style={{ verticalAlign: 'top', textAlign: 'center', fontSize: '13px' }}>USD</td>
                            <td rowSpan='2' style={{ verticalAlign: 'top', textAlign: 'right', fontSize: '13px' }}>0</td>
                        </tr>

                        <tr>
                            <td style={{ height: '50px' }}></td>
                        </tr>

                        <tr style={{ fontSize: "15px", backgroundColor: highlightColor }}>
                            <td></td>
                            <td style={{ textAlign: 'right', fontSize: '13px' }}><b>Taxable Amount</b></td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}><b>USD</b></td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}><b>1,21,487.74</b></td>
                        </tr>
                        <tr style={{ fontSize: "15px", backgroundColor: highlightColor }}>
                            <td></td>
                            <td style={{ textAlign: 'right', fontSize: '13px' }}><b>GST	@	8%</b></td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}><b>USD</b></td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}><b>9,719.02</b></td>
                        </tr>
                        <tr style={{ fontSize: "15px", backgroundColor: highlightColor }}>
                            <td></td>
                            <td style={{ textAlign: 'right', fontSize: '13px' }}><b>Invoice	Amount</b></td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}><b>USD</b></td>
                            <td style={{ textAlign: 'center', fontSize: '13px' }}><b>1,31,206.76</b></td>
                        </tr>
                    </tbody>
                </table>
            </div >
            <button style={{ height: '50px', marginLeft: '50px', backgroundColor: highlightColor }} onClick={() => generatePdf()}>Download Invoice PDF</button>
        </div>
    );
};

export default InvComponent;