$(document).ready(function () {
  const $left = $(".fas.fa-chevron-left");
  const $right = $(".fas.fa-chevron-right");

  let currentImg = 1;
  const picWidth = 420;
  const menuLength = picWidth * $(".item").length;

  $right.on("click", () => {
    console.log("current img", currentImg);
    if (currentImg === 6) {
      $(".carousel").animate({
        left: `+=${menuLength}`,
      });
      currentImg = 0;
    }
    $(".carousel").animate({
      left: `-=${picWidth}`,
    });
    currentImg++;
  });

  $left.on("click", () => {
    console.log("left click");
    console.log("current img", currentImg);
    if (currentImg === 1) {
      $(".carousel").animate({
        left: `-=${menuLength}`,
      });
      currentImg = $(".item").length + 1;
    }
    $(".carousel").animate({
      left: `+=${picWidth}`,
    });
    currentImg--;
  });

  //turn image to active when mouseenter
  $(".item").each(function () {
    $(this).on("mouseenter", turnActive);
  });
});
const turnActive = function () {
  if ($(".active").length > 0) {
    $(".active").removeClass("active");
    $("p").removeClass("active");
  }

  $(this).addClass("active");
  //display information about the current slide/dish
  $("p").addClass("active");

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
};
