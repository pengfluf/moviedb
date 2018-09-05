import styled from 'styled-components';

const Wrapper = styled.svg`
  cursor: pointer;
  max-width: 20px;
  max-height: 20px;
  margin-left: 10px;

  z-index: 2;
  fill: ${({ context }) =>
    context === 'MoviePreview' ? '#fff' : '#000'};
`;

export default Wrapper;
