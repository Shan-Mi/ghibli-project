import multer from "multer";
import sharp from "sharp";
import Film from "../models/filmModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import * as factory from "./handlerFactory.js";
import slugify from "slugify";

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
  const slug = slugify(req.body.title, { lower: true });

  // if there is no images, go to next middleware
  if (!req.files.imageCover || !req.files.images) {
    return next();
    // return next(new AppError("You have to upload coverImage", 400));
  } else {
    req.body.imageCover = `film-${slug}-${Date.now()}-cover.jpeg`;
  }

  // 1) cover image
  await sharp(req.files.imageCover[0].buffer)
    .resize(331, 512)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/films/${req.body.imageCover}`);

  console.log(req.body.imageCover);

  // 2) images
  req.body.images = [];

  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (file, index) => {
        const fileName = `film-${slug}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(req.files.images[index].buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/films/${fileName}`);
        req.body.images.push(fileName);
      })
    );
  }

  next();
});

export const getFilms = factory.getAll(Film, "films");
export const getOneFilm = factory.getOne(Film, "film");
export const createOneFilm = factory.createOne(Film, "film");
export const updateOneFilm = factory.updateOne(Film, "film");
export const deleteOneFilm = factory.deleteOne(Film);
