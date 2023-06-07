const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    theme: {
        require: true,
        type: String
    },
    reason: String,
    type: String,
    division: String,
    category: String,
    priority: String,
    department: String,
    start_date: {
        require: true,
        type: String
    },
    end_date: {
        require: true,
        type: String
    },
    location: String,
    status:{
        type: String,
        default: "Registered", 
    }

},
    {
        timestamps: true
    });

const projectModel = mongoose.model("projectModel", projectSchema);

module.exports = { projectModel }