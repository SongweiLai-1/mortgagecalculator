import {Box, Container, Grid, GridItem, HStack} from '@chakra-ui/react';
import React, {useState} from "react";
import BorrowingCaculator from "./components/BorrowingCaculator"
import Calculator, {DiagramData, initialDiagramData} from "./components/function/Caculator"
import MortgageDetails from "./components/MortgageDetails/MortgageDetails"
import Logo_img from "./components/Logo_img";
import PieChartDetails from "./components/PieChartDetails/PieChartDetails"
import YearlyAmortizationSchedule from "./components/YearlyAmortizationSchedule";
function App() {

    const [form,setForm] = useState<DiagramData>(initialDiagramData)

    return (
        <>
            <Grid templateAreas={`"header header" 
                                    "main main"
                                    "table table"
                                     "footer footer" `} gap={4} >

                <GridItem pl='2' bg='blue.300' w='100%' area={'header'}  >
                    <Logo_img/>
                </GridItem>

                <GridItem  area={'main'}  >
                    <HStack>
                        <Box w='600px' ml='10%'>
                            <BorrowingCaculator onSubmit={(form) => setForm(form)} />
                        </Box>
                        <Box  w='600px' >
                            <Calculator form={form} />
                        </Box>
                    </HStack>
                </GridItem>

                <GridItem  area={'table'}>
                    <Box  w='600px' ml='10%' >
                    <YearlyAmortizationSchedule form={form} />
                    </Box>
                </GridItem>

                <GridItem pl='2' bg='white.300' ml='10%' area={'footer'} >
                <HStack mt='0%'>
                    <Box mt='0%'>
                        <MortgageDetails form={form}/>
                    </Box>
                    <Box mt='0%'>
                        <PieChartDetails pieForm={form} />
                    </Box>
                 </HStack>
                </GridItem>


            </Grid>
            </>
    )

}

export default App
