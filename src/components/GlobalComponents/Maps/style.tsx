import styled from 'styled-components';

export const Section = styled.div`
  width: 40%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 20%;
  }
`;

export const OverlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  padding: 7px;
  font-size: 12px;
  color: #ffffff;
  font-weight: 500;
  gap: 3px;
`;

export const MarkerIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  width: 70px;
  height: 35px;
  border-radius: 5px;
`;

export const MapBox = styled.div<any>`
  width: 100%;
  min-width: 300px;
  min-height: ${(props) => props.minHeight};
  height: 100%;
  display: ${(props) => props.display1200};
  @media screen and (max-width: 768px) {
    display: ${(props) => props.display768};
  }
`;

export const MapContainer = styled.div`
  width: 40%;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;
