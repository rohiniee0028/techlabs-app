import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import ProjectListing from '../Pages/ProjectListing';
import InsertProject from '../Pages/InsertProject';

const AllRoutes = () => {
    return (
       <Routes>
         <Route path={'/'} element={<Login/>}/>
         <Route path={'/dashboard'} element={<Dashboard/>}/>
         <Route path={'/project-listing'} element={<ProjectListing/>}/>
         <Route path={'/insert-project'} element={<InsertProject/>}/>
       </Routes>
    );
};

export default AllRoutes;