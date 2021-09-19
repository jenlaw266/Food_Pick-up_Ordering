$(document).ready(function () {
  $(".add-to-chart").on("click", postItems);
});

//add item to the display shopping list
const addItem = () => {
  const $qty = $(".qty").text();
  const $activeItem = $(".item.active");
  const $oneOrder = `<li>${$activeItem.id}, amount: ${$qty}<li>`;
  $(".chart").append($oneOrder);
};

const loadItems = () => {
  $.ajax({
    url: "/:order_id", //?????
    method: "GET",
    success: () => {
      addItem();
    },
    error: (err) => {
      console.log("error: ", err);
    },
  });
};

//post items on shopping list
const postItems = function (event) {
  event.preventDefault();

  const serializedData = $(this).serialize();

  $.post("/order_id", serializedData, () => {
    loadItems();
    $(".qty").val("0");
  });
};
