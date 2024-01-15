const { response } = require('express');
const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const createWishlistItem = async(wishlistItem)=> {
    const SQL = `
        INSERT INTO wishlist (user_id, product_id, id) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [ wishlistItem.user_id, wishlistItem.product_id, uuidv4()]);
    return response.rows[0];
};

// const fetchWishlistItems = async(userId)=> {
//     const SQL = `
//         SELECT wishlist.*
//         FROM 
//         wishlist
//         JOIN users
//         ON users.id = wishlist.user_id
//         WHERE users.id = $1
//         ORDER BY user_id
//     `;
//     const response = await client.query(SQL, [ userId ]);
//     return response.rows;
// };

const fetchWishlistItems = async(userId)=> {
    const SQL = `
        SELECT *
        FROM wishlist
        WHERE user_id = $1;
    `;
    const response = await client.query(SQL, [ userId ]);
    return response.rows;
};

const deleteWishlistItem = async(wishlistItem) => {
    const SQL = `
        DELETE FROM wishlist
        WHERE id = $1
    `;
    response = await client.query(SQL, [wishlistItem.id]);
    console.log("delete", response);
};

module.exports = {
    createWishlistItem,
    fetchWishlistItems,
    deleteWishlistItem
};