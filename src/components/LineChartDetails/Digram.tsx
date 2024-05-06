import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { DiagramData } from '../Caculator';
import {Box, Card} from "@chakra-ui/react";

export interface repayment {
    term?: number;
    totalInterestPay?: number;
    equity?: number;
    balance?: number;

}

interface Props {
    data: repayment[];
}

const Digram: React.FC<Props> = ({ data }) => {
    const renderLineChart = (
        <Card>
        <Box>
        <LineChart
            width={550}
            height={400}
            data={data}
            margin={{ top: 50, right: 0, left: 50, bottom: 5 }}>

            <XAxis dataKey="term" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="equity" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="totalInterestPay" stroke="#0D83C7" dot={false} />
        </LineChart>
        </Box>
        </Card>

    );

    return renderLineChart;
};

export default Digram;
