$(document).ready(function () {
  const $left = $(".fas.fa-chevron-left");
  const $right = $(".fas.fa-chevron-right");

  let currentImg = 1;
  // const picWidth = 420;
  // const menuLength = $picWidth * $(".item").length;

  $right.on("click", () => {
    const $picWidth = $(".item").outerWidth(true);
    const menuLength = $picWidth * $(".item").length;
    console.log("RIGHT CLICK current img", currentImg, "picWidth", $picWidth);
    console.log("MENULENGTH", menuLength)
    if (currentImg === $(".item").length) {
      $(".carousel").animate({
        // left: `+=${menuLength}`,
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

  //turn image to active when mouseenter
  $(".item").each(function () {
    $(this).on("mouseenter", turnActive)
  });
});



const turnActive = function () {

  //TEST
  const itemId = $(this).attr('id');
  console.log("MOUSEOVER ITEM", itemId)

  $(".bottom-page").html(`
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
  </div>`);


  //GOOD CODE

  // $(".bottom-page").removeClass("active") //test might need to remove
  if ($(".active").length > 0) {
    $(".active").removeClass("active");
    // $("p").removeClass("active");
    $(this).parent(".img-container").removeClass("active");
    $(this).siblings(".bottom-page").removeClass("active");
    $(this).siblings(".bottom-page").find("*").removeClass("active");
  }

  $(this).addClass("active");
  //display information about the current slide/dish
  // $("p").addClass("active");
  $(this).parent(".img-container").addClass("active");
  $(this).siblings(".bottom-page").addClass("active");
  $(this).siblings(".bottom-page").find("*").addClass("active");
  // $(".bottom-page").addClass("active") //test might need to remove

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
  console.log($(".qty").text())
  let quantity = Number($(".qty").text(1));
  console.log("QTY 1", typeof quantity, quantity)

  // $(".item").each(function () {
  //   $(this).on("mouseenter", () => {
  //     if ($(".active").length > 0) {
  //       console.log("qty .active not sure", quantity)
  //       quantity = 1;
  //       $(".qty").text(quantity);
  //       console.log("QUANTITY", quantity)
  //     }
  //   });
  // });

  $(".plus").on("click", () => {
    // $(".qty").empty();
    console.log("plusactive ++", typeof quantity, quantity)
    $(".qty").text(++quantity);
  });

  $(".minus").on("click", () => {
    // $(".qty").empty()
    console.log("plusactive --", typeof quantity, quantity)
    if ($(".qty").text() > 0) {
      $(".qty").text(--quantity);
    } else {
      $(".qty").text(0);
      quantity = 0;
    }
  });
};
