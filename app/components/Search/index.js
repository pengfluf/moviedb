/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styled/Wrapper';
import Field from './styled/Field';
import Button from './styled/Button';

function Search(props) {
  const {
    query,
    updateQuery,
    getSearched,
    getPopular,
    history,
  } = props;
  return (
    <Wrapper>
      <Field
        type="text"
        value={query}
        onChange={e => updateQuery(e.target.value)}
        onKeyUp={e => {
          if (query && e.key === 'Enter') {
            getSearched(query);
            history.push('/');
          } else if (e.key === 'Enter') {
            getPopular();
            props.history.push('/');
          }
        }}
      />
      <Button
        onClick={() => {
          if (query) {
            getSearched(query);
          } else {
            getPopular();
          }
          history.push('/');
        }}
      >
        <svg>
          <use xlinkHref="#icon-search" />
        </svg>
      </Button>
    </Wrapper>
  );
}

Search.propTypes = {
  query: PropTypes.string,
  updateQuery: PropTypes.func,
  getSearched: PropTypes.func,
  getPopular: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Search;