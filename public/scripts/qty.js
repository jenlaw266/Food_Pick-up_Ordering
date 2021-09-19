$(document).ready(function () {
  $(".add").on("click", add);
  $(".minus").on("click", minus);
});

const add = function () {
  let counter = 0;
  let numOfItems = counter++;

  $("qty").text(numOfItems);
};

const minus = function () {};
