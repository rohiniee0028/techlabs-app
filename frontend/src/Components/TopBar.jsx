import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const TopBar = ({ title, path, screenWidth }) => {
    return (
        <div>
            <Box>
                <Image src="/images/Header-bg.jpg" alt="header-img" width={{sm:"100%",md:"100%",base:"100%",lg:"100%",xl:"100%"}} height={{ sm: "80px", md: "180px", base: "80px", lg: "200px", xl: "200px" }} />
            </Box>
            {
                screenWidth > 640 ?
                    <Box color={"white"} ml={"50px"} fontWeight={'bold'} width={"50%"} position={'absolute'} top={{sm:"0px",md:"3%",base:"0px",lg:"5%",xl:"5%"}} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box fontSize={'20px'} fontWeight={'bold'} display={'flex'} gap={'10px'} alignItems={'center'} cursor={'pointer'}>
                            <IoIosArrowBack size={'25px'} />
                            <Link to={path}><Text>{title}</Text></Link>
                        </Box>
                        <Image src='/images/Logo.svg' alt='icons-img' />
                    </Box>
                    :
                    <Box color={"white"} fontWeight={'bold'} width={"100%"} mt={"-55px"} display={'flex'} justifyContent={'space-between'} p={"0px 10px 0px 10px"} alignItems={'center'}>
                        <Box fontSize={'20px'} fontWeight={'bold'} display={'flex'} gap={'10px'} alignItems={'center'} cursor={'pointer'}>
                            <IoIosArrowBack size={'25px'} />
                            <Link to={path}><Text>{title}</Text></Link>
                        </Box>
                        <Box><Link to="/"><Image src='/images/Logout.svg' alt="logout-img" width={"30px"}/></Link></Box>
                    </Box>
            }
        </div>
    );
};

export default TopBar;