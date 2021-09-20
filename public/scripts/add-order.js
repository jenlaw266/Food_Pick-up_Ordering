$(() => {
  const lines = [];

  $(".add-to-cart").on("click", () => {
    $(".item").each(function () {
      if ($(this).hasClass("active")) {
        $.ajax({
          url: `/product-info/${this.id}`,
          method: "GET",
          success: (dish) => {
            //add item to display
            addItem(dish);

            //add line to array
            const $qty = $(".qty").text();
            if ($qty !== 0) {
              const subtotal = dish.price * $qty;
              lines.push({
                dish_id: dish.id,
                qty: $qty,
                subtotal: subtotal,
              });
            }
            console.log(lines);
          },
          error: (err) => {
            console.log("error: ", err);
          },
        });
      }
    });
  });

  $(".order").on("click", () => {
    if (lines.length) {
      /*      $.ajax({
        url: "/",
        method: "GET",
        dataType: "json",
        success: (form) => {
          console.log(form);
        },
        error: (err) => {
          console.log("error: ", err);
        },
      });*/
    }
  });
});
//add item to the display shopping list
const addItem = (dish) => {
  const $qty = $(".qty").text();
  if ($qty !== "0") {
    const $oneOrder = `<li>${dish.item}, amount: ${$qty}<li>`;
    $(".chart").append($oneOrder);
  }
};
