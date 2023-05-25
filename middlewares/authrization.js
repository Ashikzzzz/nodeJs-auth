module.exports=(...role)=>{
return (req,res,next)=>{
    const userRole = req.user.role;
    if(!userRole.includes(role)){
        res.status(402).json({
            status: "unathorized",
            messege: "user is not valid"
        })
    }
    next();
}
}