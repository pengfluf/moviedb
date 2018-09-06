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
  getGenre,
  addToFavorites,
  removeFromFavorites,
  favorites,
}) {
  if (fetching && !movies.length) {
    return <Loading mode="standalone" />;
  } else if (!fetching && !movies.length) {
    return <div>Nothing was found</div>;
  }
  return (
    <Fragment>
      <Grid>
        {movies.map(movie => (
          <MoviePreview
            key={movie.id}
            logged={logged}
            movie={movie}
            getGenre={getGenre}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            favorite={isFavorite(movie.id, favorites)}
            favorites={favorites}
          />
        ))}
      </Grid>
      {fetching && <Loading mode="additional" />}
    </Fragment>
  );
}

MovieList.propTypes = {
  fetching: PropTypes.bool,
  logged: PropTypes.bool,
  movies: PropTypes.array,
  getGenre: PropTypes.func,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  favorites: PropTypes.array,
};

export default MovieList;
