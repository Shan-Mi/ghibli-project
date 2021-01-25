import Film from "../models/filmModel.js";

export const getFilms = async (req, res) => {
  try {
    const films = await Film.find({});
    res.status(200).json({ films });
  } catch (err) {
    console.error(err);
  }
  // res.send("THIS WORKS");
};

export const getOneFilm = (req, res) => {
  res.send("one film is here");
};
