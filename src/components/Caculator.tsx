import React from "react";
import Digram from "./LineChartDetails/Digram";
import {repayment} from "./LineChartDetails/Digram";


export const initialDiagramData: DiagramData = {
    term: 0,
    houseValue: 0 ,
    loanAmount: 0,
    equity: 0,
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
    equity?: number ;
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




function monthlyPayment (principal:number,monthlyInterest:number,numOfPayments:number) {
    return (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numOfPayments)) /
        (Math.pow(1 + monthlyInterest, numOfPayments) - 1)
}

function repaymentList (principal:number,yearlyInterestRate:number,yearlyPayment:number) {

    const interest = (yearlyInterestRate || 0) / 100 ;
    const monthlyInterest = interest / 12;
    const numOfPayments = (yearlyPayment || 0) * 12;

    const monthly = monthlyPayment(principal, monthlyInterest, numOfPayments);

    const equityList: repayment[] = [];
    let equity = 0;
    let totalInterestPay = 0;
    let balance = principal;

    for (let t = 1; t <= numOfPayments; t++) {
        const thisMonthsInterest = (balance - equity) * monthlyInterest;
        equity += (monthly - thisMonthsInterest);
        totalInterestPay += monthly;
        equityList.push({ term: t, equity: equity, totalInterestPay: totalInterestPay, balance: balance });
        balance -= (monthly - thisMonthsInterest);
    }
    return equityList}


const Calculator = ({ form }: Props) => {

    const { loanAmount = 0, yearlyInterestRate = 0, term = 0 } = form;

    return (
        <div>
            <Digram data={repaymentList(loanAmount,yearlyInterestRate,term)} />
        </div>
    );
}

export default Calculator;
