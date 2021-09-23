$(() => {
  let quantity = $(".qty.active").text();

  $(".item.active").each(function () {
    $(this).on("mouseenter", () => {
      if ($(".active").length > 0) {
        console.log("qty .active not sure")
        $(".qty.active").text(1);
        quantity = 1;
      }
    });
  });

  $(".plus.active").on("click", () => {
    console.log("plusactive ++")
    $(".qty.active").text(++quantity);
  });

  $(".minus.active").on("click", () => {
    console.log("plusactive --")
    if ($(".qty.active").text() > 0) {
      $(".qty.active").text(--quantity);
    } else {
      $(".qty.active").text(0);
      quantity = 0;
    }
  });
});
