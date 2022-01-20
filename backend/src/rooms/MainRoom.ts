import { Room, Client } from "colyseus";
import { MainRoomState } from "./schema/MainRoomState";
import {Player} from "./schema/Player";

export class MainRoom extends Room<MainRoomState> {

  onCreate (options: any) {
    this.setState(new MainRoomState());

    // Called every time this room receives a "move" message
    this.onMessage("move", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.x += data.x;
      player.y += data.y;
      console.log(client.sessionId + " at, x: " + player.x, "y: " + player.y);
    });

  }

  onJoin (client: Client, options: any) {
    this.state.players.set(client.sessionId, new Player());
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
