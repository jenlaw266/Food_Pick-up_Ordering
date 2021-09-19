/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const adminRouter = (db) => {

  // GET admin dashboard
  router.get('/', (req, res) => {
     db.query('select orders.id, orders.name, orders.phone, sum(line_items.subtotal) as subTotal from orders join line_items on line_items.order_id = orders.id group by orders.id;')
    .then((response)=>{
      res.json(response.rows);
    })
    .catch((err)=> console.log(err));
  });

  // GET operation order details
  router.get('/:id', (req, res) => {
    db.query(`SELECT line_items.id, dishes.item, line_items.qty, line_items.subtotal FROM orders JOIN line_items ON line_items.order_id = orders.id JOIN dishes ON dishes.id = line_items.dish_id where orders.id = $1;`,[req.params.id])
    .then((response)=>{
      // res.json(response.rows);
      res.render("admin_order_details");
      res.redirect("/admin");
    })
    .catch((err)=> console.log(err));
  });

  // POST Edit operation And send SMS
  router.post('/', (req, res) => {
    //query the max time from line_items
    //include the text input from
    res.send("Admin Add ETA and implement TWILIO")
    res.render("admin_order_details",)
  });

  // return the router
  return router;
};

module.exports = adminRouter;

