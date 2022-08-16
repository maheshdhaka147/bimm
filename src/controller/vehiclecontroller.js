const router = require("express").Router();
const mongoose = require("mongoose");
const { graphqlHTTP } = require('express-graphql');
const config = require("../infrastructure/config");
const Make = require("../infrastructure/models/makeModel");
const MakeSchema = require("../infrastructure/schema/makeSchema");
const getMakes = require("../application/getMakes")

config();

router.get("/",async(req,res)=>{
  const makeResult = await getMakes();
  res.send(makeResult)
}) 


// The root provides a resolver function for each API endpoint
var root = {
  make: async ({makeId,makeName}) => {
    let makes = await Make.findOne({makeId:makeId,makeName: makeName}).select({makeId:1,makeName:1,vehicleTypes:1})
    return {
      "makeId": makes.makeId,
      "makeName": makes.makeName,
      "vehicleTypes": makes.vehicleTypes
    }
  }
};

router.use('/graphql', graphqlHTTP({
  schema: MakeSchema,
  rootValue: root,
  graphiql: true,
}));

module.exports = router