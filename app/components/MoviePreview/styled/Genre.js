import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Genre = styled(Link)`
  &:not(:first-child) {
    margin-left: 10px;
  }
`;

export default Genre;
