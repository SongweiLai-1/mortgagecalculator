import React from "react";
import LineChartDigram from "../LineChartDetails/LineChartDigram";
import {repayment} from "../LineChartDetails/LineChartDigram";


export const initialDiagramData: DiagramData = {
    term: 0,
    houseValue: 0 ,
    loanAmount: 0,
    principal: 0,
    yearlyInterestRate: 0,
    down_payment: 0,
    down_payment_rate: 0,
    land_tax: 0,
    home_insurance: 0
};

export interface DiagramData {
    term?: number ;
    houseValue?: number;
    loanAmount?: number;
    principal?: number ;
    yearlyInterestRate?: number ;
    down_payment?: number ;
    down_payment_rate?: number;
    land_tax?: number ;
    home_insurance?: number;
}

interface Props {
    form: DiagramData;
}

export function monthlyPayment(principal: number, yearlyInterestRate: number, yearlyPayment: number, numOfPaymentType: string): number {
    const interestRate = (yearlyInterestRate || 0) / (numOfPaymentType === "monthly" ? 12 : 1) / 100;
    const numberOfPayments = yearlyPayment * (numOfPaymentType === "monthly" ? 12 : 1);

    return (principal * interestRate * Math.pow(1 + interestRate, numberOfPayments)) /
        (Math.pow(1 + interestRate, numberOfPayments) - 1);
}

export function formatNumber(num:any) {

    return num.toLocaleString();
}

export function calculatePercentage(total: number, value: number): number {
    if (total === 0) {
        return 0; // 如果总数为零，则百分比为零，或者可以返回 NaN 或者抛出错误，具体情况具体分析
    }
    return (value / total) * 100;
}


export function repaymentList(loanAmount: number, yearlyInterestRate: number, yearlyPayment: number, numOfPaymentType: string): repayment[] {
    const monthlyInterest = yearlyInterestRate / 12 / 100;
    const numOfMonthlyPayment = yearlyPayment * 12;

    let payments: repayment[] = [];
    let principal = loanAmount;
    let bal = loanAmount;
    let equity = 0;
    let totalInterestPay = 0;

    if (numOfPaymentType === 'monthly') {
        for (let t = 1; t <= numOfMonthlyPayment; t++) {
            const monthly = monthlyPayment(loanAmount, yearlyInterestRate, yearlyPayment, 'monthly');
            const thisMonthsInterest = (principal - equity) * monthlyInterest;
            equity += (monthly - thisMonthsInterest); //得到资产

            totalInterestPay += (monthly)
            payments.push({ term: t, equity: equity, totalInterestPay: totalInterestPay, balance: bal });
            bal -= (monthly - thisMonthsInterest);
        }
    } else if (numOfPaymentType === 'yearly') {
        for (let t = 0; t <= yearlyPayment; t++) {
            const yearly = monthlyPayment(loanAmount, yearlyInterestRate, yearlyPayment, 'yearly');
            const thisYearlyInterest = (principal - equity) * (yearlyInterestRate/100);
            const thisYearlyEquity = (yearly-thisYearlyInterest)

            equity += (yearly - thisYearlyInterest); //得到资产
            totalInterestPay += (yearly)
            payments.push({ term: t, equity: thisYearlyEquity, totalInterestPay: thisYearlyInterest, balance: bal });

            bal -= (yearly - thisYearlyInterest);

        }
    } else {
        throw new Error('Invalid payment type: ' + numOfPaymentType);
    }

    return payments;
}



function monthlyInsurence(term: number, insurence: number): number {
    const totalMonthlyTerm = term * 12;
    const totalInsurancePay = insurence / totalMonthlyTerm;

    return parseFloat(totalInsurancePay.toFixed(2));
}



const Calculator = ({ form }: Props) => {

    const {
        loanAmount = 0,
        yearlyInterestRate = 0,
        term = 0,
        home_insurance = 0 } = form;


    return (
        <div>
            <LineChartDigram
                data={repaymentList(loanAmount,yearlyInterestRate,term,'monthly')}
                monthlyRepayment={monthlyPayment(loanAmount,yearlyInterestRate,term,'monthly')}
                monthlyInsurence={monthlyInsurence(term,home_insurance)}
            />
        </div>
    );
}

export default Calculator;
