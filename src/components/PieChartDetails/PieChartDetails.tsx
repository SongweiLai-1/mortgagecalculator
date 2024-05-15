import React from "react";
import { DiagramData } from "../Caculator";
import { monthlyPayment } from '../Caculator';
import PieChartDigram from './PieChartDigram'
import {Card, CardBody, CardHeader, Divider, Heading, HStack} from "@chakra-ui/react";
import { FaChartPie } from "react-icons/fa";


export interface pieForm {
    name: string;
    value: number;
}

const PieChartDetails = ({ pieForm }: { pieForm: DiagramData }) => {
    const { loanAmount = 0, term = 0, down_payment = 0, land_tax = 0, home_insurance = 0, yearlyInterestRate = 0 } = pieForm;

    const yearly = monthlyPayment(loanAmount, yearlyInterestRate, term,'yearly')
    const totalInterest = yearly * term - loanAmount;
    const totalPrincipal = pieForm.loanAmount || 0;
    const totalTax = land_tax * term;
    const totalHomeInsurace = home_insurance * term;

    const pieData: pieForm[] = [
        { name: 'Interest', value: totalInterest },
        { name: 'Principal', value: totalPrincipal },
        { name: 'Tax', value: totalTax },
        { name: 'Down Payment', value: down_payment },
        { name: 'Insurance', value: totalHomeInsurace },
    ];

    return (
        <>
            <Card w='580px'>
                <CardHeader >
                    <HStack>
                        <FaChartPie size={38}/>
                        <Heading size='md' ml={2}>Loan Breakdown</Heading>
                    </HStack>
                </CardHeader>
                <Divider w="100%"/>
                <CardBody>
                    <PieChartDigram data={pieData} />
                </CardBody>
            </Card>
        </>

    )
}

export default PieChartDetails;
