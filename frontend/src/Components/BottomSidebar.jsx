import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const BottomSidebar = ({ src1, src2, src3, prop1, prop2, prop3, prop4, prop5, prop6 }) => {
    return (
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"} p={"15px 20px"} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'} backgroundColor={"white"}>
            <Box cursor={'pointer'} display={'flex'} flexDirection={"column"} alignItems={"center"} gap={'10px'} >
                <Link to={'/dashboard'}><Image src={src1} alt='dashboard-icon' width={'30px'} /></Link>
                <Box borderBottom={prop1} borderTopRadius={prop2} width={"50px"}></Box>
            </Box>
            <Box cursor={'pointer'} display={'flex'} flexDirection={"column"} gap={'10px'} alignItems={"center"}>
                <Link to={'/project-listing'}><Image src={src2} alt='project-list-icon' width={'30px'} /></Link>
                <Box borderBottom={prop3} borderTopRadius={prop4} width={"50px"}></Box>
            </Box>
            <Box cursor={'pointer'} display={'flex'} flexDirection={"column"} gap={'10px'} alignItems={"center"}>
                <Link to={'/insert-project'}><Image src={src3} alt='create-project-icon' width={'30px'} /></Link>
                <Box borderBottom={prop5} borderTopRadius={prop6} width={"50px"}></Box>
            </Box>
        </Box>
    );
};

export default BottomSidebar;