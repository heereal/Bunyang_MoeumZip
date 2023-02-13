import axios from 'axios';

const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
const METHOD = 'getAPTLttotPblancDetail';
const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

export const getDetailPostInfo = async (num: any) => {
  return await axios.get(
    `${BASE_URL}/${METHOD}?page=1&perPage=100&cond%5BPBLANC_NO%3A%3AEQ%5D=${num}&serviceKey=${SERVICE_KEY}`,
  );
};

export const getDetailPostInfo2 = async (num: any) => {
  return await axios
    .get(
      `${BASE_URL}/getAPTLttotPblancMdl?page=1&perPage=10&cond%5BPBLANC_NO%3A%3AEQ%5D=${num}&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data);
};
