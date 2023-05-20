import React, { useRef, useEffect, useState } from 'react';
import Piece from "./Piece";

export default function Board() {

    /*
        - Create a Piece
        - Allow Piece the use of drawPixel()
        - Create state for X and Y to use in Pixel 
        - ??? Collision detection 
        - ??? "Locking" pieces
        - ??? Removing the bottom row of the Board
    */

    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [isGameRunning, setIsGameRunning] = useState(false);

    const boardCanvasRef = useRef();
    const [boardCtx, setBoardCtx] = useState([]);

    useEffect(() => {

        console.log(`boardCtx: ${boardCtx}`);

        drawBoardCanvas();

        console.log(boardCanvasRef.current.getContext("2d"));

        setBoardCtx(boardCanvasRef.current.getContext("2d"));

    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, []);

    function handleKeyDown(e){
        switch(e.keyCode){
            case 87:
                //rotate
                console.log("rotate");
                break;
            case 65:
                console.log("left");
                //left
                break;
            case 68:
                console.log("right");
                //right
                break;
            case 83:
                console.log("down");
                break;
        }
    }

    function drawPixel(x, y, color){ 

        const boardContext = boardCanvasRef.current.getContext("2d");

        boardContext.fillStyle = color;
        boardContext.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

        boardContext.strokeStyle = "black";
        boardContext.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);        
    }

    function drawBoardCanvas(){

        for(let r = 0; r < ROWS; r++){
            for(let c = 0; c < COLS; c++){
                drawPixel(c, r, "white");
            }
        }
    }

    function createBoardArray(){
        return Array.from({length: ROWS}, Array(COLS).fill(0));
    }

    /*
    - Create a Canvas representation of a ROWS * COLS Board
    - Create an array to represent the Board
    - Repeat the drop cycle for the piece
    */

    function playGame(){
        setIsGameRunning((prevState) => {
            return !prevState;
        });
    }

    return (
        <>
            <Piece 
                boardCtx={boardCtx} 
                drawPixel={drawPixel} 
                x={x} 
                y={y}
                setY={setY}
                isGameRunning={isGameRunning}
            />
            <canvas ref={boardCanvasRef} width="600" height="600"></canvas>
            <br/>
            <button onClick={playGame}>
                {isGameRunning ? "Pause Game" : "Play Game"}
            </button>
            Y value: {y}
        </>
    )
}
