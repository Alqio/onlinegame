/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 *
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options
 */
//import { listen } from "@colyseus/arena";

// Import arena config
//import arenaConfig from "./arena.config";

// Create and listen on 2567 (or PORT environment variable.)
//listen(arenaConfig);

import {Server, RedisPresence} from "colyseus";
import {createServer} from "http";
import express from "express";
import {MainRoom} from "./rooms/MainRoom";
import {monitor} from "@colyseus/monitor";
require('dotenv').config()

const port = Number(process.env.PORT) || 5001;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("It's time to kick ass and chew bubblegum!");
});

/**
 * Bind @colyseus/monitor
 * It is recommended to protect this route with a password.
 * Read more: https://docs.colyseus.io/tools/monitor/
 */
app.use("/colyseus", monitor());

const gameServer = new Server({
    server: createServer(app),
    presence: new RedisPresence()
});

gameServer.define('main_room', MainRoom);

gameServer.listen(port).then(() => {
    console.log(`Started server on port ${port}`)
});
