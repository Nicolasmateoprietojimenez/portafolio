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
var cursors;

function preload() {
    this.load.image('escena1', 'img/escena1.png');
    this.load.image('arbol', 'img/arbol.png');
    this.load.spritesheet('player', 'img/player.png', { frameWidth: 106, frameHeight: 129 });
    this.load.spritesheet('puerta', 'img/puerta.png', { frameWidth: 280, frameHeight: 420 });
    this.load.image('piedra', 'img/piedra.png');
    this.load.image('blur', 'img/escena1x.png');
    this.load.audio('pad', 'songs/padjuego.ogg');
    this.load.audio('puerta', 'songs/puerta.ogg');
}

function create() {

    var backgroundImage = this.add.image(0, 0, 'escena1').setOrigin(0);
    backgroundImage.displayWidth = 1920;
    backgroundImage.displayHeight = 1080;

    this.music = this.sound.add('pad', {
        volume: 0.5,
        loop: true
    });

    puertaSound = this.sound.add('puerta', {
        volume: 0.3,
    });

    this.music.play();

    var arboles = this.physics.add.staticGroup();

    arboles.create(450, -5, 'arbol').setScale(0.44).refreshBody();
    arboles.create(1000, -40, 'arbol').setScale(0.4).refreshBody();
    arboles.create(1200, -30, 'arbol').setScale(0.35).refreshBody();
    arboles.create(1400, 0, 'arbol').setScale(0.42).refreshBody();
    arboles.create(1600, 40, 'arbol').setScale(0.38).refreshBody();
    arboles.create(1700, 90, 'arbol').setScale(0.45).refreshBody();
    arboles.create(1800, 200, 'arbol').setScale(0.37).refreshBody();
    arboles.create(1800, 400, 'arbol').setScale(0.36).refreshBody();
    arboles.create(1750, 550, 'arbol').setScale(0.41).refreshBody();

    arboles.create(250, 80, 'arbol').setScale(0.41).refreshBody();
    arboles.create(115, 200, 'arbol').setScale(0.37).refreshBody();
    arboles.create(130, 450, 'arbol').setScale(0.39).refreshBody();
    arboles.create(800, -10, 'arbol').setScale(0.35).refreshBody();
    arboles.create(600, -20, 'arbol').setScale(0.32).refreshBody();
    
    puerta1 = this.physics.add.sprite(960, 150, 'puerta').setScale(0.4).setData('url', 'principal/proyecto1.html');
    puerta2 = this.physics.add.sprite(1200, 190, 'puerta').setScale(0.4).setData('url', 'principal/proyecto1.html');
    puerta3 = this.physics.add.sprite(1440, 240, 'puerta').setScale(0.4).setData('url', 'principal/proyecto1.html');
    puerta4 = this.physics.add.sprite(730, 190, 'puerta').setScale(0.4).setData('url', 'principal/proyecto1.html');
    puerta5 = this.physics.add.sprite(510, 240, 'puerta').setScale(0.4).setData('url', 'principal/proyecto1.html');

        
    player = this.physics.add.sprite(960, 900, 'player');
    player.setCollideWorldBounds(true);
    player.setSize(50, 80);
    

    arboles.create(1800, 700, 'arbol').setScale(0.44).refreshBody();
    arboles.create(1400, 700, 'arbol').setScale(0.36).refreshBody();
    arboles.create(1700, 800, 'arbol').setScale(0.39).refreshBody();
    arboles.create(1470, 950, 'arbol').setScale(0.43).refreshBody();


    arboles.create(300, 600, 'arbol').setScale(0.43).refreshBody();
    arboles.create(460, 720, 'arbol').setScale(0.35).refreshBody();
    arboles.create(350, 900, 'arbol').setScale(0.45).refreshBody();
    arboles.create(650, 900, 'arbol').setScale(0.36).refreshBody();
    arboles.create(100, 800, 'arbol').setScale(0.42).refreshBody();
    var piedras = this.physics.add.staticGroup();

    piedras.create(game.config.width * 0.651, game.config.height * 0.945, 'piedra').setScale(0.5);
    piedras.create(game.config.width * 0.620, game.config.height * 0.823, 'piedra').setScale(0.6);
    piedras.create(game.config.width * 0.824, game.config.height * 0.620, 'piedra').setScale(0.5);
    piedras.create(game.config.width * 0.050, game.config.height * 0.600, 'piedra').setScale(0.5);
    piedras.create(game.config.width * 0.078, game.config.height * 0.960, 'piedra').setScale(0.6);

    var backgroundx = this.add.image(0, 0, 'blur').setOrigin(0);
    backgroundx.displayWidth = 1920;
    backgroundx.displayHeight = 1080;
    
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
    
    var textoPuerta1 = this.add.text(960, 250, 'Conoceme', { 
        fontFamily: 'Helvetica', 
        fontSize: 30, 
        fill: '#ffff00',
        stroke: '#000000',
        strokeThickness: 5,
        fontWeight: 'bold' 
    }).setOrigin(0.5);
    
    var textoPuerta2 = this.add.text(1200, 290, 'Pacman', { 
        fontFamily: 'Helvetica', 
        fontSize: 30, 
        fill: '#ffcc00', 
        stroke: '#000000',
        strokeThickness: 4,
    }).setOrigin(0.5);
    
    var textoPuerta3 = this.add.text(1440, 340, 'Proyecto', { 
        fontFamily: 'Helvetica', 
        fontSize: 30, 
        fill: '#ff9900',
        stroke: '#000000',
        strokeThickness: 4, 
        fontWeight: 'bold' 
    }).setOrigin(0.5);
    
    var textoPuerta4 = this.add.text(730, 290, 'NomiGo', { 
        fontFamily: 'Helvetica', 
        fontSize: 30, 
        fill: '#ffcc00',
        stroke: '#000000',
        strokeThickness: 4,
        fontWeight: 'bold' 
    }).setOrigin(0.5);
    
    var textoPuerta5 = this.add.text(510, 340, 'Proyecto', { 
        fontFamily: 'Helvetica', 
        fontSize: 30, 
        fill: '#ff9900',
        stroke: '#000000',
        strokeThickness: 4,
        fontWeight: 'bold' 
    }).setOrigin(0.5);

    player.setDepth(2);
    textoPuerta1.setDepth(1);
    textoPuerta2.setDepth(1);
    textoPuerta3.setDepth(1);
    textoPuerta4.setDepth(1);
    textoPuerta5.setDepth(1);

    this.physics.add.collider(player, piedras);
    this.physics.add.collider(player, arboles);
    this.physics.add.overlap(player, [puerta1, puerta2, puerta3, puerta4, puerta5], abrirPuerta, null, this);
    
    var puertaAbierta = false;

    function abrirPuerta(player, puerta) {
        if (!puertaAbierta) {
            puertaAbierta = true;
            puerta.setFrame(1);
            puertaSound.play();
            setTimeout(() => {
                cursors.enabled = true;
            }, 1000);
            
            var url = puerta.getData('url');
            setTimeout(() => {
                window.location.href = url;
            }, 800);
        }
    }
    

}

function update() {
        player.setVelocity(0);
        console.log("Left:", cursors.left.isDown);
        console.log("Right:", cursors.right.isDown);
        console.log("Up:", cursors.up.isDown);
        console.log("Down:", cursors.down.isDown);

        var velocidad = 400;
        

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

        else if (cursors.left.isDown) {
            player.setVelocityX(-velocidad);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(velocidad);
            player.anims.play('right', true);
        }

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



