//select description from food? where foodimg = src/url //or where food_name = $(activeimage.id)
//select name from food
// de we need a query for notifying the customer?

const pg = require("pg");

const conString = process.env.POSTGRES_URL;
const client = new pg.Client(conString);

client.connect();
console.log(client);
const getDescription = function (imgID) {
  return client
    .query(`SELECT description FROM dishes WHERE item = 'Carne Asada Fries'`)
    .then((result) => result.rows[0])
    .catch((err) => console.log("getDescription function error:", err));
};

//console.log(getDescription());
