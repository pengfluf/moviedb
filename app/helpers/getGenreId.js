import genreDB from './genres';

function getGenreId(name, genres = genreDB) {
  return genres.find(genre => genre.name === name).id;
}

export default getGenreId;
