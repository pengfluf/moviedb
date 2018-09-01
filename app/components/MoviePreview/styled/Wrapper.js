import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
  text-decoration: none;
  color: black;

  border: 1px solid black;
  border-radius: 5px;
  padding: 20px;
  cursor: pointer;

  &:hover {
    background-color: antiquewhite;
  }
`;

export default Wrapper;
