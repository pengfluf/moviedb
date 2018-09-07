/**
 *
 * Sections
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import genres from 'helpers/genres';

import GenreLink from 'components/GenreLink';

import Wrapper from './styled/Wrapper';
import GenreList from './styled/GenreList';
import Title from './styled/Title';

function Navigation({
  logged,
  pathname,
  selectedGenre,
  getGenre,
  memorizePrevSelectedGenre,
}) {
  const currentGenre = selectedGenre.current;
  return (
    <Wrapper>
      {logged && <Title to="/favorites">Favorites</Title>}

      {/* eslint-disable prettier/prettier */}
      <Title
        to={
          currentGenre
            ? `/genre/${currentGenre.replace(
              / /g,
              '',
            )}`.toLowerCase()
            : pathname
        }
      >
        {currentGenre || 'Genres'}
      </Title>
      {/* eslint-enable */}

      <GenreList>
        {genres.map(
          ({ id, name }) =>
            name !== currentGenre && (
              <GenreLink
                key={id}
                id={id}
                name={name}
                getGenre={getGenre}
                selectedGenre={selectedGenre}
                memorizePrevSelectedGenre={memorizePrevSelectedGenre}
                context="Navigation"
              />
            ),
        )}
      </GenreList>
    </Wrapper>
  );
}

Navigation.propTypes = {
  selectedGenre: PropTypes.shape({
    prev: PropTypes.string,
    current: PropTypes.string,
  }),
  logged: PropTypes.bool,
  pathname: PropTypes.string,
  getGenre: PropTypes.func,
  memorizePrevSelectedGenre: PropTypes.func,
};

export default Navigation;
