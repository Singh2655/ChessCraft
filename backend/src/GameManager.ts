import { INIT_GAME, MOVE, VALID_MOVE } from "./messages";
import { Game } from "./Game";
import { WebSocket } from "ws";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];
  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }
  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }
  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
  }
  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      console.log("hello");
      const message = JSON.parse(data.toString());
      console.log("this is message", message);
      if (message.type === INIT_GAME){
        console.log(this.pendingUser);
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }
      if (message.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (game) game.makeMove(socket, message.payload.move);
      }
    });
  }
}
