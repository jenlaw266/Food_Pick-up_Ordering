## ROUTES - BREAD

Upon logging in, should owner/customers be seeing different things?

CUSTOMERS
B GET   / --> menu items with desc and price
E POST  /:id/edit  --> change qty on cart
A POST  /:id  --> add item on shopping cart
D POST  /:id/delete --> delete item on shopping cart

OWNERS
B GET   / --> dashboard with the list of users that ordered
R GET   /:id  --> see the order of that specific user
A POST ------> HOW TO DO THIS WITH TWILIO?
