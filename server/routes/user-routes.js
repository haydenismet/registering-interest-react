const express = require("express");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/all-users", usersControllers.getUsers);

router.get("/single/:uid", usersControllers.getByUserId);

router.get("/filter", usersControllers.getByUserFilter);

router.post("/signup", usersControllers.signup);

router.post("/login", usersControllers.login);

router.patch("/patch/:uid", usersControllers.patchUser);

router.patch("/favourite/:uid", usersControllers.likeAnimal);
router.patch("/unfavourite/:uid", usersControllers.unlikeAnimal);

router.delete("/delete/:uid", usersControllers.deleteUser);

module.exports = router;
