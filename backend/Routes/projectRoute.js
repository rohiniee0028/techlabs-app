require("dotenv").config();
const express = require("express");
const { projectModel } = require("../Models/project.model");
const projectList = express.Router()

// -----------------get all data api ,pagination, sort--------------------------------//

projectList.get("/", async (req, res) => {
    // console.log("message");
    const sortby = (req.query.sort).toLowerCase();
    // console.log(sortby);
   
    try {
        let allData = await projectModel.find({})
        switch (sortby) {
            case "priority": {
                allData = await projectModel.find().sort({ priority: 1 });
                break;
            }
            case "division": {
                allData = await projectModel.find().sort({ division: 1 });
                break;
            }
            case "category": {
                allData = await projectModel.find().sort({ category: 1 });
                break;
            }
            case "reason": {
                allData = await projectModel.find().sort({ reason: 1 });
                break;
            }
            case "status": {
                allData = await projectModel.find().sort({ status: 1 });
                break;
            }
            case "location": {
                allData = await projectModel.find().sort({ location: 1 });
                break;
            }
            case "type": {
                allData = await projectModel.find().sort({ type: 1 });
                break;
            }
            case "department": {
                allData = await projectModel.find().sort({ department: 1 });
                break;
            }
        }
        
        // console.log(allData);
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 6

        const startIndex = (page - 1) * limit
        const lastIndex = (page) * limit

        const results = {}
        results.totalDataCount = allData.length;
        results.pageCount = Math.ceil(allData.length / limit);

        if (lastIndex < allData.length) {
            results.next = {
                page: page + 1,
            }
        }
        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
            }
        }
        results.result = allData.slice(startIndex, lastIndex);
        res.send(results)
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})

// ----------------total counts-api---------------------------//

projectList.get("/counts", async (req, res) => {
    
    try{
       const data = await projectModel.find({});
       let totalData = data.length;
       let closedData = data.filter((el)=>{
          return el.status==="Closed"
       })
       let runningData = data.filter((el)=>{
        return el.status==="Running"
       })
       let cancelledData = data.filter((el)=>{
        return el.status==="Cancelled"
       })
       let closureDelay = data.filter((el)=>{
        let today = new Date();
        let dd = today.getDate();
        let month = today.getMonth()+1;
        let year = today.getFullYear();

        let newD = `${year}${month}${dd}`;

        let end = el.end_date.split("-");
        let edd = end[2][0]==0 ? +end[2][1] : +end[2];
        let emonth = end[1][0]==0 ? +end[1][1] : +end[1];
        let eyear = +end[0];

        let new_end_date = `${eyear}${emonth}${edd}`

        // console.log(new_end_date,",",newD);
        return el.status==="Running" && new_end_date<(newD)

       })
    //    console.log(totalData,closedData,runningData,cancelledData,closureDelay);
       res.send({totalData,closedData,runningData,cancelledData,closureDelay})
    }
    catch(err){
        console.log(err);
    }
})

// ------------------dashboard-chart-api--------------------------------------//

projectList.get("/charts",async(req,res)=>{
    try{
        const chartData = await projectModel.find({}); 
        let FIN = chartData.filter((el)=>{
            return el.department==="Financial";
        })
        let closedFIN = chartData.filter((el)=>{
            return el.department==="Financial" && el.status==="Closed";
        })
        let STR = chartData.filter((el)=>{
            return el.department==="Strategy";
        })
        let closedSTR = chartData.filter((el)=>{
            return el.department==="Strategy" && el.status==="Closed";
        })
        let STO = chartData.filter((el)=>{
            return el.department==="Stores";
        })
        let closedSTO = chartData.filter((el)=>{
            return el.department==="Stores" && el.status==="Closed";
        })
        let MAN = chartData.filter((el)=>{
            return el.department==="Maintenance";
        })
        let closedMAN = chartData.filter((el)=>{
            return el.department==="Maintenance" && el.status==="Closed";
        })
        let HR = chartData.filter((el)=>{
            return el.department==="HR";
        })
        let closedHR = chartData.filter((el)=>{
            return el.department==="HR" && el.status==="Closed";
        })
        let QLT = chartData.filter((el)=>{
            return el.department==="Quality";
        })
        let closedQLT = chartData.filter((el)=>{
            return el.department==="Quality" && el.status==="Closed";
        })
        let chartsTotal = [STR.length,FIN.length,QLT.length,MAN.length,STO.length,HR.length]
        let chartsClosed = [closedSTR.length,closedFIN.length,closedQLT.length,closedMAN.length,closedSTO.length,closedHR.length]
        res.send({chartsTotal,chartsClosed})
    }
    catch(err){
        console.log(err);
    }
})



// --------------------------add data api------------------------------------//

projectList.post("/add", async (req, res) => {
    const { theme, reason, type, division, category, priority, department, start_date, end_date, location } = req.body;
    if (!theme && theme === "" &&
        !start_date && start_date === "" &&
        !end_date && end_date === "") {

        return res.send({ success: false, message: "Invalid Inputs" })
    }

    try {
        let project = new projectModel({ theme, reason, type, division, category, priority, department, start_date, end_date, location });
        await project.save();
        return res.status(201).send({ success: true, message: "New project added successfully" });

    } catch (err) {
        console.log(err);
        return res.send({ success: false, message: err })
    }
});

// --------------------search data api---------------------------------------//

projectList.get("/:key", async (req, res) => {
    try {
        const search_data = await projectModel.find(
            {
                "$or": [
                    { "theme": { $regex: req.params.key } },
                    { "reason": { $regex: req.params.key } },
                    { "type": { $regex: req.params.key } },
                    { "division": { $regex: req.params.key } },
                    { "category": { $regex: req.params.key } },
                    { "department": { $regex: req.params.key } },
                    { "priority": { $regex: req.params.key } },
                    { "location": { $regex: req.params.key } },
                    { "status": { $regex: req.params.key } },
                ]
            });
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex = (page) * limit

        const results = {}
        results.totalDataCount = search_data.length;
        results.pageCount = Math.ceil(search_data.length / limit);

        if (lastIndex < search_data.length) {
            results.next = {
                page: page + 1,
            }
        }
        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
            }
        }
        results.result = search_data.slice(startIndex, lastIndex);
        return res.status(200).send(results)
    } 
    catch (err) {
        console.log(err);
    }
})

// -----------------------update data api--------------------------------//

projectList.patch("/edit/:id", async (req, res) => {
    const id = req.params.id
    // console.log(id,req.body.status)
    try {
        const updateData = await projectModel.findByIdAndUpdate(id, {
            status: req.body.status
        },
            {
                new: true
            })
        // console.log(updateData);
        res.send({ success: true, message: updateData });
    }
    catch (err) {
        console.log(err);
        res.send({ success: false, message: err })
    }
})



module.exports = { projectList }