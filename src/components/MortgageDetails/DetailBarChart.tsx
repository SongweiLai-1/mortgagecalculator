import React from 'react';
import {BarChart, Bar, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Legend, LabelList} from 'recharts';
import { detail } from "./MortgageDetails";

interface Props {
    form?: detail;
}

const DetailBarChart = ({ form }: Props) => {
    // Check if form is defined before accessing its properties
    const {
        loanAmount = 0,
        downPayment = 0,
        totalInterestPaid = 0,
        totalTaxPaid = 0,
        totalHomeInsurance = 0,
        totalPay = 0 } = form || {};

    // Prepare data array for BarChart

    const calculatePercentage = (value: number, totalPay: number) => {
        return ((value / totalPay) * 100).toFixed(1) + '%';
    };

    const loanAmountPercent = calculatePercentage(loanAmount, totalPay) ;
    const downPaymentPercent = calculatePercentage(downPayment, totalPay);
    const totalInterestPaidPercent = calculatePercentage(totalInterestPaid, totalPay);
    const totalTaxPaidPercent = calculatePercentage(totalTaxPaid, totalPay);
    const totalHomeInsurancePercent = calculatePercentage(totalHomeInsurance, totalPay);

    const data = [
        { name: 'Loan Amount', value: loanAmount , per:loanAmountPercent },
        { name: 'Down Payment', value: downPayment, per: downPaymentPercent },
        { name: 'Total Interest Paid', value: totalInterestPaid ,per: totalInterestPaidPercent },
        { name: 'Total Tax Paid', value: totalTaxPaid, per: totalTaxPaidPercent },
        { name: 'Total Home Insurance', value: totalHomeInsurance,per: totalHomeInsurancePercent }
    ];

    return (
        <BarChart
            layout="vertical"
            width={200}
            height={120}
            data={data}
            margin={{top: 0, right: 80, bottom: 0, left: 30}}
            barCategoryGap={10}
        >
            <XAxis dataKey="value" type="number" hide={true}/>
            <YAxis dataKey="name" type="category" hide={true}/>
            <Bar dataKey="value" stackId="a" fill="#8884d8" barSize={10} >
                <LabelList dataKey="per" position="right" />
            </Bar>
        </BarChart>
    );
}

export default DetailBarChart;
