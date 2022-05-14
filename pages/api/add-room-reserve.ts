// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import { PriceType } from '../../types';
import moment from 'moment';
import { TODAY } from '../../const/const';

type SelectedType = {
    price: PriceType
    rooms: number
};

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
        if (moment(values.dateFrom).diff(moment(TODAY)) < 0 || moment(values.dateTo).diff(moment(values.dateFrom)) < 0) {
            return res.json({ code: 0, message: 'Invalid date' })
        };
        // Validate dates

        // Check amount of passengers
        const maximumPassengers: number = values.selected.reduce((acc, room) => acc + room.price.roomPassengers * room.rooms, 0);
        if (values.passengers > maximumPassengers) return res.json({ code: 0, message: `${values.passengers} passengers don't fit on the selected rooms. Maximum is ${maximumPassengers}` });

        // Check that there are rooms available returning room ids
        await Promise.all(values.selected.map(async (value) => {
            const response: CheckAvailabiltyResponseType[] = await callSP({
                procedure: STORED_PROCEDURES.CHECK_AVAILABILITY,
                values: [values.dateFrom, value.price.roomId, value.rooms]
            });
            if (response[0].code === 1 && response[0].roomId) return roomIds.push(...response.map(res => res.roomId));
            res.json({
                code: 0,
                message: `${value.rooms} ${value.price.roomName}${value.rooms > 1 ? 's are' : 'is'} not available on this date`
            });
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

        res.json({ code: 1, message: addReserveResponse[0].reserveId });
    }
    catch (error) {
        throw (error)
    }
};