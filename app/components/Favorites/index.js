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
  selectedGenre,
  memorizePrevSelectedGenre,
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
                selectedGenre={selectedGenre}
                getGenre={getGenre}
                memorizePrevSelectedGenre={memorizePrevSelectedGenre}
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
  return <div>You{"'"}re not logged to see favorite movies</div>;
}

Favorites.propTypes = {
  logged: PropTypes.bool,
  favorites: PropTypes.array,
  selectedGenre: PropTypes.shape({
    current: PropTypes.string,
    prev: PropTypes.string,
  }),
  memorizePrevSelectedGenre: PropTypes.func,
  getGenre: PropTypes.func,
  removeFromFavorites: PropTypes.func,
};

export default Favorites;
