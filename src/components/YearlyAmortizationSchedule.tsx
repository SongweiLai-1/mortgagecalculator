import React, {useState} from 'react';
import {Box, Button, Stack, Table, TableContainer, Text, Th, Tr} from "@chakra-ui/react";
import {DiagramData} from "./Caculator";

interface Props {
    form: DiagramData;
}


const YearlyAmortizationSchedule = ({form}:Props) => {

    const [showSlider, setShowSlider] = useState(false);

    const now = new Date();
    const currentYear = now.getFullYear();
    const endYear = currentYear + form.term;


  return (
    <div>
        <Box marginTop={5}>
            <Button onClick={() => setShowSlider(!showSlider)} colorScheme='blue'>Show Amortization Table</Button>
        </Box>
        <Stack>
            {showSlider ?
                <TableContainer>
                    <Table>
                        <Tr>
                            <Th isNumeric>Year</Th>
                            <Th isNumeric>Interest</Th>
                            <Th isNumeric>Principal</Th>
                            <Th isNumeric>Balance</Th>
                        </Tr>

                    </Table>
                </TableContainer>
            : null}
        </Stack>

    </div>
  );
};

export default YearlyAmortizationSchedule;