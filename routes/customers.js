/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const twilio = require("../lib/twilio");
const router = express.Router();
const customer = require("../db/customer_query");

const customersRouter = (db) => {
  // GET Home
  router.get("/", (req, res) => {
    res.render("index.ejs");
  });

  //GET food info
  router.get("/api/product-info/:id", (req, res) => {
    customer.getDish(req.params.id).then((result) => {
      res.send(result);
    });
  });

  //POST order operation ????????
  router.post("/api/order-info", (req, res) => {
    console.log(req.body, "body");
    customer.addOrder("name", "1234567890", "data").then((diner) => {
      console.log(diner);
      twilio.smsToOwner(diner); //outside the .then?
      res.status(201).send();
      //return order.id;
    });
  });

  //POST edit qty operation
  router.post("/:id/edit", (req, res) => {
    res.send("Change qty on cart");
  });

  //POST delete dish operation
  router.post("/:id/delete", (req, res) => {
    res.send("Delete item on shopping cart");
  });

  // GET /blogposts/:blogpost_id
  // router.get('/:blogpost_id', (req, res) => {
  //   db.query('SELECT * FROM posts WHERE id = $1;', [req.params.blogpost_id])
  //     .then((response) => {
  //       res.json(response.rows[0]);
  //     });
  // });

  // return the router
  return router;
};

module.exports = customersRouter;
