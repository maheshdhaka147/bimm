const assert = require("chai").assert;

const allMakesURL = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML";
const vehicleByMakeURL = "https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/";

const {getData,getDataByMake} = require("../src/application/transformation");

describe('Data Transformation', () => {

    // it('Parse all makes data from xml to json', async ()=>{
    //     const result = await getData(allMakesURL);
    //     let i = 0; // Can test on different makes in result array
    //     assert.typeOf(result,'array');
    //     assert.nestedProperty(result[i],'makeId');
    //     assert.nestedProperty(result[i], 'makeName');
    // })

    it('Parse vehicle data per make to json', async ()=>{
        const result = await getData(allMakesURL);
        const j = 0;  // Can fetch vehicle data for different makes in result array
        const url = `${vehicleByMakeURL}${parseInt(result[j].makeId)}?format=xml`
        let vehcileTypesPerMake = await getDataByMake(url,result[j].makeId,result[j].makeName);
        assert.typeOf(vehcileTypesPerMake.makeId, 'string');
        assert.typeOf(vehcileTypesPerMake.makeName, 'string');
        assert.typeOf(vehcileTypesPerMake.vehicleTypes, 'array');
    })
});