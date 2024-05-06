
import {
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Stack,
    Text,
    HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb
} from '@chakra-ui/react';
import React, {useEffect, useState} from "react";
import './FormStyle.css';
import { DiagramData, initialDiagramData} from './Caculator'


interface Props {
    onSubmit: (data: DiagramData ) => void;
}

const BorrowingCalculator = ({ onSubmit }: Props) => {


    const [formData, setFormData] = useState<DiagramData>(initialDiagramData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const parsedValue = parseFloat(value).toFixed(2); // Parse value as float and fix to 2 decimal places
        setFormData({
            ...formData,
            [name]: parseFloat(parsedValue) // Convert back to float
        });
        onSubmit({
            ...formData,
            [name]: parseFloat(parsedValue) // Pass the updated data
        });
    };

    const handleSliderChangeEnd = (value: number) => {
        setFormData({
            ...formData,
            down_payment: value
        });
        onSubmit({
            ...formData,
            down_payment: value
        });
    };


    const down_payment = formData.down_payment ?? 0;
    const houseValue = formData.houseValue ?? 0;

    useEffect(() => {
        const loanAmount = houseValue - down_payment;
        const down_payment_rate = (down_payment / houseValue) * 100 ;

        setFormData(prevState => ({
                ...prevState,
                down_payment_rate,
                loanAmount,
            }));
        }, [formData.down_payment,formData.houseValue]);

    useEffect(() => {
        if (down_payment == 0 || null ) {
            const downPaymentRate = formData.down_payment_rate ?? 0;
            const newDownPayment = houseValue * downPaymentRate;
                setFormData(prevState => ({
                    ...prevState,
                    down_payment: newDownPayment,
                }));
                console.log(newDownPayment)
            }
    }, [formData.down_payment_rate]);






    return (
            <Stack spacing={3}>
                <HStack>
                    <Text flex="1">Home Value:</Text>
                    <InputGroup w="400px">
                        <InputLeftAddon>$</InputLeftAddon>
                        <Input
                            id="houseValue"
                            name="houseValue"
                            type="number"
                            onChange={handleInputChange}
                            value={formData.houseValue}
                            w="87%"
                        />
                    </InputGroup>
                </HStack>



                <HStack>
                    <Text flex="1">Down Payment:</Text>
                    <InputGroup w="400px">
                        <Input
                            id="down_payment"
                            name="down_payment"
                            type="number"
                            onChange={handleInputChange}
                            value={formData.down_payment}
                            w="80%"
                        />
                        <Input id="down_payment_rate"
                               name="down_payment_rate"
                               type="number"
                               onChange={handleInputChange}
                               value={formData.down_payment_rate}
                        /><InputRightAddon>%</InputRightAddon>

                    </InputGroup>
                </HStack>

                <Slider
                    defaultValue={60} min={0} max={10000000} step={10000}
                    name="down_payment"
                    aria-label="slider-ex-1"
                    onChange={handleSliderChangeEnd}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>

                <HStack>
                    <Text flex="1">Loan amount:</Text>
                    <InputGroup w="400px">
                        <InputLeftAddon>$</InputLeftAddon>
                        <Input
                            id="loanAmount"
                            name="loanAmount"
                            type="number"
                            onChange={handleInputChange}
                            value={formData.loanAmount}
                            w="87%"
                        />
                    </InputGroup>
                </HStack>

                <HStack>
                    <Text flex="1">Term:</Text>
                    <InputGroup w="400px">
                        <Input
                            id="term"
                            name="term"
                            type="number"
                            onChange={handleInputChange}
                            value={formData.term}
                            w="80%"
                        />
                        <InputRightAddon>Years</InputRightAddon>
                    </InputGroup>
                </HStack>

                <HStack>
                    <Text flex="1">Rate:</Text>
                    <InputGroup w="400px">
                        <Input
                            id="yearlyInterestRate"
                            name="yearlyInterestRate"
                            type="number"
                            onChange={handleInputChange}
                            value={formData.yearlyInterestRate}
                            w="86%"
                        />
                        <InputRightAddon>%</InputRightAddon>
                    </InputGroup>
                </HStack>

                <HStack>
                    <Text flex="1">Land Tax:</Text>
                    <InputGroup w="400px">
                        <Input
                            id="land_tax"
                            name="land_tax"
                            type="number"
                            onChange={handleInputChange}
                            value={formData.land_tax}
                            w="79%"
                        />
                        <InputRightAddon>$/year</InputRightAddon>
                    </InputGroup>
                </HStack>

                <HStack>
                    <Text flex="1">Home insurance:</Text>
                    <InputGroup w="400px">
                        <Input
                            id="home_insurance"
                            name="home_insurance"
                            type="number"
                            onChange={handleInputChange}
                            value={formData.home_insurance}
                            w="79%"/>
                        <InputRightAddon>$/year</InputRightAddon>
                    </InputGroup>
                </HStack>
            </Stack>
    )
}

export default BorrowingCalculator;
