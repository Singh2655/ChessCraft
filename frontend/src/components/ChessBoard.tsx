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
                    if (!from) {
                      setFrom(boardRepresentation);
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
                      chess.move({
                        from,
                        to: boardRepresentation,
                      });
                      setBoard(chess.board());
                      setFrom(null);
                    }
                  }}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-green-500" : "bg-white"
                  }`}
                >
                  <div className="flex h-full w-full justify-center items-center">
                    {square ? (
                      <img
                        className="w-8"
                        src={`/${
                          square.color === "b"
                            ? square.type
                            : `${square.type.toUpperCase()} copy`
                        }.png`}
                        alt="chess-pieces"
                      />
                    ) : null}
                  </div>
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
