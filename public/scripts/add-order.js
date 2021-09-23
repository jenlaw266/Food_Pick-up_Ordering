$(() => {
  const lines = {};
  const getItemInfo = () => {
    console.log("get item info function")
    $(".item").each(function () {
      if ($(this).hasClass("active")) {
        $.ajax({
          url: `/api/product-info/${this.id}`,
          method: "GET",
          success: (dish) => storeInfo(dish),
          error: (err) => {
            console.log("getItemInfo error: ", err);
          },
        });
      }
    });
  };

  const storeInfo = (dish) => {
    const $qty = Number($(".qty").text());
    console.log("qty:", $qty)
    if ($qty !== 0) {
      //add check if item is already on the list
      if (lines[dish.id]) {
        lines[dish.id].qty += $qty;
        lines[dish.id].subtotal += dish.price * $qty;
      } else {
        const subtotal = dish.price * $qty;
        const key = dish.id;
        const obj = {};
        obj[key] = {
          item: dish.item,
          dish_id: dish.id,
          qty: $qty,
          subtotal: subtotal,
        };
        console.log("lines", lines);

        //add item to lines
        Object.assign(lines, obj);
      }
      //add item short display
      showAddItem(lines);
    }
  };

  //add to cart
  $(".add-to-cart").on("click", () => getItemInfo());

  //shopping cart button
  $(".shopping-cart-button").on("click", () => {
    $(".modal.customer").addClass("is-active");
    $(".order-confirm").empty();
    viewCart(lines);
    //delete order from add-to-cart
    $(".fa-minus-circle").on("click", () => {
      $(".item-list").empty();
      $(".display-item").empty();
      $(".total").empty();
      $(".order-confirm").append(`Your order is deleted`);
      for (const key in lines) delete lines[key];
    });
    //form submission
    $form = $(".customerForm");
    const postAndDisplayForm = (event) => {
      event.preventDefault();

      const formData = $form.serialize();
      const linesData = jQuery.param(lines);

      const data = formData + "&" + linesData;

      //post to order-info
      $.post("/api/order-info", data).then((res) => {
        console.log(res);
      });

      $(".item-list").empty();
      $(".display-item").empty();
      $(".total").empty();
      $(".order-confirm").append("Your order is submitted");
      for (const key in lines) delete lines[key];
    };
    $form.on("submit", (event) => postAndDisplayForm(event));
  });
});

const showAddItem = (lines) => {
  for (const key in lines) {
    const $order = `<li>${lines[key].item}, quantity: ${lines[key].qty}, amount: $${lines[key].subtotal}<li>`;
    $(".display-item").html($order);
  }
};
//cart-items <---- item-list
const viewCart = (lines) => {
  $(".item-list").empty();
  $(".total").empty();
  let total = 0;
  for (const key in lines) {
    const $order = `<li>${lines[key].item}, quantity: ${lines[key].qty}, amount: $${lines[key].subtotal}`;
    $(".item-list").append($order);
    total += lines[key].subtotal;
  }
  $(".item-list").append(`<i class="fas fa-minus-circle"></i><li>`);
  $(".total").append("$", total);
};
