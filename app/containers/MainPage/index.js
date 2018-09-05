/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import MovieList from 'components/MovieList';
import MovieDetails from 'components/MovieDetails';
import Favorites from 'components/Favorites';

import scrollPercentageLeft from 'helpers/scrollPercentageLeft';
import getGenreId from 'helpers/getGenreId';

import injectSaga from 'utils/injectSaga';
import makeSelectMainPage from './selectors';
import saga from './saga';

import Loading from 'components/Loading';

import {
  login,
  logout,
  getPopular,
  getMovie,
  getSimilar,
  getSearched,
  getGenre,
  updateQuery,
  addMoreMovies,
  addToFavorites,
  removeFromFavorites,
  memorizePrevSelectedId,
  memorizeCurrentSelectedId,
} from './actions';

import Wrapper from './styled/Wrapper';

export class MainPage extends React.Component {
  componentDidMount() {
    this.props.getPopular();

    this.onWheel = this.onWheel.bind(this);
  }

  onWheel() {
    const { pathname } = this.props.location;
    const { selectedGenre, query } = this.props.mainpage;
    const { page, totalPages } = this.props.mainpage.movies;
    if (scrollPercentageLeft() < 20 && page < totalPages) {
      if (selectedGenre) {
        this.props.getGenre(
          getGenreId(selectedGenre),
          selectedGenre,
          page + 1,
        );
      } else if (query) {
        this.props.getSearched(query, page + 1);
      } else if (pathname === '/') {
        this.props.getPopular(page + 1);
      }
    }
  }

  render() {
    const {
      selectedMovie,
      selectedGenre,
      query,
      logged,
      fetching,
      favorites,
    } = this.props.mainpage;
    const { results } = this.props.mainpage.movies;

    return (
      <Wrapper onWheel={this.onWheel}>
        <Helmet>
          <title>Movie Database – Main Page</title>
          <meta name="description" content="Movie Database" />
        </Helmet>
        <Header
          logged={logged}
          query={query}
          selectedGenre={selectedGenre}
          login={this.props.login}
          logout={this.props.logout}
          updateQuery={this.props.updateQuery}
          getSearched={this.props.getSearched}
          getPopular={this.props.getPopular}
          getGenre={this.props.getGenre}
          history={this.props.history}
        />
        <Switch>
          <Route
            path="/favorites"
            render={props => (
              <Favorites
                logged={logged}
                getGenre={this.props.getGenre}
                removeFromFavorites={this.props.removeFromFavorites}
                favorites={favorites}
                {...props}
              />
            )}
          />
          <Route
            path="/movie/:id"
            render={props => (
              <MovieDetails
                fetching={fetching}
                logged={logged}
                getMovie={this.props.getMovie}
                getSimilar={this.props.getSimilar}
                getGenre={this.props.getGenre}
                addToFavorites={this.props.addToFavorites}
                removeFromFavorites={this.props.removeFromFavorites}
                memorizePrevSelectedId={
                  this.props.memorizePrevSelectedId
                }
                memorizeCurrentSelectedId={
                  this.props.memorizeCurrentSelectedId
                }
                favorites={favorites}
                ids={selectedMovie.ids}
                movie={selectedMovie.movie}
                similar={selectedMovie.similar}
                {...props}
              />
            )}
          />
          <Route
            path="/"
            render={props => (
              <MovieList
                fetching={fetching}
                logged={logged}
                getGenre={this.props.getGenre}
                addToFavorites={this.props.addToFavorites}
                removeFromFavorites={this.props.removeFromFavorites}
                favorites={favorites}
                movies={results}
                selectedGenre={selectedGenre}
                {...props}
              />
            )}
          />
        </Switch>
      </Wrapper>
    );
  }
}

MainPage.propTypes = {
  mainpage: PropTypes.shape({
    logged: PropTypes.bool,
    movies: PropTypes.shape({
      page: PropTypes.number,
      totalPages: PropTypes.number,
      results: PropTypes.array,
    }),
    selectedMovie: PropTypes.shape({
      movie: PropTypes.object,
      similar: PropTypes.shape({
        results: PropTypes.array,
      }),
    }),
    selectedGenre: PropTypes.string,
    query: PropTypes.string,
    favorites: PropTypes.array,
    fetching: PropTypes.bool,
    error: PropTypes.object,
  }),
  login: PropTypes.func,
  logout: PropTypes.func,
  getPopular: PropTypes.func,
  getMovie: PropTypes.func,
  getSimilar: PropTypes.func,
  getSearched: PropTypes.func,
  getGenre: PropTypes.func,
  updateQuery: PropTypes.func,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  memorizePrevSelectedId: PropTypes.func,
  memorizeCurrentSelectedId: PropTypes.func,
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    getPopular: page => dispatch(getPopular(page)),
    getMovie: id => dispatch(getMovie(id)),
    getSimilar: (id, page) => dispatch(getSimilar(id, page)),
    getSearched: (query, page) => dispatch(getSearched(query, page)),
    getGenre: (id, name, page) => dispatch(getGenre(id, name, page)),
    updateQuery: query => dispatch(updateQuery(query)),
    addMoreMovies: movies => dispatch(addMoreMovies(movies)),
    addToFavorites: movie => dispatch(addToFavorites(movie)),
    removeFromFavorites: index =>
      dispatch(removeFromFavorites(index)),
    memorizePrevSelectedId: id =>
      dispatch(memorizePrevSelectedId(id)),
    memorizeCurrentSelectedId: id =>
      dispatch(memorizeCurrentSelectedId(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'mainPage', saga });

export default withRouter(
  compose(
    withSaga,
    withConnect,
  )(MainPage),
);
