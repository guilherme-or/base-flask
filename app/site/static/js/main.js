$(() => {
    $('#loader').hide();

    jQuery.ajaxSetup({
        beforeSend: function() {
           $('#loader').show();
        },
        complete: function(){
           $('#loader').hide();
        },
        success: function() {
            $('#loader').hide();
        }
    });
});