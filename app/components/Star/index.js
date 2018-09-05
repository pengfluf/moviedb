/**
 *
 * Star
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Wrapper from './styled/Wrapper';

function Star({
  logged,
  movie,
  favorite,
  favorites,
  addToFavorites,
  removeFromFavorites,
  context,
}) {
  if (logged) {
    return (
      <Wrapper
        context={context}
        onClick={() =>
          favorite
            ? removeFromFavorites(
              favorites.findIndex(
                favoriteMovie => favoriteMovie.id === movie.id,
              ),
            )
            : addToFavorites(movie)
        }
      >
        <use
          xlinkHref={`#icon-star-${favorite ? 'filled' : 'empty'}`}
        />
      </Wrapper>
    );
  }
  return null;
}

Star.propTypes = {
  logged: PropTypes.bool,
  movie: PropTypes.shape({
    id: PropTypes.number,
  }),
  favorite: PropTypes.bool,
  favorites: PropTypes.array,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  context: PropTypes.string,
};

export default Star;