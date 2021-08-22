import Bootloader from './Bootloader.js';
import Level11 from './scenes/levels/Level11.js';
import Level12 from './scenes/levels/Level12.js';
import GameOver from './scenes/GameOver.js';
import MainTitle from './scenes/MainTitle.js';

const config = {
    title: 'Viaje del Rey de la Pradera',
    url: 'http://localhost:5500',
    version: '0.0.1',

    pixelArt: true,
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    parent: 'container',
    backgroundColor: '#34495E',

    banner: {
        hidePhaser: false,
        text: '#000000',
        background: [
            'red',
            'yellow',
            'red',
            'transparent'
        ]
    },

    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false,
            tileBias: 16,
        } 
    },

    scene: [Bootloader, MainTitle, Level11, Level12, GameOver]
}

const game = new Phaser.Game(config);