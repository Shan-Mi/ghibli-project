export const getOneFilm = (slug, films) =>
  films.filter((film) => film.slug === slug);

export const formulateInput = (val) => val.trim().toLowerCase();
