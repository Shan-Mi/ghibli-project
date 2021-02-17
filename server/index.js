import "./config.js";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import rateLimit from "express-rate-limit";
// in node, this has to end with .js, which is different from require('./routes/filmRoutes')
import filmRoute from "./routes/filmRoutes.js";
import reviewRoute from "./routes/reviewRoutes.js";
import userRoute from "./routes/userRoutes.js";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import globalErrorHandler from "./controllers/errorController.js";

dotenv.config({ path: "./config.env" });
const __dirname = path.resolve();

const app = express();
app.disable("x-powered-by");
// app.enable("trust proxy");

// TODO: move cookieParser above
app.use(cookieParser()); // parser from the cookie

// https://stackoverflow.com/questions/53898031/how-to-set-cookies-express-react-js
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.options("*", cors());

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// limiter is a middleware function
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 100 request from 1 same ip within 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter); // specify this route

// static path reference to a upload folder for user's avatar
// app.use('/uploads', express.static('uploads'));

app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(json({ limit: "30mb", extended: true }));
// app.use(cookieParser()); // parser from the cookie

// NOW public is static root, we can get access to all folders inside of public, we can utilize img/users for avatar for example.
app.use(express.static(path.join(__dirname, "public")));

// Data sanitization against noSQL query injection (mongodb query)
app.use(mongoSanitize());

// Data sanitization against XSS (html code)
app.use(xss());

app.use("/api/v1/films", filmRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);

app.use(globalErrorHandler);

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
