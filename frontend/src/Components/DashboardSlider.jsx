import { useEffect, useRef, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import "../styles/DashboardSlider.css"

export const DashboardSlider = ({ total, closed, running, closure, cancelled }) => {

    let box = document.querySelector('.product-container');
    const ref = useRef(null);

    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(ref.current.offsetWidth);
    }, []);


    return (
        <section className="productsecond" ref={ref}>
            <div className="product-container">
                <div className="product-card">
                    <Box textAlign={'left'} width={"140px"} height={'100px'} backgroundColor={'white'} borderRadius={'5px'} borderLeft={'6px solid #32d6e9'} p={'10px 15px'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}>
                        <Text fontWeight={'500'}>Total Projects</Text>
                        <Heading color={'blackAlpha.700'}>{total}</Heading>
                    </Box>
                </div>
                <div className="product-card">
                    <Box textAlign={'left'} width={"140px"} height={'100px'} backgroundColor={'white'} borderRadius={'5px'} borderLeft={'6px solid #32d6e9'} p={'10px 15px'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}>
                        <Text fontWeight={'500'}>Closed</Text>
                        <Heading color={'blackAlpha.700'}>{closed}</Heading>
                    </Box>
                </div>
                <div className="product-card">
                    <Box textAlign={'left'} width={"140px"} height={'100px'} backgroundColor={'white'} borderRadius={'5px'} borderLeft={'6px solid #32d6e9'} p={'10px 15px'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}>
                        <Text fontWeight={'500'}>Running</Text>
                        <Heading color={'blackAlpha.700'}>{running}</Heading>
                    </Box>
                </div>
                <div className="product-card">
                    <Box textAlign={'left'} width={"140px"} height={'100px'} backgroundColor={'white'} borderRadius={'5px'} borderLeft={'6px solid #32d6e9'} p={'10px 15px'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}>
                        <Text fontWeight={'500'}>Closure Delay</Text>
                        <Heading color={'blackAlpha.700'}>{closure}</Heading>
                    </Box>
                </div>
                <div className="product-card">
                    <Box textAlign={'left'} width={"140px"} height={'100px'} backgroundColor={'white'} borderRadius={'5px'} borderLeft={'6px solid #32d6e9'} p={'10px 15px'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}>
                        <Text fontWeight={'500'}>Cancelled</Text>
                        <Heading color={'blackAlpha.700'}>{cancelled}</Heading>
                    </Box>
                </div>
            </div>
        </section >
    )
}