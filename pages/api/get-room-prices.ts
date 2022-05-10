// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PriceType } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const prices: PriceType[] = await callSP({
            procedure: STORED_PROCEDURES.GET_ROOM_PRICES,
            values: []
        });
        res.json(prices);
    }
    catch (error) {
        throw (error)
    }
};