const { signUpServices } = require("../services/user.services");

// create a user -------
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