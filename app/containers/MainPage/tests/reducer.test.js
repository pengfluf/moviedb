import { fromJS } from 'immutable';
import mainPageReducer from '../reducer';

import {
  login,
  logout,
  startFetching,
  stopFetching,
  receiveError,
  getPopular,
  getSearched,
  getGenre,
  addMoreMovies,
  updateMovies,
  updateSelectedMovie,
  updateSimilarMovies,
  updateQuery,
  addToFavorites,
  removeFromFavorites,
  memorizePrevSelectedId,
  memorizeCurrentSelectedId,
} from '../actions';

describe('mainPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
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
  });

  it('Returns the initial state', () => {
    const expected = state;
    expect(mainPageReducer(undefined, {})).toEqual(expected);
  });

  it('Handles the login action correctly', () => {
    const expected = state.set('logged', true);
    expect(mainPageReducer(state, login())).toEqual(expected);
  });

  it('Handles the logout action correctly', () => {
    const expected = state.set('logged', false);
    expect(mainPageReducer(state, logout())).toEqual(expected);
  });

  it('Handles the startFetching action correctly', () => {
    const expected = state.set('error', null).set('fetching', true);
    expect(mainPageReducer(state, startFetching())).toEqual(expected);
  });

  it('Handles the stopFetching action correctly', () => {
    const expected = state.set('fetching', false);
    expect(mainPageReducer(state, stopFetching())).toEqual(expected);
  });

  it('Handles the receiveError action correctly', () => {
    const error = { message: 'Something went wrong' };
    const expected = state.set('error', fromJS(error));
    expect(mainPageReducer(state, receiveError(error))).toEqual(
      expected,
    );
  });

  it('Handles the getPopular action correctly', () => {
    const expected = state.setIn(['selectedGenre', 'current'], '');
    expect(mainPageReducer(state, getPopular())).toEqual(expected);
  });

  it('Handles the getSearched action correctly', () => {
    const expected = state.setIn(['selectedGenre', 'current'], '');
    expect(mainPageReducer(state, getSearched())).toEqual(expected);
  });

  it('Handles the getGenre action correctly', () => {
    const genreId = 11;
    const genreName = 'Action';
    const page = 1;
    const expected = state.setIn(
      ['selectedGenre', 'current'],
      genreName,
    );
    expect(
      mainPageReducer(state, getGenre(genreId, genreName, page)),
    ).toEqual(expected);
  });

  it('Handles the addMoreMovies action correctly', () => {
    const movies = {
      results: [{ id: 1 }, { id: 2 }],
      page: 1,
      total_pages: 30,
    };
    const expected = state.withMutations(st => {
      st.setIn(
        ['movies', 'results'],
        st.getIn(['movies', 'results']).push(...movies.results),
      );

      st.setIn(['movies', 'page'], movies.page).setIn(
        ['movies', 'totalPages'],
        movies.total_pages,
      );
    });
    expect(mainPageReducer(state, addMoreMovies(movies))).toEqual(
      expected,
    );
  });

  it('Handles the updateMovies action correctly', () => {
    const movies = {
      results: [{ id: 1 }, { id: 2 }],
      page: 1,
      total_pages: 30,
    };
    const expected = state
      .setIn(['movies', 'page'], movies.page)
      .setIn(['movies', 'totalPages'], movies.total_pages)
      .setIn(['movies', 'results'], fromJS(movies.results));
    expect(mainPageReducer(state, updateMovies(movies))).toEqual(
      expected,
    );
  });

  it('Handles the updateSelectedMovie action correctly', () => {
    const movie = { id: 1, name: 'test' };
    const expected = state.setIn(
      ['selectedMovie', 'movie'],
      fromJS(movie),
    );
    expect(
      mainPageReducer(state, updateSelectedMovie(movie)),
    ).toEqual(expected);
  });

  it('Handles the updateSimilarMovies action correctly', () => {
    const movies = {
      results: [{ id: 1 }, { id: 2 }],
      page: 1,
      total_pages: 30,
    };
    const expected = state.setIn(
      ['selectedMovie', 'similar'],
      movies,
    );
    expect(
      mainPageReducer(state, updateSimilarMovies(movies)),
    ).toEqual(expected);
  });

  it('Handles the updateQuery action correctly', () => {
    const query = 'test';
    const expected = state.set('query', query);
    expect(mainPageReducer(state, updateQuery(query))).toEqual(
      expected,
    );
  });

  it('Handles the addToFavorites action correctly', () => {
    const movie = { id: 1, name: 'test' };
    const expected = state.set(
      'favorites',
      state.get('favorites').push(movie),
    );
    expect(mainPageReducer(state, addToFavorites(movie))).toEqual(
      expected,
    );
  });

  it('Handles the removeFromFavorites action correctly', () => {
    const index = 1;
    const expected = state.set(
      'favorites',
      state.get('favorites').delete(index),
    );
    expect(
      mainPageReducer(state, removeFromFavorites(index)),
    ).toEqual(expected);
  });

  it('Handles the memorizePrevSelectedId action correctly', () => {
    const id = 123;
    const expected = state.setIn(
      ['selectedMovie', 'ids', 'prev'],
      id,
    );
    expect(
      mainPageReducer(state, memorizePrevSelectedId(id)),
    ).toEqual(expected);
  });

  it('Handles the memorizeCurrentSelectedId action correctly', () => {
    const id = 123;
    const expected = state.setIn(
      ['selectedMovie', 'ids', 'current'],
      id,
    );
    expect(
      mainPageReducer(state, memorizeCurrentSelectedId(id)),
    ).toEqual(expected);
  });
});
