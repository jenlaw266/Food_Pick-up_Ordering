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

//add customer info to the orders table
const addOrder = function (name, phone, all_items) {
  return db
    .query(
      `INSERT INTO orders (name, phone, all_items) VALUES($1, $2, $3) RETURNING *`,
      [name, phone, all_items]
    )
    .then((res) => res.rows[0])
    .catch((err) => console.log("addOrder function error"));
};

//add every line from an order to the line_items table
const addLine = function (order) {
  const allItems = JSON.parse(order.all_items);

  for (const line in allItems) {
    db.query(
      `INSERT INTO line_items (order_id, dish_id, qty, subtotal) VALUES ($1, $2, $3, $4)`,
      [
        order.id,
        allItems[line].dish_id,
        allItems[line].qty,
        allItems[line].subtotal,
      ]
    )
      .then((res) => res.rows[0])
      .catch((err) => console.log("addLine function error"));
  }
};

const getOrderStatus = function (orderID) {
  return db
    .query("SELECT id,status,order_datetime FROM orders WHERE id = $1;", [
      orderID,
    ])
    .then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

module.exports = { getDish, addOrder, addLine, getOrderStatus };
