import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME="init_game"
export const MOVE="move"
export const GAME_OVER="game_over"
export const VALID_MOVE="valid-move"

const Game = () => {
    
    const socket=useSocket()
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    const [started, setStarted] = useState(false)
    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.onmessage=(event)=>{
            const message=JSON.parse(event.data)
            console.log(message)
            switch (message.type){
                case INIT_GAME:
                    setBoard(chess.board())
                    setStarted(true)
                    console.log("game initialized")
                    break;
                case MOVE:{
                    const move=message.payload;
                    chess.move(move)
                    setBoard(chess.board())
                    console.log("move made",move)
                    break;
                }
                case GAME_OVER:
                    console.log("game over")
                    break;
            }
        }
    },[socket,chess])
    if(!socket)return <div>Connecting...</div>
    const handleClick=()=>{
        socket.send(JSON.stringify({
            type:INIT_GAME
        }))
    }
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 ">
          <div className="md:col-span-4  w-full flex justify-center">
            <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} />
          </div>
          {!started && <div className="md:col-span-2 bg-slate-800 flex justify-center items-center">
            <Button onClick={handleClick} text="play"/>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Game;
