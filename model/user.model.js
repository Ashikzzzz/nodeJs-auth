const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // without spaces
        minLenght: [3, "Name must be at least 3 characters."],
        maxLenght: [20, "Name is too long."],
    },
    email: {
        type: String,
        required: [true, "Please provide a email address."],
        trim: true, // without spaces
        unique: [true, "Please provide a unique email address."],
        validate: {
            validator: () => {
                Promise.resolve(false)
            },
            message: 'Email validation failed'
        }
    },

    password : {
        type : String,
        required : [true, "provide a valid password"],
        validate : {
            validator: (value)=>{
              validator.isStrongPassword(value , {
                minLength : 6,
                // minLowerCase : 2,
                // minUpperCase : 1,
                // minSymbles :1
              })
              
            },
            message : "password is {value} is not strong enough"
        }
    },
  confirmPassword : {
    type : String,
    required : [true, "provide a valid password"],
    validate : {
        validator :function (value){
            return value === this.password
        },
        massege : "password doesn't matched"

    }

  },


    // image: {
    //     type: String,
    //     required: true,

    // },
    phone: {
        type: Number,
        required: true,
    },
    // studentEmail: {
    //     type: String,
       
    // },
    role: {
        type: String,
        required: true,
        enum: {
            values: ["buyer", "store-manager", "seller"],
            default :"buyer",
            massage: "role can't be others."
        }
    },

    status : {
        type: String,
        default : "active",
        enum: ["active","in-active","blocked"]
    },

    passwordChangeAt : Date,
    passwordResetToken : String,
    passwordResetExpires : Date

});


userSchema.pre("save",function (next){
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password,salt)
    this.password = hashedPassword

     this.confirmPassword = undefined;
     next()

})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel;


