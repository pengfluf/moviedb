import styled from 'styled-components';

const GoBack = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  & > svg {
    max-height: 40px;
    max-width: 40px;
  }
`;

export default GoBack;
