const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
   },
   lastName: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 20,
   },
   emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 8,
      maxLength: 30,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error("Invalid email account " + value);
         }
      },
   },
   password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value) {
         if (!validator.isStrongPassword(value)) {
            throw new Error("Enter a strong password ");
         }
      },
   },
   age: {
      type: Number,
      min: 18,
      max: 100
   },
   gender: {
      type: String,
      enum: {
         values: ["male", "female", "other"],
         message: `{VALUE} is not a valid gender type`
      },
      // validate(value) {
      //    if (!['male', 'female', 'others'].includes(value)) {
      //       throw new Error("Gender value is invalid!");
      //    }
      // }
   },
   photoUrl: {
      type: String,
      maxLength: 100,
      minLength: 10,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu3-_TbUInL975rAfMjR83kQAjePhVRRJFfw&s',
      // not working
      validate(value) {
         if (!validator.isURL(value)) {
            throw new Error("Invalid URL!");
         }
      }

      // validate: {
      //    validator: function (value) {
      //       return validator.isURL(value);
      //    },
      //    message: "Invalid URL!"
      // }
   },
   about: {
      type: String,
      minLength: 10,
      maxLength: 50,
      default: "This is a default description of user.",
   },
   skills: {
      type: [String],
      required: true,
   }
}, {
   timestamps: true,
});

// indexing
// userSchema.index({gender: 1});

// compound indexing
// User.find({ firstName: "Shraddha", lastName: "Gaur" });
userSchema.index({ firstName: 1, lastName: 1 });

// schema functions (Note: arrow function are not allowed for this. "this" does not work)
userSchema.methods.getJWT = async function () {
   const user = this;

   const token = await jwt.sign({
      _id: user._id
   }, process.env.SECRET_KEY, {
      expiresIn: "1d"
   });

   return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
   const user = this;
   const passwordHash = user.password;
   const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
   return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;