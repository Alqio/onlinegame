import { Schema, type, MapSchema } from "@colyseus/schema";
import {Player} from "./Player";
export class MainRoomState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";

  @type({ map: Player })
  players = new MapSchema<Player>();
}
