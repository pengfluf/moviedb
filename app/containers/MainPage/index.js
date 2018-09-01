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

import Header from 'components/Header';
import MoviePreview from 'components/MoviePreview';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getPopular,
  getMovie,
  getSimilar,
  getSearched,
  updateQuery,
  addToFavorites,
  removeFromFavorites,
} from './actions';

export class MainPage extends React.Component {
  componentDidMount() {
    this.props.getPopular();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Movie Database – Main Page</title>
          <meta name="description" content="Movie Database" />
        </Helmet>
        <Header />
        <div>Main Page</div>
        {this.props.mainpage.movies.map(movie => (
          <MoviePreview key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

MainPage.propTypes = {
  mainpage: PropTypes.shape({
    movies: PropTypes.array,
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MainPage);
