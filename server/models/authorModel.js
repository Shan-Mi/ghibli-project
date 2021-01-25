import mongoose from "mongoose";
const validator = require("validator");
const bcrypt = require("bcryptjs");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"], // a validator
  }, 
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    // required: [true, 'A user must confirm password'],
    // this works only for SAVE
    validate: {
      validator: function (val) {
        return val === this.password;
        // this only points to current doc on new document creation
      },
      message: "Password must consist",
    },
    select: false,
  },
  passwordChangedAt: { type: Date },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// we need to comment this middleware when we import users json file into db, cuz psw will be encrypt again.
authorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // to hash password, becrypt
  // async version -> hash() -> return a promise
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

authorSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000; // reduce created time, sometimes this process is slow, and token will be created before this changed to db
  next();
});

// in case user wanna delete their account,
// we simply set user's active status to be false,
// in case the user will return in the future.
// authorSchema.pre(/^find/, function (next) {
//   // this points to the current query
//   // before getAllUsers run User.find()
//   this.find({ active: { $ne: false } }); // not equal to
//   next();
// });

// instance method, userPassword is hashed, candidatePassword is not hashed
authorSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

authorSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

authorSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Author = mongoose.model("author", authorSchema);

export default Author;
