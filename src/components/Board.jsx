import React, { useRef, useEffect, useState } from 'react';
import Piece from "./Piece";
import pieceArray from "../constants/pieces";

export default function Board() {

    /*
        - Create a Piece
        - ??? Collision detection 
        - ??? "Locking" pieces
        - ??? Removing the bottom row of the Board
    */

    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [pieceOrient, setPieceOrient] = useState("");

    const boardCanvasRef = useRef();
    const [boardCtx, setBoardCtx] = useState([]);

    useEffect(() => {

        //console.log(`boardCtx: ${boardCtx}`);

        //console.log(`pieceArray.length: ${pieceArray.length}`);

        drawBoardCanvas();

        //console.log(boardCanvasRef.current.getContext("2d"));

        setBoardCtx(boardCanvasRef.current.getContext("2d"));

    }, []);

    useEffect(() => {
        console.log("addEventListener");
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, []);

    function handleKeyDown(e){
        //setPieceOrient(e.keyCode);
        switch(e.keyCode){
            case 87:
                //rotate
                console.log("rotate");
                setPieceOrient("87");
                break;
            case 65:
                console.log("left");
                setPieceOrient("65");
                //left
                break;
            case 68:
                console.log("right");
                setPieceOrient("68");
                //right
                break;
            case 83:
                console.log("down");
                setPieceOrient("83");
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
                //boardArray[r][c] = "white";
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

    
    const piece = () => {
        const randomInt = Math.floor(Math.random() * piecesArray.length);
        return piecesArray[randomInt];
    }

    return (
        <>
            <Piece 
                boardCtx={boardCtx} 
                drawPixel={drawPixel} 
                pieceOrient={pieceOrient}
                setPieceOrient={setPieceOrient}
                isGameRunning={isGameRunning}
            />
            <canvas ref={boardCanvasRef} width="600" height="600"></canvas>
            <br/>
            <button onClick={playGame}>
                {isGameRunning ? "Pause Game" : "Play Game"}
            </button>
        </>
    )
}
