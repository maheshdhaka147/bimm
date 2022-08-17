Steps:
    1. Clone the repository
    2. Open the folder and run the command docker-compose up  
    3. Open http://localhost:8082 to view the result
    4. For graphql endpoint http://localhost:8082/graphql

Note: Code for fetching data using API is in src/application/process.js . 


Graphql Query Input: 
`
{
 make(makeId:440){
  makeId,
  makeName,
  vehicleTypes{
    typeId,
    typeName
  }
} 
}
`

Thank you
