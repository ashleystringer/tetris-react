import React, { useRef, useEffect, useState } from 'react';
import Piece from "./Piece";

export default function Board() {

    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;

    const boardCanvasRef = useRef();
    const [boardCtx, setBoardCtx] = useState([]);

    useEffect(() => {

        console.log(`boardCtx: ${boardCtx}`);

        drawBoardCanvas();

        setBoardCtx(boardCanvasRef.current.getContext("2d"));

    }, []);

    function drawBoardCanvas(){
        console.log(boardCanvasRef.current.getContext("2d"));

        const boardContext = boardCanvasRef.current.getContext("2d");

        for(let r = 0; r < ROWS; r++){
            for(let c = 0; c < COLS; c++){
                boardContext.fillStyle = "white"
                boardContext.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

                boardContext.strokeStyle = "black";
                boardContext.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
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
    return (
        <>
            <div>Hello</div>
            <div>{boardCtx}</div>
            <Piece boardCtx={boardCtx}/>
            <canvas ref={boardCanvasRef} width="600" height="600"></canvas>
        </>
    )
}
