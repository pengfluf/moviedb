import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;

  padding: 5px 20px;
  max-height: 60px;

  outline: 1px solid rgba(0, 0, 0, 0.4);
  background-color: #fff;

  justify-content: space-between;
  align-items: center;
  z-index: 5;
`;

export default Wrapper;
