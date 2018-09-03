import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  margin-top: 20px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1700px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default Wrapper;
