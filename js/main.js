var tog = true;

$(document).ready(function() {
    $(".boton-menu").on('click', function() {
        if(tog) {
            $(".menu-desp").animate({width: '0'}, 1000, function() {
                $(this).hide(); //.effect('slide', { direction: 'left', mode: 'hide' }, 500);
            });
            $(".contenido").animate({width: '100%'}, 1000);
            tog = false;
        }
        else {
            $(".menu-desp").show();
            $(".menu-desp").animate({width: '33.333%'}, 1000);
            $(".contenido").css("float", "right");
            $(".contenido").animate({width: '66%'}, 1000);
            tog = true;
        }
    });
});