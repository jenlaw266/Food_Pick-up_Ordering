//testing purposes only
//to be deleted

const customer = require("../../db/customer_query");

customer.getDish("1").then((result) => {
  console.log(result.item);
  console.log(result.description);
  console.log(result.price);
});

/*
//load items to display
const loadItems = () => {
  $.ajax({
    url: "/:order_id", //?????
    method: "GET",
    success: () => {
      addItem();
    },
    error: (err) => {
      console.log("error: ", err);
    },
  });
};

//post items on shopping list
const postItems = function (event) {
  event.preventDefault();

  const serializedData = $(this).serialize();

  $.post("/order_id", serializedData, () => {
    loadItems();
    $(".qty").val("0");
  });
}; */
