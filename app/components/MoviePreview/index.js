/**
 *
 * MoviePreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styled/Wrapper';
import Title from './styled/Title';
import Overview from './styled/Overview';

function MoviePreview(props) {
  const { original_title: title, overview, id } = props.movie;
  return (
    <Wrapper to={`/movie/${id}`}>
      <Title>{title}</Title>
      <Overview>{overview}</Overview>
    </Wrapper>
  );
}

MoviePreview.propTypes = {
  movie: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
  }),
};

export default MoviePreview;
