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

export interface repayment {
    term?: number;
    totalInterestPay?: number;
    equity?: number;
    balance?: number;

}

interface Props {
    data: repayment[];
    monthlyRepayment: number;
    monthlyInsurence : number;
}

const Digram: React.FC<Props> = ({ data, monthlyRepayment,monthlyInsurence}: Props) => {

    return (
        <Card maxW='xl' >
        <CardHeader >
            <Stack>
            <Text fontSize='3xl'>$ {isNaN(monthlyRepayment) ? '0.00' : monthlyRepayment.toFixed(2)}</Text>
            <Text fontSize='xs' color='grey'>Your estimated monthly payment.</Text>
            </Stack>
        </CardHeader>
        <HStack >
            <Text fontSize='xs'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Monthly Home Insurance:</Text>
            <Text fontSize='xs'>{isNaN(monthlyInsurence) ? '0.00' : monthlyInsurence.toFixed(2)}</Text>
        </HStack>
            <HStack spacing={5} marginTop={4} marginBottom={4}><Divider /></HStack>

        <CardBody  bg={useColorModeValue('grey.50', 'grey.400')}>
        <Text fontSize='xs'>Payment Trend</Text>
        <AreaChart
            width={500}
            height={400}
            data={data}
            >

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
