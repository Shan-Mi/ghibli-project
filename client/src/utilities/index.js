export const getOneFilm = (slug, films) =>
  films.filter((film) => film.slug === slug);
