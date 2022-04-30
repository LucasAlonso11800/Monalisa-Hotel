// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import { RoomType } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { roomCategoryId } = req.body;
    try {
        const rooms: RoomType[] = await callSP({ procedure: STORED_PROCEDURES.GET_ROOM_CATEGORY, values: [roomCategoryId] });
        res.json(rooms);
    }
    catch (error) {
        res.status(500).send(error)
    }
};