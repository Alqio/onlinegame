import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }

    preload() {
        this.load.image('background', 'background.png')
        this.load.image('pelle', 'logo192.png')
        this.load.image('platform', 'platform.png')
        this.load.image('player', 'spaceship.png')
    }

    create() {
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0)

        const player = this.add.sprite(200, 200, 'player');
    }

}