import type { Connection } from 'mysql2/promise';

export type SelectProductsTotalCountResult = {
    total: number;
}

export async function selectProductsTotalCount(connection: Connection): Promise<SelectProductsTotalCountResult | null> {
    const sql = `
    SELECT count(*) as total
    FROM products
    LIMIT 1
    `

    return connection.query(sql)
        .then(res => res[0] as SelectProductsTotalCountResult[])
        .then(res => res[0]);
}