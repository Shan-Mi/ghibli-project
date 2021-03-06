import multer, { memoryStorage } from "multer";
import sharp from "sharp"; // resizing image in an eazy way
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll, getOne, updateOne, deleteOne } from "./handlerFactory.js";
import fs from "fs";

// store image as a buffer
const multerStorage = memoryStorage();

// multer filter, check if it is an image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, "../public/img/users");
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadUserPhoto = upload.single("photo");

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  // keep img in memory
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

// a simple middleware
export function getMe(req, res, next) {
  req.params.id = req.user.id;
  next();
}

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs psw data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update, please use /updateMyPassword",
        400
      )
    );
  }

  // 2) filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getAllUsers = getAll(User, "users");
export const getOneUser = getOne(User, "user");
export const updateUser = updateOne(User, "users");
export const deleteUser = deleteOne(User);
