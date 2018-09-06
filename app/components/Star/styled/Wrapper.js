import styled from 'styled-components';

const Wrapper = styled.svg`
  cursor: pointer;
  max-width: ${props =>
    props.context === 'MoviePreview' ? '20px' : '30px'};
  max-height: ${props =>
    props.context === 'MoviePreview' ? '20px' : '30px'};
  margin-left: 10px;

  z-index: 2;
  fill: ${({ context }) =>
    context === 'MoviePreview' ? '#fff' : '#000'};
`;

export default Wrapper;
