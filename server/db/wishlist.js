const { response } = require('express');
const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishlistItems = async(userId)=> {
    const SQL = `
        SELECT *
        FROM wishlist
        WHERE user_id = $1;
    `;
    const response = await client.query(SQL, [ userId ]);
    return response.rows;
};

const createWishlistItem = async(wishlistItem)=> {
    const SQL = `
        INSERT INTO wishlist (user_id, product_id, id) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [ wishlistItem.user_id, wishlistItem.product_id, uuidv4()]);
    return response.rows[0];
};

const deleteWishlistItem = async(wishlistItem) => {
    const SQL = `
        DELETE FROM wishlist
        WHERE id = $1
    `;
    response = await client.query(SQL, [wishlistItem.id]);
    console.log("delete", response);
};

//to SQL TO UPDATE NEWCART WITH WISHLIST ITEM
const updateNewCart = async(product)=> {
    const SQL = `
    UPDATE orders SET is_cart = $1 WHERE id = $2 RETURNING *
    `;
    const response = await client.query(SQL, [order.is_cart, order.id]);
    return response.rows[0];
  };

module.exports = {
    createWishlistItem,
    fetchWishlistItems,
    deleteWishlistItem,
    updateNewCart
    
};