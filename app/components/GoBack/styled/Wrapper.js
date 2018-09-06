import styled from 'styled-components';

const Wrapper = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  & > svg {
    max-height: 40px;
    max-width: 40px;
  }
`;

export default Wrapper;
