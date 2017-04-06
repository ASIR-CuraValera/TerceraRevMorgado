var tog = false,
    active = "inicio";

//Lo único que faltaria seria añadir el contenido, hacer que el boton de cerrar del menu funcione, no que sea al clicar el elemento entero y alguna cosilla con las widths en las animaciones

$(document).ready(function() {    
    $('[data-menu-section="'+active+'"]').addClass("active");
    
    //Cargas dinamicas, con asignacion de propiedades
    cargar("header", "web/partials/header.html", function() {
        cargar(".menu", "web/partials/menu/menu.html", function() {
            $(".menu nav").addClass("menu-escritorio");
        });
        cargar(".menu-desp", "web/partials/menu/menu.html", function() {
            $(".menu-desp nav").addClass("menu-peque");
        });
        $(".boton-menu").on('click', function() {menu_toggle(null); });
        $(".menu-peque .active").on("click", function() {menu_toggle(null); }); 
    });
    cargar("main", "web/partials/main.html", function() {
        //Cargamos el contenido principal, en este caso, el video
        cargar(".contenido", "web/html/index.html", null);
    });
    cargar("footer", "web/partials/footer.html", null);
    
    //Asignación de propiedades, pero esta vez, usando el método de los elementos futuros
    $("header").on("click", ".menu li:not(.active)", function() {
        menu_carga(false, $(this).children(0), $(this));   
    });
    $("main").on("click", ".menu-desp li:not(.active)", function() {
        menu_carga(true, $(this).children(0), $(this));   
    });
    
    $("header").on("click", ".menu li:not(.active) a", function() {
        menu_carga(false, $(this), $(this).parent());
        return false;
    });
    $("main").on("click", ".menu-desp li:not(.active) a", function() {
        menu_carga(true, $(this), $(this).parent());
        return false;
    });
});

function menu_carga(mn, link, parent) {
    var ruta = $(link).attr("href"),
        new_act = $(parent).data("menu-section");
    if(mn) {
        menu_toggle(function() {
            cargar(".contenido", "web/html/"+ruta, null);
        });
    } else {
        cargar(".contenido", "web/html/"+ruta, null);
    }
    $('[data-menu-section="'+new_act+'"]').addClass("active");
    $('[data-menu-section="'+active+'"]').removeClass("active");
    active = new_act;
}

function cargar(el, ruta, fn) {
    $.ajax({
        url: ruta,
        success: function(data) {
            $(el).html(data);
            if(fn != null) fn();
        }
    });
}

function menu_toggle(fn) {
   if(tog) {
        $(".menu-desp").animate({width: '0'}, 1000, function() {
            $(this).hide(); //.effect('slide', { direction: 'left', mode: 'hide' }, 500);
        });
        $(".contenido").animate({width: '100%'}, 1000, fn);
        tog = false;
    }
    else {
        $(".menu-desp").show();
        $(".menu-desp").animate({width: '33.333%'}, 1000);
        $(".contenido").css("float", "right");
        $(".contenido").animate({width: '66%'}, 1000, fn);
        tog = true;
    } 
}