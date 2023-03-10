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
  min-width: 150px;
  max-width: 289px;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 16px;
  font-size: 12px;
`;

export const MarkerIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MarkerTest = styled.div`
  position: absolute;
  font-size: 13px;
  font-weight: 600;
  margin-top: 10px;
`;

export const MapBox = styled.div<{
  display1200: string;
  display768: string;
  minHeight?: string;
}>`
  width: 100%;
  min-width: 300px;

  height: 100%;
  display: ${(props) => props.display1200};
  @media screen and (max-width: 768px) {
    display: ${(props) => props.display768};
    min-height: ${(props) => props.minHeight};
    height: 100vh;
  }
`;

export const MapContainer = styled.div<{
  display1200: string;
  display768: string;
  minHeight?: string;
}>`
  width: 40%;
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 93vh;
  }
  display: ${(props) => props.display1200};
  @media screen and (max-width: 768px) {
    display: ${(props) => props.display768};
    min-height: ${(props) => props.minHeight};
  }
`;
