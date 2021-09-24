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
    db.query(
      "SELECT orders.id, orders.name, orders.phone, sum(line_items.subtotal) as subTotal, orders.status, orders.order_datetime FROM orders JOIN line_items ON line_items.order_id = orders.id GROUP BY orders.id ORDER BY orders.id DESC;"
      )
      .then((response) => {

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
    db.query(
        `SELECT line_items.id, dishes.item, dishes.price, line_items.qty, line_items.subtotal FROM orders JOIN line_items ON line_items.order_id = orders.id JOIN dishes ON dishes.id = line_items.dish_id where orders.id = $1;`,
        [req.params.id]
      )
      .then((response) => {
        const orderId = req.params.id;
        const anOrder = response.rows;
        templateVars = {
          anOrder,
          orderId,
        };
      })
      .then(() => {
        return db.query(
          "SELECT MAX(estimated_time) FROM dishes JOIN line_items ON line_items.dish_id = dishes.id WHERE order_id = $1;",
          [req.params.id]
        );
      })
      .then((response) => {
        templateVars["maxTime"] = response.rows[0].max;
        res.render("admin_order_details", templateVars);
      })
      .catch((err) => console.log(err));
  });

  //  POST Edit operation And send SMS
  router.post("/:id", (req, res) => {
    const totalTime = Number(req.body.maxTime) + Number(req.body.addTime);
    req.session.order_id = req.params.id;
    db.query(
      `UPDATE orders SET status = 'PROCESSED', order_datetime = CURRENT_TIMESTAMP +  ($1 * interval '1 minute') WHERE id = $2;`,
      [totalTime, req.params.id]
    )
    .then(() => {
      return db.query(
        `select orders.id, orders.name, orders.phone, sum(line_items.subtotal) as subTotal, orders.status, orders.order_datetime FROM orders JOIN line_items ON line_items.order_id = orders.id
        WHERE orders.id=$1
        GROUP BY orders.id;`,[req.params.id]);
    })
    .then((response) =>{
      const ordersDb = response.rows;
      const orderTime = ordersDb[0]["order_datetime"].toLocaleTimeString('en-CA', {timeZone: 'America/Edmonton'});
      const customerName = ordersDb[0]["name"];
      const orderId = ordersDb[0]['id'];
      smsToCustomer(orderId, customerName, orderTime);
      })
    .then(() => {
      res.redirect("/admin");
    })
    .catch((err) => console.log(err));
  });
  // return the router
  return router;
};

module.exports = adminRouter;
