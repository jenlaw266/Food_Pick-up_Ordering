//testing purposes only
//to be deleted

const query = require("../../db/customer_query");

query.getDish("1").then((result) => {
  console.log(result.item);
  console.log(result.description);
  console.log(result.price);
});
