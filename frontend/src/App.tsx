import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import * as Colyseus from "colyseus.js";
import Phaser from "phaser";

const serverUrl = 'ws://localhost:5001'

const scene: Phaser.Scene = new Phaser.Scene({
    key: "create",
    active: true,
    visible: true,
})




const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game__div",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 9810 }
        }
    },
    scene: {
        preload: function () {
            this.load.image('background', 'background.png')
            this.load.image('pelle', 'logo192.png')
            this.load.image('platform', 'platform.png')
        },
        create: function () {
            const background = this.add.image(0, 0, 'background').setOrigin(0, 0)

            const platforms = this.physics.add.staticGroup();
            platforms.create(0, 500, "platform").setOrigin(0, 0).setScale(2).refreshBody()

            const player = this.physics.add.sprite(300, 0, 'dude');

            player.setBounce(0.2);
            player.setCollideWorldBounds(true);
            this.physics.add.collider(player, platforms);
        },
        update: function () {
            const cursors = this.input.keyboard.createCursorKeys();
        }
    }
};


const App = () => {
    const [client, setClient] = useState<Colyseus.Client | null>(null)
    const [joinText, setJoinText] = useState<string>("")


    useEffect(() => {
        const newClient = new Colyseus.Client(serverUrl)
        setClient(newClient)
    }, [])

    const join = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()

        console.log("join")

        if (!client) return

        setJoinText("Joining room...")

        try {
            const room = await client.joinOrCreate("main_room")
            console.log(room.sessionId, "joined", room.name)

            //setJoinText("Joined room " + room.name)

            const game = new Phaser.Game(config);
            console.log(game)



        } catch (e) {
            console.log("JOIN ERROR", e);
            setJoinText("Failed to join room")
        }
    }

    return (
        <div>
            <div>
                <button onClick={join}>Join room</button>
            </div>
            <div>
                <p>{joinText}</p>
            </div>

            <div id="game__div"></div>

        </div>
    );
}


export default App;
