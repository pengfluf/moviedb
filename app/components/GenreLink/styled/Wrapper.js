import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
  text-decoration: none;
  padding: ${({ context }) =>
    context === 'Navigation' ? '15px' : 0};
  white-space: nowrap;
  color: ${({ context }) =>
    context === 'MoviePreview' ? '#fff' : '#000'};

  &:not(:first-child) {
    margin-left: ${({ context }) =>
      context !== 'Navigation' ? '10px' : 0};
  }
  border-radius: 3px;

  &:hover {
    text-decoration: ${({ context }) =>
    context !== 'Navigation' && 'underline'};
    background-color: ${({ context }) =>
    context === 'Navigation' && 'rgba(126, 87, 194, 1)'};
    color: ${({ context }) => context === 'Navigation' && '#fff'};
  }
`;

export default Wrapper;
