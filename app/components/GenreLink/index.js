/**
 *
 * GenreLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styled/Wrapper';

function GenreLink({
  id,
  name,
  selectedGenre,
  getGenre,
  memorizePrevSelectedGenre,
  context,
}) {
  return (
    /* eslint-disable jsx-a11y/anchor-is-valid */
    <Wrapper
      to={`/genre/${name}`.replace(/ /g, '').toLowerCase()}
      onClick={() => {
        memorizePrevSelectedGenre(selectedGenre.current);
        getGenre(id, name, 1);
        window.scrollTo(0, 0);
      }}
      context={context}
    >
      {name}
    </Wrapper>
    /* eslint-enable */
  );
}

GenreLink.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  selectedGenre: PropTypes.shape({
    current: PropTypes.string,
  }),
  getGenre: PropTypes.func,
  memorizePrevSelectedGenre: PropTypes.func,
  context: PropTypes.string,
};

export default GenreLink;
