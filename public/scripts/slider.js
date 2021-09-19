$(document).ready(function () {
  $(".main-carousel").flickity({
    imagesLoaded: true,
    cellAlign: "left",
    contain: true,
  });

  for (let i = 0; i < $(".item").length; i++) {
    $(".item")[i].on("mouseenter", () => {
      if ($(".active").length > 0) {
        $(".active")[0].removeClass("active");
        $("p").removeClass("active");
      }
      this.addClass("active");

      // const desc = getMenuItem(i);

      // $("p").append(desc);
      $("p").addClass("active");

      $(".qty").addClass("active");
    });
  }

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
});
