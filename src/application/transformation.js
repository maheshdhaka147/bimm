const mongoose = require("mongoose")
const fetch = require("node-fetch")
const convert = require('xml-js')
const fs = require("fs")

// Fetch Data For All the makes
async function getData(url){
    const response = await fetch(url)
    const str = await response.text();
    // Convert XML to JSON
    let dataAsJson = JSON.parse(convert.xml2json(str, {compact: true}))
    let AllVehicleMakes = dataAsJson.Response.Results.AllVehicleMakes
    let keys = Object.keys(AllVehicleMakes)  
    // console.log(`Fetch data for ${keys.length} make id's`)
    let output = []
    keys.forEach((objKey)=> {
        let objValue = AllVehicleMakes[objKey]
        let makeId = objValue.Make_ID._text
        let makeName = objValue.Make_Name._text
        let idObj = {
            "makeId":makeId,
            "makeName": makeName,
            "vehicleTypes":[]
        }
        output.push(idObj)
    })
    return output
}

async function getDataByMake(url,makeId,makeName){
const response = await fetch(url)
const str = await response.text()
try{
    // Convert XMl to JSON
    let dataAsJson = JSON.parse(convert.xml2json(str, {compact: true}))
    let perIdMakes = dataAsJson.Response.Results.VehicleTypesForMakeIds
    let length = parseInt(dataAsJson.Response.Count._text)
    let idObj = {
        "makeId":makeId,
        "makeName": makeName,
        "vehicleTypes":[]
    }
    let vehicleTypesArr = []
    if(length === 1){// if make id have only one type of vehicleTypes
        let vehicleTypeId = perIdMakes.VehicleTypeId. _text
        let vehicleTypeName = perIdMakes.VehicleTypeName. _text
        let obj = {
            "typeId": vehicleTypeId,
            "typeName": vehicleTypeName,
        }
        vehicleTypesArr.push(obj)
    }else{// if make id have multiple types of vehicleTypes
        for(let i=0;i<length;i++){
            let objValue = perIdMakes[i]
            let vehicleTypeId = objValue.VehicleTypeId. _text
            let vehicleTypeName = objValue.VehicleTypeName. _text
            let obj = {
                "typeId": vehicleTypeId,
                "typeName": vehicleTypeName,
            }
            vehicleTypesArr.push(obj)
        }
    }
    idObj.vehicleTypes = vehicleTypesArr;
return idObj
}catch(error){
    console.log(error)
}
}

module.exports = {getData,getDataByMake};