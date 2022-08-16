const { buildSchema } = require('graphql');

const schema = buildSchema(`
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

module.exports = schema;