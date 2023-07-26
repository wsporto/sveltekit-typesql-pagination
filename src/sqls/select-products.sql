SELECT
    productCode,
    productName,
    productDescription
FROM products
LIMIT :limit, :offset