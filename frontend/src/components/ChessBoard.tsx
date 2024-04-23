import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

const ChessBoard = ({
  chess,
  board,
  socket,
  setBoard,
}: {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  
  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const boardRepresentation =
                String.fromCharCode(97 + (j % 8)) + (8 - i);
  
              return (
                <div
                  key={j}
                  onMouseDown={() => {
                    if (!from && square) {
                      setFrom(boardRepresentation);
                      setLegalMoves(
                        chess
                          .moves({ verbose: true, square: square?.square })
                          .map((move) => move.to)
                      );
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: boardRepresentation,
                            },
                          },
                        })
                      );
                      try {
                        chess.move({
                          from,
                          to: boardRepresentation,
                        });
                        setBoard(chess.board());
                        setFrom(null);
                        setLegalMoves([]);
                      } catch (error) {
                        setFrom(null);
                        console.log("error while making move");
                      }
                    }
                  }}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-gray-200" : "bg-green-400"
                  } relative`}
                >
                  {!!from &&
                    legalMoves.includes(boardRepresentation) && (
                      <div
                        className={`absolute inset-0 ${
                          square ? "bg-red-500 bg-opacity-60" : ""
                        } flex items-center justify-center`}
                      >
                        {!square && (
                          <div className="w-5 h-5 bg-green-500 rounded-full" />
                        )}
                      </div>
                    )}
                  {square && (
                    <img
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14"
                      src={`/${
                        square.color === "b"
                          ? square.type
                          : `${square.type.toUpperCase()} copy`
                      }.png`}
                      alt="chess-pieces"
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
