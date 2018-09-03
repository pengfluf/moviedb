/**
 *
 * MoviePreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import genres from 'helpers/genres';
import getGenreNames from 'helpers/getGenreNames';
import getGenreId from 'helpers/getGenreId';

import Wrapper from './styled/Wrapper';
import InfoWrapper from './styled/InfoWrapper';
import Title from './styled/Title';
import Overview from './styled/Overview';
import GenreWrapper from './styled/GenreWrapper';
import Genre from './styled/Genre';

function MoviePreview(props) {
  const {
    original_title: title,
    overview,
    id,
    genre_ids: genreIds,
  } = props.movie;

  const genreNames = getGenreNames(genres, genreIds);

  return (
    <Wrapper>
      <InfoWrapper to={`/movie/${id}`}>
        <Title>{title}</Title>
        <Overview>{overview}</Overview>
      </InfoWrapper>

      <GenreWrapper>
        {genreNames.map(name => (
          <Genre
            key={`${name}${id}`}
            to={`/genre/${name}`.replace(/ /g, '').toLowerCase()}
            onClick={() => {
              props.getGenre(getGenreId(genres, name));
              window.scrollTo(0, 0);
            }}
          >
            {name}
          </Genre>
        ))}
      </GenreWrapper>
    </Wrapper>
  );
}

MoviePreview.propTypes = {
  movie: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
  }),
  getGenre: PropTypes.func,
};

export default MoviePreview;
