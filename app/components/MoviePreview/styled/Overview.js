import styled from 'styled-components';

const Overview = styled.p`
  z-index: 1;
  overflow: hidden;
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  /* stylelint-enable */

  font-size: 18px;
  margin-top: 8px;
  max-height: 85px;
`;

export default Overview;
