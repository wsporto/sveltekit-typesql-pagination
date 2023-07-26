SELECT
    productCode,
    productName,
    productDescription
FROM products
ORDER BY productCode
LIMIT :limit, :offset