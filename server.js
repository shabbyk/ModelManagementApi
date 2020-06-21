var express = require("express"),
  app = express(),
  cors = require("cors"),
  port = 3900,
  mongoose = require("mongoose"),
  Model = require("./api/models/modelManagementModel"), //created model loading here
  bodyParser = require("body-parser");

//
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/ModelManagement")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(`${__dirname}\\api\\controllers\\uploads`));

var routes = require("./api/routes/modelManagementRoutes"); //importing route
routes(app); //register the route

app.listen(port);

console.log("Model Management RESTful API server started on: " + port);
