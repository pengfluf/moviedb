import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMainPageDomain = state =>
  state.get('mainPage', initialState);

const selectLogged = () =>
  createSelector(selectMainPageDomain, substate =>
    substate.get('logged'),
  );

const selectMovies = () =>
  createSelector(selectMainPageDomain, substate =>
    substate.get('movies'),
  );

const selectSelectedMovie = () =>
  createSelector(selectMainPageDomain, substate =>
    substate.get('selectedMovie'),
  );

const selectSelectedGenre = () =>
  createSelector(selectMainPageDomain, substate =>
    substate.get('selectedGenre'),
  );

const selectQuery = () =>
  createSelector(selectMainPageDomain, substate =>
    substate.get('query'),
  );

const selectFavorites = () =>
  createSelector(selectMainPageDomain, substate =>
    substate.get('favorites'),
  );

const selectFetching = () =>
  createSelector(selectMainPageDomain, substate =>
    substate.get('fetching'),
  );

const selectError = () =>
  createSelector(selectMainPageDomain, substate =>
    substate.get('error'),
  );

const makeSelectMainPage = () =>
  createSelector(selectMainPageDomain, substate => substate.toJS());

export default makeSelectMainPage;
export {
  selectMainPageDomain,
  selectLogged,
  selectMovies,
  selectSelectedMovie,
  selectSelectedGenre,
  selectQuery,
  selectFavorites,
  selectFetching,
  selectError,
};
