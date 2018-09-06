import styled from 'styled-components';

const Poster = styled.div`
  height: 100%;
  background-image: url('${props =>
    `https://image.tmdb.org/t/p/original${props.url}`}');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
  height: 100%;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

export default Poster;
