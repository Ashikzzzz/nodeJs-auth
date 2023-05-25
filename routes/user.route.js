const express = require("express");
const { signUpAUser, loginUser, getMe ,createProducts,deleteProduct} = require("../controller/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const authrization = require("../middlewares/authrization");
// const signUpController = require("../controller/user.controller")
const router = express.Router();

router
.post(("/signup"),signUpAUser)

router.post(("/login"),loginUser)

router.get("/me",verifyToken, getMe)

router.post("/products",verifyToken,authrization("buyer","admin"),createProducts)

router.delete("product",authrization("admin"),deleteProduct)



// export User routes
module.exports = router;