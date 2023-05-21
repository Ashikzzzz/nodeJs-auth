const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { signUpServices, findAuserByEmail } = require("../services/user.services");
const { generateToken } = require('../utils/token');
// const generateToken = require("../utils/token")


// signup a user -------
exports.signUpAUser = async (req, res, next) => {
    try {
        const result = await signUpServices(req.body)

        res.status(200).json({
            status: 'success',
            massage: "User inserted Successfully!",
            data: result
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            massage: "User inserted Error",
            error: error.message
        })
    }
};

// steps for  login a user
// 1. check email and password are given
// 2. load user with email
// 3. if not user send res
// 4.compare password by bcrypt
// 5. if password is not correct send res
// 6. check user is active
// 7. if not active send res
// 8 . generate token
// 9. send user and token



// login a user -------
exports.loginUser = async (req, res, next) => {
    try {
      const {email,password} = req.body;         // take data from body

      if(!email || !password){                  // 1. check email and password are given
        return res.status(401).send({
            status : "failed",
            message : "It not valid user email and pass"
        })
      }


      const user = await findAuserByEmail(email) // 2. load user with email

      if(!user){                                 // 3. if not user send res
        return res.status(401).send({
            status : "Unauthorized",
            message : "It not valid user email and pass"
        })
      }

      const isPasswordValid = user.comparePassword(password, user.password) // 4.compare password by bcrypt

      if(!isPasswordValid){                       // 5. if password is not correct send res
        return res.status(401).send({
            status : "Unauthorized",
            message : "It not correct pass"
        })

      }

      if(user.status != "active"){                // 6. check user is active
        return res.status(401).send({
            status : "Unauthorized",
            message : "It is not active"
        })
      }

      const token = generateToken(user)             // 8 . generate token

      const {password: pwd, ...others} = user.toObject()      // ignore send password to db when login

        res.status(200).json({                      // 9. send user and token
            status: 'success',
            massage: "Login Successfully!",
            data: {
                user: others,
                token
            }
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            massage: "User inserted Error",
            error: error.message
        })
    }
};

