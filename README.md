### Add the mysql2 driver and @types/node dependency:

```bash
pnpm i mysql2
pnpm i -d @types/node
```

### Add typesql as dev dependency:
```bash
pnpm i -d typesql-cli
```

### Start the mysql classicmodels database as a docker service:
```bash
docker run -d --name classicmodels -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password wsporto/classicmodels-mysql:8.0
```
The image contains the [sample database](https://www.mysqltutorial.org/mysql-sample-database.aspx) from the mysqltutorial.

### Use the typesql init to create the typesql.json configuration file:
```bash
pnpm exec typesql init
```

### Update the databaseUri and sqlDir in the typesql.json file:
```json
{
    "databaseUri": "mysql://root:password@localhost/classicmodels",
    "sqlDir": "./src/sqls",
    "target": "node"
}
```
### Create the queries in the files below with raw SQL:
`src\sqls\select-products.sql`:
```sql
SELECT
    productCode,
    productName,
    productDescription
FROM products
LIMIT :offset, :limit
```

`src\sqls\select-products-total-count.sql`:
```sql
SELECT count(*) as total
FROM products
```

### Run the command below and TypeSQL will generate a type-safe API to execute the queries.
```bash
pnpm exec typesql compile --watch
```

Create the `+page.server.ts` file:
```ts
import { conn } from "../lib/connection";
import { selectProducts, selectProductsTotalCount } from "../sqls";

const PAGE_SIZE = 5;

export async function load({ url }) {
    const page = +(url.searchParams.get('page') || 1);

    const products = await selectProducts(conn, {
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
    });
    const total = await selectProductsTotalCount(conn).then(res => res!.total);

    return {
        products,
        total,
        page,
        pageSize: PAGE_SIZE
    };
}
```
### Now you can use the type-safe result in the `+page.svelte" page:
![Alt text](image-1.png)

### Congrats! You have a table with server-side pagination:
![Alt text](image.png)