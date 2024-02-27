window.onload = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Definir el tamaño del escenario
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // Definir las propiedades del personaje
    var player = {
        x: 100,
        y: 50,
        width: 10,
        height: 10,
        color: 'red',
        speed: 1
    };

    // Función para dibujar el escenario y el personaje
    function drawScene() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);//cada que se avance un pixel con el personaje haremos que se borre el rastro

        // Dibujar el personaje
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function update() {
        // Esta funcion hara que el movimiento de nuestro personaje se ejecute de acuerdo a la tecla presionada
        if (keys['ArrowUp']) {
            player.y -= player.speed;
        }
        if (keys['ArrowDown']) {
            player.y += player.speed;
        }
        if (keys['ArrowLeft']) {
            player.x -= player.speed;
        }
        if (keys['ArrowRight']) {
            player.x += player.speed;
        }

        // Agregamos las colisones con el escenario
        player.x = Math.max(0, Math.min(canvasWidth - player.width, player.x));
        player.y = Math.max(0, Math.min(canvasHeight - player.height, player.y));
    }

    var keys = {};
    // Escuchar eventos de teclado para capturar las teclas presionadas y guardarlas en un objeto llamado keys
    window.addEventListener("keydown", function(event) {
        keys[event.key] = true;
    });

    window.addEventListener("keyup", function(event) {
        keys[event.key] = false;
    });

    function gameLoop() { //Para que el juego permanezca siempre activo lo ponemos en loop
        update();
        drawScene();
        requestAnimationFrame(gameLoop);
    }


    gameLoop(); //Inicializamos el loop para que el juego cicle
};
