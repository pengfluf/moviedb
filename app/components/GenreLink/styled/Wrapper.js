import styled from 'styled-components';
import { Link } from 'react-router-dom';
/* eslint-disable prettier/prettier */
const Wrapper = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  border-radius: 3px;

  padding: ${({ context }) =>
    context === 'Navigation' ? '15px' : 0};
  color: ${({ context }) =>
    context === 'MoviePreview' ? '#fff' : '#000'};

  &:not(:first-child) {
    margin-left: ${({ context }) =>
    context !== 'Navigation' ? '10px' : 0};
  }

  &:hover {
    text-decoration: ${({ context }) =>
    context !== 'Navigation' && 'underline'};
    background-color: ${({ context }) =>
    context === 'Navigation' && 'rgba(126, 87, 194, 1)'};
    color: ${({ context }) => context === 'Navigation' && '#fff'};
  }
`;

export default Wrapper;
