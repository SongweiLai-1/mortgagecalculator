import {Grid, GridItem, HStack, Stack} from '@chakra-ui/react';
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
                                    "form main"
                                     "Detail footer" `} gap={4} >
                <GridItem pl='2' bg='white.300'  area={'header'}  >
                    <Logo_img />
                </GridItem>
                <GridItem pl='2'  area={'form'}>
                    <Stack>
                    <BorrowingCaculator onSubmit={(form) => setForm(form)} />
                        <YearlyAmortizationSchedule form={form} />

                    </Stack>
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    <Calculator form={form} />
                </GridItem>

                <GridItem pl='2' bg='white.300'  area={'Detail'} paddingX={5} >
                    <MortgageDetails form={form}/>
                </GridItem>

                <GridItem pl='2' bg='white.300'  area={'footer'}><PieChartDetails pieForm={form} /></GridItem>
            </Grid>
            </>
    )

}

export default App
