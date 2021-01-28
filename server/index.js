import "./config.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const __dirname = path.resolve();
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import filmRoute from "./routes/filmRoutes.js"; // in node, this has to end with .js, which is different from require('./routes/filmRoutes')

// import reviewRoutes from "./routes/reviewRoutes.js";
import userRoute from "./routes/userRoutes.js";

const app = express();
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/films", filmRoute);
app.use("/users", userRoute);
// app.use('/reviews', reviewRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const DB = `mongodb+srv://ghibli-shan:xduubVzY74qpwBk@cluster0.x3xxe.mongodb.net/ghibli?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5050;
console.log(process.env.PORT);

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
