const express = require("express");
const mongoose=require("mongoose")
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const data = require("./docs/data.json");
// const app=express()
const port = process.env.PORT || 8081

const schema = mongoose.Schema({
    makeId:String,
    makeName:String,
    vehicleTypes:[]
})

// Construct a schema, using GraphQL schema language
var graphschema = buildSchema(`
type VehicleTypes {
  typeId: String
  typeName: String
}

type Vehicle{
  makeId(id: Int) : Int
  makeName(name : String) : String,
  vehicleTypes : [VehicleTypes]
}
  type Query {
    make(makeId: Int,makeName:String) : Vehicle
  }
`);

const Make=mongoose.model('Make',schema)
const dbUrl='mongodb://mongo:27017/makes'

// app.get("/",(req,res)=>{
//     // Fetch Data From MongoDB Server and Serve it
//     mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true})
//     .then(()=>{
//         console.log("Connected Successfully")
//         async function getMakes(){
//             const makes=await Make.find().select({makeId:1,makeName:1,vehicleTypes:1})
//             return makes
//         }
//         getMakes().then(makes=>{
//             const orderedMakes=[]
//             Object.keys(makes).map(index=>{
//                 const obj={
//                     "makeId":makes[index].makeId,
//                     "makeName":makes[index].makeName,
//                     "vehicleTypes":makes[index].vehicleTypes
//                 }
//                 orderedMakes.push(obj)
//             })
//             res.send(orderedMakes)
//         })
//     }) 
// })


// app.get("*",(req,res)=>{
//     res.status(404).send("Page Not Found")
// })


// app.listen(port,()=>{
//     console.log("Server is listening at port ${port}")
// })


// The root provides a resolver function for each API endpoint
var root = {
    make: async ({makeId,makeName}) => {
      await mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true,ignoreUndefined: true })
      let makes = await Make.findOne({makeId:makeId,makeName: makeName}).select({makeId:1,makeName:1,vehicleTypes:1})
      console.log(makes)
      return {
        "makeId": makes.makeId,
        "makeName": makes.makeName,
        "vehicleTypes": makes.vehicleTypes
      }
    }
  };
  
  var app = express();


  app.get("/",(req,res)=>{
    // Fetch Data From MongoDB Server and Serve it
    mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected Successfully")
        async function getMakes(){
            const makes=await Make.find().select({makeId:1,makeName:1,vehicleTypes:1})
            return makes
        }
        getMakes().then(makes=>{
            const orderedMakes=[]
            Object.keys(makes).map(index=>{
                const obj={
                    "makeId":makes[index].makeId,
                    "makeName":makes[index].makeName,
                    "vehicleTypes":makes[index].vehicleTypes
                }
                orderedMakes.push(obj)
            })
            res.send(orderedMakes)
        })
    }) 
})

  app.use('/graphql', graphqlHTTP({
    schema: graphschema,
    rootValue: root,
    graphiql: true,
  }));
  app.listen(port);
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);


