import styled from 'styled-components';

const GenreList = styled.div`
  position: absolute;
  top: calc(100%);

  display: none;
  flex-direction: row;

  max-width: 570px;
  padding: 10px;

  border: 1px solid black;
  border-radius: 3px;
  background-color: #fff;

  flex-wrap: wrap;

  &:hover {
    display: flex;
  }

  &::before {
    position: absolute;
    top: -20px;
    left: 0;

    display: block;

    width: 100%;
    height: 20px;

    content: '';

    opacity: 0;
    background-color: black;
  }
`;

export default GenreList;
