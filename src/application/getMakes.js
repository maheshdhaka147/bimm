async function getMakes(){
    const Make = require("../infrastructure/models/makeModel");
    const config = require("../infrastructure/config");
    config();
    const makes = await Make.find().select({makeId:1,makeName:1,vehicleTypes:1});
    const orderedMakes=[]
    Object.keys(makes).map(index=>{
        const obj={
            "makeId":makes[index].makeId,
            "makeName":makes[index].makeName,
            "vehicleTypes":makes[index].vehicleTypes
        }
        orderedMakes.push(obj)
    })
    return orderedMakes;
}

module.exports = getMakes;