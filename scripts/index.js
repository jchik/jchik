window.onload = function () {
    //document.getElementById('welcome').classList.remove("no-js");

    document.getElementById('welcome-text').innerHTML = "&nbsp";
}

window.onscroll = function () {
    scrolling();
};

document.documentElement.addEventListener('click', function (event) {
    //if (event.button !== 0) return; /*Left-Click only*/

    if (event.target.matches('#welcome')) {
        openStart();
    }

    if (event.target.matches('.project-thumbnail')) {
        openModal(event);
    }

    if (event.target.matches('#project-modal') || event.target.matches('#modal-img')) {
        closeModal();
    }

    if (event.target.matches('#sunrise') || event.target.matches('#svg-sun') || event.target.matches('#svg-sun-text')) {
        startSunrise();
    }
});

var textIndex = 0;
var text = "Welcome.";

function openStart() {
    if (textIndex < text.length) {
        document.getElementById('welcome-text').innerHTML += text.charAt(textIndex);
        textIndex++;
        setTimeout(openStart, 150);
    }	
    else {
        setTimeout(closeStart, 1500);
    }
}

function closeStart() {
    document.getElementById('welcome').style.height = "0%";
    document.getElementById('welcome-text').style.display ="none";
    clickToTop();
}

function scrolling() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('top-button').style.display = "block";
    }
    else {
        document.getElementById('top-button').style.display = "none";
    }
}

function clickToTop() {
    document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
}

function openModal(event) {
    document.getElementById('project-modal').style.display = "block";
    document.getElementById('modal-img').src = event.target.src;
}

function closeModal() {
    document.getElementById('project-modal').style.display = "none";
}

var sunrise = false;
function startSunrise() {
    if (sunrise) {
        resetSunrise();
        return;
    }
    var sun = document.getElementById('svg-sun');
    var text = document.getElementById('svg-sun-text');

    sun.classList.add('rising');
    setTimeout(function() {
        sun.classList.add('spin');
    }, 1000);
    setTimeout(function() {
        text.classList.add('display');
    }, 2000);

    sunrise = true;
}

function resetSunrise() {
    var sun = document.getElementById('svg-sun');
    var text = document.getElementById('svg-sun-text');

    text.classList.remove('display');
    setTimeout(function() {
        sun.classList.remove('rising');
        sun.classList.remove('spin');
    }, 500);
    sunrise = false;
}
