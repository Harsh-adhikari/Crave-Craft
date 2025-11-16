const express = require('express');
const router = express.Router();
const {userLogin, userSignup, getUser} = require('../controller/user')

router.post("/signup",userSignup) // When a user make a post request to /signup it will call the signup function
router.post("/login",userLogin)
router.get("/user/:id",getUser) //:id is a route parameter, meaning the request URL should include a user ID
module.exports = router;