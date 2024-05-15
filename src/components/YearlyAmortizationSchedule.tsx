import React, { useState } from 'react';
import {
    Box,
    Button,
    Stack,
    Table,
    TableContainer,
    Th,
    Tr,
    Td,
    Thead,
    Tbody,
    Tfoot,
    Card,
    HStack
} from "@chakra-ui/react";
import { DiagramData, repaymentList } from "./Caculator";

interface Props {
    form: DiagramData;
}

const YearlyAmortizationSchedule = ({ form }: Props) => {

    const [showSlider, setShowSlider] = useState(false);

    const { term = 0, yearlyInterestRate = 0, loanAmount = 0 } = form;


    // Provide fallback values or handle undefined values
    const data = repaymentList(loanAmount || 0, yearlyInterestRate || 0, term || 0, 'yearly');



    return (
        <div >
            <Stack spacing={3}>
            <Box >
                <Button onClick={() => setShowSlider(!showSlider)} colorScheme='blue'>Show Amortization Table</Button>
            </Box>
            <Box >
                {showSlider ?
                    <Card w='1210px'>
                    <TableContainer>
                        <Table size='sm'  overflowY ='hidden'>
                            <Thead>
                                <Tr>
                                    <Th >Year</Th>
                                    <Th >Interest</Th>
                                    <Th >Principal</Th>
                                    <Th >Balance</Th>
                                </Tr>
                            </Thead>
                                {data.map((d, index) => (

                                    <Tbody>
                                        <Tr key={index}>
                                            <Td width="100px">{d.term}</Td>
                                            <Td width="100px">{d.totalInterestPay}</Td>
                                            <Td width="100px">{d.equity}</Td>
                                            <Td width="100px">{d.balance}</Td>
                                        </Tr>
                                    </Tbody>
                                ))}
                            <Tfoot>
                                <Tr>
                                    <Th >Year</Th>
                                    <Th >Interest</Th>
                                    <Th >Principal</Th>
                                    <Th >Balance</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                    </Card>
                    : null}
                </Box>
            </Stack>
        </div>
    );
};

export default YearlyAmortizationSchedule;
