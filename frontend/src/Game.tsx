import Phaser, {Game} from "phaser";
import React, {useEffect, useState} from "react";
import {MainScene} from "./scenes/MainScene";


const config: Phaser.Types.Core.GameConfig = {
    title: "Himo peli",
    type: Phaser.AUTO,
    backgroundColor: '#351f1b',
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: "50%",
        height: "50%",
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    parent: "game__div",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 9810}
        }
    },
    scene: [MainScene]
};

const GameContainer = () => {
    const [game, setGame] = useState<Game | null>(null)

    useEffect(() => {
        const newGame = new Game(config)
        setGame(newGame)
    }, [])

    return (
        <div>
            <div id="game__div"></div>
            <div>test</div>
        </div>
    )
}
export default GameContainer;