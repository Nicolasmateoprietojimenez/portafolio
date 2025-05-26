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

function iniciarJuego() {
    const titilar = document.getElementById('pres');
    const fade = document.getElementById('fade');
    if (titilar && fade) {
        titilar.classList.add('titila');
        fade.classList.add('fadeout');
        music.muted = true;
        start.play();
        setTimeout(function () {
            window.location.href = 'game.html';
        }, 3000);
    }
}

// Evento de teclado (solo en PC)
document.addEventListener("keydown", function (event) {
    if (event.key === "p" || event.key === "P") {
        iniciarJuego();
    }
});

// Detectar si el ancho de pantalla es de móvil
function esPantallaMovil() {
    return window.innerWidth <= 768; // puedes ajustar el valor si es necesario
}

// Solo si es una pantalla pequeña (móvil), permitir toque o clic
if (esPantallaMovil()) {
    document.body.addEventListener("touchstart", function () {
        iniciarJuego();
    }, { once: true });

    document.body.addEventListener("click", function () {
        iniciarJuego();
    }, { once: true });
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500); // espera a que termine el fade
    }, 2000); // <- aquí el "exagerado" delay de 2 segundos

    // (Opcional) reproducir la música luego del delay también
    const bgMusic = document.getElementById('backgroundMusic');
    if (bgMusic) {
        setTimeout(() => {
            bgMusic.play().catch(e => console.warn('Autoplay bloqueado:', e));
        }, 2000);
    }
});
    function esDispositivoMovil() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Cambiar el texto si es un móvil
    window.addEventListener('load', function() {
        var texto = document.getElementById('pres');
        if (esDispositivoMovil() && texto) {
            texto.textContent = "Toque la pantalla para continuar";
        }
    });