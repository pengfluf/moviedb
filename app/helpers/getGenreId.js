function getGenreId(genres, name) {
  return genres.find(genre => genre.name === name).id;
}

export default getGenreId;
