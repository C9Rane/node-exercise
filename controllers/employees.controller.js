import query from "./db/utils";

export const findAll = async () => {
    return await query("SELECT * FROM products");
};

export const findOne = async (productId) => {
    return await query("SELECT * FROM products WHERE ProductID = ?", [productId]);
};

export const addOne = async (product) => {
    return await query("INSERT INTO products SET ?", [product]);
};

export const updateOne = async (productId, product) => {
    return await query("UPDATE products SET ? WHERE ProductID = ?", [product, productId]);
};

export const removeOne = async (productId) => {
    return await query("DELETE FROM products WHERE ProductID = ?", [productId]);
};