import styled from 'styled-components';

const Genres = styled.div`
  position: relative;

  &:hover > [class^='GenreList'] {
    display: flex;
    position: absolute;
  }
`;

export default Genres;
