/**
 *
 * MovieList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import isFavorite from 'helpers/isFavorite';

import MoviePreview from 'components/MoviePreview';

import Wrapper from './styled/Wrapper';

function MovieList(props) {
  return (
    <Wrapper>
      {props.movies.map(movie => (
        <MoviePreview
          key={movie.id}
          movie={movie}
          selectedGenre={props.selectedGenre}
          getGenre={props.getGenre}
          addToFavorites={props.addToFavorites}
          removeFromFavorites={props.removeFromFavorites}
          favorite={isFavorite(movie.id, props.favorites)}
          favorites={props.favorites}
        />
      ))}
    </Wrapper>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  selectedGenre: PropTypes.string,
  getGenre: PropTypes.func,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  favorites: PropTypes.array,
};

export default MovieList;
