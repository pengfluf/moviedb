/*
 *
 * MainPage actions
 *
 */

import {
  START_FETCHING,
  STOP_FETCHING,
  RECEIVE_ERROR,
  GET_POPULAR,
  GET_MOVIE,
  GET_SIMILAR,
  GET_SEARCHED,
  GET_GENRE,
  UPDATE_MOVIES,
  UPDATE_SELECTED_MOVIE,
  UPDATE_SIMILAR_MOVIES,
  UPDATE_QUERY,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  MEMORIZE_PREV_SELECTED_ID,
  MEMORIZE_CURRENT_SELECTED_ID,
} from './constants';

export function startFetching() {
  return {
    type: START_FETCHING,
  };
}

export function stopFetching() {
  return {
    type: STOP_FETCHING,
  };
}

export function receiveError(error) {
  return {
    type: RECEIVE_ERROR,
    error,
  };
}

export function getPopular() {
  return {
    type: GET_POPULAR,
  };
}

export function getMovie(id) {
  return {
    type: GET_MOVIE,
    id,
  };
}

export function getSimilar(id) {
  return {
    type: GET_SIMILAR,
    id,
  };
}

export function getSearched(query) {
  return {
    type: GET_SEARCHED,
    query,
  };
}

export function getGenre(genreId) {
  return {
    type: GET_GENRE,
    genreId,
  };
}

export function updateMovies(movies) {
  return {
    type: UPDATE_MOVIES,
    movies,
  };
}

export function updateSelectedMovie(movie) {
  return {
    type: UPDATE_SELECTED_MOVIE,
    movie,
  };
}

export function updateSimilarMovies(movies) {
  return {
    type: UPDATE_SIMILAR_MOVIES,
    movies,
  };
}

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    query,
  };
}

export function addToFavorites(movie) {
  return {
    type: ADD_TO_FAVORITES,
    movie,
  };
}

export function removeFromFavorites(index) {
  return {
    type: REMOVE_FROM_FAVORITES,
    index,
  };
}

export function memorizePrevSelectedId(id) {
  return {
    type: MEMORIZE_PREV_SELECTED_ID,
    id,
  };
}

export function memorizeCurrentSelectedId(id) {
  return {
    type: MEMORIZE_CURRENT_SELECTED_ID,
    id,
  };
}
