import styled from 'styled-components';
import { Link } from 'react-router-dom';

const InfoWrapper = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: antiquewhite;
  }
`;

export default InfoWrapper;
