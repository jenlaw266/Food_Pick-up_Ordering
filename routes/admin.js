/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const {smsToOwner, smsToCustomer} = require("../lib/twilio")

const addMinutes = function (dt, minutes) {
  const dateTime = new Date();
  return new Date(dt.getTime() + Number(minutes) * 60000);
}



const adminRouter = (db) => {

  // GET admin dashboard
  router.get('/', (req, res) => {
    console.log("<---------- GET ADMIN PAGE ----------->");
     db.query('select orders.id, orders.name, orders.phone, sum(line_items.subtotal) as subTotal, orders.status, orders.order_datetime from orders join line_items on line_items.order_id = orders.id group by orders.id;')
    .then((response)=>{
      console.log(response.rows)
      const ordersDb = response.rows
      const extraTime = req.body.extraTime;
      const templateVars = {
        extraTimeMins: extraTime,
        ordersDb
      };
      res.render("admin_dashboard", templateVars);

    })
    .catch((err)=> console.log(err));
  });

  // GET operation order details
  router.get('/:id', (req, res) => {
    console.log("<---------- GET INDIVIDUAL ORDER PAGE ----------->");
    db.query(`SELECT line_items.id, dishes.item, dishes.price, line_items.qty, line_items.subtotal FROM orders JOIN line_items ON line_items.order_id = orders.id JOIN dishes ON dishes.id = line_items.dish_id where orders.id = $1;`,[req.params.id])
    .then((response)=>{
       //res.json(response.rows);
      const orderId = req.params.id;
      const anOrder = response.rows;
      const templateVars = {
        anOrder,
        orderId
       };
      console.log("anORDER:",anOrder);
      res.render("admin_order_details", templateVars);
    })
    .catch((err)=> console.log(err));
  });

  // POST Edit operation And send SMS
  // router.post('/', (req, res) => {
  //   const eta = addMinutes(new Date(), extraTime);
  //   const etaString = eta.toLocaleString();
  //   console.log("FOOD ETA:", etaString);
  //   smsToCustomer(etaString); //
    // //need to put this new time on the database of orders under the column order_datetime


  //   const extraTime = Number(req.body.extraTime);
  //   console.log("EXTRA TIME", extraTime);
  //   console.log("res", res.body)
  //   db.query(`UPDATE orders SET status = 'PROCESSED', order_datetime = CURRENT_TIMESTAMP WHERE id = $1;`,[req.params.id])
  //     .then((response)=>{
  //       console.log(response.rows)
  //       const ordersDb = response.rows
  //       const templateVars = {
  //         extraTimeMins: extraTime,
  //         ordersDb
  //       };
  //       res.render("admin_dashboard", templateVars);
  //     })
  //     .catch((err)=> console.log(err));
  //   })

  //POST Edit operation And send SMS
  router.post("/:id", (req, res) => {
    console.log("<---------- POST INDIVIDUAL ORDER PAGE ----------->");
    const orderId = req.params.orderId;
    // const order_datetime = req.body.order_datetime;
    // const extraTime = Number(req.body.extraTime)
    console.log("ORDER ID", orderId);
    db.query(`UPDATE orders SET status = 'PROCESSED', order_datetime = CURRENT_TIMESTAMP WHERE id = $1;`,[orderId])
      .then((response) => {
        console.log("RESPONSE.ROWS", response)
        db.query(`SELECT * FROM orders`)
        .then((response) => {
        // const ordersDb = response.rows
        console.log("SECOND RESPONSE", response)
        res.redirect("/admin");
        })
      })
      .catch((err)=> console.log(err));
  })


  // return the router
  return router;

};

module.exports = adminRouter;

