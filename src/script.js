var isMobile = /Mobi|Android/i.test(navigator.userAgent); // Detecta si es móvil
var joystick = { up: false, down: false, left: false, right: false };

function ajustarHitbox(obj, anchoOriginal, altoOriginal, escala) {
    obj.body.setSize(anchoOriginal * escala, altoOriginal * escala, true);
}

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    dom: {
        createContainer: true
    }
};

var game = new Phaser.Game(config);
var cursors, player, puertaSound;

function preload() {
    // Fondo de carga
    var w = game.config.width;
    var h = game.config.height;

    // Texto de "Cargando..."
    var loadingText = this.add.text(w / 2, h / 2 - 50, 'Cargando...', {
        fontFamily: 'Arial',
        fontSize: '32px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    // Barra de progreso
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(w / 2 - 160, h / 2 - 20, 320, 50);

    // Evento de progreso
    this.load.on('progress', function (value) {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(w / 2 - 150, h / 2 - 10, 300 * value, 30);
    });

    // Evento cuando todo se cargue
    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
    });

    // Tus recursos
    this.load.image('escena1', 'img/escena1.png');
    this.load.image('arbol', 'img/arbol.png');
    this.load.spritesheet('player', 'img/player.png', { frameWidth: 106, frameHeight: 129 });
    this.load.spritesheet('puerta', 'img/puerta.png', { frameWidth: 280, frameHeight: 420 });
    this.load.image('piedra', 'img/piedra.png');
    this.load.image('blur', 'img/escena1x.png');
    this.load.audio('pad', 'songs/padjuego.ogg');
    this.load.audio('puerta', 'songs/puerta.ogg');
    this.load.image('arrow-up', 'img/arrow-up.png');
    this.load.image('arrow-down', 'img/arrow-down.png');
    this.load.image('arrow-left', 'img/arrow-left.png');
    this.load.image('arrow-right', 'img/arrow-right.png');
}


