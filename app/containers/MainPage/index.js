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

import injectSaga from 'utils/injectSaga';
import makeSelectMainPage from './selectors';
import saga from './saga';

import {
  getPopular,
  getMovie,
  getSimilar,
  getSearched,
  updateQuery,
  addToFavorites,
  removeFromFavorites,
  memorizePrevSelectedId,
  memorizeCurrentSelectedId,
} from './actions';

import Wrapper from './styled/Wrapper';

export class MainPage extends React.Component {
  componentDidMount() {
    if (this.props.match.path === '/movie/:id') {
      this.props.history.push('/');
    }
    this.props.getPopular();
  }

  render() {
    const { movies, selectedMovie } = this.props.mainpage;
    return (
      <Wrapper>
        <Helmet>
          <title>Movie Database – Main Page</title>
          <meta name="description" content="Movie Database" />
        </Helmet>
        <Header />
        <Switch>
          <Route
            path="/movie/:id"
            render={props => (
              <MovieDetails
                getMovie={this.props.getMovie}
                getSimilar={this.props.getSimilar}
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
            path="/"
            render={props => <MovieList movies={movies} {...props} />}
          />
        </Switch>
      </Wrapper>
    );
  }
}

MainPage.propTypes = {
  mainpage: PropTypes.shape({
    movies: PropTypes.array,
    selectedMovie: PropTypes.shape({
      movie: PropTypes.object,
      similar: PropTypes.array,
    }),
    query: PropTypes.string,
    favorites: PropTypes.array,
    fetching: PropTypes.bool,
    error: PropTypes.object,
  }),
  getPopular: PropTypes.func,
  getMovie: PropTypes.func,
  getSimilar: PropTypes.func,
  getSearched: PropTypes.func,
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
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPopular: () => dispatch(getPopular()),
    getMovie: id => dispatch(getMovie(id)),
    getSimilar: id => dispatch(getSimilar(id)),
    getSearched: query => dispatch(getSearched(query)),
    updateQuery: query => dispatch(updateQuery(query)),
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
