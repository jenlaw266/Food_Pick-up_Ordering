/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const customersRouter = (db) => {

  // GET Home
  router.get('/', (req, res) => {
    res.send("Menu items with desc and price")
  });

  //POST add dish operation
  router.post('/', (req, res) => {
    res.send("Add item on shopping cart")
  });

  //POST edit qty operation
  router.post('/:id/edit', (req, res) => {
    res.send("Change qty on cart")
  });

  //POST delete dish operation
  router.post('/:id/delete', (req, res) => {
    res.send("Delete item on shopping cart")
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

