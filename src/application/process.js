const mongoose = require("mongoose")
const fetch = require("node-fetch")
const convert = require('xml-js')
const fs = require("fs")

const allMakesURL = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML";
const vehicleByMakeURL = "https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/";


const {getData,getDataByMake} = require("./transformation");


const MergeData= async (allMakesURL,vehicleByMakeURL)=>{
    let output = await getData(allMakesURL);
    let outputLength=Object.keys(output).length
    let j = 0
    let outputWithMake=[]
    while(true){
        url=`${vehicleByMakeURL}${parseInt(output[j].makeId)}?format=xml`
        console.log(`Fetching ${url} for j=${j}`);
        let idObj = await getDataByMake(url,output[j].makeId,output[j].makeName);
        outputWithMake.push(idObj);
        if(j+1>=outputLength){
            fs.writeFile("src/docs/make.txt",JSON.stringify(outputWithMake),(err)=>{
                if(err) console.log(err)
            })
            break
        }
        j++
    }
    return outputWithMake
}


MergeData(allMakesURL,vehicleByMakeURL).then(result=>{
    console.log(result)
}).catch(error=>{
    console.log(error)
})



module.exports = {getData,getDataByMake};