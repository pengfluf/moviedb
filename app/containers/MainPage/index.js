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
import isFavorite from 'helpers/isFavorite';

import injectSaga from 'utils/injectSaga';
import makeSelectMainPage from './selectors';
import saga from './saga';

import {
  login,
  logout,
  getStateFromLS,
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
  memorizePrevSelectedGenre,
} from './actions';

import Wrapper from './styled/Wrapper';

export class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  componentDidMount() {
    this.props.getPopular();

    window.addEventListener('scroll', this.onScroll, true);

    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }

    const logged = JSON.parse(localStorage.getItem('logged'));
    if (!logged) {
      localStorage.setItem('logged', 'false');
    }

    this.props.getStateFromLS();
  }

  onScroll() {
    const { pathname } = this.props.location;
    const { selectedGenre, query } = this.props.mainpage;
    const { page, totalPages } = this.props.mainpage.movies;
    if (scrollPercentageLeft() < 20 && page < totalPages) {
      if (selectedGenre.current && !pathname.includes('movie')) {
        this.props.getGenre(
          getGenreId(selectedGenre.current),
          selectedGenre.current,
          page + 1,
        );
      } else if (query) {
        this.props.getSearched(query, page + 1);
      } else if (pathname === '/') {
        this.props.getPopular(page + 1);
      }
    }
  }

  login() {
    this.props.login();
    localStorage.setItem('logged', 'true');
  }

  logout() {
    this.props.logout();
    localStorage.setItem('logged', 'false');
  }

  addToFavorites(movie) {
    const promise = new Promise(resolve => {
      this.props.addToFavorites(movie);
      resolve();
    });

    promise.then(() => {
      const { favorites } = this.props.mainpage;
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  }

  removeFromFavorites(index) {
    this.props.removeFromFavorites(index);

    const favorites = JSON.parse(localStorage.getItem('favorites'));
    favorites.splice(index, 1);

    localStorage.setItem('favorites', JSON.stringify(favorites));
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
      <Wrapper>
        <Helmet>
          <title>Movie Database – Main Page</title>
          <meta name="description" content="Movie Database" />
        </Helmet>
        <Header
          logged={logged}
          query={query}
          selectedGenre={selectedGenre}
          login={this.login}
          logout={this.logout}
          updateQuery={this.props.updateQuery}
          getSearched={this.props.getSearched}
          getPopular={this.props.getPopular}
          getGenre={this.props.getGenre}
          memorizePrevSelectedGenre={
            this.props.memorizePrevSelectedGenre
          }
          history={this.props.history}
        />
        <Switch>
          <Route
            path="/favorites"
            render={props => (
              <Favorites
                logged={logged}
                favorites={favorites}
                selectedGenre={selectedGenre}
                getGenre={this.props.getGenre}
                memorizePrevSelectedGenre={
                  this.props.memorizePrevSelectedGenre
                }
                removeFromFavorites={this.removeFromFavorites}
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
                favorite={isFavorite(
                  selectedMovie.movie.id,
                  favorites,
                )}
                favorites={favorites}
                selectedGenre={selectedGenre}
                ids={selectedMovie.ids}
                movie={selectedMovie.movie}
                similar={selectedMovie.similar}
                getMovie={this.props.getMovie}
                getSimilar={this.props.getSimilar}
                getGenre={this.props.getGenre}
                addToFavorites={this.addToFavorites}
                removeFromFavorites={this.removeFromFavorites}
                memorizePrevSelectedId={
                  this.props.memorizePrevSelectedId
                }
                memorizeCurrentSelectedId={
                  this.props.memorizeCurrentSelectedId
                }
                memorizePrevSelectedGenre={
                  this.props.memorizePrevSelectedGenre
                }
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
                favorites={favorites}
                movies={results}
                selectedGenre={selectedGenre}
                getGenre={this.props.getGenre}
                addToFavorites={this.addToFavorites}
                removeFromFavorites={this.removeFromFavorites}
                memorizePrevSelectedGenre={
                  this.props.memorizePrevSelectedGenre
                }
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
    selectedGenre: PropTypes.shape({
      prev: PropTypes.string,
      current: PropTypes.string,
    }),
    query: PropTypes.string,
    favorites: PropTypes.array,
    fetching: PropTypes.bool,
    error: PropTypes.object,
  }),
  login: PropTypes.func,
  logout: PropTypes.func,
  getStateFromLS: PropTypes.func,
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
  memorizePrevSelectedGenre: PropTypes.func,
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
    getStateFromLS: () => dispatch(getStateFromLS()),
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
    memorizePrevSelectedGenre: genreName =>
      dispatch(memorizePrevSelectedGenre(genreName)),
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
