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
} from '../constants';

import {
  login,
  logout,
  getStateFromLS,
  startFetching,
  stopFetching,
  receiveError,
  getPopular,
  getMovie,
  getSimilar,
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

describe('MainPage Actions', () => {
  describe('login action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: LOGIN,
      };
      expect(login()).toEqual(expected);
    });
  });

  describe('logout action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: LOGOUT,
      };
      expect(logout()).toEqual(expected);
    });
  });

  describe('getStateFromLS action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: GET_STATE_FROM_LS,
      };
      expect(getStateFromLS()).toEqual(expected);
    });
  });

  describe('startFetching action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: START_FETCHING,
      };
      expect(startFetching()).toEqual(expected);
    });
  });

  describe('stopFetching action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: STOP_FETCHING,
      };
      expect(stopFetching()).toEqual(expected);
    });
  });

  describe('receiveError action', () => {
    it('Returns the correct type and passed arguments', () => {
      const error = { message: 'Something went wrong' };
      const expected = {
        type: RECEIVE_ERROR,
        error,
      };
      expect(receiveError(error)).toEqual(expected);
    });
  });

  describe('getPopular action', () => {
    it('Returns the correct type and passed arguments', () => {
      const page = 1;
      const expected = {
        type: GET_POPULAR,
        page,
      };
      expect(getPopular(page)).toEqual(expected);
    });
  });

  describe('getMovie action', () => {
    it('Returns the correct type and passed arguments', () => {
      const id = 123;
      const expected = {
        type: GET_MOVIE,
        id,
      };
      expect(getMovie(id)).toEqual(expected);
    });
  });

  describe('getSimilar action', () => {
    it('Returns the correct type and passed arguments', () => {
      const id = 123;
      const page = 1;
      const expected = {
        type: GET_SIMILAR,
        id,
        page,
      };
      expect(getSimilar(id, page)).toEqual(expected);
    });
  });

  describe('getSearched action', () => {
    it('Returns the correct type and passed arguments', () => {
      const query = 'test';
      const page = 1;
      const expected = {
        type: GET_SEARCHED,
        query,
        page,
      };
      expect(getSearched(query, page)).toEqual(expected);
    });
  });

  describe('getGenre action', () => {
    it('Returns the correct type and passed arguments', () => {
      const genreId = 567;
      const genreName = 'test';
      const page = 1;
      const expected = {
        type: GET_GENRE,
        genreId,
        genreName,
        page,
      };
      expect(getGenre(genreId, genreName, page)).toEqual(expected);
    });
  });

  describe('addMoreMovies action', () => {
    it('Returns the correct type and passed arguments', () => {
      const movies = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const expected = {
        type: ADD_MORE_MOVIES,
        movies,
      };
      expect(addMoreMovies(movies)).toEqual(expected);
    });
  });

  describe('updateMovies action', () => {
    it('Returns the correct type and passed arguments', () => {
      const movies = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const expected = {
        type: UPDATE_MOVIES,
        movies,
      };
      expect(updateMovies(movies)).toEqual(expected);
    });
  });

  describe('updateSelectedMovie action', () => {
    it('Returns the correct type and passed arguments', () => {
      const movie = { id: 1, name: 'test' };
      const expected = {
        type: UPDATE_SELECTED_MOVIE,
        movie,
      };
      expect(updateSelectedMovie(movie)).toEqual(expected);
    });
  });

  describe('updateSimilarMovies action', () => {
    it('Returns the correct type and passed arguments', () => {
      const movies = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const expected = {
        type: UPDATE_SIMILAR_MOVIES,
        movies,
      };
      expect(updateSimilarMovies(movies)).toEqual(expected);
    });
  });

  describe('updateQuery action', () => {
    it('Returns the correct type and passed arguments', () => {
      const query = 'test';
      const expected = {
        type: UPDATE_QUERY,
        query,
      };
      expect(updateQuery(query)).toEqual(expected);
    });
  });

  describe('addToFavorites action', () => {
    it('Returns the correct type and passed arguments', () => {
      const movie = { id: 1, name: 'test' };
      const expected = {
        type: ADD_TO_FAVORITES,
        movie,
      };
      expect(addToFavorites(movie)).toEqual(expected);
    });
  });

  describe('removeFromFavorites action', () => {
    it('Returns the correct type and passed arguments', () => {
      const index = 1;
      const expected = {
        type: REMOVE_FROM_FAVORITES,
        index,
      };
      expect(removeFromFavorites(index)).toEqual(expected);
    });
  });

  describe('memorizePrevSelectedId action', () => {
    it('Returns the correct type and passed arguments', () => {
      const id = 1;
      const expected = {
        type: MEMORIZE_PREV_SELECTED_ID,
        id,
      };
      expect(memorizePrevSelectedId(id)).toEqual(expected);
    });
  });

  describe('memorizeCurrentSelectedId action', () => {
    it('Returns the correct type and passed arguments', () => {
      const id = 2;
      const expected = {
        type: MEMORIZE_CURRENT_SELECTED_ID,
        id,
      };
      expect(memorizeCurrentSelectedId(id)).toEqual(expected);
    });
  });
});
