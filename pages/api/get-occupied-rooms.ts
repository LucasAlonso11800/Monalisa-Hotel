// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import type { OccupiedRoomType } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rooms: OccupiedRoomType[] = await callSP({
            procedure: STORED_PROCEDURES.GET_OCCUPIED_ROOMS,
            values: [new Date().toISOString().substring(0, 10)]
        });
        res.json(rooms);
    }
    catch (error) {
        throw (error)
    }
};