/**
 *
 * MovieList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import MoviePreview from 'components/MoviePreview';

import Wrapper from './styled/Wrapper';

function MovieList(props) {
  return (
    <Wrapper>
      {props.movies.map(movie => (
        <MoviePreview
          key={movie.id}
          movie={movie}
          getGenre={props.getGenre}
        />
      ))}
    </Wrapper>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  getGenre: PropTypes.func,
};

export default MovieList;
