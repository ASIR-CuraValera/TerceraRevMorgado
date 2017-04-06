var tog = false;

$(document).ready(function() {
    //Cargas dinamicas, con asignacion de propiedades
    
    cargar("header", "web/partials/header.html", function() {
        cargar(".menu", "web/partials/menu/menu.html", function() {
            $(".menu nav").addClass("menu-escritorio");
        });
        //$(".menu-desp").css("border", "1px solid");
        cargar(".menu-desp", "web/partials/menu/menu.html", function() {
            $(".menu-desp nav").addClass("menu-peque");
        });
        if(!tog)
        {
            $(".menu-desp").css("display", "none");
            $(".contenido").css("width", "100%")
        }
        $(".boton-menu").on('click', menu_toggle);
        $(".menu-peque .active").on("click", menu_toggle); 
    });
    cargar("main", "web/partials/main.html", function() {
        //Cargamos el contenido principal, en este caso, el video
        cargar(".contenido", "web/html/index.html", null);
    });
    cargar("footer", "web/partials/footer.html", null);
    
    //Asignación de propiedades, pero esta vez, usando el método de los elementos futuros
    
    
});

function cargar(el, ruta, fn) {
    $.ajax({
        url: ruta,
        success: function(data) {
            $(el).html(data);
            if(fn != null) fn();
        }
    });
}

function menu_toggle() {
   if(tog) {
        $(".menu-desp").animate({width: '0'}, 900, function() {
            $(this).hide(); //.effect('slide', { direction: 'left', mode: 'hide' }, 500);
        });
        $(".contenido").animate({width: '100%'}, 1100);
        tog = false;
    }
    else {
        $(".menu-desp").show();
        $(".menu-desp").animate({width: '33.333%'}, 1100);
        $(".contenido").css("float", "right");
        $(".contenido").animate({width: '66%'}, 900);
        tog = true;
    } 
}