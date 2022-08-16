const express = require("express");
const app = express();
const vehciles = require("./controller/vehiclecontroller");
const port = process.env.PORT || 8082;

app.use('/', vehciles)
app.listen(port);

console.log(`Rest is running at localhost:${port}`)
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);


