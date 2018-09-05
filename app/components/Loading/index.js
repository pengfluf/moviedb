/**
 *
 * Loading
 *
 */

import React from 'react';

import Wrapper from './styled/Wrapper';

function Loading(props) {
  return (
    <Wrapper mode={props.mode}>
      <svg>
        <use xlinkHref="#icon-spinner" />
      </svg>
    </Wrapper>
  );
}

export default Loading;
