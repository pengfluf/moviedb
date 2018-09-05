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
  addMoreMovies,
  updateSelectedMovie,
  updateSimilarMovies,
  startFetching,
  stopFetching,
} from './actions';

export function* fetchPopular(action) {
  try {
    yield put(startFetching());

    const movies = yield call(
      axios.get,
      `${API_URL}/movie/popular?page=${
        action.page
      }&api_key=${API_KEY}`,
    );

    yield put(stopFetching());

    if (action.page > 1) {
      yield put(addMoreMovies(movies.data));
    } else {
      yield put(updateMovies(movies.data));
    }
  } catch (error) {
    yield put(receiveError(error));
  }
}

export function* fetchMovie(action) {
  try {
    yield put(startFetching());

    const movie = yield call(
      axios.get,
      `${API_URL}/movie/${action.id}?api_key=${API_KEY}`,
    );

    yield put(stopFetching());

    yield put(updateSelectedMovie(movie.data));
  } catch (error) {
    yield put(receiveError(error));
  }
}

export function* fetchSimilar(action) {
  try {
    yield put(startFetching());

    const movies = yield call(
      axios.get,
      `${API_URL}/movie/${
        action.id
      }/similar?api_key=${API_KEY}&page=${action.page}`,
    );

    yield put(stopFetching());

    yield put(updateSimilarMovies(movies.data));
  } catch (error) {
    yield put(receiveError(error));
  }
}

export function* fetchSearched(action) {
  try {
    yield put(startFetching());

    const movies = yield call(
      axios.get,
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${
        action.query
      }&page=${action.page}`,
    );

    yield put(stopFetching());

    if (action.page > 1) {
      yield put(addMoreMovies(movies.data));
    } else {
      yield put(updateMovies(movies.data));
    }
  } catch (error) {
    yield put(receiveError(error));
  }
}

export function* fetchGenre(action) {
  try {
    yield put(startFetching());

    const movies = yield call(
      axios.get,
      `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${
        action.genreId
      }&page=${action.page}`,
    );

    yield put(stopFetching());

    if (action.page > 1) {
      yield put(addMoreMovies(movies.data));
    } else {
      yield put(updateMovies(movies.data));
    }
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
