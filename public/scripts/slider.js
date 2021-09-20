$(() => {
  const $left = $(".fas.fa-caret-left");
  const $right = $(".fas.fa-caret-right");

  let currentImg = 1;
  const picWidth = 640;
  const menuLength = picWidth * $(".item").length;

  $right.on("click", () => {
    console.log("current img", currentImg);
    if (currentImg === 4) {
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

  console.log("img id:", this.id);
  $(this).addClass("active");

  //display information about the current slide/dish
  $("p").addClass("active");
  //need to import??
  getDish(this.id).then((dish) => {
    $(".food-name").append(dish.item);
    $(".food-desc").append(dish.description);
    $(".food-price").append(dish.price);
  });
};
