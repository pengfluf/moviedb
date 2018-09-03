import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  API_URL,
  API_KEY,
  GET_POPULAR,
  GET_MOVIE,
  GET_SIMILAR,
  GET_SEARCHED,
  GET_GENRE,
} from './constants';

import {
  receiveError,
  updateMovies,
  updateSelectedMovie,
  updateSimilarMovies,
} from './actions';

export function* fetchPopular() {
  try {
    const movies = yield call(
      axios.get,
      `${API_URL}/movie/popular?page=1&api_key=${API_KEY}`,
    );
    yield put(updateMovies(movies.data.results));
  } catch (error) {
    yield put(receiveError(error));
  }
}

export function* fetchMovie(action) {
  try {
    const movie = yield call(
      axios.get,
      `${API_URL}/movie/${action.id}?api_key=${API_KEY}`,
    );
    yield put(updateSelectedMovie(movie.data));
  } catch (error) {
    yield put(receiveError(error));
  }
}

export function* fetchSimilar(action) {
  try {
    const movies = yield call(
      axios.get,
      `${API_URL}/movie/${action.id}/similar?api_key=${API_KEY}`,
    );
    yield put(updateSimilarMovies(movies.data.results));
  } catch (error) {
    yield put(receiveError(error));
  }
}

export function* fetchSearched(action) {
  try {
    const movies = yield call(
      axios.get,
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${
        action.query
      }&page=1`,
    );
    yield put(updateMovies(movies.data.results));
  } catch (error) {
    yield put(receiveError(error));
  }
}

export function* fetchGenre(action) {
  try {
    const movies = yield call(
      axios.get,
      `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${
        action.genreId
      }`,
    );
    yield put(updateMovies(movies.data.results));
  } catch (error) {
    yield put(receiveError(error));
  }
}

export default function* watcher() {
  yield [
    takeLatest(GET_POPULAR, fetchPopular),
    takeLatest(GET_MOVIE, fetchMovie),
    takeLatest(GET_SIMILAR, fetchSimilar),
    takeLatest(GET_SEARCHED, fetchSearched),
    takeLatest(GET_GENRE, fetchGenre),
  ];
}
