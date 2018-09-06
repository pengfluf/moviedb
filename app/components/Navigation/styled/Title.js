import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Title = styled(NavLink)`
  &:not(:first-child) {
    margin-left: 20px;
  }

  cursor: pointer;
  font-size: 22px;
  display: inline-block;
  text-decoration: none;
  border-bottom: 1px dashed #000;
  color: #000;
  line-height: 1;
  padding-top: 5px;
  padding-bottom: 5px;

  &:hover {
    border-bottom-style: solid;
  }

  &:hover + [class^='GenreList'] {
    display: flex;
  }
`;

export default Title;
