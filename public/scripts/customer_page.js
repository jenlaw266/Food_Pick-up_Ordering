$(document).ready(function () {
  const $left = $(".fas.fa-chevron-left");
  const $right = $(".fas.fa-chevron-right");

  let currentImg = 1;

  $right.on("click", () => {
    const $picWidth = $(".item").outerWidth(true);
    const menuLength = $picWidth * $(".item").length;
    console.log("RIGHT CLICK current img", currentImg, "picWidth", $picWidth);
    console.log("MENULENGTH", menuLength);
    if (currentImg === $(".item").length) {
      $(".carousel").animate({
        left: `0px`,
      });
      currentImg = 1;
    }
    $(".carousel").animate({
      left: `-=${$picWidth}`,
    });
    currentImg++;
  });

  $left.on("click", () => {
    const $picWidth = $(".item").outerWidth(true);
    const menuLength = $picWidth * $(".item").length;
    console.log("LEFT CLICK current img", currentImg, "picWidth", $picWidth);
    if (currentImg === 1) {
      $(".carousel").animate({
        left: `-=${menuLength}`,
      });
      currentImg = $(".item").length + 1;
    }
    $(".carousel").animate({
      left: `+=${$picWidth}`,
    });
    currentImg--;
  });

  const lines = {};

  const turnActive = function () {
    //TEST
    const itemId = $(this).attr("id");
    console.log("ITEM", itemId);

    $(`.bottom-page.${itemId}`).html(`
  <div class="description">
    <p class="food-name"></p>
    <p class="food-desc"></p>
    <p class="food-price"></p>
  </div>

  <div class="items-to-cart">
    <div class="qty-buttons">
      <button class="minus">-</button>
      <label class="qty">1</label>
      <button class="plus">+</button>
    </div>
    <div class="add-to-cart-button">
      <button class="add-to-cart"> add to cart</button>
    </div>
  </div>

  <ul class="display-item"></ul>`);

    //GOOD CODE

    if ($(".active").length > 0) {
      $(".active").removeClass("active");
      $(this).siblings(`.bottom-page.${itemId}`).removeClass("active");
      $(this)
        .siblings(`.bottom-page.${itemId}`)
        .find("*")
        .removeClass("active");
    }

    $(this).addClass("active");
    $(this).siblings(`.bottom-page.${itemId}`).addClass("active");
    $(this).siblings(`.bottom-page.${itemId}`).find("*").addClass("active");

    $.ajax({
      url: `/api/product-info/${this.id}`,
      method: "GET",
      success: (dish) => {
        appendInfo(dish);
      },
      error: (err) => {
        console.log("error: ", err);
      },
    });

    const appendInfo = (dish) => {
      $(".food-name").empty();
      $(".food-desc").empty();
      $(".food-price").empty();
      $(".food-name").append(`<strong>${dish.item}</strong>`);
      $(".food-desc").append(dish.description);
      $(".food-price").append(`$${dish.price}`);
    };

    //TEST
    let quantity = Number($(".qty.active").text());

    $(".plus").on("click", () => {
      $(".qty.active").text(++quantity);
    });

    $(".minus").on("click", () => {
      if ($(".qty.active").text() > 0) {
        $(".qty.active").text(--quantity);
      } else {
        $(".qty.active").text(0);
        quantity = 0;
      }
    });

    const getItemInfo = () => {
      console.log("lines", lines);
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
      const $qty = Number($(".qty.active").text());
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

          //add item to lines
          Object.assign(lines, obj);
        }
        //add item short display
        showAddItem(lines[itemId]);
      }
    };

    //add to cart
    $(".add-to-cart.active").on("click", () => getItemInfo());
  };

  //turn image to active when mouseenter
  $(".item").each(function () {
    $(this).on("mouseenter", turnActive);
  });

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
      $(".order-confirm").empty();
      $(".total").empty();
      $(".order-confirm").append("Your order is submitted");
      for (const key in lines) delete lines[key];
    };
    $form.on("submit", (event) => postAndDisplayForm(event));
  });

  $(".order").on('click', function() {
    $('.modal.customer.is-active').removeClass('is-active');
  });

  $(".modal-background").on('click', function() {
    $('.modal.customer').removeClass('is-active');
  });

});

const showAddItem = (line) => {
  const $order = `<li>${line.item}, quantity: ${line.qty}, amount: $${line.subtotal}<li>`;
  $(".display-item").html($order);
};

const viewCart = (lines) => {
  $(".item-list").empty();
  $(".total").empty();
  let total = 0;
  for (const key in lines) {
    const $order = `<li> - ${lines[key].item} quantity: ${lines[key].qty} amount: $${lines[key].subtotal}`;
    $(".item-list").append($order);
    total += lines[key].subtotal;
  }
  $(".item-list").append(`<i class="fas fa-minus-circle"></i><li>`);
  $(".total").append("$", total);
};
