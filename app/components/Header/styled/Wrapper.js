import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;

  padding: 5px 20px;

  outline: 1px solid black;
  background-color: #fff;

  justify-content: space-between;
  align-items: center;
  z-index: 5;
`;

export default Wrapper;
