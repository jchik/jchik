/* --- LOADER --- */
$(window).on("load", function () {
    $("#loader").fadeOut("slow");
});

/* --- CLICKS --- */
document.documentElement.addEventListener('click', function (event) {
    if (event.target.getAttribute("class") == "card-img") {

    }

    // console.log(event.target);
    // console.log("PARENT: " + event.target.parentElement);
});

/* --- SCROLL --- */
function scrollToSection(id) {
    $('html,body').animate({ scrollTop: $("#" + id).offset().top }, 'slow');
}

/* --- ANIMATIONS --- */


/* --- IMAGES --- */
/* SLIDER IMAGE */
var sliderLeftBox = document.getElementById("slider-left-container");
var sliderRightBox = document.getElementById("slider-right-container");
var slider = document.getElementById("image-slider");
sliderLeftBox.style.width = slider.value;

slider.oninput = function () {
    sliderLeftBox.style.width = slider.value + "%";
}


/* TRI-IMAGE */
//Version 1 - Pages (JavaScript + jQuery)
var triLeftBox = document.getElementById("tri-left-container");
var triMidBox = document.getElementById("tri-mid-container");
var triRightBox = document.getElementById("tri-right-container");

triLeftBox.onmouseover = function () {
    triMidBox.classList.add("image-sub");
    triRightBox.classList.add("image-sub");
}
triMidBox.onmouseover = function () {
    triLeftBox.classList.add("image-sub");
    triRightBox.classList.add("image-sub");
}
triRightBox.onmouseover = function () {
    triLeftBox.classList.add("image-sub");
    triMidBox.classList.add("image-sub");
}
$("#tri-left-container, #tri-mid-container, #tri-right-container").mouseleave(function () {
    $("#tri-left-container, #tri-mid-container, #tri-right-container").removeClass("image-sub");
});

//Version 2 - Expand (jQuery)
$("#tri-left-container2").mouseover(function () {
    $("#tri-mid-container2, #tri-right-container2").addClass("image-sub");
});
$("#tri-mid-container2").mouseover(function () {
    $("#tri-left-container2, #tri-right-container2").addClass("image-sub");
});
$("#tri-right-container2").mouseover(function () {
    $("#tri-left-container2, #tri-mid-container2").addClass("image-sub");
});
$("#tri-left-container2, #tri-mid-container2, #tri-right-container2").mouseleave(function () {
    $("#tri-left-container2, #tri-mid-container2, #tri-right-container2").removeClass("image-sub");
});