function create() {

    const size = 60; // Tamaño de las flechas
    const margin = 60;
    const baseX = margin + size;
    const baseY = game.config.height - margin - size;

    const left = this.add.image(baseX - size, baseY, 'arrow-left').setInteractive();
    const right = this.add.image(baseX + size, baseY, 'arrow-right').setInteractive();
    const up = this.add.image(baseX, baseY - size, 'arrow-up').setInteractive();
    const down = this.add.image(baseX, baseY + size, 'arrow-down').setInteractive();

    [up, down, left, right].forEach(btn => {
        btn.setScrollFactor(0).setScale(0.7).setAlpha(0.7).setDepth(5);
    });

    up.on('pointerdown', () => joystick.up = true);
    down.on('pointerdown', () => joystick.down = true);
    left.on('pointerdown', () => joystick.left = true);
    right.on('pointerdown', () => joystick.right = true);

    up.on('pointerup', () => joystick.up = false);
    down.on('pointerup', () => joystick.down = false);
    left.on('pointerup', () => joystick.left = false);
    right.on('pointerup', () => joystick.right = false);

    // También por si el usuario desliza el dedo fuera
    up.on('pointerout', () => joystick.up = false);
    down.on('pointerout', () => joystick.down = false);
    left.on('pointerout', () => joystick.left = false);
    right.on('pointerout', () => joystick.right = false);

    
    var w = game.config.width;
    var h = game.config.height;
    var scaleFactor = isMobile ? 0.6 : 1;

    var backgroundImage = this.add.image(0, 0, 'escena1').setOrigin(0);
    backgroundImage.displayWidth = w;
    backgroundImage.displayHeight = h;

    this.music = this.sound.add('pad', { volume: 0.5, loop: true });
    puertaSound = this.sound.add('puerta', { volume: 0.3 });
    this.music.play();

    // Árboles
    var arboles = this.physics.add.staticGroup();

    // Arboles de la izquierda
    arboles.create(w * 0.030, h * 0.09, 'arbol').setScale(0.44 * scaleFactor).refreshBody();
    arboles.create(w * 0.080, h * 0.60, 'arbol').setScale(0.44 * scaleFactor).refreshBody();



    // Arboles arriba
    arboles.create(w * 0.8, h * -0.11, 'arbol').setScale(0.48 * scaleFactor).refreshBody();
    arboles.create(w * 0.53, h * -0.2, 'arbol').setScale(0.6 * scaleFactor).refreshBody();
    arboles.create(w * 0.3, h * -0.12, 'arbol').setScale(0.50 * scaleFactor).refreshBody();
    arboles.create(w * 0.8, h * -0.11, 'arbol').setScale(0.48 * scaleFactor).refreshBody();


    // Arboles derecha
    arboles.create(w * 0.99, h * 0.09, 'arbol').setScale(0.52 * scaleFactor).refreshBody();
    arboles.create(w * 0.99, h * 1, 'arbol').setScale(0.52 * scaleFactor).refreshBody();
    arboles.create(w * 0.8, h * 0.8, 'arbol').setScale(0.3 * scaleFactor).refreshBody();
     arboles.create(w * 0.8, h * 0.8, 'arbol').setScale(0.3 * scaleFactor).refreshBody();






    // Ajustar hitboxes de árboles
    arboles.children.iterate(obj => {
        const originalW = obj.width;
        const originalH = obj.height;
        obj.body.setSize(originalW * obj.scaleX, originalH * obj.scaleY);
    });

    // Puertas
    var puertas = [];
    const puertaOriginalW = 280;
    const puertaOriginalH = 420;
    const puertaEscala = 0.4 * scaleFactor;

    puertas.push(this.physics.add.sprite(w * 0.5, h * 0.14, 'puerta').setData('url', 'principal/proyecto1.html'));
    puertas.push(this.physics.add.sprite(w * 0.625, h * 0.175, 'puerta').setData('url', 'principal/proyecto1.html'));
    puertas.push(this.physics.add.sprite(w * 0.75, h * 0.22, 'puerta').setData('url', 'principal/proyecto1.html'));
    puertas.push(this.physics.add.sprite(w * 0.38, h * 0.175, 'puerta').setData('url', 'principal/proyecto1.html'));
    puertas.push(this.physics.add.sprite(w * 0.27, h * 0.22, 'puerta').setData('url', 'principal/proyecto1.html'));

    puertas.forEach(puerta => {
        puerta.setScale(puertaEscala);
        ajustarHitbox(puerta, puertaOriginalW, puertaOriginalH, puertaEscala);
    });

    // Jugador
    const playerEscala = scaleFactor;
    player = this.physics.add.sprite(w * 0.5, h * 0.85, 'player').setScale(playerEscala);
    player.setCollideWorldBounds(true);
    player.setSize(50 * scaleFactor, 80 * scaleFactor);

    // Piedras
    var piedras = this.physics.add.staticGroup();

    piedras.create(w * 0.651, h * 0.945, 'piedra').setScale(0.5 * scaleFactor).refreshBody();
    piedras.create(w * 0.824, h * 0.620, 'piedra').setScale(0.5 * scaleFactor).refreshBody();
    piedras.create(w * 0.078, h * 0.960, 'piedra').setScale(0.6 * scaleFactor).refreshBody();

    // Ajustar hitboxes de piedras
    piedras.children.iterate(obj => {
        const originalW = obj.width;
        const originalH = obj.height;
        obj.body.setSize(originalW * obj.scaleX, originalH * obj.scaleY);
    });

    // Fondo difuminado
    var backgroundx = this.add.image(0, 0, 'blur').setOrigin(0);
    backgroundx.displayWidth = w;
    backgroundx.displayHeight = h;

    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({ key: 'front', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'back', frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }), frameRate: 10, repeat: -1 });

    const textos = ["Redirección 1", "Redirección 2", "Redirección 3", "Redirección 4", "Redirección 5"];
    puertas.forEach((puerta, i) => {
        let t = this.add.text(puerta.x, puerta.y + h * 0.07, textos[i], {
            fontFamily: 'Helvetica',
            fontSize: Math.floor(h * 0.03 * scaleFactor),
            fill: '#ffcc00',
            stroke: '#000000',
            strokeThickness: 4,
        }).setOrigin(0.5);
        t.setDepth(1);
    });

    player.setDepth(2);

    this.physics.add.collider(player, piedras);
    this.physics.add.collider(player, arboles);
    this.physics.add.overlap(player, puertas, abrirPuerta, null, this);

    function abrirPuerta(player, puerta) {
        if (!puerta.getData('opened')) {
            puerta.setData('opened', true);
            puerta.setFrame(1);
            puertaSound.play();
            setTimeout(() => {
                window.location.href = puerta.getData('url');
            }, 800);
        }
    }

    window.addEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    });
}

function update() {
    player.setVelocity(0);
    var velocidad = 400;

var moveLeft = cursors.left.isDown || joystick.left;
var moveRight = cursors.right.isDown || joystick.right;
var moveUp = cursors.up.isDown || joystick.up;
var moveDown = cursors.down.isDown || joystick.down;

if (moveLeft && moveUp) {
    player.setVelocityX(-velocidad);
    player.setVelocityY(-velocidad);
    player.anims.play('left', true);
} else if (moveRight && moveUp) {
    player.setVelocityX(velocidad);
    player.setVelocityY(-velocidad);
    player.anims.play('right', true);
} else if (moveLeft && moveDown) {
    player.setVelocityX(-velocidad);
    player.setVelocityY(velocidad);
    player.anims.play('left', true);
} else if (moveRight && moveDown) {
    player.setVelocityX(velocidad);
    player.setVelocityY(velocidad);
    player.anims.play('right', true);
} else if (moveLeft) {
    player.setVelocityX(-velocidad);
    player.anims.play('left', true);
} else if (moveRight) {
    player.setVelocityX(velocidad);
    player.anims.play('right', true);
} else if (moveUp) {
    player.setVelocityY(-velocidad);
    player.anims.play('back', true);
} else if (moveDown) {
    player.setVelocityY(velocidad);
    player.anims.play('front', true);
} else {
    player.anims.stop();
}

}
