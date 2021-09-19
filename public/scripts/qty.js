$(document).ready(function () {
  let counter = $(".qty").val();
  $(".plus").on("click", () => {
    $(".qty").text(counter++);
  });
  $(".minus").on("click", () => {
    if ($(".qty").text() > 0) {
      $(".qty").text(counter--);
    } else {
      $(".qty").text(0);
      counter = 0;
    }
  });
});
