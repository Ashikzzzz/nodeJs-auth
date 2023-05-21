const UserModel = require("../model/user.model");


// create a user
exports.signUpServices = async (userInfo) => {
    const result = await UserModel.create(userInfo);
    return result;
};
// find a user
exports.findAuserByEmail = async (email) => {
    const result = await UserModel.findOne({email : email});
    return result;
};