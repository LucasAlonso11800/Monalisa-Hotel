// Utils
import { callSP } from '../../dbConfig';
// Const
import { STORED_PROCEDURES } from '../../const/StoredProcedures';
// Types
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PageImageType } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { page } = req.body;
        console.log(page)
        const image: PageImageType[] = await callSP({ procedure: STORED_PROCEDURES.GET_PAGE_IMAGE, values: [page] });
        console.log(image)
        res.json(image[0]);
    }
    catch (error) {
        throw error;
    }
};