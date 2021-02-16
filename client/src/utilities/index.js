export const getOneFilm = (slug, films) =>
  films.filter((film) => film.slug === slug);

export const formatInput = (val) => val.trim().toLowerCase();
