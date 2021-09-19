$(document).ready(function () {
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
  console.log("enter", this.src);
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
/* const $left = $(".fas.fa-caret-left");
  const $right = $(".fas.fa-caret-right");

  let counter = 1;
  const picWidth = 640;

  $right.click(() => {
    $(".item").animate({
      left: picWidth, //*counter
    });
    counter++;
  });

  $left.click(() => {
    $(".item").animate({
      right: picWidth,
    });
    counter--;
  });
*/
