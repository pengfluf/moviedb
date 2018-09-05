import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
  text-decoration: none;
  padding: ${props => (props.context === 'Navigation' ? '10px' : 0)};
  white-space: nowrap;
  color: ${props =>
    props.context === 'MoviePreview' ? '#fff' : '#000'};

  &:not(:first-child) {
    margin-left: ${props =>
    props.context !== 'Navigation' ? '10px' : 0};
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default Wrapper;
