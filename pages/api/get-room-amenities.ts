// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AmenitiType } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { roomCategoryId } = req.body;
    try {
        const amenitites: AmenitiType[] = await callSP({
            procedure: STORED_PROCEDURES.GET_ROOM_AMENITIES,
            values: [roomCategoryId]
        });
        res.json(amenitites);
    }
    catch (error) {
        throw (error)
    }
};