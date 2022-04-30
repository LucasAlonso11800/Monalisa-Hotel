// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import type { TestimonialType } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const testimonials: TestimonialType[] = await callSP({ procedure: STORED_PROCEDURES.GET_TESTIMONIALS, values: [] });
        res.json(testimonials);
    }
    catch (error) {
        throw error;
    }
};