/**
 *
 * GenreLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styled/Wrapper';

function GenreLink({ id, name, getGenre, context }) {
  return (
    /* eslint-disable jsx-a11y/anchor-is-valid */
    <Wrapper
      to={`/genre/${name}`.replace(/ /g, '').toLowerCase()}
      onClick={() => {
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
  getGenre: PropTypes.func,
  context: PropTypes.string,
};

export default GenreLink;
