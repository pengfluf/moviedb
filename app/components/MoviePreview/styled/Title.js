import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled(Link)`
  text-decoration: none;
  font-size: 27px;
  color: #fff;

  &:hover {
    text-decoration: underline;
  }
`;

export default Title;
