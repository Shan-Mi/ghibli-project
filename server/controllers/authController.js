import "./../config.js";
import path from "path";
import dotenv from "dotenv";
import { createHash } from "crypto";
import { promisify } from "util";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";
import User from "../models/userModel.js";

dotenv.config({ path: "./../config.env" });
const __dirname = path.resolve();

const host = process.env.HOST; // frontend host localhost:3000

const signToken = (id) => {
  // console.log(process.env.JWT_EXPIRES_IN);
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // prevent cors attack
    sameSite: "strict",
    // TODO: secure's value should be boolean, to check it out!
    // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  if (process.env.NODE_ENV === "production") {
    // app.set('trust proxy', 1); // trust first proxy
    cookieOptions.secure = true;
  }

  user.password = undefined;
  // set cookie on client side
  res.cookie("jwt", token, cookieOptions);
  // also send back data, now we don't send back token directly
  res.status(statusCode).send({
    status: "success",
    // token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    // role: req.body.role,
    // now we cannot register as an admin
    passwordResetToken: req.body.passwordResetToken,
    passwordResetExpires: req.body.passwordResetExpires,
  });

  const verifyToken = newUser.createVerifyEmailToken();
  await newUser.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/verifyEmail/${verifyToken}`;

  await new Email(newUser, url).sendWelcome(); //
  res.status(200).json({ status: "success" });
  // createSendToken(newUser, 201, req, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password +active");
  // now if the user does not exist, it will not run the correct function

  // check if user is still active
  if (user.active === false) {
    return next(
      new AppError(
        "User has been deleted, to activate please contact admin",
        400
      )
    );
  }
  // Add this step to check if a user's email is verified.
  if (!user.isVerified) {
    return next(new AppError(`User's email needs to be verified first`, 401));
  }
  // check if password consist (backend check)
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything is ok, send the json web token to the client
  createSendToken(user, 200, req, res);
});

export function logout(req, res) {
  res.status(202).clearCookie("jwt").json({ status: "success" });
  // ADD this, try to see if it works
  req.user = null;
}

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token, and check if it's there
  let token;
  if (
    // we use authorization headers
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    // or cookies with jwt credentials
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, please login to get access", 401)
    );
  }
  // 2) Verification token,
  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again!", 401)
    );
  }
  // Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  // console.log(req.params.id);
  next();
});

// rest parameter syntax
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action!", 403)
      ); //forbidden
    }
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // 3) Send it to user's email
    const resetURL = `${host}/resetPassword/${resetToken}`;
    // send original token

    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Token sent to your email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    // Do the same thing, save to db.

    return next(
      new AppError(
        "There was an error sending the email, please try again later."
      ),
      500
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });
  // encrypt token and compare with the encrypt one
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Log the user in, send JWT to the client
  createSendToken(user, 200, req, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }
  // 3) if so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  res.status(200).send({ status: "success" });
});

export const sendVerifyEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  const verifyToken = user.createVerifyEmailToken();
  await user.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/verifyEmail/${verifyToken}`;

  await new Email(user, url).sendWelcome();
  res.status(200).send({ status: "success" });
  next();
});

export const verifyEmail = catchAsync(async (req, res, next) => {
  const hashedToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    verifyEmailToken: hashedToken,
    verifyEmailTokenExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.isVerified = true;
  user.verifyEmailToken = undefined;
  user.verifyEmailTokenExpires = undefined;
  await user.save(function (err) {
    if (err) {
      return res.status(500).send({ message: "An unexpected error occurred" });
    }
    return res
      .status(200)
      .send({ message: "The account has been verified. Please log in." });
  });
});
