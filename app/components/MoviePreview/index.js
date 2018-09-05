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

function MoviePreview(props) {
  const {
    original_title: title,
    overview,
    id,
    genre_ids: genreIds,
    backdrop_path: imageUrl,
  } = props.movie;

  const {
    favorite,
    favorites,
    addToFavorites,
    removeFromFavorites,
    getGenre,
  } = props;

  const genreNames = getGenreNames(genreIds);

  return (
    <Wrapper backgroundUrl={imageUrl}>
      <Info>
        <TitleWrapper>
          <Title to={`/movie/${id}`}>{title}</Title>
          <Star
            logged={props.logged}
            movie={props.movie}
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
  favorite: PropTypes.bool,
  favorites: PropTypes.array,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  getGenre: PropTypes.func,
};

export default MoviePreview;
