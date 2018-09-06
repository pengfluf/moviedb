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

function Navigation({ selectedGenre, logged, pathname, getGenre }) {
  return (
    <Wrapper>
      {logged && <Title to="/favorites">Favorites</Title>}

      <Title
        to={
          selectedGenre
            ? `/genre/${selectedGenre.replace(
              / /g,
              '',
            )}`.toLowerCase()
            : pathname
        }
      >
        {selectedGenre || 'Genres'}
      </Title>

      <GenreList>
        {genres.map(
          ({ id, name }) =>
            name !== selectedGenre && (
              <GenreLink
                key={id}
                id={id}
                name={name}
                getGenre={getGenre}
                context="Navigation"
              />
            ),
        )}
      </GenreList>
    </Wrapper>
  );
}

Navigation.propTypes = {
  selectedGenre: PropTypes.string,
  logged: PropTypes.bool,
  pathname: PropTypes.string,
  getGenre: PropTypes.func,
};

export default Navigation;
