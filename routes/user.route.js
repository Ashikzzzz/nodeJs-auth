const express = require("express");
const { signUpAUser, loginUser } = require("../controller/user.controller");
// const signUpController = require("../controller/user.controller")
const router = express.Router();

router
.post(("/signup"),signUpAUser)

router.post(("/login"),loginUser)



// export User routes
module.exports = router;