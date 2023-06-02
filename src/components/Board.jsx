import React, { useRef, useEffect, useState, useCallback } from 'react';
import Piece from "./Piece";
import pieceArray from "../constants/pieces";

export default function Board() {

    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;

    const animRef = useRef();
    const boardContextRef = useRef();
    const [piece, setPiece] = useState({});
    const [boardCtx, setBoardCtx] = useState([]); 

    const [isGameRunning, setIsGameRunning] = useState(false);

    useEffect(() => {
        setBoardCtx(boardContextRef.current.getContext("2d"));
        drawBoardCanvas();
    });

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    useEffect(() => {

        console.log(`pieceArray.length: ${pieceArray.length}`);

        let dropTime = Date.now();
        function drop(){
            let now = Date.now();
            let deltaTime = now - dropTime;

            if(deltaTime > 1000){
                dropTime = Date.now();
                const randomInt = Math.floor(Math.random() * pieceArray.length);
                setPiece(pieceArray[randomInt]);
                console.log(`randomInt: ${randomInt}`);
                console.log(piece);
            }
            if(isGameRunning){
                animRef.current = requestAnimationFrame(drop);
            }
        }

        animRef.current = requestAnimationFrame(drop);

        return () => { cancelAnimationFrame(animRef.current) }
    
    }, [isGameRunning])

    function handleKeyDown(){
        console.log("onKeyDown");
    }

    function drawPixel(x, y, color){
        const boardContext = boardContextRef.current.getContext("2d");
        
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

    function toggleGame(){
        setIsGameRunning(prevState => {
            return !prevState;
        });
    }

    const randomPiece = () => {
        const randomInt = Math.floor(Math.random() * pieceArray.length);
        //return pieceArray[randomInt];
        return randomInt;
    };

    return (
        <>
            <canvas ref={boardContextRef} width={600} height={600}></canvas>
            <br/>
            <button onClick={toggleGame}>{isGameRunning ? "Pause Game" : "Play Game"}</button>
        </>
    )
}
