$(document).ready(function load(){
  //MODAL FOR ORDER STATUS
  let check = setInterval(function (){
    $.ajax({
        type: "GET",
        url: "/api/order-status/",
        success: function(result){
          if(result['status'] === 'PROCESSED'){
            const localDate = new Date(result['order_datetime']);
            $('#modalStatus .modal-body p').html(`Hello ${result['name']},<br> Your order #${result['id']} is confirmed. Please pick up at ${localDate.toLocaleTimeString('en-CA', {timeZone: 'America/Edmonton'})}`);
            $("#modalStatus").modal("show");
            $(".status").html(`<h4>Hello ${result['name']},<br>Your order #${result['id']} is confirmed. Please pick up at ${localDate.toLocaleTimeString('en-CA', {timeZone: 'America/Edmonton'})} </h4>`);
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
