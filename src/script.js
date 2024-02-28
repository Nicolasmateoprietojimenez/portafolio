var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
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
    // Pasar el objeto 'document' al constructor de la escena
    dom: {
        createContainer: true
    }
};

var game = new Phaser.Game(config);
var cursors;

function preload() {
    this.load.image('escena1', 'img/escena1.png');
    this.load.image('arbol', 'img/arbol.png');
    this.load.spritesheet('player', 
        'img/player.png',
        { frameWidth: 106, frameHeight: 128}
    );
    this.load.spritesheet('puerta', 
    'img/puerta.png',
    { frameWidth: 300, frameHeight: 400}
    );
    this.load.image('piedra', 'img/piedra.png');
}

function create() {
    var backgroundImage = this.add.image(0, 0, 'escena1').setOrigin(0);
    backgroundImage.displayWidth = 1920;
    backgroundImage.displayHeight = 1080;

    var piedras = this.physics.add.staticGroup();

    piedras.create(1250,1000,'piedra').setScale(0.4);
    piedras.create(1270,900,'piedra').setScale(0.6);
    piedras.create(1640,1000,'piedra').setScale(0.5);
    piedras.create(500,1050,'piedra').setScale(0.5);
    piedras.create(150,1000,'piedra').setScale(0.6);

    this.add.image(400,300,'piedra').setScale(0.4);

    var arboles = this.physics.add.staticGroup();
    //arboles lado derecho
    arboles.create(1000, -40, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1200, -30, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1400, 0, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1600, 40, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1700, 90, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1800, 200, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1850, 400, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1750, 550, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1800, 700, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1400, 700, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1700, 800, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1470, 950, 'arbol').setScale(0.4).refreshBody();
    arboles.create(800, -30, 'arbol').setScale(0.4).refreshBody();
    arboles.create(600, -20, 'arbol').setScale(0.4).refreshBody();
    arboles.create(400, -10, 'arbol').setScale(0.4).refreshBody();

    //arboles lado izquierdo
    arboles.create(250, 80, 'arbol').setScale(0.4).refreshBody();
    arboles.create(115, 200, 'arbol').setScale(0.4).refreshBody();
    arboles.create(130, 450, 'arbol').setScale(0.4).refreshBody();
    arboles.create(300, 600, 'arbol').setScale(0.4).refreshBody();
    arboles.create(460, 720, 'arbol').setScale(0.4).refreshBody();
    arboles.create(350, 900, 'arbol').setScale(0.4).refreshBody();
    arboles.create(650, 900, 'arbol').setScale(0.4).refreshBody();
    arboles.create(100, 800, 'arbol').setScale(0.4).refreshBody();
    

    puerta1 = this.physics.add.sprite(960, 150, 'puerta').setScale(0.4);
    puerta2 = this.physics.add.sprite(1200, 190, 'puerta').setScale(0.4);
    puerta3 = this.physics.add.sprite(1440, 240, 'puerta').setScale(0.4);
    puerta4 = this.physics.add.sprite(730, 190, 'puerta').setScale(0.4);
    puerta5 = this.physics.add.sprite(510, 240, 'puerta').setScale(0.4);
    
    player = this.physics.add.sprite(960, 900, 'player');
    player.setCollideWorldBounds(true);
    player.setSize(50, 80);

    

    // Configurar teclas de flecha
    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.physics.add.collider(player, piedras);
    this.physics.add.collider(player, arboles);
    this.physics.add.overlap(player, [puerta1, puerta2, puerta3, puerta4, puerta5], abrirPuerta, null, this);
    
    function abrirPuerta(player, puerta) {
        puerta.setFrame(1);
        window.location.href='principal/proyecto1.html';
    }
    
    

}

function update() {
        player.setVelocity(0);

        var velocidad = 500;

        if (cursors.left.isDown && cursors.up.isDown) {
            player.setVelocityX(-velocidad);
            player.setVelocityY(-velocidad);
            player.anims.play('left', true);
        } else if (cursors.right.isDown && cursors.up.isDown) {
            player.setVelocityX(velocidad);
            player.setVelocityY(-velocidad);
            player.anims.play('right', true);
        } else if (cursors.left.isDown && cursors.down.isDown) {
            player.setVelocityX(-velocidad);
            player.setVelocityY(velocidad);
            player.anims.play('left', true);
        } else if (cursors.right.isDown && cursors.down.isDown) {
            player.setVelocityX(velocidad);
            player.setVelocityY(velocidad);
            player.anims.play('right', true);
        }

        // Movimiento horizontal
        else if (cursors.left.isDown) {
            player.setVelocityX(-velocidad);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(velocidad);
            player.anims.play('right', true);
        }

        // Movimiento vertical
        else if (cursors.up.isDown) {
            player.setVelocityY(-velocidad);
            player.anims.play('back', true);
        } else if (cursors.down.isDown) {
            player.setVelocityY(velocidad);
            player.anims.play('front', true);
        } else {
            player.anims.stop();
        }
    }



