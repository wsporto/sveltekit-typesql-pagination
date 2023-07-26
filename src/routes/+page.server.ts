import { conn } from "../lib/connection";
import { selectProducts, selectProductsTotalCount } from "../sqls";

const PAGE_SIZE = 5;

export async function load({ url }) {
    const page = +(url.searchParams.get('page') || 1);

    const products = await selectProducts(conn, {
        limit: (page - 1) * PAGE_SIZE,
        offset: PAGE_SIZE
    });
    const total = await selectProductsTotalCount(conn).then(res => res!.total);

    return {
        products,
        total,
        page,
        pageSize: PAGE_SIZE
    };
}