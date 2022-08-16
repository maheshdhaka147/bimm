const mongoose = require("mongoose");
const schema = mongoose.Schema({
    makeId:String,
    makeName:String,
    vehicleTypes:[]
})
const Make = mongoose.model('Make',schema);
module.exports = Make;
