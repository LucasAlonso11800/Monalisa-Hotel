// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import { PriceType } from '../../types';

type SelectedType = {
    price: PriceType
    rooms: number
}
type ValuesType = {
    country: string
    dateFrom: string
    dateTo: string
    email: string
    first_name: string
    last_name: string
    notes: string
    passengers: number
    phone: string
    zip: string
    total: number
    selected: SelectedType[]
};

type CheckAvailabiltyResponseType = {
    code: number
    roomId?: number
};

type AddReserveResponseType = {
    reserveId: number
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { values } = req.body as { values: ValuesType };

        const roomIds: any[] = [];
        // Check that there are rooms available returning room ids
        await Promise.all(values.selected.map(async (value) => {
            const response: CheckAvailabiltyResponseType[] = await callSP({
                procedure: STORED_PROCEDURES.CHECK_AVAILABILITY,
                values: [values.dateFrom, value.price.roomId, value.rooms]
            });
            if (response[0].code === 1 && response[0].roomId) return roomIds.push(...response.map(res => res.roomId));
            throw new Error("Rooms not available");
        }));

        // Ins reserve returning reserve_id
        const addReserveResponse: AddReserveResponseType[] = await callSP({
            procedure: STORED_PROCEDURES.ADD_RESERVE,
            values: [values.total, values.dateFrom, values.dateTo, values.passengers, values.first_name, values.last_name, values.email, values.country, values.phone, values.zip, values.notes]
        });
        // Ins room reserves with a loop
        await Promise.all(roomIds.map(async (roomId) => {
            await callSP({
                procedure: STORED_PROCEDURES.ADD_ROOM_RESERVE,
                values: [roomId, addReserveResponse[0].reserveId]
            });
        }));
        res.json({ roomIds, addReserveResponse });
    }
    catch (error) {
        throw (error)
    }
};