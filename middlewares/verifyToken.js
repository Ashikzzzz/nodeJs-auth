const jwt = require('jsonwebtoken');
const {promisify}= require("util")

// steps to verify token
// take the token from header
//1. check if token exists
// 2.if not token send res
// 3. decode the token
// 4.if token is valid call next()


module.exports = async(req, res, next)=>{
try {
    const token = req?.headers?.authorization?.split(" ")[1]
    // console.log(token)
    if(!token){                             //1. check if token exists
                                            // 2.if not token send res
        return res.status(401).json({
            status: "Unauthorized",
            messege: "Go to login"
        })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.Token_secret);

    req.user = decoded
    next()

} catch (error) {
    res.status(400).json({
        status: 'error',
        massage: "invalid token",
        error: error.message
    })
}
}