$(() => {
  let quantity = $(".qty").text();

  $(".item").each(function () {
    $(this).on("mouseenter", () => {
      if ($(".active").length > 0) {
        $(".qty").text(1);
        quantity = 1;
      }
    });
  });

  $(".plus").on("click", () => {
    $(".qty").text(++quantity);
  });

  $(".minus").on("click", () => {
    if ($(".qty").text() > 0) {
      $(".qty").text(--quantity);
    } else {
      $(".qty").text(0);
      quantity = 0;
    }
  });
});
