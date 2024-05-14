import {Box, Container, Grid, GridItem, HStack, Stack} from '@chakra-ui/react';
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
                                    "Table Table"
                                     "Detail footer" `} gap={4} >
                <GridItem pl='2' bg='white.300'  area={'header'}  >
                    <Logo_img />
                </GridItem>
                <GridItem pl='2'  area={'form'} position="absolute" ml='120px' mt='90px'>
                    <Container>
                    <BorrowingCaculator onSubmit={(form) => setForm(form)} />
                    </Container>
                </GridItem>

                <GridItem pl='2' position="absolute" area={'main'} ml='750px' mt='90px' >
                    <Container>
                        <Calculator form={form} />
                    </Container>
                </GridItem>

                <GridItem pl='2' area={'Table'}>
                    <Container mt='600px' >
                        <YearlyAmortizationSchedule form={form} />
                    </Container>
                </GridItem>

                <GridItem pl='2' bg='white.300'  area={'Detail'} paddingX={5} >
                    <Container  >
                    <MortgageDetails form={form}/>
                    </Container>
                </GridItem>

                <GridItem pl='2' bg='white.300'  area={'footer'}>
                    <Container  >
                    <PieChartDetails pieForm={form} />
                    </Container>
                </GridItem>
            </Grid>
            </>
    )

}

export default App
