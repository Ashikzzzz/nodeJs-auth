const UserModel = require("../model/user.model");


// create a user
exports.signUpServices = async (userInfo) => {
    const result = await UserModel.create(userInfo);
    return result;
};