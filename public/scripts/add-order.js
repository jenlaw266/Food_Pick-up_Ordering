$(() => {
  const lines = {};

  //add check if item is already on the list function
  //add delete add-to-cart function

  $(".add-to-cart").on("click", () => {
    $(".item").each(function () {
      if ($(this).hasClass("active")) {
        $.ajax({
          url: `/api/product-info/${this.id}`,
          method: "GET",
          success: (dish) => {
            const $qty = $(".qty").text();
            if ($qty !== 0) {
              //
              if (Object.keys(lines).length > 0) {
                //check if item is aleady there
              }

              const subtotal = dish.price * $qty;
              const count = Object.keys(lines).length;
              const obj = {};
              obj[count] = {
                item: dish.item,
                dish_id: dish.id,
                qty: $qty,
                subtotal: subtotal,
              };
              //add item to display
              addItem(obj);
              //add item to lines
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

    const data = dataform + "&" + datalines;
    console.log(data);

    $.post("/api/order-info", data).then((res) => {
      console.log(res);
    });

    $(".modal.customer").addClass("is-active");
    displayOrder(lines);
  });
});

const addItem = (food) => {
  const $qty = $(".qty").text();
  const key = Object.keys(food)[0];
  if ($qty !== "0") {
    const $oneOrder = `<li>${food[key].item}, quantity: ${food[key].qty}, amount: $${food[key].subtotal} <button>delete</button><li>`;
    $(".item-list").append($oneOrder);
  }
};

const displayOrder = (lines) => {
  let total = 0;
  for (const line in lines) {
    $(".order-confirm").append(
      `<li>${lines[line].item}, quantity: ${lines[line].qty}<li>`
    );
    total += lines[line].subtotal;
  }
  $(".total").append("$", total);
};
