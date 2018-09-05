import styled from 'styled-components';

const Wrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
  justify-content: space-between;

  background-image: url(${props => {
    if (props.backgroundUrl) {
      return `https://image.tmdb.org/t/p/w500${props.backgroundUrl}`;
    }
    return null;
  }});
  background-repeat: no-repeat;
  background-size: cover;

  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0, 0, 0);
    opacity: 0.8;
  }
`;

export default Wrapper;
