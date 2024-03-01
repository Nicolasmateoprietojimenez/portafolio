var music = document.getElementById('backgroundMusic');
var muteButton = document.getElementById('muteButton');
var muteIcon = document.getElementById('muteIcon');
var start = document.getElementById('start');

music.volume = 0.2;
start.volume = 0.2;
var muteImagePath = 'img/volume-mute.png';
var unmuteImagePath = 'img/volume.png';

music.muted = true;
muteIcon.src = muteImagePath;

muteButton.addEventListener('click', function() {
    if (music.muted) {
        music.muted = false;
        muteIcon.src = unmuteImagePath;
        music.play();
    } else {
        music.muted = true;
        muteIcon.src = muteImagePath;
    }
});

document.addEventListener("keydown", function(event) {
    var titilar = document.getElementById('pres');
    var fade = document.getElementById('fade');
    if (event.key === "p" || event.key === "P") {
        if (titilar && fade) {
            titilar.classList.add('titila');
            fade.classList.add('fadeout');
            music.muted = true;
            start.play();
            setTimeout(function() {
                window.location.href = ('game.html');
            }, 3000);
        }
    }
});
