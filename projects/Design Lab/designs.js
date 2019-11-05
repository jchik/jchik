// document.documentElement.addEventListener('click', function(event) {
//     if (event.target.matches('#test')) {
//         startCurve();
//     }
// });

function scrollToSection(id){
    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}

/* --- ANIMATIONS --- */
/* SunRiSe */
var sunrise = false;
$("#sunrise").click(function() {
    if (sunrise) {
        resetSunrise();
        return;
    }
    var sun = document.getElementById('svg-sun');
    var text = document.getElementById('svg-sun-text');

    sun.classList.add('rise');
    setTimeout(function() {
        sun.classList.add('spin');
    }, 1000);
    setTimeout(function() {
        text.classList.add('display');
    }, 2000);

    sunrise = true;
});

function resetSunrise() {
    var sun = document.getElementById('svg-sun');
    var text = document.getElementById('svg-sun-text');

    text.classList.remove('display');
    setTimeout(function() {
        sun.classList.remove('rise');
        sun.classList.remove('spin');
    }, 500);
    
    sunrise = false;
}

/* TEST CURVE */
var curve = false;
$("#test").click(function() {
    if (curve) {
        resetCurve();
        return;
    }

    var line = document.getElementById('curve');
    line.classList.add('animate');

    curve = true;
});

function resetCurve() {
    var line = document.getElementById('curve');
    line.classList.remove('animate');

    curve = false;
}

/* --- IMAGES --- */
/* SLIDER IMAGE */
var sliderLeftBox = document.getElementById("slider-left-container");
var sliderRightBox = document.getElementById("slider-right-container");
var slider = document.getElementById("image-slider");
sliderLeftBox.style.width = slider.value; //Set default width of the image at start

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    sliderLeftBox.style.width = slider.value + "%";
} 


/* TRI-IMAGE */
//Version 1 - Pages
var triLeftBox = document.getElementById("tri-left-container");
var triMidBox = document.getElementById("tri-mid-container");
var triRightBox = document.getElementById("tri-right-container");

triLeftBox.onmouseover = function() {
    triMidBox.classList.add("image-sub");
    triRightBox.classList.add("image-sub");
}
triMidBox.onmouseover = function() {
    triLeftBox.classList.add("image-sub");
    triRightBox.classList.add("image-sub");
}
triRightBox.onmouseover = function() {
    triLeftBox.classList.add("image-sub");
    triMidBox.classList.add("image-sub");
}
$("#tri-left-container, #tri-mid-container, #tri-right-container").mouseleave(function() {
    $("#tri-left-container, #tri-mid-container, #tri-right-container").removeClass("image-sub");
});

//Version 2 - Expand
$("#tri-left-container2").mouseover(function() {
    $("#tri-mid-container2, #tri-right-container2").addClass("image-sub");
});
$("#tri-mid-container2").mouseover(function() {
    $("#tri-left-container2, #tri-right-container2").addClass("image-sub");
});
$("#tri-right-container2").mouseover(function() {
    $("#tri-left-container2, #tri-mid-container2").addClass("image-sub");
});
$("#tri-left-container2, #tri-mid-container2, #tri-right-container2").mouseleave(function() {
    $("#tri-left-container2, #tri-mid-container2, #tri-right-container2").removeClass("image-sub");
});
