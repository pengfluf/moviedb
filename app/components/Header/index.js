/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Navigation from 'components/Navigation';
import Search from 'components/Search';

import Wrapper from './styled/Wrapper';
import Logo from './styled/Logo';
import Button from './styled/Button';

function Header(props) {
  const {
    logged,
    query,
    selectedGenre,
    login,
    logout,
    updateQuery,
    getSearched,
    getPopular,
    getGenre,
    memorizePrevSelectedGenre,
    history,
  } = props;
  return (
    <Wrapper>
      <Logo
        onClick={() => {
          updateQuery('');
          getPopular();
          history.push('/');
          window.scrollTo(0, 0);
        }}
      >
        <use xlinkHref="#icon-camera" />
      </Logo>

      <Navigation
        selectedGenre={selectedGenre}
        logged={logged}
        pathname={history.location.pathname}
        getGenre={getGenre}
        memorizePrevSelectedGenre={memorizePrevSelectedGenre}
      />

      <Search
        query={query}
        updateQuery={updateQuery}
        getSearched={getSearched}
        getPopular={getPopular}
        history={history}
      />

      <Button
        logged={logged}
        onClick={() => (logged ? logout() : login())}
      >
        {logged ? 'Logout' : 'Login'}
      </Button>
    </Wrapper>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  logged: PropTypes.bool,
  query: PropTypes.string,
  selectedGenre: PropTypes.shape({
    prev: PropTypes.string,
    current: PropTypes.string,
  }),
  login: PropTypes.func,
  logout: PropTypes.func,
  updateQuery: PropTypes.func,
  getSearched: PropTypes.func,
  getPopular: PropTypes.func,
  getGenre: PropTypes.func,
  memorizePrevSelectedGenre: PropTypes.func,
};

export default Header;
