import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import * as Colyseus from "colyseus.js";
import Phaser from "phaser";
import GameContainer from "./Game";

const serverUrl = 'ws://localhost:5001'


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

            setJoinText("Joined room " + room.name)

            //const game = new Phaser.Game(config);
            //console.log(game)


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
            <GameContainer/>

        </div>
    );
}


export default App;
