import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Button,
    Text,
    CardHeader,
    Flex,
    Box,
    useBoolean, HStack, Divider
} from "@chakra-ui/react";
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


function calculateTotalInterest(principal:number, monthlyInterest:number, numOfPayments:number) {

    const monthlyPayment = (principal * monthlyInterest) /
        (1 - Math.pow(1 + monthlyInterest, -numOfPayments));
    const totalPayment = monthlyPayment * numOfPayments;
    const totalInterest = totalPayment - principal;
    if (isNaN(totalInterest)) {
        const totalInterest = 0
        return totalInterest

    } else {
        return parseFloat(totalInterest.toFixed(2));
    }
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


    const totalInterestPay = calculateTotalInterest(principal, monthlyInterest, numOfPayments) ;
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
    }, [totalInterestPay,totalHomeInsurance,totalTaxPaid]);

    const [display, sedisplay] = useBoolean()

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'>
            <Stack>
                <CardHeader >
                    <Flex alignItems='center' gap='1'>
                        <FaHome size={38} />
                        <Heading size='md' ml={2}>Mortgage Detail</Heading>
                    </Flex>
                </CardHeader>
                <Divider w="300%"/>
                <CardBody >
                    <Stack>
                    <HStack>
                        <Box  marginLeft={5} >
                            <p>Loan Amount:  </p>
                            <p>Down Payment:</p>
                            <p>Total Interest Paid: </p>
                            <p>Total Tax Paid: </p>
                            <p>Total Home Insurance: </p>
                        </Box>
                        <Box>
                            <Text>{loanAmount}</Text>
                            <Text> {down_payment}</Text>
                            <Text>{totalInterestPay}</Text>
                            <Text>{totalTaxPaid}</Text>
                            <Text>{totalHomeInsurance}</Text>
                        </Box>
                        {loanAmount > 0 ? (display ? null : <DetailBarChart form={detailForm} />) : null}

                    </HStack>
                            <Text>Total of {numOfPayments} Payments: {totalPayment}</Text>

                    </Stack>
                </CardBody>
            </Stack>
        </Card>
    )
}
export default MortgageDetails


