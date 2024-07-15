import {
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Stack,
    Text,
    HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from '@chakra-ui/react';
import React, {useEffect, useState} from "react";
import './FormStyle.css';
import { DiagramData, initialDiagramData } from './function/Caculator'


interface Props {
    onSubmit: (data: DiagramData) => void;
}

const BorrowingCalculator = ({ onSubmit }: Props) => {

    const [formData, setFormData] = useState<DiagramData>(initialDiagramData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let parsedValue = parseFloat(value);

        if (isNaN(parsedValue)) {
            parsedValue = 0; // Handle NaN case
        } else {
            parsedValue = parseFloat(parsedValue.toFixed(2)); // Fix to 2 decimal places
        }

        let updatedFormData = {
            ...formData,
            [name]: parsedValue
        };

        if (name === "down_payment") {
            const down_payment_rate = (parsedValue / (formData.houseValue || 1)) * 100;
            updatedFormData = {
                ...updatedFormData,
                down_payment_rate: parseFloat(down_payment_rate.toFixed(2))
            };
        } else if (name === "down_payment_rate") {
            const down_payment = (parsedValue / 100) * (formData.houseValue || 0);
            updatedFormData = {
                ...updatedFormData,
                down_payment: parseFloat(down_payment.toFixed(2))
            };
        } else if (name === "houseValue") {
            const down_payment_rate = (formData.down_payment || 0) / parsedValue * 100;
            updatedFormData = {
                ...updatedFormData,
                down_payment_rate: parseFloat(down_payment_rate.toFixed(2))
            };
        }

        setFormData(updatedFormData);
        onSubmit(updatedFormData);
    };

    const handleSliderChangeEnd = (value: number) => {
        const down_payment_rate = (value / (formData.houseValue || 1)) * 100;

        const updatedFormData = {
            ...formData,
            down_payment: value,
            down_payment_rate: parseFloat(down_payment_rate.toFixed(2))
        };

        setFormData(updatedFormData);
        onSubmit(updatedFormData);
    };

    useEffect(() => {
        const loanAmount = (formData.houseValue || 0) - (formData.down_payment || 0);

        setFormData(prevFormData => ({
            ...prevFormData,
            loanAmount: loanAmount
        }));
    }, [formData.down_payment, formData.houseValue, formData.land_tax, formData.home_insurance]);

    return (
        <Stack spacing={5}>
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
                    <Input
                        id="down_payment_rate"
                        name="down_payment_rate"
                        type="number"
                        onChange={handleInputChange}
                        value={formData.down_payment_rate?.toFixed(2)}
                    />
                    <InputRightAddon>%</InputRightAddon>
                </InputGroup>
            </HStack>

            <Slider
                defaultValue={60} min={0} max={10000000} step={10000}
                name="down_payment"
                aria-label="slider-ex-1"
                onChange={handleSliderChangeEnd}>

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
                        max={100}
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
