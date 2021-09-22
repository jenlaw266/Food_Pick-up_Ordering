$(() => {
  const $submit = $(".owner-submit");
  const $modalBg = $(".modal-background");

  $submit.on("click", () => {
    $(".modal").addClass("is-active");
  });

  $modalBg.on("click", () => {
    $(".modal").removeClass("is-active");
  });
});
