import React, { useEffect, useState } from 'react';
import TopBar from '../Components/TopBar';
import SideBar from '../Components/SideBar';
import "../styles/ProjectListing.css";
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
    Box,
    Input,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Text,
    Card,
    Flex,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
} from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, searchData, updateData } from '../Redux/project/Action';
import { Pagination } from '../Components/Pagination';
import BottomSidebar from '../Components/BottomSidebar';


const ProjectListing = () => {
    const dispatch = useDispatch();
    const { data, pageCount } = useSelector(store => store.project);
    const [text, setText] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("priority");
    const [limit, setLimit] = useState(6);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = useState('bottom')
  


    // -------------------window-size width------------------------//

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    // ---------------function api calls------//

    useEffect(() => {
        getAllProject()
    }, [page, text, sort])

    const getAllProject = () => {
        dispatch(getAllData(page, limit, text, sort));
    }

// ------------running status----------------------------//
    const handleStart = (id) => {
        let obj = {
            status: "Running"
        }
        dispatch(updateData(id, obj, page, limit))
    }
// ---------------------------closed status--------------------//
    const handleClose = (id) => {
        let obj = {
            status: "Closed"
        }
        dispatch(updateData(id, obj, page, limit))
    }
// -----------------------cancelled status---------------------//
    const handleCancel = (id) => {
        let obj = {
            status: "Cancelled"
        }
        dispatch(updateData(id, obj, page, limit))
    }
// --------------------------search function ---------------------//
    const handleSearch = (e) => {
        setText(e.target.value);
        getAllProject();
    }
// ---------foe  large screen size sort function----------------//

    const handleSort = (e) => {
        setSort(e.target.value);
        getAllProject();
    }

// ---------foe  small screen size sort function----------------//
    const handleSelect = (e) => {
       console.log(e.target.id)
       setSort(e.target.id);
       getAllProject();
    }

    return (
        <Box display={"flex"} flexDirection={{ sm: "column", md: "row", base: "column", lg: "row", xl: "row" }} gap={{ sm: "0px", base: "0px", md: "2px", lg: "2px", xl: "2px" }} justifyContent={"space-between"}>
            {screenSize.width > 640 ? <SideBar prop1={""} prop2={""} prop3={"5px solid #1b5cbf"} prop4={"20px"} prop5={""} prop6={""} src1={"/images/Dashboard.jpg"} src2={'/images/Project-list-active.jpg'} src3={'/images/create-project.jpg'} /> : null}
            <Box>
                <TopBar title={'Project Listing'} path={'/dashboard'} screenWidth={screenSize.width} />
                <Box width={{ sm: "94%", base: "94%", md: "92.5%", lg: "92.5%", xl: "92.5%" }} m={'auto'} borderRadius={'10px'} color={'gray'} position={{ sm: "", base: "", md: "absolute", lg: "absolute", xl: 'absolute' }} zIndex={{ sm: "", base: "", md: "100", lg: "100", xl: '100' }} top={{ sm: "0px", md: "12%", base: "0px", lg: '20%', xl: '20%' }} left={{ sm: "0px", md: "9%", base: "0px", lg: "6.2%", xl: "6.2%" }} backgroundColor={{ sm: "transparent", md: 'white', base: "transparent", lg: 'white', xl: 'white' }} boxShadow={{ sm: "0", base: "0", md: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px', lg: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px', xl: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}>
                    <Box display={'flex'} p={{ sm: "20px 5px 10px 5px", base: "20px 5px 10px 5px", md: '20px 20px 10px 20px', lg: '20px 20px 10px 20px', xl: '20px 20px 10px 20px' }} justifyContent={'space-between'} width={'100%'} mt={{ sm: "20px", base: "20px", md: "0px", lg: "0px", xl: "0px" }}>
                        <Box display={'flex'} gap={"5px"} alignItems={'center'} borderBottom={'2px solid lightgray'} pb={{ sm: "5px", base: "5px" }} width={{ sm: "80%", base: "80%", lg: "20%", xl: "20%", md: "20%" }}>
                            <IoSearchOutline size={'20px'} />
                            <Input variant='unstyled' type='search' value={text} placeholder='Search' onChange={(e) => handleSearch(e)} />
                        </Box>
                        {
                            screenSize.width > 640 ?
                                <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                                    <Box>Sort By :</Box>
                                    <Select variant='unstyled' fontWeight={'bold'} width={'110px'} value={sort} onChange={(e) => handleSort(e)}>
                                        <option value='Priority'>Priority</option>
                                        <option value='Category'>Category</option>
                                        <option value='Location'>Location</option>
                                        <option value='Division'>Division</option>
                                        <option value='Department'>Department</option>
                                        <option value='Reason'>Reason</option>
                                        <option value='Status'>Status</option>
                                    </Select>
                                </Box>
                                :
                                // -----------------small screen hamburger------------//
                                <Box>
                                    <Button backgroundColor={"transparent"} color={"gray.600"} onClick={onOpen}>
                                        <HamburgerIcon  w={"8"} h={"12"}/>
                                    </Button>
                                    <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                                        <DrawerOverlay />
                                        <DrawerContent>
                                            <DrawerHeader borderBottomWidth='1px' display={"flex"} justifyContent={"space-between"}>
                                                <Text fontWeight={"bold"} fontSize={"20px"}>Sort Projects By</Text>
                                                <Box onClick={onClose}><CloseIcon fontWeight={"bold"} /></Box>
                                            </DrawerHeader>
                                            <DrawerBody lineHeight={"2.5"}>
                                                <div id="priority" onClick={(e)=>handleSelect(e)}>Priority</div>
                                                <div id="category" onClick={(e)=>handleSelect(e)}>Category</div>
                                                <div id="location" onClick={(e)=>handleSelect(e)}>Location</div>
                                                <div id="division" onClick={(e)=>handleSelect(e)}>Division</div>
                                                <div id="department" onClick={(e)=>handleSelect(e)}>Department</div>
                                                <div id="reason" onClick={(e)=>handleSelect(e)}>Reason</div>
                                                <div id="status" onClick={(e)=>handleSelect(e)}>Status</div>
                                            </DrawerBody>
                                        </DrawerContent>
                                    </Drawer>
                                </Box>

                        }
                    </Box>
                    {
                        screenSize.width > 640 ?
                            <TableContainer mt={'5px'} width={'100%'}>
                                <Table variant='simple' >
                                    <Thead>
                                        <Tr backgroundColor={'#e9effd'}>
                                            <Th>Project Name</Th>
                                            <Th>Reason</Th>
                                            <Th>Type</Th>
                                            <Th>Division</Th>
                                            <Th>Category</Th>
                                            <Th>Priority</Th>
                                            <Th>Dept.</Th>
                                            <Th>Location</Th>
                                            <Th>Status</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            data?.map((el) => (
                                                <Tr key={el._id} fontSize={'14px'}>
                                                    <Td>
                                                        <Text fontWeight={'bold'} color={'black'} fontSize={'16px'} wordBreak={'break-word'}>{el.theme}</Text>
                                                        <Text>{el.start_date} to {el.end_date}</Text>
                                                    </Td>
                                                    <Td fontWeight={'500'}>{el.reason}</Td>
                                                    <Td fontWeight={'500'}>{el.type}</Td>
                                                    <Td fontWeight={'500'}>{el.division}</Td>
                                                    <Td fontWeight={'500'}>{el.category}</Td>
                                                    <Td fontWeight={'500'}>{el.priority}</Td>
                                                    <Td fontWeight={'500'}>{el.department}</Td>
                                                    <Td fontWeight={'500'}>{el.location}</Td>
                                                    <Td fontWeight={'bold'} color={'blue.700'} >{el.status}</Td>
                                                    <Td display={'flex'} gap={'10px'}>
                                                        <button className='btn-start' onClick={() => handleStart(el._id)}>Start</button>
                                                        <button className='btn-close' onClick={() => handleClose(el._id)}>Close</button>
                                                        <button className='btn-cancel' onClick={() => handleCancel(el._id)}>Cancel</button>
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>

                                </Table>
                            </TableContainer>
                            :
                            // ----------------small screen cards-------------------------//
                            <Box marginTop={"20px"}>
                                {
                                    data?.map((el) => (
                                        <Card
                                            direction={{ base: 'column', sm: 'column' }}
                                            overflow='hidden'
                                            borderRadius={"15px"}
                                            variant='outline'
                                            width={"100%"}
                                            margin={"auto"}
                                            mb={"15px"}
                                            backgroundColor={"white"}
                                            padding={"20px"}
                                            key={el._id}
                                        >
                                            <Flex justifyContent={"space-between"} textAlign={"start"}>
                                                <Box>
                                                    <Text fontWeight={"bold"} fontSize={"18px"}>{el.theme}</Text>
                                                    <Text fontSize={"16px"} color={"gray"}>{el.start_date} to {el.end_date}</Text>
                                                </Box>
                                                <Text fontWeight={"bold"} fontSize={"18px"} color={"blue.700"}>{el.status}</Text>
                                            </Flex>
                                            <Flex fontSize={"16px"} mt={"10px"}>
                                                <Text color={"gray"}>Reason</Text>
                                                <Text>: {el.reason}</Text>
                                            </Flex>
                                            <Flex fontSize={"16px"} mt={"2px"} gap={"5px"}>
                                                <Flex>
                                                    <Text color={"gray"}>Type</Text>
                                                    <Text>: {el.type}</Text>
                                                </Flex>
                                                <Text color={"gray"}>•</Text>
                                                <Flex>
                                                    <Text color={"gray"}>Category</Text>
                                                    <Text>: {el.category}</Text>
                                                </Flex>
                                            </Flex>
                                            <Flex fontSize={"16px"} gap={"5px"} mt={"2px"}>
                                                <Flex>
                                                    <Text color={"gray"}>Div</Text>
                                                    <Text>: {el.division}</Text>
                                                </Flex>
                                                <Text color={"gray"}>•</Text>
                                                <Flex>
                                                    <Text color={"gray"}>Dept</Text>
                                                    <Text>: {el.department}</Text>
                                                </Flex>
                                            </Flex>
                                            <Flex fontSize={"16px"} mt={"2px"}>
                                                <Text color={"gray"}>Location</Text>
                                                <Text>: {el.location}</Text>
                                            </Flex>
                                            <Flex fontSize={"16px"} mt={"2px"}>
                                                <Text color={"gray"}>Priority</Text>
                                                <Text>: {el.priority}</Text>
                                            </Flex>
                                            <Flex mt={"10px"} justifyContent={"space-between"}>
                                                <button className='btn-start' onClick={() => handleStart(el._id)}>Start</button>
                                                <button className='btn-close' onClick={() => handleClose(el._id)}>Close</button>
                                                <button className='btn-cancel' onClick={() => handleCancel(el._id)}>Cancel</button>
                                            </Flex>
                                        </Card>
                                    ))
                                }
                            </Box>
                    }

                </Box>
                <Pagination totalPage={pageCount} page={page} onChange={(val) => setPage(val)} />
            </Box>
            {screenSize.width <= 640 ? <BottomSidebar prop1={""} prop2={""} prop3={"5px solid #1b5cbf"} prop4={"20px"} prop5={""} prop6={""} src1={"/images/Dashboard.jpg"} src2={'/images/Project-list-active.jpg'} src3={'/images/create-project.jpg'} /> : null}
        </Box>
    );
}

export default ProjectListing;