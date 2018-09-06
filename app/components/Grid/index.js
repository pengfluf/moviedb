/**
 *
 * Grid
 *
 */

import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 1fr);
  grid-gap: 20px;

  margin-top: 20px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }

  @media (min-width: 1300px) {
    grid-template-columns: repeat(3, minmax(250px, 1fr));
  }

  @media (min-width: 1700px) {
    grid-template-columns: repeat(4, minmax(250px, 1fr));
  }
`;

export default Grid;
