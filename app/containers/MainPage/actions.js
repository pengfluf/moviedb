/*
 *
 * MainPage actions
 *
 */

import {
  LOGIN,
  LOGOUT,
  GET_STATE_FROM_LS,
  START_FETCHING,
  STOP_FETCHING,
  RECEIVE_ERROR,
  GET_POPULAR,
  GET_MOVIE,
  GET_SIMILAR,
  GET_SEARCHED,
  GET_GENRE,
  ADD_MORE_MOVIES,
  UPDATE_MOVIES,
  UPDATE_SELECTED_MOVIE,
  UPDATE_SIMILAR_MOVIES,
  UPDATE_QUERY,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  MEMORIZE_PREV_SELECTED_ID,
  MEMORIZE_CURRENT_SELECTED_ID,
  MEMORIZE_PREV_SELECTED_GENRE,
} from './constants';

export function login() {
  return {
    type: LOGIN,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function getStateFromLS() {
  return {
    type: GET_STATE_FROM_LS,
  };
}

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

export function getPopular(page) {
  return {
    type: GET_POPULAR,
    page,
  };
}

export function getMovie(id) {
  return {
    type: GET_MOVIE,
    id,
  };
}

export function getSimilar(id, page) {
  return {
    type: GET_SIMILAR,
    id,
    page,
  };
}

export function getSearched(query, page) {
  return {
    type: GET_SEARCHED,
    query,
    page,
  };
}

export function getGenre(genreId, genreName, page) {
  return {
    type: GET_GENRE,
    genreId,
    genreName,
    page,
  };
}

export function addMoreMovies(movies) {
  return {
    type: ADD_MORE_MOVIES,
    movies,
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

export function memorizePrevSelectedGenre(genreName) {
  return {
    type: MEMORIZE_PREV_SELECTED_GENRE,
    genreName,
  };
}
