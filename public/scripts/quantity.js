$(() => {
  let quantity = $(".qty").text();

  $(".item").each(function () {
    $(this).on("mouseenter", () => {
      if ($(".active").length > 0) {
        $(".qty").text(0);
        quantity = 0;
      }
    });
  });

  $(".plus").on("click", () => {
    $(".qty").text(++quantity);
    console.log($(".qty").text()); //????
  });

  $(".minus").on("click", () => {
    console.log($(".qty").val(4), "value");

    if ($(".qty").text() > 0) {
      $(".qty").text(--quantity);
    } else {
      $(".qty").text(0);
      quantity = 0;
    }
  });
});
