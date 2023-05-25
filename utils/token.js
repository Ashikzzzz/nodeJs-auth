const jwt = require('jsonwebtoken');


exports. generateToken =(userInfo)=>{
   const payLoad = {
        email: userInfo.email,
        role : userInfo.role
    }

    const token = jwt.sign(payLoad,process.env.Token_secret ,{
        expiresIn : "60s"
    })

    return token
}

