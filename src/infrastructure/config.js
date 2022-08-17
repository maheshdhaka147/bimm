const mongoose = require("mongoose");
require('dotenv').config();
const dbUrl = process.env.dbUrl;
let connectFun = async () =>{
    const conn = await mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true,ignoreUndefined: true });
    return conn
}

module.exports = connectFun;