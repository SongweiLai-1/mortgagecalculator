import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Heading,
    Stack,
    Text,
    CardHeader,
    Flex,
    Box,
    useBoolean, HStack, Divider
} from "@chakra-ui/react";
import { DiagramData } from '../Caculator';
import { repayment } from "../LineChartDetails/Digram";
import { FaHome } from "react-icons/fa";
import DetailBarChart from './DetailBarChart';
import { formatNumber } from "../Caculator";

export interface detail {
    loanAmount?: number;
    downPayment?: number;
    totalInterestPaid?: number;
    totalTaxPaid?: number;
    totalHomeInsurance?: number;
    totalPay?: number;
}

interface Props {
    form: DiagramData;
}

function calculateTotalInterest(principal: number, monthlyInterest: number, numOfPayments: number) {
    const monthlyPayment = (principal * monthlyInterest) /
        (1 - Math.pow(1 + monthlyInterest, -numOfPayments));
    const totalPayment = monthlyPayment * numOfPayments;
    const totalInterest = totalPayment - principal;
    return isNaN(totalInterest) ? 0 : parseFloat(totalInterest.toFixed(2));
}

const MortgageDetails = ({ form }: Props) => {
    const [detailForm, setDetailForm] = useState<detail>({});

    const {
        loanAmount = 0,
        yearlyInterestRate = 0,
        term = 0,
        down_payment = 0,
        land_tax = 0,
        home_insurance = 0
    } = form;

    const principal = loanAmount || 0;
    const interest = (yearlyInterestRate || 0) / 100;
    const monthlyInterest = interest / 12;
    const numOfPayments = (term || 0) * 12;
    const totalTaxPaid = land_tax * term;
    const totalHomeInsurance = land_tax * home_insurance;

    const totalInterestPay = calculateTotalInterest(principal, monthlyInterest, numOfPayments);
    const totalPayment = loanAmount + down_payment + totalInterestPay + totalTaxPaid + totalHomeInsurance;

    useEffect(() => {
        setDetailForm({
            loanAmount: loanAmount,
            downPayment: down_payment,
            totalInterestPaid: totalInterestPay,
            totalTaxPaid: totalTaxPaid,
            totalHomeInsurance: totalHomeInsurance,
            totalPay: totalPayment
        });
    }, [totalInterestPay, totalHomeInsurance, totalTaxPaid]);

    const [display, sedisplay] = useBoolean();
    let downPaymentRate: number;

    if (isNaN(down_payment) || isNaN(loanAmount) || loanAmount === 0) {
        downPaymentRate = 0;
    } else {
        downPaymentRate = parseFloat(((down_payment / loanAmount) * 100).toFixed(2));
    }

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden' w='600px'>
            <Stack>
                <CardHeader>
                    <Flex alignItems='center' gap='1'>
                        <FaHome size={38} />
                        <Heading size='md' ml={2}>Mortgage Detail</Heading>
                    </Flex>
                </CardHeader>
                <Divider w="180%" />
                <CardBody>
                    <Stack>
                        <HStack>
                            <Box pos='absolute'>
                                <Text>Loan Amount: </Text>
                                <Text>Down Payment:</Text>
                                <Text>Total Interest Paid: </Text>
                                <Text>Total Tax Paid: </Text>
                                <Text>Total Home Insurance: </Text>
                            </Box>
                            <Box marginLeft='200px'>
                                <Text whiteSpace="nowrap">$ {formatNumber(loanAmount)}</Text>
                                <HStack>
                                    <Text whiteSpace="nowrap">$ {formatNumber(down_payment)} </Text>
                                    <Text whiteSpace="nowrap">({downPaymentRate}%)</Text>
                                </HStack>
                                <Text whiteSpace="nowrap">$ {formatNumber(totalInterestPay)}</Text>
                                <Text whiteSpace="nowrap">$ {formatNumber(totalTaxPaid)}</Text>
                                <Text whiteSpace="nowrap">$ {formatNumber(totalHomeInsurance)}</Text>
                            </Box>
                            <Box marginLeft={30} marginRight={10}>
                                {loanAmount > 0 ? (display ? null : <DetailBarChart form={detailForm} />) : null}
                            </Box>
                        </HStack>
                        <Divider />
                        <Text mt='10px'>Total of {numOfPayments} Payments: $ {formatNumber(totalPayment.toFixed(2))}</Text>
                    </Stack>
                </CardBody>
            </Stack>
        </Card>
    );
}

export default MortgageDetails;
