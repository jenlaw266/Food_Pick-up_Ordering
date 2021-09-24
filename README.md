# Food Pick-up Ordering App

A full-stack food-ordering pick-up application with notification features as a fulfillment of Lighthouse Lab's midterm project.

## Final Product
#### Home Page 
<img src="https://github.com/jenlaw266/Food_Pick-up_Ordering/tree/master/public/images/app1.png" width="1100">

#### Shopping Cart
![Alt text](https://github.com/jenlaw266/Food_Pick-up_Ordering/tree/master/public/images/app2.png | width=1100)

#### Order Submitted by Customer
![Alt text](https://github.com/jenlaw266/Food_Pick-up_Ordering/tree/master/public/images/app3.png | width=1100)

#### Admin Dashboard
![Alt text](https://github.com/jenlaw266/Food_Pick-up_Ordering/tree/master/public/images/app4.png?raw=true)

#### Confirmation By Admin
![Alt text](https://github.com/jenlaw266/Food_Pick-up_Ordering/tree/master/public/images/app5.png?raw=true)

#### Pop-up Display of Pick-up Time to Customer
![Alt text](https://github.com/jenlaw266/Food_Pick-up_Ordering/tree/master/public/images/app6.png?raw=true)

#### Twilio Notification to Admin
![Alt text](https://github.com/jenlaw266/Food_Pick-up_Ordering/tree/master/public/images/twilio1.png?raw=true)

#### Twilio Notification to Customer
![Alt text](https://github.com/jenlaw266/Food_Pick-up_Ordering/tree/master/public/images/twilio2.png?raw=true)

#### Customer Order - GIF
<img src="https://media.giphy.com/media/tfaAALhsMOtVyfvr18/giphy.gif" width="1100">

#### Admin Order Acceptance - GIF
<img src="https://media.giphy.com/media/0RcZcQlQs4womqXVDs/giphy.gif" width="1100">

#### Notification Pop-up for Customer - GIF
<img src="https://media.giphy.com/media/Sxd1rkNOmhNUfvfzYT/giphy.gif" width="1100">

## Getting Started

1. Clone this repository.
2. Use the `.env.example` to create and update the .env file with your correct local information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Body-parser 1.19.0 or above
- Bulma 0.9.3 or above
- Chalk 2.4.2 or above
- Cookie-session 1.4.0 or above
- Dotenv 2.0.0 or above
- Ejs 2.6.2 or above
- Express 4.17.1 or above
- Morgan 1.9.1 or above
- Node-sass-middleware 0.11.0 or above
- Pg-native 3.0.0 or above
- Twilio 3.67.2 or above

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.
