import {Box, Grid, GridItem, HStack, Stack} from '@chakra-ui/react';
import React, {useState} from "react";
import BorrowingCaculator from "./components/BorrowingCaculator"
import Calculator, {DiagramData, initialDiagramData} from "./components/Caculator"
import MortgageDetails from "./components/MortgageDetails/MortgageDetails"

function App() {

    const [form,setForm] = useState<DiagramData>(initialDiagramData)

    return (
        <>
            <Grid templateAreas={`"header header" 
                                    "form main"
                                    "form main"
                                     "Detail footer" `} gap={4} >
                <GridItem pl='2' bg='white.300'  area={'header'}>Header</GridItem>
                <GridItem pl='2'  area={'form'}>
                    <BorrowingCaculator onSubmit={(form) => setForm(form)} />
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    <Calculator form={form} />
                </GridItem>

                <GridItem pl='2' bg='white.300'  area={'Detail'} paddingX={5} >
                    <MortgageDetails form={form}/>
                </GridItem>

                <GridItem pl='2' bg='white.300'  area={'footer'}>Footer</GridItem>
            </Grid>
            </>
    )

}

export default App
