/**
 *
 * MoviePreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import getGenreNames from 'helpers/getGenreNames';
import getGenreId from 'helpers/getGenreId';

import GenreLink from 'components/GenreLink';
import Star from 'components/Star';

import Wrapper from './styled/Wrapper';
import TitleWrapper from './styled/TitleWrapper';
import Title from './styled/Title';
import Overview from './styled/Overview';
import GenreWrapper from './styled/GenreWrapper';
import Info from './styled/Info';

function MoviePreview({
  movie,
  logged,
  favorite,
  favorites,
  selectedGenre,
  getGenre,
  memorizePrevSelectedGenre,
  addToFavorites,
  removeFromFavorites,
}) {
  const {
    original_title: title,
    overview,
    id,
    genre_ids: genreIds,
    genres,
    backdrop_path: imageUrl,
  } = movie;

  // Why genreIds and genres both? Because of
  // the server response. It has different fields
  // depends on the endpoint. It's weird.
  const genreNames = getGenreNames(
    genreIds || genres.map(genre => genre.id),
  );

  return (
    <Wrapper backgroundUrl={imageUrl}>
      <Info>
        <TitleWrapper>
          <Title to={`/movie/${id}`}>{title}</Title>
          <Star
            logged={logged}
            movie={movie}
            favorite={favorite}
            favorites={favorites}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            context="MoviePreview"
          />
        </TitleWrapper>
        <Overview>{overview}</Overview>
      </Info>

      <GenreWrapper>
        {genreNames.map(name => (
          <GenreLink
            key={`${name}${id}`}
            id={getGenreId(name)}
            name={name}
            getGenre={getGenre}
            selectedGenre={selectedGenre}
            memorizePrevSelectedGenre={memorizePrevSelectedGenre}
            context="MoviePreview"
          >
            {name}
          </GenreLink>
        ))}
      </GenreWrapper>
    </Wrapper>
  );
}

MoviePreview.propTypes = {
  logged: PropTypes.bool,
  movie: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
  }),
  selectedGenre: PropTypes.shape({
    current: PropTypes.string,
    prev: PropTypes.string,
  }),
  getGenre: PropTypes.func,
  memorizePrevSelectedGenre: PropTypes.func,
  favorite: PropTypes.bool,
  favorites: PropTypes.array,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
};

export default MoviePreview;
