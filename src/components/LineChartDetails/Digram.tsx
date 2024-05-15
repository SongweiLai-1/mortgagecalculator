import React from "react";
import {XAxis, YAxis, Tooltip, Legend, Area, AreaChart} from 'recharts';
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    HStack,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {formatNumber} from '../Caculator'

export interface repayment {
    term?: number;
    totalInterestPay?: number;
    equity?: number;
    balance?: number;}

interface Props {
    data: repayment[];
    monthlyRepayment: number;
    monthlyInsurence : number;
}

const Digram: React.FC<Props> = ({ data, monthlyRepayment,monthlyInsurence}: Props) => {

    const formatToTwoDecimalPlaces = (num: number) => {
        return parseFloat(num.toFixed(2));
    };

    // Format the data to ensure two decimal places for specific fields
    const formattedData = data.map(item => ({
        ...item,
        totalInterestPay: item.totalInterestPay !== undefined ? formatToTwoDecimalPlaces(item.totalInterestPay) : undefined,
        equity: item.equity !== undefined ? formatToTwoDecimalPlaces(item.equity) : undefined,
        balance: item.balance !== undefined ? formatToTwoDecimalPlaces(item.balance) : undefined,
    }));


    return (
        <Card w='580px' >
        <CardHeader >
            <Stack>
            <Text fontSize='3xl'>$ {isNaN(monthlyRepayment) ? '0.00' : formatNumber(monthlyRepayment)}</Text>
            <Text fontSize='xs' color='grey'>Your estimated monthly payment.</Text>
            </Stack>
        </CardHeader>
        <HStack >
            <Text fontSize='xs'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Monthly Home Insurance:</Text>
            <Text fontSize='xs'>{isNaN(monthlyInsurence) ? '0.00' : monthlyInsurence.toFixed(2)}</Text>
        </HStack>
            <HStack spacing={5} marginTop={4} marginBottom={4}><Divider /></HStack>

        <CardBody  bg={useColorModeValue('grey.50', 'grey.400')}>
        <Text fontSize='xs'>Payment Trend (Amounts x Terms)</Text>
        <AreaChart
            width={500}
            height={400}
            data={formattedData}>

            <XAxis dataKey="term" />
            <YAxis />
            <Tooltip />
            <Area name="Total Pay Within Interest" type="monotone" dataKey="totalInterestPay" stroke="#8884d8" fill="#8884d8" />
            <Area name="Net Equity" type="monotone" dataKey="equity" />
            <Area name="Balance" dataKey="balance" stroke="black" fill="transparent" />
            <Legend />
        </AreaChart>
        </CardBody>
        </Card>
    );

};

export default Digram;
