const express = require("express");
const { signUpAUser } = require("../controller/user.controller");
// const signUpController = require("../controller/user.controller")
const router = express.Router();

router.route("/")
.post(signUpAUser)

// export User routes
module.exports = router;