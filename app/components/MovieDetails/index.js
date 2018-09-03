/**
 *
 * MovieDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MoviePreview from 'components/MoviePreview';

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
      this.props.getSimilar(id);
      this.props.memorizePrevSelectedId(id);
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { original_title: title, overview } = this.props.movie;
    return (
      <div>
        <div>
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <Link to="/">Back</Link>
          {/* eslint-enable */}
          <h1>{title}</h1>
          <p>{overview}</p>
        </div>

        <div>
          {this.props.similar.map(movie => (
            <MoviePreview
              key={movie.id}
              movie={movie}
              getGenre={this.props.getGenre}
            />
          ))}
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  getMovie: PropTypes.func,
  getSimilar: PropTypes.func,
  getGenre: PropTypes.func,
  memorizePrevSelectedId: PropTypes.func,
  memorizeCurrentSelectedId: PropTypes.func,
  ids: PropTypes.shape({
    prev: PropTypes.string,
    current: PropTypes.string,
  }),
  movie: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
  }),
  similar: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default MovieDetails;
