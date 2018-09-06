/**
 *
 * GoBack
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styled/Wrapper';

function GoBack(props) {
  return (
    <Wrapper onClick={props.goBack}>
      <svg>
        <use xlinkHref="#icon-back" />
      </svg>
    </Wrapper>
  );
}

GoBack.propTypes = {
  goBack: PropTypes.func,
};

export default GoBack;
