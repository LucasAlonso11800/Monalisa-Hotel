// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ReserveType } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { reserveId } = req.body;
    try {
        const reserve: ReserveType[] = await callSP({
            procedure: STORED_PROCEDURES.GET_RESERVE,
            values: [reserveId]
        });
        res.json(reserve[0]);
    }
    catch (error) {
        throw (error)
    }
};