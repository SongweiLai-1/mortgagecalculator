import logo from "../assets/mortgage-calculator-logo-ezgif.com-png-to-webp-converter.webp"
import {Box, Image, Stack} from "@chakra-ui/react";
import React from "react";

const LogoImg = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <Image src={logo} alt='Dan Abramov' width='600px' height='65px'/>
        </div>
    )
}

export default LogoImg;
