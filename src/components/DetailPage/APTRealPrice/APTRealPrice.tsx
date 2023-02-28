import axios from 'axios';
import * as S from './style';

const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

const APTRealPrice = () => {
  const getAPTRealPriceList = async () => {
    await axios
      .get(
        `/api/APTRealPrice?numOfRows=1000&LAWD_CD=47820&DEAL_YMD=201512&serviceKey=${SERVICE_KEY}`,
      )
      .then((res) => console.log(res.data.response.body));
  };

  return (
    <S.Wrapper>
      <button onClick={getAPTRealPriceList}>✨클릭하세요✨</button>
      APTRealPrice
    </S.Wrapper>
  );
};

export default APTRealPrice;
