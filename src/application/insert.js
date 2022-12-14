const mongoose = require("mongoose")
const fs = require("fs")
const Make = require("../infrastructure/models/makeModel")
require('dotenv').config();
const dbUrl = process.env.dbUrl;
const port = process.env.PORT || 8082;

mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    // Read Data from local file and insert into MongoDB Database
    fs.readFile("src/docs/make.txt","utf-8",(err,data)=>{
        if(!err){
            data = JSON.parse(data)
            console.log(typeof(data))
            Make.insertMany(data).then(()=>{
                console.log("Data inserted in mongodb database successfully.")
                console.log(`Please visit http://localhost:${port}`)
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            console.log("Error",err)
        }
    })
})



