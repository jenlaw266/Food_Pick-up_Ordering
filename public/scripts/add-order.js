$(() => {
  const lines = {};
  const getItemInfo = () => {
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
    //console.log(lines);
    //console.log($(".fa-minus-circle"), "circle");
  };

  //add to cart
  $(".add-to-cart").on("click", () => getItemInfo());

  //shopping cart button, delete function there.
  $(".view-cart").on("click", () => {
    $(".modal.cart").addClass("is-active");
    viewCart(lines);
    //delete item from add-to-cart
    $(".fa-minus-circle").on("click", () => {
        delete lines;
        viewCart(lines);
      });
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

    //display order to customer
    $(".modal.customer").addClass("is-active");
    $(".order-confirm").empty();
    $(".total").empty();
    displayOrder(lines);
  };
  $form.on("submit", (event) => postAndDisplayForm(event));
});

const showAddItem = (lines) => {
  for (const key in lines) {
    const $order = `<li>${lines[key].item}, quantity: ${lines[key].qty}, amount: $${lines[key].subtotal}<li>`;
    $(".item-list").html($order);
  }
};

const viewCart = (lines) => {
  $(".cart-items").empty();
  for (const key in lines) {
    const $order = `<li>${lines[key].item}, quantity: ${lines[key].qty}, amount: $${lines[key].subtotal}`;
    $(".cart-items").append($order);
  }
  $(".cart-items").append(`<i class="fas fa-minus-circle"></i><li>`);
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
