const express = require("express");
const routes = express.Router();

const {
  getUserByAadhar,
  getUserMailByAadhar,
  SaveUser,
} = require("../controllers/controllers.user");

routes.get("/:aadharid", getUserByAadhar);
routes.get("/mail/:aadharid", getUserMailByAadhar);
routes.post("/", SaveUser);
routes.post("/register", registerUser);

// Route for user login (without JWT)
routes.post("/login", loginUser); // Add the login route here

module.exports = routes;
