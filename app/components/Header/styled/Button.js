import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ logged }) =>
    logged ? '#fff' : 'rgba(126, 87, 194, 1)'};
  color: ${({ logged }) => (logged ? '#000' : '#fff')};
  border-radius: 3px;
  border: 3px solid rgba(126, 87, 194, 1);
  font-size: 18px;
  cursor: pointer;
  outline: none;
  padding: 6px 15px;
`;

export default Button;
