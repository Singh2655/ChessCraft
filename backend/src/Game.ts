import { Chess, Square } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";
import { Socket } from "socket.io-client";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private moves: string[];
  private startTime: Date;
  private moveCnt:number;
  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.player1.send(JSON.stringify({
        type:INIT_GAME,
        payload:{color:'white'}
    }))
    this.player2.send(JSON.stringify({
        type:INIT_GAME,
        payload:{color:'black'}
    }))
    this.moveCnt=0
  }
  makeMove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    if(this.moveCnt%2===0 && socket!==this.player1){
        return;
    }
if(this.moveCnt%2===1 && socket!==this.player2){
    return;
}
    try {
      this.board.move(move);
    } catch (error) {
      console.error("error while make move", error);
      return;
    }

    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      return;
    }
    if (this.moveCnt % 2 === 0 ) {
        console.log("sent1")
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }else{
        console.log("sent2")
        this.player1.send(
            JSON.stringify({
              type: MOVE,
              payload: move,
            })
          );
    }
    this.moveCnt++;
  }
}
