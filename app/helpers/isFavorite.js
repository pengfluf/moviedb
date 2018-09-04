function isFavorite(movieId, favorites) {
  return favorites.some(movie => movie.id === movieId);
}

export default isFavorite;
