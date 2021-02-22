import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"], // a validator
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      maxlength: 254,
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
    likedReview: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
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
    isVerified: {
      type: Boolean,
      required: [
        true,
        "A user must verify email address to successfully log in",
      ],
      default: false,
    },
    verifyEmailToken: String,
    verifyEmailTokenExpires: Date,
    passwordChangedAt: { type: Date },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

// we need to comment this middleware when we import users json file into db, cuz psw will be encrypt again.
userSchema.pre("save", async function (next) {
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

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000; // reduce created time, sometimes this process is slow, and token will be created before this changed to db
  next();
});

// in case user wanna delete their account,
// we simply set user's active status to be false,
// in case the user will return in the future.

// instance method, userPassword is hashed, candidatePassword is not hashed
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
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

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createVerifyEmailToken = function () {
  const verifyToken = crypto.randomBytes(32).toString("hex");

  this.verifyEmailToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  this.verifyEmailTokenExpires = Date.now() + 10 * 60 * 1000;

  return verifyToken;
};

const User = mongoose.model("user", userSchema);

export default User;
