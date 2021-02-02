import { createHash } from "crypto";
import { promisify } from "util";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";
import User from "../models/userModel.js";

const signToken = (id) => {
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
    // sameSite: "strict",
    // TODO: secure's value should be boolean, to check it out!
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  if (process.env.NODE_ENV === "production") {
    // app.set('trust proxy', 1); // trust first proxy
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
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
    passwordResetToken: req.body.passwordResetToken,
    passwordResetExpires: req.body.passwordResetExpires,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;

  await new Email(newUser, url).sendWelcome();
  // now we cannot register as an admin
  createSendToken(newUser, 201, req, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  // const correct = await user.correctPassword(password, user.password);
  // console.log(user);
  // now if the user doesnot exist, it will not run the correct function
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Increct email or password", 401));
  }

  // 3) If everything is ok, send the json web token to the client
  createSendToken(user, 200, req, res);
});

// Set-Cookie: flavor=choco; SameSite=None; Secure
export function logout(req, res) {
  res.cookie("jwt", "", {
    // res.cookie("jwt", "loggedout", {
    // expires: new Date(Date.now() + 10 * 1000),
    expires: new Date(0),
    httpOnly: true,
    // sameSite: 'strict',
    // secure: true,
  });
  // }
  // ADD this, try to see if it works
  req.user = null;
  res.status(200).json({ status: "success" });
}

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token, and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, please login to get access", 401)
    );
  }
  // 2) Verification token,
  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);
  // { id: '5fc812a2ea315627edcdbb9d', iat: 1606947861, exp: 1614723861 }
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
  // console.log(
  //   `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/`
  // );
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`; // send original token

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

  // 3) Update changedPasswordAt property for the user

  // 4) Log the user in, send JWT to the client
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
  // user.passwordCurrent = req.body.passwordCurrent;
  await user.save();
  // User.findByIdAndUpdate

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});

// only for conditional rendering, no errors
export async function isLoggedIn(req, res, next) {
  let token;
  if (req.cookies.jwt) {
    try {
      // 1 verify token
      token = req.cookies.jwt;
      const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // There is a logged in user
      // pug will get access to this user
      res.locals.user = currentUser;
      // console.log(res.locals);
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
}
