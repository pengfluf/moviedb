import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: none;

  margin-left: 10px;
  cursor: pointer;
  outline: none;

  & > svg {
    max-width: 25px;
    max-height: 25px;
  }
`;

export default Button;
