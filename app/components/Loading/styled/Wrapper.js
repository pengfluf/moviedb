import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: ${({ mode }) =>
    mode === 'additionalAbsolute' ? 'absolute' : 'static'};
  top: 60px;
  z-index: 5;
  left: 45%;

  height: ${props =>
    props.mode === 'standalone'
      ? 'calc(100vh - 60px - 20px * 2)'
      : 'auto'};
  padding-top: ${props =>
    props.mode === 'standalone' ? '20vh' : '30px'};

  & > svg {
    max-width: 80px;
    max-height: 80px;
  }
`;

export default Wrapper;
