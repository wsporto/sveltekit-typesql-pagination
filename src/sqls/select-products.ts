import type { Connection } from 'mysql2/promise';

export type SelectProductsParams = {
    limit: number;
    offset: number;
}

export type SelectProductsResult = {
    productCode: string;
    productName: string;
    productDescription: string;
}

export async function selectProducts(connection: Connection, params: SelectProductsParams): Promise<SelectProductsResult[]> {
    const sql = `
    SELECT
        productCode,
        productName,
        productDescription
    FROM products
    ORDER BY productCode
    LIMIT ?, ?
    `

    return connection.query(sql, [params.limit, params.offset])
        .then(res => res[0] as SelectProductsResult[]);
}