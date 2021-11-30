window.onload = function () {
    //document.getElementById('welcome').classList.remove("no-js");

    document.getElementById('welcome-text').innerHTML = "&nbsp";
}

window.onscroll = function () {
    scrolling();
};

document.documentElement.addEventListener('click', function(event) {
    //if (event.button !== 0) return; /*Left-Click only*/

    if (event.target.matches('#welcome')) {
        typeWelcome();
    }

    if (event.target.matches('.project-thumbnail')) {
        openModal(event);
    }

    if (event.target.matches('#project-modal') || event.target.matches('#modal-img')) {
        closeModal();
    }
});

var textIndex = 0;
var text = "Welcome.";
function typeWelcome() {
    if (textIndex < text.length) {
        document.getElementById('welcome-text').innerHTML += text.charAt(textIndex);
        textIndex++;
        setTimeout(typeWelcome, 150);
    }	
    else {
        setTimeout(hideWelcome, 1500);
    }
}

function hideWelcome() {
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
