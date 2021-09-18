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
    res.send("Admin dashboard with the list of users that ordered");
  });

  // GET operation order details
  router.get('/:id', (req, res) => {
    res.send("Admin see the order of specific user");
  });

  // POST Edit operation And send SMS
  router.post('/:id', (req, res) => {
    res.send("Admin Add ETA and implement TWILIO")
  });

  // return the router
  return router;
};

module.exports = adminRouter;

