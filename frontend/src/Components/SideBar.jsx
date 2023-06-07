import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({ src1, src2, src3, prop1, prop2, prop3, prop4, prop5, prop6 }) => {
    return (
        <Box width={{sm:"0px",md:"15%",base:"0px",lg:"6%",xl:"6%"}} display={'flex'} backgroundColor={'white'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={"100vh"} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}>
            <Box height={{sm:"0px",md:"45vh",base:"0vh",lg:'85vh',xl:'85vh'}} display={'flex'} gap={'30px'} flexDirection={'column'} justifyContent={{sm:"center",md:"flex-start",base:"center",lg:"center",xl:"center"}} alignItems={"center"}>
                <Box cursor={'pointer'} display={'flex'} gap={'10px'} alignItems={"center"}>
                    <Box borderLeft={prop1} borderRightRadius={prop2} height={"40px"}></Box>
                    <Link to={'/dashboard'}><Image src={src1} alt='dashboard-icon' width={'30px'} /></Link>
                </Box>
                <Box cursor={'pointer'} display={'flex'} gap={'10px'} alignItems={"center"}>
                    <Box borderLeft={prop3} borderRightRadius={prop4} height={"40px"}></Box>
                    <Link to={'/project-listing'}><Image src={src2} alt='project-list-icon' width={'30px'} /></Link>
                </Box>
                <Box borderTop={'5px solid lightgray'} width={'30px'}></Box>
                <Box cursor={'pointer'} display={'flex'} gap={'10px'} alignItems={"center"}>
                    <Box borderLeft={prop5} borderRightRadius={prop6} height={"40px"}></Box>
                    <Link to={'/insert-project'}><Image src={src3} alt='create-project-icon' width={'30px'} /></Link>
                </Box>
            </Box>
            <Box cursor={'pointer'}>
                <Link to={'/'}><Image src='/images/Logout.jpg' alt='logout-icon' width={'30px'} /></Link>
            </Box>
        </Box>
    );
};

export default SideBar;