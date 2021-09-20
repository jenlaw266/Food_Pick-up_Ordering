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

//customer add to cart
const addItem = function (imgID, qty = 1) {
  let queryString = `INSERT INTO orders (name, phone) VALUES($1, $2) RETURNING *`;
  const queryArray = [customer.name, customer.phone];

  //get order_id from the return above //dish_id = better to have html id as dish id and not the name?
  let queryString2 = `INSERT INTO line_item (order_id, dish_id, qty, subtotal) VALUES ($1, $2, $3, $4) RETURNING *`;
  const queryArray2 = [order_id, dish_id, qty, subtotal];

  const lines = [];
};

//when press add-to-cart
//getDish - price - generate subtotal for each line
//push line:{dish_id: dish_id, qty: qty, subtotal: subtotal} to lines
//when press order
//insert into orders - name, phone - return order_id
//for lines.length generate queryString2 - insert values;
//notify owner

/* add to cart

$(() => {

$("add-to-cart").on ("click", () => {

  const lines = [];
  //getDish
  getDish(this.id).then((dish) => {
    lines.push({dish_id: dish.id, qty: $(".qty").text()})
  });

})
});


*/

//recieve owner's estimated time

module.exports = { getDish };
