import "./config.js";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
// in node, this has to end with .js, which is different from require('./routes/filmRoutes')
import filmRoute from "./routes/filmRoutes.js";
import reviewRoute from "./routes/reviewRoutes.js";
import userRoute from "./routes/userRoutes.js";

dotenv.config({ path: "./config.env" });
const __dirname = path.resolve();

const app = express();
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/films", filmRoute);
app.use("/users", userRoute);
app.use("/reviews", reviewRoute);

app.use(json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const PORT = process.env.PORT || 5050;

// these four params are for avoiding warning in the console
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((e) => console.log(e.message));

// this is for no warning in the console.
mongoose.set("useFindAndModify", false);
