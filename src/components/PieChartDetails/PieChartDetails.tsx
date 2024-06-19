import React from "react";
import { DiagramData, monthlyPayment, calculatePercentage } from "../function/Caculator";
import PieChartDigram from './PieChartDigram'
import { Card, CardBody, CardHeader, Divider, Heading, HStack, Box , Wrap, WrapItem} from "@chakra-ui/react";
import { FaChartPie } from "react-icons/fa";

export interface pieForm {
    name: string;
    value: number;
}

const PieChartDetails = ({ pieForm }: { pieForm: DiagramData }) => {
    const { loanAmount = 0, term = 0, down_payment = 0, land_tax = 0, home_insurance = 0, yearlyInterestRate = 0 } = pieForm;

    const yearly = monthlyPayment(loanAmount, yearlyInterestRate, term, 'yearly');
    const totalInterest = yearly * term - loanAmount;
    const totalPrincipal = pieForm.loanAmount || 0;
    const totalTax = land_tax * term;
    const totalHomeInsurace = home_insurance * term;

    const totalPayment = totalInterest + totalPrincipal + totalTax + totalHomeInsurace || 0;

    const value = [totalInterest, totalPrincipal, totalTax, totalHomeInsurace];
    const description = ['Interest', 'Principal', 'Tax', 'Insurance'];
    const percentagesAndDescriptions = value.map((r, index) => ({
        percentage: calculatePercentage(totalPayment, r),
        description: description[index], // Corrected from description(index) to description[index]
    }));

    const pieData: pieForm[] = [
        { name: 'Interest', value: totalInterest },
        { name: 'Principal', value: totalPrincipal },
        { name: 'Tax', value: totalTax },
        { name: 'Down Payment', value: down_payment },
        { name: 'Insurance', value: totalHomeInsurace },
    ];

    return (
        <Card w='580px' overflow='hidden'>
            <CardHeader>
                <HStack>
                    <FaChartPie size={38} />
                    <Heading size='md' ml={2}>Loan Breakdown</Heading>
                </HStack>
                <Divider mt='28px' ml='-20px' w="300%" />
            </CardHeader>
            <CardBody>
                <Wrap>
                    {percentagesAndDescriptions.map(({ percentage, description }, index) => (
                        <WrapItem>
                        <p key={index}>{description}: {percentage.toFixed(2)}%</p>
                        </WrapItem>
                    ))}
                </Wrap>
                <PieChartDigram data={pieData} />
            </CardBody>
        </Card>
    );
}

export default PieChartDetails;
