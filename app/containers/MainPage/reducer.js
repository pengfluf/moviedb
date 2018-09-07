/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN,
  LOGOUT,
  GET_STATE_FROM_LS,
  START_FETCHING,
  STOP_FETCHING,
  RECEIVE_ERROR,
  UPDATE_MOVIES,
  UPDATE_SELECTED_MOVIE,
  UPDATE_SIMILAR_MOVIES,
  UPDATE_QUERY,
  ADD_MORE_MOVIES,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  MEMORIZE_PREV_SELECTED_ID,
  MEMORIZE_CURRENT_SELECTED_ID,
  MEMORIZE_PREV_SELECTED_GENRE,
  GET_POPULAR,
  GET_SEARCHED,
  GET_GENRE,
} from './constants';

export const initialState = fromJS({
  logged: false,
  movies: {
    page: null,
    totalPages: null,
    results: [],
  },
  selectedMovie: {
    ids: {
      prev: null,
      current: null,
    },
    movie: {},
    similar: {
      results: [],
    },
  },
  selectedGenre: {
    prev: '',
    current: '',
  },
  query: '',
  favorites: [],
  fetching: false,
  error: null,
});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('logged', true);
    case LOGOUT:
      return state.set('logged', false);
    case GET_STATE_FROM_LS:
      return state
        .set(
          'favorites',
          state
            .get('favorites')
            .push(...JSON.parse(localStorage.getItem('favorites'))),
        )
        .set('logged', localStorage.getItem('logged') === 'true');
    case START_FETCHING:
      return state.set('error', null).set('fetching', true);
    case STOP_FETCHING:
      return state.set('fetching', false);
    case RECEIVE_ERROR:
      return state.set('error', fromJS(action.error));
    case UPDATE_MOVIES:
      return state
        .setIn(['movies', 'page'], action.movies.page)
        .setIn(['movies', 'totalPages'], action.movies.total_pages)
        .setIn(['movies', 'results'], fromJS(action.movies.results));
    case ADD_MORE_MOVIES:
      return state.withMutations(st => {
        st.setIn(
          ['movies', 'results'],
          st
            .getIn(['movies', 'results'])
            .push(...action.movies.results),
        );

        st.setIn(['movies', 'page'], action.movies.page).setIn(
          ['movies', 'totalPages'],
          action.movies.total_pages,
        );
      });
    case UPDATE_SELECTED_MOVIE:
      return state.setIn(
        ['selectedMovie', 'movie'],
        fromJS(action.movie),
      );
    case UPDATE_SIMILAR_MOVIES:
      return state.setIn(['selectedMovie', 'similar'], action.movies);
    case UPDATE_QUERY:
      return state.set('query', action.query);
    case ADD_TO_FAVORITES:
      return state.set(
        'favorites',
        state.get('favorites').push(action.movie),
      );
    case REMOVE_FROM_FAVORITES:
      return state.set(
        'favorites',
        state.get('favorites').delete(action.index),
      );
    case MEMORIZE_PREV_SELECTED_ID:
      return state.setIn(['selectedMovie', 'ids', 'prev'], action.id);
    case MEMORIZE_CURRENT_SELECTED_ID:
      return state.setIn(
        ['selectedMovie', 'ids', 'current'],
        action.id,
      );
    case MEMORIZE_PREV_SELECTED_GENRE:
      return state.setIn(['selectedGenre', 'prev'], action.genreName);
    case GET_POPULAR:
      return state.setIn(['selectedGenre', 'current'], '');
    case GET_SEARCHED:
      return state.setIn(['selectedGenre', 'current'], '');
    case GET_GENRE:
      return state.setIn(
        ['selectedGenre', 'current'],
        action.genreName,
      );
    default:
      return state;
  }
}

export default mainPageReducer;
