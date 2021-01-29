import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Film from "../models/filmModel.js";
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

dotenv.config({ path: "./config.env" });
const __dirname = path.resolve();
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connect success!"));

const films = JSON.parse(
  fs.readFileSync(`${__dirname}/data/films-mongodb.json`, "utf8")
);
// const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, "utf-8"));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/data/reviews.json`, "utf-8")
// );

// import data into db
const importData = async () => {
  try {
    await Film.create(films);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data from collection
const deleteData = async () => {
  try {
    await Film.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
