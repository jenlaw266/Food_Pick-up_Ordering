//select description from food? where foodimg = src/url //or where food_name = $(activeimage.id)
//select name from food
// de we need a query for notifying the customer?

require("dotenv").config();

const { Client } = require("pg");
const dbParams = require("../lib/db");

const db = new Client(dbParams);

db.connect(() => console.log("connected to db"));

const getDish = function (imgID) {
  return db
    .query(`SELECT * FROM dishes WHERE id = $1`, [imgID])
    .then((result) => result.rows[0])
    .catch((err) => console.log("getDish function error"));
};

//customer add one order
const addOrder = function (name, phone, all_items) {
  console.log("addOrder name, phone", name, phone);
  return db
    .query(
      `INSERT INTO orders (name, phone, all_items) VALUES($1, $2, $3) RETURNING name, phone`,
      [name, phone]
    )
    .then((res) => res.rows[0])
    .catch((err) => console.log("addOrder function error"));
};
//get order_id from the return above //dish_id = better to have html id as dish id and not the name?

const addLine = function (orderID, lines) {
  for (const line of lines) {
    db.query(
      `INSERT INTO line_item (order_id, dish_id, qty, subtotal) VALUES ($1, $2, $3, $4) RETURNING *`,
      [orderID, line.dish_id, line.qty, line.subtotal]
    )
      .then((res) => res.rows[0])
      .catch((err) => console.log("addLine function error"));
  }
};

//when press add-to-cart
//getDish - price - generate subtotal for each line
//push line:{dish_id: dish_id, qty: qty, subtotal: subtotal} to lines
//when press order
//insert into orders - name, phone - return order_id
//for lines.length generate queryString2 - insert values;
//notify owner SMS

//recieve owner's estimated time

module.exports = { getDish, addOrder };
