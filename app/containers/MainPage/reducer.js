/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  START_FETCHING,
  STOP_FETCHING,
  RECEIVE_ERROR,
  UPDATE_MOVIES,
  UPDATE_SELECTED_MOVIE,
  UPDATE_SIMILAR_MOVIES,
  UPDATE_QUERY,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  MEMORIZE_PREV_SELECTED_ID,
  MEMORIZE_CURRENT_SELECTED_ID,
} from './constants';

export const initialState = fromJS({
  movies: [],
  selectedMovie: {
    ids: {
      prev: null,
      current: null,
    },
    movie: {},
    similar: [],
  },
  query: '',
  favorites: [],
  fetching: false,
  error: null,
});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING:
      return state.set('error', null).set('fetching', true);
    case STOP_FETCHING:
      return state.set('fetching', false);
    case RECEIVE_ERROR:
      return state.set('error', action.error);
    case UPDATE_MOVIES:
      return state.set('movies', fromJS(action.movies));
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
      return state.setIn(
        ['favorites', state.get('favorites').size],
        action.movie,
      );
    case REMOVE_FROM_FAVORITES:
      return state.delete('favorites', action.index);
    case MEMORIZE_PREV_SELECTED_ID:
      return state.setIn(['selectedMovie', 'ids', 'prev'], action.id);
    case MEMORIZE_CURRENT_SELECTED_ID:
      return state.setIn(
        ['selectedMovie', 'ids', 'current'],
        action.id,
      );
    default:
      return state;
  }
}

export default mainPageReducer;
