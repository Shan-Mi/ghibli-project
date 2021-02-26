import multer from "multer";
import sharp from "sharp";
import Film from "../models/filmModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import * as factory from "./handlerFactory.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadFilmImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

export const resizeFilmImages = catchAsync(async (req, res, next) => {
  console.log("after resize film images", req.files);
  // if there is no images, go to next middleware
  if (!req.files.imageCover || !req.files.images) {
    return next();
  }
  const imageCoverFileName = `film-${req.params.id}-${Date.now()}-cover.jpeg`;
  // 1) cover image
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/films/${imageCoverFileName}`);
  req.body.imageCover = imageCoverFileName;
  // then it will update, cuz it's in the body

  // 2) images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, index) => {
      const fileName = `film-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;
      await sharp(req.files.images[index].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/films/${fileName}`);
      req.body.images.push(fileName);
    })
  );
  // console.log(req.body);
  next();
});

export const getFilms = factory.getAll(Film, "films");
export const getOneFilm = factory.getOne(Film, "film");
export const createOneFilm = factory.createOne(Film, "film");
export const updateOneFilm = factory.updateOne(Film, "film");
export const deleteOneFilm = factory.deleteOne(Film);
