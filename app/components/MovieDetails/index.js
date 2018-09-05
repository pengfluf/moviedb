/**
 *
 * MovieDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import isFavorite from 'helpers/isFavorite';

import MoviePreview from 'components/MoviePreview';
import GenreLink from 'components/GenreLink';
import Grid from 'components/Grid';
import Loading from 'components/Loading';

import Wrapper from './styled/Wrapper';
import GoBack from './styled/GoBack';
import Movie from './styled/Movie';
import MovieTitle from './styled/MovieTitle';
import SectionTitle from './styled/SectionTitle';
import Overview from './styled/Overview';
import Genres from './styled/Genres';
import SimilarMovies from './styled/SimilarMovies';

class MovieDetails extends React.Component {
  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate() {
    this.updateData();
  }

  updateData() {
    const { id } = this.props.match.params;
    const { prev, current } = this.props.ids;

    if (id !== current) {
      this.props.memorizeCurrentSelectedId(id);
    }

    if (prev !== current) {
      this.props.getMovie(id);
      this.props.getSimilar(id, 1);
      this.props.memorizePrevSelectedId(id);
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      original_title: title,
      overview,
      genres,
    } = this.props.movie;
    const { results } = this.props.similar;
    if (!this.props.fetching) {
      return (
        <Wrapper>
          <GoBack onClick={() => this.props.history.goBack()}>
            <svg>
              <use xlinkHref="#icon-back" />
            </svg>
          </GoBack>
          <Movie>
            <MovieTitle>{title}</MovieTitle>
            <Overview>{overview}</Overview>
            <Genres>
              {genres &&
                genres.map(({ id, name }) => (
                  <GenreLink
                    key={id}
                    id={id}
                    name={name}
                    getGenre={this.props.getGenre}
                    context="MovieDetails"
                  />
                ))}
            </Genres>
          </Movie>

          <SimilarMovies>
            <SectionTitle>Similar Movies</SectionTitle>
            <Grid>
              {results.length ? (
                results.map(movie => (
                  <MoviePreview
                    key={movie.id}
                    logged={this.props.logged}
                    movie={movie}
                    getGenre={this.props.getGenre}
                    addToFavorites={this.props.addToFavorites}
                    removeFromFavorites={
                      this.props.removeFromFavorites
                    }
                    favorite={isFavorite(
                      movie.id,
                      this.props.favorites,
                    )}
                    favorites={this.props.favorites}
                  />
                ))
              ) : (
                <div>There{"'"}s no similar movies :(</div>
              )}
            </Grid>
          </SimilarMovies>
        </Wrapper>
      );
    }
    return <Loading />;
  }
}

MovieDetails.propTypes = {
  getMovie: PropTypes.func,
  getSimilar: PropTypes.func,
  getGenre: PropTypes.func,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  memorizePrevSelectedId: PropTypes.func,
  memorizeCurrentSelectedId: PropTypes.func,
  logged: PropTypes.bool,
  ids: PropTypes.shape({
    prev: PropTypes.string,
    current: PropTypes.string,
  }),
  movie: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.array,
  }),
  similar: PropTypes.shape({
    results: PropTypes.array,
  }),
  favorites: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

export default MovieDetails;
