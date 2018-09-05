import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMainPageDomain = state =>
  state.get('mainPage', initialState);

const makeSelectMainPage = () =>
  createSelector(selectMainPageDomain, substate => substate.toJS());

export default makeSelectMainPage;
export { selectMainPageDomain };
