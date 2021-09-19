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
     db.query('select orders.id, orders.name, orders.phone, sum(line_items.subtotal) as subTotal from orders join line_items on line_items.order_id = orders.id group by orders.id;')
    .then((response)=>{
      console.log(response.rows)
      const extraTime = req.body.extraTime;
      const templateVars = { extraTimeMins: extraTime };
      res.render("admin", templateVars);

    })
    .catch((err)=> console.log(err));
  });

  // GET operation order details
  router.get('/:id', (req, res) => {
    db.query(`SELECT line_items.id, dishes.item, line_items.qty, line_items.subtotal FROM orders JOIN line_items ON line_items.order_id = orders.id JOIN dishes ON dishes.id = line_items.dish_id where orders.id = $1;`,[req.params.id])
    .then((response)=>{
      console.log(response.rows);
      res.render("admin_order_details");
    })
    .catch((err)=> console.log(err));
  });

  // POST Edit operation And send SMS
  router.post('/', (req, res) => {
    const extraTime = req.body.extraTime;
    const templateVars = { extraTimeMins: extraTime };
    res.render("admin", templateVars);
    const eta = addMinutes(new Date(), extraTime);
    const etaString = eta.toLocaleString();
    console.log("FOOD ETA:", etaString);
    // smsToCustomer(etaString); //
    //need to put this new time on the database of orders under the column order_datetime
  });

  // return the router
  return router;
};

module.exports = adminRouter;

