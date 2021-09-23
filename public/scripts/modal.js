$(document).ready(function load(){
  //MODAL FOR ORDER STATUS
  let check = setInterval(function (){
    $.ajax({
        type: "GET",
        url: "/api/order-status/",
        success: function(result){
          if(result['status'] === 'PROCESSED'){
            const localDate = new Date(result['order_datetime']);
            $('.modal-body p').html(`Your order #${result['id']} has been confirmed. Please pick up at ${localDate.toLocaleTimeString('en-CA', {timeZone: 'America/Edmonton'})}`);
            $("#modalStatus").modal("show");
            $(".status").html(`<h4>Your order #${result['id']} has been confirmed. Please pick up at ${localDate.toLocaleTimeString('en-CA', {timeZone: 'America/Edmonton'})} </h4>`);
            clearInterval(check);
            return;
          }
          else {
          //  load();
          }
        }
    });
}, 5000);


// MODAL FOR SHOPPING CART
$(() => {
  const $submit = $(".shopping-cart-button");
  const $modalBg = $(".modal-background");

  $submit.on("click", () => {
    $(".modal").addClass("is-active");
  });

  $modalBg.on("click", () => {
    $(".modal").removeClass("is-active");
  });
});

});
