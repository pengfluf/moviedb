/**
 *
 * Favorites
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import isFavorite from 'helpers/isFavorite';

import MoviePreview from 'components/MoviePreview';

function Favorites(props) {
  return (
    <div>
      {props.favorites.length ? (
        props.favorites.map(favorite => (
          <MoviePreview
            key={favorite.id}
            movie={favorite}
            getGenre={props.getGenre}
            removeFromFavorites={props.removeFromFavorites}
            favorite={isFavorite(favorite.id, props.favorites)}
            favorites={props.favorites}
          />
        ))
      ) : (
        <div>There{"'"}s no favorite movies yet</div>
      )}
    </div>
  );
}

Favorites.propTypes = {
  favorites: PropTypes.array,
  getGenre: PropTypes.func,
  removeFromFavorites: PropTypes.func,
};

export default Favorites;
