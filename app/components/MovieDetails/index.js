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
import Star from 'components/Star';

import Movie from './styled/Movie';
import MovieTitle from './styled/MovieTitle';
import SectionTitle from './styled/SectionTitle';
import Overview from './styled/Overview';
import Genres from './styled/Genres';
import SimilarMovies from './styled/SimilarMovies';
import Poster from './styled/Poster';
import MovieTitleWrapper from './styled/MovieTitleWrapper';

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
      movie,
      similar,
      logged,
      fetching,
      favorites,
      selectedGenre,
      getGenre,
      memorizePrevSelectedGenre,
      addToFavorites,
      removeFromFavorites,
    } = this.props;

    const {
      original_title: title,
      overview,
      genres,
      poster_path: posterUrl,
    } = movie;

    if (!fetching) {
      return (
        <div>
          <Movie>
            <Poster url={posterUrl}>
              {!posterUrl && 'Poster is missing'}
            </Poster>

            <div>
              <MovieTitleWrapper>
                <MovieTitle>{title}</MovieTitle>
                <Star
                  logged={logged}
                  movie={movie}
                  favorite={isFavorite(movie.id, favorites)}
                  favorites={favorites}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  context="MovieDetails"
                />
              </MovieTitleWrapper>
              <Genres>
                {genres &&
                  genres.map(({ id, name }) => (
                    <GenreLink
                      key={id}
                      id={id}
                      name={name}
                      selectedGenre={selectedGenre}
                      getGenre={getGenre}
                      memorizePrevSelectedGenre={
                        memorizePrevSelectedGenre
                      }
                      context="MovieDetails"
                    />
                  ))}
              </Genres>
              <Overview>{overview}</Overview>
            </div>
          </Movie>

          <SimilarMovies>
            <SectionTitle>Similar Movies</SectionTitle>
            <Grid>
              {similar.results.length ? (
                similar.results.map(similarMovie => (
                  <MoviePreview
                    key={similarMovie.id}
                    logged={logged}
                    movie={similarMovie}
                    getGenre={getGenre}
                    memorizePrevSelectedGenre={
                      memorizePrevSelectedGenre
                    }
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    favorite={isFavorite(similarMovie.id, favorites)}
                    favorites={favorites}
                  />
                ))
              ) : (
                <div>There{"'"}s no similar movies :(</div>
              )}
            </Grid>
          </SimilarMovies>
        </div>
      );
    }
    return <Loading />;
  }
}

MovieDetails.propTypes = {
  getMovie: PropTypes.func,
  getSimilar: PropTypes.func,
  getGenre: PropTypes.func,
  memorizePrevSelectedGenre: PropTypes.func,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  memorizePrevSelectedId: PropTypes.func,
  memorizeCurrentSelectedId: PropTypes.func,
  fetching: PropTypes.bool,
  selectedGenre: PropTypes.shape({
    current: PropTypes.string,
    prev: PropTypes.string,
  }),
  logged: PropTypes.bool,
  ids: PropTypes.shape({
    prev: PropTypes.string,
    current: PropTypes.string,
  }),
  movie: PropTypes.shape({
    id: PropTypes.number,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.array,
    poster_path: PropTypes.string,
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
};

export default MovieDetails;
