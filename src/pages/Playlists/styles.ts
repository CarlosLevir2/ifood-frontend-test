import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  margin: 0 5%;
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div,
  > span {
    width: 17rem;
    height: 3.2rem;
  }

  > * {
    margin: 2rem 1rem;

    input {
      width: 100%;
    }
  }
`;

export const PlaylistContainer = styled.div`
  margin-top: 3rem;
  h2 {
    text-align: center;
    font-weight: bold;
  }
`;

export const PlaylistList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Playlist = styled.li`
  margin: 0 1rem 1rem 1rem;
`;
