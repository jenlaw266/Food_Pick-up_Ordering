$(() => {
  const lines = {};

  $(".add-to-cart").on("click", () => {
    $(".item").each(function () {
      if ($(this).hasClass("active")) {
        $.ajax({
          url: `/api/product-info/${this.id}`,
          method: "GET",
          success: (dish) => {
            //add item to display
            addItem(dish);

            //add line to array
            const $qty = $(".qty").text();
            if ($qty !== 0) {
              const subtotal = dish.price * $qty;
              const count = lines.length;
              const obj = {};
              obj[count] = {
                dish_id: dish.id,
                qty: $qty,
                subtotal: subtotal,
              };
              Object.assign(lines, obj);
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

  $form = $(".customerForm");
  $form.on("submit", (event) => {
    event.preventDefault();

    const dataform = $form.serialize();
    const datalines = jQuery.param(lines);

    const data = dataform + " lines " + datalines;
    console.log(data);
    console.log(
      jQuery.param({
        0: { id: 1, name: ["Some name", "j"], color: "#444444" },
        1: { x: 4 },
      })
    );

    $.post("/api/order-info", data).then((res) => {
      console.log(res);
      //display data on page for customer
    });
    /* $.ajax({
      url: "/api/order-info",
      method: "POST",
      dataType: "json",
      data: {

        all_items: lines,
      },
      success: () => {},
      error: (err) => {
        console.log("error: ", err);
      },
    }); */
  });
});
//add item to the display shopping list
const addItem = (dish) => {
  const $qty = $(".qty").text();
  if ($qty !== "0") {
    const subtotal = dish.price * $qty;
    const $oneOrder = `<li>${dish.id}, ${$qty}, ${subtotal}<li>`;
    $(".chart").append($oneOrder);
  }
};
