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

function MovieList(props) {
  if (props.fetching && !props.movies.length) {
    return <Loading mode="standalone" />;
  } else if (!props.fetching && !props.movies.length) {
    return <div>Nothing was found</div>;
  }
  return (
    <Fragment>
      <Grid>
        {props.movies.map(movie => (
          <MoviePreview
            key={movie.id}
            logged={props.logged}
            movie={movie}
            getGenre={props.getGenre}
            addToFavorites={props.addToFavorites}
            removeFromFavorites={props.removeFromFavorites}
            favorite={isFavorite(movie.id, props.favorites)}
            favorites={props.favorites}
          />
        ))}
      </Grid>
      {props.fetching && <Loading mode="additional" />}
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
