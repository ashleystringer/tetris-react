import React, { useEffect, useState, useRef } from 'react'
//import "../constants/pieces.js";

export default function Piece({ values }) { //boardCtx, boardArray
    const {
        boardCtx, 
        drawPixel, 
        pieceOrient, 
        setPieceOrient, 
        isGameRunning, 
        piece,
        setPiece,
        randomPiece,
        boardArray,
        ROWS,
        COLS
    } = values;
    /*
    - Get the collision detection
    */

    const xRef = useRef(0);
    const yRef = useRef(0);
    const dirIndexRef = useRef(0);
    const animRef = useRef();

    useEffect(()=>{
        //console.log('boardCtx in Piece');
        //console.log(boardCtx);
    }, [boardCtx]);

    useEffect(() => {
        //console.log(`pieceOrient: ${pieceOrient}`);

        handleOrientation();
    }, [pieceOrient]);

    useEffect(() => {
        //console.log(`isGameRunning: ${isGameRunning}`);
        let dropTime = Date.now();
        function drop(){
            let now = Date.now();
            let deltaTime = now - dropTime;
            if(deltaTime > 1000){
                pieceDown();
                dropTime = Date.now();
            }
            if(isGameRunning){
                animRef.current = requestAnimationFrame(drop); 
            }
            //animRef.current = requestAnimationFrame(drop);
        }

        animRef.current = requestAnimationFrame(drop);
        
        //drop(); 

       return () => { cancelAnimationFrame(animRef.current)}
    }, [isGameRunning]);
    
    function handleOrientation(){
        switch(pieceOrient){
            case "87":
                pieceRotate();
                break;
            case "65":
                pieceLeft();
                break;
            case "68":
                pieceRight();
                break;
            case "83":
                pieceDown();
                break;
        }
        setPieceOrient("");
    }

    /*
        - One a piece is locked
        - indicate that a new piece needs to be created
    */

    function drawPiece(){
        const index = dirIndexRef.current;
        const selectedPiece = piece.piece[index];

        for(let r = 0; r < selectedPiece.length; r++){
            for(let c = 0; c < selectedPiece.length; c++){
                if(selectedPiece[r][c]){ //piece.piece[dirIndexRef.current]
                    drawPixel(r + xRef.current, c + yRef.current, "blue");   
                }
            }
        }
    }
    function undrawPiece(){
        const index = dirIndexRef.current;
        const selectedPiece = piece.piece[index];
        console.log(selectedPiece);

        for(let r = 0; r < selectedPiece.length; r++){ 
            for(let c = 0; c < selectedPiece.length; c++){
                if(selectedPiece[r][c]){ //piece.piece[dirIndexRef.current]
                    drawPixel(r + xRef.current, c + yRef.current, "white");   
                }
            }
        }
    }

    function pieceRotate(){
        undrawPiece();

       dirIndexRef.current = dirIndexRef.current + 1;

        if(dirIndexRef.current >= piece.piece.length){
            dirIndexRef.current = 0;
        }
        drawPiece();
    }

    function pieceDown()
    {
        if(!checkCollision(0, 1)){
            undrawPiece();
            yRef.current = yRef.current + 1;
            drawPiece();
        }
    }
    function pieceLeft(){
        if(!checkCollision(-1, 0)){
            undrawPiece();
            xRef.current = xRef.current - 1;
            drawPiece();
        }
    }
    function pieceRight(){
        if(!checkCollision(1, 0)){
            undrawPiece();
            xRef.current = xRef.current + 1;
            drawPiece();
        }
    }

    
    function checkCollision(x, y){
        const index = dirIndexRef.current;
        const selectedPiece = piece.piece[index];

        for(let r = 0; r < selectedPiece.length; r++){
            for(let c = 0; c < selectedPiece.length; c++){
                if(!selectedPiece[r][c]){
                    continue;
                }

                let offsetX = r + xRef.current + x;
                let offsetY = c + yRef.current + y;

                if(offsetX < 0 || offsetX >= COLS){ //|| offsetY >= ROWS
                    console.log("checkCollision is true");
                    return true;
                }

                if(offsetY >= ROWS){
                    console.log("checkCollision is true");
                    lockPiece();
                    return true;
                }

                if(boardArray[r][c] !== "white"){ //
                    console.log("boardArray[r][c] !== 'white'");
                    console.log(`xRef: ${xRef.current}, yRef:  ${yRef.current}`);
                    console.log(`r: ${r}, c: ${c}`);

                    lockPiece();

//                    console.table(boardArray);

                    return true;
                }
            }
        }
    }

    function lockPiece(){
        const index = dirIndexRef.current;
        const selectedPiece = piece.piece[index];

        for(let r = 0; r < selectedPiece.length; r++){
            for(let c = 0; c < selectedPiece.length; c++){
                if(selectedPiece[r][c]){
                    const offsetX = xRef.current + r;
                    const offsetY = yRef.current + c;

                    drawPixel(offsetX, offsetY, "blue");
                    boardArray[r][c] = "blue";
                }
            }
        }

        console.table(boardArray);

        resetPiece();
        
    }

    function resetPiece(){
        xRef.current = 0;
        yRef.current = 0;
        const newPiece = randomPiece();
        console.log("newPiece:");
        console.log(newPiece);
        setPiece(newPiece);
    }
    return (
        <div>
            
        </div>
    )
}
