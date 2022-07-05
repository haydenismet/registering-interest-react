// express needed in each file, has to be imported, similar to React.
const express = require("express");

//using https://express-validator.github.io/docs/ to save .trim for API validation
const { check } = require("express-validator");

//this imports my controllers as one, and i can reference as animalsControllers.controller1, - as seen below at router.get().
const animalsControllers = require("../controllers/animals-controllers");

// Router is an instance of the express router.
// We use it to define our routes for handling routes, i.e the API get/post response/request.
const router = express.Router();

//order matters - it will hit first endpoint i.e /:aid, then subsequent routes. As the first route doesn't have  a specific route i.e creator/:cid it will always hit the most generic/open route first at /:aid. Perhaps have more structured routes so they dont get consumed by more generic ones? For example, have changed it to be /pet/:aid so it doesnt hit a more open ended route first.

//order goes by matching of URL string. So if no size is specified in getBySize, it will return the first which is just by type.

//GET ALL ANIMALS
router.get("/all-animals", animalsControllers.getAllAnimals);

//GET BY BASE(PET) ID 'id'
//here you are setting :pid, as a dynamic value, which will then be taken into the const animalId below.
router.get("/animal/id/:aid", animalsControllers.getByAnimalId);

//GET BY TYPE
router.get("/animal/:type", animalsControllers.getByAnimalType);

//GET BY TYPE&SIZE
router.get("/animal/:type/:size", animalsControllers.getByAnimalTypeSize);

router.get("/location/:alocation", animalsControllers.getByAnimalLocation);

/*GET BY TYPE&SIZE&AGE
router.get(
  "/animal/:type/:size/:age",
  animalsControllers.getByAnimalTypeSizeAge
);

//GET BY TYPE&SIZE&AGE&GENDER
router.get(
  "/animal/:type/:size/:age/:gender",
  animalsControllers.getByAnimalTypeSizeAgeGender
);*/

//GET BY CREATOR_NAME
router.get("/org/:cname", animalsControllers.getByCreatorName);

//GET BY USER FILTER
router.get("/filter", animalsControllers.getByAnimalFilter);

//GET BY CREATOR(ORG) ID (creator)
// url has changed slightly otherwise just :/cid doesnt work, needs a new endpoint.
router.get("/creator/:cid", animalsControllers.getByCreatorId);

//ROUTE HELP!
//https://expressjs.com/en/guide/routing.html

// not referring to an additional path means this will hit the endpoint specified in server.js which is "/api/animals"
// its possible to register multiple middlewares on one router.get/post etc, in our case the check to validate fields for applicable routes, using the express-validator plugin. You also need to set this up inside your controllers file.
router.post(
  "/create/pet",
  //you're checking by what you've defined these as in the request body obj destructure in animals-controllers. so not animal_suitability thats in the actual post object, but suitability thats in the req body.
  // This is test cases for validating the API POST
  [
    //animal_specific_nested_obj validation
    check("animal.type").not().isEmpty(),
    check("animal.name").not().isEmpty(),
    check("animal.size").not().isEmpty(),
    check("animal.age").isInt({ min: 0, max: 20 }),
    check("animal.breed").not().isEmpty(),
    check("animal.img_urls").not().isEmpty(),
    check("animal.gender").not().isEmpty(),
    //animal_availability_nested_obj validation
    check("availability.available").isBoolean({ loose: true }),
    //needs postcode
    check("availability.location").isLength({ min: 5, max: 100 }),
    check("availability.foster").isBoolean({ loose: true }),
    check("availability.adopt").isBoolean({ loose: true }),
    check("availability.reserved").isBoolean({ loose: true }),
    check("availability.organisation_name").isLength({ min: 3, max: 55 }),
    //jpg only
    check("availability.organisation_picture").matches(".jpg"),
    //animal_suitability_nested_obj validation
    check("suitability.children").not().isEmpty(),
    check("suitability.other_dogs").not().isEmpty(),
    check("suitability.other_cats").not().isEmpty(),
  ],
  animalsControllers.createAnimal
);

//patching (updating existing) - using :aid is fine again as using PATCH not GET
router.patch("/pet/:aid", animalsControllers.updateAnimal);

//delete existing
router.delete("/pet/:aid", animalsControllers.deleteAnimal);
//export to import it into server.js
module.exports = router;
