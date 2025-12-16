const mongoose = require('mongoose');
const validator = require('validator');

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
      maxLength: 30,
      select: false,
      validate(value) {
         if (!validator.isStrongPassword(value)) {
            throw new Error ("Enter a strong password ");
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
      validate(value) {
         if (!['male', 'female', 'others'].includes(value)) {
            throw new Error("Gender value is invalid!");
         }
      }
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

const User = mongoose.model("User", userSchema);

module.exports = User;