// require by name of module
const express = require("express");
//express constant is a function so lets invoke it into const app
const app = express();
// adds cors package for dev purposes to circumvent CORS.
const cors = require("cors");

//import your route (i.e animals api for use by server.js) Acts like middleware now its been imported via .use
const animalRoutes = require("./routes/animals-routes");
const userRoutes = require("./routes/user-routes");

const HttpError = require("./error_model/http-error");

///.use helps us to implement middleware, then we can call app.listen to start development server
//circumvent cors dev
app.use(cors());
//to json (like body-parser)
app.use(express.json());

//get the api setup routes via /api/animals for animals
app.use("/api/animals", animalRoutes);
app.use("/api/users", userRoutes);

//middleware to only run which didn't get a response before, so add this last (i.e its ran through all the next()s and none have matched, so you've entered a request which isn't an actual end point at all (url) - so return this final route. We utilise our custom HttpError again here. )
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  return next(error);
});

//set up express error handling middleware function after setting up route
// 4 params over three will be recognised by express as an error handling func
//will execute if any middleware before it yields an error.
app.use((error, req, res, next) => {
  //check if response headers sent - that means we check if a response has already been sent, if thats the case, we want to return next and forward the error, which means we wont send the response on our own because somehow we already sent a response and can only send one in total.
  if (res.headerSent) {
    return next(error);
  }
  //now we have forwarded the error we'll return a status error. We will check if the response status has an error.code, if not, we'll return a 500 status in json with a message property to show to user.
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" }); // to check if theres an error.message first, if not, use generic error messaging.
});

app.listen(5000);
