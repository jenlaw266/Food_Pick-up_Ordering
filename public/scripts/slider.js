$(() => {
  const $left = $(".fas.fa-caret-left");
  const $right = $(".fas.fa-caret-right");

  let currentImg = 1;
  const picWidth = 640;
  const menuLength = picWidth * $(".item").length;

  $right.on("click", () => {
    console.log("current img", currentImg);
    if (currentImg === 4) {
      $(".main-carousel").animate({
        left: `+=${menuLength}`,
      });
      currentImg = 0;
    }
    $(".main-carousel").animate({
      left: `-=${picWidth}`,
    });
    currentImg++;
  });

  $left.on("click", () => {
    console.log("left click");
    console.log("current img", currentImg);
    if (currentImg === 1) {
      $(".main-carousel").animate({
        left: `-=${menuLength}`,
      });
      currentImg = $(".item").length + 1;
    }
    $(".main-carousel").animate({
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
    $(".qty").text(0);
    console.log("remove");
  }
  console.log("enter", this.id);
  $(this).addClass("active");
  $("p").addClass("active"); //show description
};

/*

  const desc = getDish(this.id);
  $("p").append(desc);
  $("p").addClass("active");
  $(".qty").addClass("active");

  $('.main-carousel').flickity({
  imagesLoaded: true,
  cellAlign: 'left',
  contain: true
  });


 */
