/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styled/Wrapper';

function Loading({ mode }) {
  return (
    <Wrapper mode={mode}>
      <svg>
        <use xlinkHref="#icon-spinner" />
      </svg>
    </Wrapper>
  );
}

Loading.propTypes = {
  mode: PropTypes.string,
};

export default Loading;
