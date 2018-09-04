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
import { withRouter, matchPath } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import MovieList from 'components/MovieList';
import MovieDetails from 'components/MovieDetails';

import scrollPercentageLeft from 'helpers/scrollPercentageLeft';
import getGenreId from 'helpers/getGenreId';

import injectSaga from 'utils/injectSaga';
import makeSelectMainPage from './selectors';
import saga from './saga';

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
  }

  render() {
    const {
      selectedMovie,
      selectedGenre,
      logged,
      query,
    } = this.props.mainpage;
    const { page, totalPages, results } = this.props.mainpage.movies;

    return (
      <Wrapper
        onWheel={() => {
          const { pathname } = this.props.location;
          if (scrollPercentageLeft() < 25 && page < totalPages) {
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
        }}
      >
        <Helmet>
          <title>Movie Database – Main Page</title>
          <meta name="description" content="Movie Database" />
        </Helmet>
        <Header
          history={this.props.history}
          logged={logged}
          login={this.props.login}
          logout={this.props.logout}
          query={this.props.mainpage.query}
          updateQuery={this.props.updateQuery}
          getSearched={this.props.getSearched}
          getPopular={this.props.getPopular}
        />
        <h2>
          {!this.props.location.pathname.includes('/movie/') &&
            selectedGenre}
        </h2>
        <Switch>
          <Route
            path="/genre/:genreName"
            render={props => (
              <MovieList
                getGenre={this.props.getGenre}
                movies={results}
                selectedGenre={selectedGenre}
                {...props}
              />
            )}
          />
          <Route
            path="/movie/:id"
            render={props => (
              <MovieDetails
                getMovie={this.props.getMovie}
                getSimilar={this.props.getSimilar}
                getGenre={this.props.getGenre}
                memorizePrevSelectedId={
                  this.props.memorizePrevSelectedId
                }
                memorizeCurrentSelectedId={
                  this.props.memorizeCurrentSelectedId
                }
                ids={selectedMovie.ids}
                movie={selectedMovie.movie}
                similar={selectedMovie.similar}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={props => (
              <MovieList
                getGenre={this.props.getGenre}
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
