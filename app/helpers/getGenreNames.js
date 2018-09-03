function getGenresNames(genres, genreIds) {
  return genreIds.map(
    genreId => genres.find(({ id }) => genreId === id).name,
  );
}

export default getGenresNames;
