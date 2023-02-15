import Map from './Map';
import * as S from './style';

const MapSection = () => {
  return (
    <S.Section>
      <Map
        onLoad={() => {
          console.log('load');
        }}
      />
    </S.Section>
  );
};

export default MapSection;
