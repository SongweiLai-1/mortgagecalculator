import React from "react";
import Digram from "./LineChartDetails/Digram";
import {repayment} from "./LineChartDetails/Digram";


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

function monthlyPayment (principal:number,yearlyInterestRate:number,yearlyPayment:number,numOfPaymentType:string) {

    const yearlyInterest = (yearlyInterestRate || 0) / 100 ;
    const monthlyInterest = yearlyInterest / 12;
    const numberOfPayment = yearlyPayment * 12;

    if (numOfPaymentType) {
        return (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayment)) /
            (Math.pow(1 + monthlyInterest, numberOfPayment) - 1) } else {

        return (principal * yearlyInterest * Math.pow(1 + yearlyInterest, yearlyPayment)) /
            (Math.pow(1 + yearlyInterest, yearlyPayment) - 1) }
    }


function repaymentList (loanAmount:number,yearlyInterestRate:number,yearlyPayment:number,numOfPaymentType:string) {

    const monthlyInterest = yearlyInterestRate / 12 / 100;
    const numOfMonthlyPayment = yearlyPayment * 12;

    const monthly = monthlyPayment(loanAmount, yearlyInterestRate, yearlyPayment,'monthly');
    const yearly = monthlyPayment(loanAmount, yearlyInterestRate, yearlyPayment, 'yearly');


    let monthlyPayments: repayment[] = [];
    let yearlyPayments: repayment[] = [];

    let principal = loanAmount;
    let bal = loanAmount;
    let equity = 0
    let totalInterestPay = 0

    if (numOfPaymentType === 'monthly') {
        for (let t = 1; t <= numOfMonthlyPayment; t++) {
        const thisMonthsInterest=(principal-equity)*monthlyInterest;
        const bal_thisMonthsInterest = bal*monthlyInterest;
        equity+=(monthly-thisMonthsInterest);//得到资产

        totalInterestPay += (monthly)
        monthlyPayments.push({term: t , equity: equity ,totalInterestPay:totalInterestPay, balance: bal});
        bal-=(monthly-thisMonthsInterest);}
    }
    else {
        for (let t = 1; t <= yearlyPayment; t++) {
            const thisYearlyInterest=(principal-equity)*yearlyInterestRate;
            const bal_thisMonthsInterest = bal*yearlyInterestRate;
            equity+=(yearly-thisYearlyInterest);//得到资产

            totalInterestPay += (yearly)
            yearlyPayments.push({term: t , equity: equity ,totalInterestPay:totalInterestPay, balance: bal});
            bal-=(yearly-thisYearlyInterest);}
    }


    return monthlyPayments
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
            <Digram
                data={repaymentList(loanAmount,yearlyInterestRate,term,'monthly')}
                monthlyRepayment={monthlyPayment(loanAmount,yearlyInterestRate,term,'monthly')}
                monthlyInsurence={monthlyInsurence(term,home_insurance)}
            />
        </div>
    );
}

export default Calculator;
export {monthlyPayment}