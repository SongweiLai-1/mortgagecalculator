import React, {useEffect, useState} from "react";
import {Card, CardBody, CardFooter, Heading, Stack, Button, Text, CardHeader, Flex,Box} from "@chakra-ui/react";
import { DiagramData, initialDiagramData} from '../Caculator'
import {repayment} from "../LineChartDetails/Digram";
import { FaHome } from "react-icons/fa";
import DetailBarChart from './DetailBarChart';

export interface detail {
    loanAmount?:number;
    downPayment?:number;
    totalInterestPaid?:number;
    totalTaxPaid?:number;
    totalHomeInsurance?: number;
    totalPay?:number;

}
interface Props {
    form: DiagramData;
}

const sumTheRepayment = (arr: repayment[]) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i].equity || 0); // Handle undefined values
    } return sum;}

function monthlyPayment (principal:number,monthlyInterest:number,numOfPayments:number) {
    return (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numOfPayments)) /
        (Math.pow(1 + monthlyInterest, numOfPayments) - 1)
}

function calculateTotalInterest(principal:number,monthlyInterest:number,numOfPayments:number) {

    const monthlyPayment = (principal * monthlyInterest)
        / (1 - Math.pow(1 + monthlyInterest, -numOfPayments)); // 计算每月的还款额
    const totalPayment = monthlyPayment * numOfPayments; // 计算总还款额
    const totalInterest = totalPayment - principal;   // 计算总利息
    return parseFloat(totalInterest.toFixed(2));
}

const MortgageDetails = ({form}: Props) => {

    const [detailForm, setdetailForm] = useState<detail>({})

    const {
        loanAmount = 0,
        yearlyInterestRate = 0,
        term = 0,
        down_payment =0 ,
        land_tax = 0 ,
        home_insurance = 0
    } = form;

    const principal = loanAmount || 0;
    const interest = (yearlyInterestRate || 0) / 100 ;
    const monthlyInterest = interest / 12;
    const numOfPayments = (term || 0) * 12;
    const totalTaxPaid = land_tax * term;
    const totalHomeInsurance = land_tax * home_insurance;

    const monthly = monthlyPayment(principal, monthlyInterest, numOfPayments);

    const totalInterestPay = calculateTotalInterest(principal, monthlyInterest, numOfPayments);
    const totalPayment = loanAmount + down_payment + totalInterestPay + totalTaxPaid + totalHomeInsurance;

    useEffect(() => {
        setdetailForm( {
            ...detailForm,
            loanAmount: loanAmount,
            downPayment: down_payment,
            totalInterestPaid: totalInterestPay,
            totalTaxPaid: totalTaxPaid,
            totalHomeInsurance: totalHomeInsurance,
            totalPay:totalPayment
        });
    }, [monthly,totalInterestPay,totalHomeInsurance,totalTaxPaid]);


    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'>
            <Stack>
                <CardHeader>
                    <Flex alignItems='center' gap='1'>
                        <FaHome size={38} />
                        <Heading size='md' ml={2}>Mortgage Detail</Heading>
                    </Flex>
                    </CardHeader>
                <CardBody>
                    <Flex>
                        <Box>
                            <p>Loan Amount: {loanAmount} </p>
                            <p>Down Payment: {down_payment}</p>
                            <p>Total Interest Paid: {totalInterestPay}</p>
                            <p>Total Tax Paid: {totalTaxPaid}</p>
                            <p>Total Home Insurance: {totalHomeInsurance}</p>
                            <p>Your monthly repayment {monthly.toFixed(2)}</p>
                        </Box>
                        <DetailBarChart form={detailForm}/>
                    </Flex>
                    <Box>
                        <p>Total of {numOfPayments} Payments: {totalPayment}</p>
                    </Box>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Stack>
        </Card>
    )
}
export default MortgageDetails