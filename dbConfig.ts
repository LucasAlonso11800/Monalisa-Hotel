import mysql from 'serverless-mysql';
// Types
import { CallSPParams } from './SPParams';
import { SPResponse } from './types';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST as string,
        port: parseInt(process.env.MYSQL_PORT as string),
        database: process.env.MYSQL_DATABASE as string,
        user: process.env.MYSQL_USER as string,
        password: process.env.MYSQL_PASSWORD as string
    }
});

export async function callSP<Type>(params: CallSPParams): Promise<Type[]> {
    const { procedure, values } = params;

    const formatedValues = values.map((value) => {
        if (typeof value === 'string' && value !== "") return `"${value}"`;
        if (value === "") return null;
        return value;
    });

    const query: string = `CALL ${process.env.MYSQL_DATABASE}.${procedure}(${formatedValues.map(String).join(',')})`;

    try {
        const results = await db.query(query, values) as SPResponse<Type>;
        await db.end();
        return results[0];
    }
    catch (err: any) {
        throw new Error(err)
    }
};