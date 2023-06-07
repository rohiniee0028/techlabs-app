import React, { useEffect, useState } from 'react';
import TopBar from '../Components/TopBar';
import { Box, Button, Input, Select, SimpleGrid, Text, Textarea } from '@chakra-ui/react';
import SideBar from '../Components/SideBar';
import '../styles/InsertProject.css'
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../Redux/project/Action';
import { useNavigate } from 'react-router-dom';
import BottomSidebar from '../Components/BottomSidebar';

const InsertProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        theme: "",
        reason: "",
        type: "",
        division: "",
        category: "",
        priority: "",
        department: "",
        start_date: "",
        end_date: "",
        location: ""
    });

    
    // -------------------window-size------------------------//

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

    // --------------------function api calls------------------------------//

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let start = formData.start_date.split("-");
        let end = formData.end_date.split("-");
        let syear = +start[0];
        let smonth = +start[1];
        let sdate = +start[2];
        let eyear = +end[0];
        let emonth = +end[1];
        let edate = +end[2];
        if (syear > eyear) {
            setError("End year must be greater than start year")
        }
        else if (syear <= eyear) {
            if (smonth > emonth) {
                setError("End month must be greater than start month")
            }
            else {
                if (sdate > edate) {
                    setError("End date must be greater than start date");
                }
                else {
                    dispatch(postData(formData, navigate));
                }
            }
        }

    }


    return (
        <Box display={"flex"} flexDirection={{ sm: "column", md: "row", base: "column", lg: "row", xl: "row" }} gap={{ sm: "0px", base: "0px", md: "2px", lg: "2px", xl: "2px" }} justifyContent={"space-between"}>
            {screenSize.width > 640 ? <SideBar prop1={""} prop2={""} prop3={""} prop4={""} prop5={"5px solid #1b5cbf"} prop6={"20px"} src1={"/images/Dashboard.jpg"} src2={'/images/Project-list.jpg'} src3={'/images/create-project-active.jpg'} /> : null}
            <Box>
                <TopBar title={'Create Project'} path={'/project-listing'} screenWidth={screenSize.width} />
                <Box width={{sm:"95%",base:"95%",md:"89%",lg:"91.5%",xl:"91.5%"}} m={'auto'} mt={{sm:"30px",md:"0px",base:"30px",lg:"0px",xl:"0px"}} p={'20px 20px 50px 20px'} borderRadius={'10px'} color={'gray'} position={{ sm: "", base: "", md: "absolute", lg: "absolute", xl: 'absolute' }} top={{sm:"0px",md:"12.5%",base:"0px",lg:'20%',xl:'20%'}} backgroundColor={'white'} left={{sm:"0px",md:"9.2%",base:"0px",lg:"6.5%",xl:"6.5%"}} zIndex={{ sm: "", base: "", md: "100", lg: "100", xl: '100' }} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}>
                    <form>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Box width={'100%'} textAlign={"start"}>
                                <Textarea
                                    placeholder='Enter Project Theme'
                                    size='sm'
                                    type="description"
                                    width={{sm:"100%",md:"59%",base:"100%",lg:"59%",xl:"59%"}}
                                    borderRadius={'5px'}
                                    outlineColor={'gray.400'}
                                    border={'none'}
                                    _focus={{ outline: 'none' }}
                                    name="theme"
                                    value={formData.theme}
                                    onChange={(e) => handleChange(e)}
                                />
                                {formData.theme === "" ? <Text color={"red"}>Theme required</Text> : null}
                            </Box>

                           {screenSize.width >640 ? <Button borderRadius={'50px'} p={'0px 40px'} backgroundColor={'#1b5cbf'} color={'lightgray'} _hover={{ backgroundColor: '#1b5cbf', color: 'lightgray' }} onClick={handleSubmit}>Save Project</Button> : null} 
                        </Box>
                        <SimpleGrid columns={[1, 2, 2,3]} spacing={{sm:"20px",md:"40px",base:"20px",lg:"40px",xl:"40px"}} width={{sm:"100%",md:"89%",base:"100%",lg:"89%",xl:"89%"}} mt={'50px'} textAlign={'start'}>
                            <Box>
                                <label className='label-insert'>Reason</label>
                                <Select placeholder='Select option' outlineColor={'gray.400'}
                                    border={'none'}
                                    mt={'5px'}
                                    _focus={{ outline: 'none' }}
                                    name="reason"
                                    value={formData.reason}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value='Buisness'>For Buisness</option>
                                    <option value='Personal'>For Personal</option>
                                    <option value='Social'>For Social</option>
                                    <option value='Dealership'>For Dealership</option>
                                    <option value='Transport'>For Transport</option>
                                </Select>
                            </Box>
                            <Box>
                                <label className='label-insert'>Type</label>
                                <Select placeholder='Select option' outlineColor={'gray.400'}
                                    border={'none'}
                                    mt={'5px'}
                                    _focus={{ outline: 'none' }}
                                    name="type"
                                    value={formData.type}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value='External'>External</option>
                                    <option value='Internal'>Internal</option>
                                    <option value='Both'>Both</option>
                                    <option value='Vendor'>Vendor</option>
                                </Select>
                            </Box>
                            <Box>
                                <label className='label-insert'>Division</label>
                                <Select placeholder='Select option' outlineColor={'gray.400'}
                                    border={'none'}
                                    mt={'5px'}
                                    _focus={{ outline: 'none' }}
                                    name="division"
                                    value={formData.division}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value='Filters'>Filters</option>
                                    <option value='Pumps'>Pumps</option>
                                    <option value='Compressors'>Compressors</option>
                                    <option value='Glass'>Glass</option>
                                    <option value='Water Heaters'>Water Heaters</option>
                                </Select>
                            </Box>
                            <Box>
                                <label className='label-insert'>Category</label>
                                <Select placeholder='Select option' outlineColor={'gray.400'}
                                    border={'none'}
                                    mt={'5px'}
                                    _focus={{ outline: 'none' }}
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value='Quality A'>Quality A</option>
                                    <option value='Quality B'>Quality B</option>
                                    <option value='Quality C'>Quality C</option>
                                    <option value='Quality D'>Quality D</option>
                                </Select>
                            </Box>
                            <Box>
                                <label className='label-insert'>Priority</label>
                                <Select placeholder='Select option' outlineColor={'gray.400'}
                                    border={'none'}
                                    mt={'5px'}
                                    _focus={{ outline: 'none' }}
                                    name="priority"
                                    value={formData.priority}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value='High'>High</option>
                                    <option value='Low'>Low</option>
                                    <option value='Medium'>Medium</option>
                                </Select>
                            </Box>
                            <Box>
                                <label className='label-insert'>Department</label>
                                <Select placeholder='Select option' outlineColor={'gray.400'}
                                    border={'none'}
                                    mt={'5px'}
                                    _focus={{ outline: 'none' }}
                                    name="department"
                                    value={formData.department}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value='Strategy'>Strategy</option>
                                    <option value='HR'>HR</option>
                                    <option value='Financial'>Financial</option>
                                    <option value='Stores'>Stores</option>
                                    <option value='Maintenance'>Maintenance</option>
                                    <option value='Quality'>Quality</option>
                                </Select>
                            </Box>
                            <Box>
                                <label className='label-insert'>Start Date as per Project Plan</label>
                                <Box>
                                    <Input type='date' placeholder='D month,Yr' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }} name="start_date"
                                        value={formData.start_date} onChange={(e) => handleChange(e)} />
                                    {formData.start_date === "" ? <Text color={"red"} fontSize={"14px"}>Start Date Require</Text> : null}
                                </Box>
                            </Box>
                            <Box>
                                <label className='label-insert'>End Date as per Project Plan</label>
                                <Box>
                                    <Input type='date' placeholder='D month,Yr' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }}
                                        name="end_date"
                                        value={formData.end_date} onChange={(e) => handleChange(e)} />
                                    {formData.end_date === "" ? <Text color={"red"} fontSize={"14px"}>End Date Require</Text> : null}
                                    {error !== "" ? <Text color={"red"} fontSize={"14px"}>{error}</Text> : null}
                                </Box>
                            </Box>
                            <Box>
                                <label className='label-insert'>Location</label>
                                <Select placeholder='Select option' outlineColor={'gray.400'}
                                    border={'none'}
                                    mt={'5px'}
                                    _focus={{ outline: 'none' }}
                                    name="location"
                                    value={formData.location}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value='Pune'>Pune</option>
                                    <option value='Delhi'>Delhi</option>
                                    <option value='Bangalore'>Bangalore</option>
                                    <option value='Mumbai'>Mumbai</option>
                                </Select>
                            </Box>

                        </SimpleGrid>
                        <br />
                        <Box display={'flex'} gap={'10px'} justifyContent={{sm:"left",md:"right",base:"left",lg:"right",xl:"right"}} mr={{sm:"0px",md:'100px',base:"0px",lg:'385px',xl:'385px'}}>
                            <Text>Status :</Text>
                            <Text fontWeight={'bold'} color={'blackAlpha.700'}>Registered</Text>
                        </Box>
                       
                        {screenSize.width <=640 ? <Button width={"100%"} mt={"20px"} borderRadius={'50px'} p={'0px 40px'} backgroundColor={'#1b5cbf'} color={'lightgray'} _hover={{ backgroundColor: '#1b5cbf', color: 'lightgray' }} onClick={handleSubmit}>Save Project</Button> : null} 
                    </form>
                </Box>
            </Box>
            {screenSize.width <= 640 ? <BottomSidebar prop1={""} prop2={""} prop3={""} prop4={""} prop5={"5px solid #1b5cbf"} prop6={"20px"} src1={"/images/Dashboard.jpg"} src2={'/images/Project-list.jpg'} src3={'/images/create-project-active.jpg'} /> : null}
        </Box>
    );
};

export default InsertProject;