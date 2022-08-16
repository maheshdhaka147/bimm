const mongoose = require("mongoose");
const dbUrl='mongodb://mongo:27017/makes'
let connectFun = async () =>{
    const conn = await mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true,ignoreUndefined: true });
    return conn
}

module.exports = connectFun