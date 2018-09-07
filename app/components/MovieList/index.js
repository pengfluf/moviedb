/**
 *
 * MovieList
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import isFavorite from 'helpers/isFavorite';

import Grid from 'components/Grid';
import MoviePreview from 'components/MoviePreview';
import Loading from 'components/Loading';

function MovieList({
  fetching,
  movies,
  logged,
  selectedGenre,
  getGenre,
  memorizePrevSelectedGenre,
  addToFavorites,
  removeFromFavorites,
  favorites,
}) {
  if (!fetching && !movies.length) {
    return <div>Nothing was found</div>;
  }
  return (
    <Fragment>
      {/* eslint-disable prettier/prettier */}
      {fetching &&
        selectedGenre.prev !== selectedGenre.current && (
        <Loading mode="additionalAbsolute" />
      )}
      {/* eslint-enable */}
      <Grid>
        {movies.map(movie => (
          <MoviePreview
            key={movie.id}
            logged={logged}
            movie={movie}
            getGenre={getGenre}
            selectedGenre={selectedGenre}
            memorizePrevSelectedGenre={memorizePrevSelectedGenre}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            favorite={isFavorite(movie.id, favorites)}
            favorites={favorites}
          />
        ))}
      </Grid>
      {fetching && movies.length && <Loading mode="additional" />}
    </Fragment>
  );
}

MovieList.propTypes = {
  fetching: PropTypes.bool,
  logged: PropTypes.bool,
  selectedGenre: PropTypes.shape({
    prev: PropTypes.string,
    current: PropTypes.string,
  }),
  getGenre: PropTypes.func,
  memorizePrevSelectedGenre: PropTypes.func,
  movies: PropTypes.array,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  favorites: PropTypes.array,
};

export default MovieList;
