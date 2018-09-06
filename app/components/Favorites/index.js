/**
 *
 * Favorites
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import isFavorite from 'helpers/isFavorite';

import MoviePreview from 'components/MoviePreview';
import Grid from 'components/Grid';

function Favorites({
  logged,
  favorites,
  getGenre,
  removeFromFavorites,
}) {
  if (logged) {
    return (
      <div>
        <h1>Favorite Movies</h1>
        <Grid>
          {favorites.length ? (
            favorites.map(favorite => (
              <MoviePreview
                key={favorite.id}
                logged={logged}
                movie={favorite}
                getGenre={getGenre}
                removeFromFavorites={removeFromFavorites}
                favorite={isFavorite(favorite.id, favorites)}
                favorites={favorites}
              />
            ))
          ) : (
            <div>There{"'"}s no favorite movies yet</div>
          )}
        </Grid>
      </div>
    );
  }
  return null;
}

Favorites.propTypes = {
  logged: PropTypes.bool,
  favorites: PropTypes.array,
  getGenre: PropTypes.func,
  removeFromFavorites: PropTypes.func,
};

export default Favorites;
