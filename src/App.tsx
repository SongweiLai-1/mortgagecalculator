import {Box, Container, Grid, GridItem} from '@chakra-ui/react';
import React, {useState} from "react";
import BorrowingCaculator from "./components/BorrowingCaculator"
import Calculator, {DiagramData, initialDiagramData} from "./components/Caculator"
import MortgageDetails from "./components/MortgageDetails/MortgageDetails"
import Logo_img from "./components/Logo_img";
import PieChartDetails from "./components/PieChartDetails/PieChartDetails"
import YearlyAmortizationSchedule from "./components/YearlyAmortizationSchedule";
function App() {

    const [form,setForm] = useState<DiagramData>(initialDiagramData)

    return (
        <>
            <Grid templateAreas={`"header header" 
                                    "form main"
                                    "table table"
                                     "Detail pieForm" `} gap={4} >
                <GridItem pl='2' bg='blue.300'  area={'header'}  >
                    <Logo_img />
                </GridItem>
                <GridItem pos='absolute' mt='100' pl='2' area={'form'} >
                    <Box w='600px' ml='120px'>
                        <BorrowingCaculator onSubmit={(form) => setForm(form)} />
                    </Box>
                </GridItem>

                <GridItem pos='absolute' ml='650px' mt='100' pl='2' area={'main'}  >
                    <Box  w='600px' ml='100px'>
                    <Calculator form={form} />
                    </Box>
                </GridItem>

                <GridItem pl='2' area={'table'}>
                    <Box  w='600px' mt='580px' ml=' 120px'>
                    <YearlyAmortizationSchedule form={form} />
                    </Box>
                </GridItem>

                <GridItem pl='2' bg='white.300'  area={'Detail'} >
                    <Container pos='absolute' ml='104px'>
                    <MortgageDetails form={form}/>
                    </Container>
                </GridItem>

                <GridItem pl='2' bg='white.300'  area={'pieForm'} >
                    <Container ml='616px'>
                    <PieChartDetails pieForm={form} />
                    </Container>
                </GridItem>

            </Grid>
            </>
    )

}

export default App
