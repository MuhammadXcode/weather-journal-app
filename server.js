// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

// Setup Server
app.get("/getWeatherData",getData);
function getData(req, res){
    res.send(projectData);
}

app.post("/addWeatherData", addData);
function addData(request, response){
    console.log(request.body.temp);
    projectData.date = request.body.date;
    projectData.temp = request.body.temp;
    projectData.feeling = request.body.feeling;
}
// GET route
app.get('/all', getData);
function getData (request, response) {
  response.send(projectData);
  console.log(projectData);
};