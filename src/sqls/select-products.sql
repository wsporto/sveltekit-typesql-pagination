SELECT
    productCode,
    productName,
    productDescription
FROM products
LIMIT :offset, :limit