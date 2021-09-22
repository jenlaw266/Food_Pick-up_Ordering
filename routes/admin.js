/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { smsToOwner, smsToCustomer } = require("../lib/twilio");

let templateVars;

const adminRouter = (db) => {
  // GET admin dashboard
  router.get("/", (req, res) => {
    //  console.log("<---------- GET ADMIN PAGE ----------->");
    db.query(
      "select orders.id, orders.name, orders.phone, sum(line_items.subtotal) as subTotal, orders.status, orders.order_datetime from orders join line_items on line_items.order_id = orders.id group by orders.id;"
    )
      .then((response) => {
        console.log(response.rows);
        const ordersDb = response.rows;
        const totalTime = req.body.totalTime;
        const templateVars = {
          totalTimeMins: totalTime,
          ordersDb,
        };
        res.render("admin_dashboard", templateVars);
      })
      .catch((err) => console.log(err));
  });

  // GET operation order details
  router.get("/:id", (req, res) => {
    //  console.log("<---------- GET INDIVIDUAL ORDER PAGE ----------->");
    db.query(
      `SELECT line_items.id, dishes.item, dishes.price, line_items.qty, line_items.subtotal FROM orders JOIN line_items ON line_items.order_id = orders.id JOIN dishes ON dishes.id = line_items.dish_id where orders.id = $1;`,
      [req.params.id]
    )
      .then((response) => {
        //res.json(response.rows);
        const orderId = req.params.id;
        const anOrder = response.rows;
        templateVars = {
          anOrder,
          orderId,
        };
        //return db.query("select max(estimated_time) from dishes join line_items on line_items.dish_id = dishes.id where order_id = 1;")
        //console.log("anORDER:",anOrder);
        //console.log("1 ", templateVars);
        //res.render("admin_order_details", templateVars);
      })
      .then(() => {
        return db.query(
          "select max(estimated_time) from dishes join line_items on line_items.dish_id = dishes.id where order_id = $1;",
          [req.params.id]
        );
      })
      .then((response) => {
        templateVars["maxTime"] = response.rows[0].max;
        //  console.log("2 ", templateVars);
        res.render("admin_order_details", templateVars);
      })
      .catch((err) => console.log(err));
  });

  //  POST Edit operation And send SMS
  router.post("/:id", (req, res) => {
    const totalTime = Number(req.body.maxTime) + Number(req.body.addTime);
    console.log("add time ", Number(req.body.addTime));
    console.log("EXTRA TIME", totalTime);
    //console.log("id", req.params.id);
    db.query(
      `UPDATE orders SET status = 'PROCESSED', order_datetime = CURRENT_TIMESTAMP +  ($1 * interval '1 minute') WHERE id = $2;`,
      [totalTime, req.params.id]
    )
      .then(() => {
        return db.query(
          `select orders.id, orders.name, orders.phone, sum(line_items.subtotal) as subTotal, orders.status, orders.order_datetime from orders join line_items on line_items.order_id = orders.id
       WHERE orders.id=$1
       group by orders.id;`,[req.params.id]);
    })
    .then((response) =>{
      const ordersDb = response.rows;
      //  smsToCustomer(ordersDb[0]["order_datetime"]);
      //   console.log(response.rows)
        console.log("datetime ", ordersDb[0]["order_datetime"]);
      })
      .then(() => {
        return db.query(`select orders.id, orders.name, orders.phone, sum(line_items.subtotal) as subTotal, orders.status, orders.order_datetime from orders join line_items on line_items.order_id = orders.id
       group by orders.id;`);
      })
      .then((response) => {
        const ordersDb = response.rows;
        const templateVars = {
          ordersDb,
        };
        res.render("admin_dashboard", templateVars);
      })
      .catch((err) => console.log(err));
  });

  // return the router
  return router;
};

module.exports = adminRouter;
