import genreDB from './genres';

function getGenresNames(genreIds, genres = genreDB) {
  return genreIds.map(
    genreId => genres.find(({ id }) => genreId === id).name,
  );
}

export default getGenresNames;
