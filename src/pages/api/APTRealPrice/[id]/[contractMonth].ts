import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, contractMonth } = req.query;
  const SERVICE_KEY = process.env.NEXT_PUBLIC_APT_API_KEY;

  try {
    const response = await axios.get(
      'https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade',
      {
        params: {
          serviceKey: SERVICE_KEY,
          numOfRows: 200,
          LAWD_CD: id,
          DEAL_YMD: contractMonth,
        },
      },
    );
    const items = response.data.response.body.items.item || [];
    res.status(200).json({ id, contractMonth, items });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message, id, contractMonth });
    } else {
      res
        .status(500)
        .json({ error: 'An unexpected error occurred', id, contractMonth });
    }
  }
}
