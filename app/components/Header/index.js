/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const { updateQuery, getSearched, getPopular, query } = props;
  return (
    <div>
      <input
        type="text"
        onChange={e => updateQuery(e.target.value)}
        onKeyUp={e =>
          query && e.key === 'Enter'
            ? getSearched(query)
            : e.key === 'Enter' && getPopular()
        }
      />
      <button
        onClick={() => (query ? getSearched(query) : getPopular())}
      >
        Search
      </button>
    </div>
  );
}

Header.propTypes = {
  updateQuery: PropTypes.func,
  getSearched: PropTypes.func,
  getPopular: PropTypes.func,
  query: PropTypes.string,
};

export default Header;
