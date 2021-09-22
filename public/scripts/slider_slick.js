$(document).ready(function () {
  $('.container').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  //turn image to active when mouseenter
  $(".item").each(function () {
    $(this).on("mouseenter", turnActive);
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
});

