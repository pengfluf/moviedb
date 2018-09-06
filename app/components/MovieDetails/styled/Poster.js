import styled from 'styled-components';

const Poster = styled.div`
  font-size: 30px;

  display: flex;

  height: 100%;

  border-radius: 5px;
  background-color: antiquewhite;
  /* stylelint-disable */
  background-image: url("${props =>
    `https://image.tmdb.org/t/p/original${props.url}`}");
  /* stylelint-enable */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;

  justify-content: center;
  align-items: center;
`;

export default Poster;
