const dotenv = require("dotenv");
const express = require('express');
const cors = require('cors');
const Mongoconnect = require("./database/db.connect");
const { userRegister } = require("./Routes/userRoute");
const { projectList } = require("./Routes/projectRoute");
let Port = process.env.PORT;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.get("/", async (req,res)=>{
//     res.send('message show')
// })

app.use('/user',userRegister)

app.use("/project",projectList)

app.listen(Port, async (req,res) => {
    try {
      await Mongoconnect();
      console.log(`Server is running on http://localhost:${Port}`);
    } catch (error) {
      console.log(` errror is => ${error}`);
    }  
});