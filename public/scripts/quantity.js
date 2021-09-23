// $(() => {
//   let quantity = $(".qty").text();

//   $(".item").each(function () {
//     $(this).on("mouseenter", () => {
//       if ($(".active").length > 0) {
//         console.log("qty .active not sure")
//         $(".qty").text(1);
//         quantity = 1;
//       }
//     });
//   });

//   $(".plus").on("click", () => {
//     console.log("plusactive ++")
//     $(".qty").text(++quantity);
//   });

//   $(".minus").on("click", () => {
//     console.log("plusactive --")
//     if ($(".qty").text() > 0) {
//       $(".qty").text(--quantity);
//     } else {
//       $(".qty").text(0);
//       quantity = 0;
//     }
//   });
// });
