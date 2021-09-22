$(document).ready(function load(){
  let check = setInterval(function (){
    $.ajax({
        type: "GET",
        url: "/api/order-status/121",
        success: function(result){
          if(result['status'] === 'PROCESSED'){
            const localDate = new Date(result['order_datetime']);
            $('.modal-body p').html(`Your order #${result['id']} has been confirmed. Please Pick up at ${localDate.toLocaleTimeString('en-CA', {timeZone: 'America/Edmonton'})}`);
            $("#myModal").modal("show");
            $(".status").html(`<h4>Your order #${result['id']} has been confirmed. Please Pick up at ${localDate.toLocaleTimeString('en-CA', {timeZone: 'America/Edmonton'})} </h4>`);
            clearInterval(check);
            return;
          }
          else {
          //  load();
          }
        }
    });
}, 5000);
});
