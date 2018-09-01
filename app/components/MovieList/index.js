/**
 *
 * MovieList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import MoviePreview from 'components/MoviePreview';

import Wrapper from './styled/Wrapper';

function MovieList(props) {
  return (
    <Wrapper>
      {props.movies.map(movie => (
        <MoviePreview key={movie.id} movie={movie} />
      ))}
    </Wrapper>
  );
}

MovieList.propTypes = {};

export default MovieList;
