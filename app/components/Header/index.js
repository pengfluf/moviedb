/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const {
    logged,
    login,
    logout,
    query,
    updateQuery,
    getSearched,
    getPopular,
  } = props;
  return (
    <div>
      <input
        type="text"
        onChange={e => updateQuery(e.target.value)}
        onKeyUp={e => {
          if (query && e.key === 'Enter') {
            getSearched(query);
            props.history.push('/');
          } else if (e.key === 'Enter') {
            getPopular();
            props.history.push('/');
          }
        }}
      />
      <button
        onClick={() => {
          props.history.push('/');
          return query ? getSearched(query) : getPopular();
        }}
      >
        Search
      </button>
      <div>
        {logged ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  logged: PropTypes.bool,
  login: PropTypes.func,
  logout: PropTypes.func,
  query: PropTypes.string,
  updateQuery: PropTypes.func,
  getSearched: PropTypes.func,
  getPopular: PropTypes.func,
};

export default Header;
