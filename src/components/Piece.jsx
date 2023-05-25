import React, { useEffect, useState, useRef } from 'react'
//import "../constants/pieces.js";

export default function Piece({ boardCtx, drawPixel, pieceOrient, setPieceOrient, isGameRunning }) { //boardCtx, boardArray

    /*
    - Get the piece directions working
    - Get the piece randomized
    - Get the collision detection
    */

    const xRef = useRef(0);
    const yRef = useRef(0);
    const [testPiece, setTestPiece] = useState([]);
    const animRef = useRef();

    useEffect(()=>{
        //console.log('boardCtx in Piece');
        //console.log(boardCtx);

        setTestPiece([
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ]);

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
        console.log("handleOrientation");
        switch(pieceOrient){
            case "87":
                //rotate
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
    function lockPiece() {
        for (let r = 0; r < piece.selectedPiece.length; r++) {
            for (let c = 0; c < piece.selectedPiece.length; c++) {
                if (piece.selectedPiece[r][c]) {
                    const offsetX = piece.selectedPiece.x + r;
                    const offsetY = piece.selectedPiece.y + c;

                    drawPixel(offsetX, offsetY, piece.color);
                }
    }
  }

  piece = new Piece(pieceArray[1]);
  setPiece({});
}
    */

    function drawPiece(){
        for(let r = 0; r < testPiece.length; r++){
            for(let c = 0; c < testPiece.length; c++){
                if(testPiece[r][c]){
                    drawPixel(r + xRef.current, c + yRef.current, "blue");   
                }
            }
        }
    }
    function undrawPiece(){
        for(let r = 0; r < testPiece.length; r++){
            for(let c = 0; c < testPiece.length; c++){
                drawPixel(r + xRef.current, c + yRef.current, "white");
            }
        }
    }

    function pieceRotate(){
        undrawPiece();
        //
        drawPiece();
    }

    function pieceDown()
    {
        undrawPiece();
        yRef.current = yRef.current + 1;
        drawPiece();
    }
    function pieceLeft(){
        undrawPiece();
        xRef.current = xRef.current - 1;
        drawPiece();
    }
    function pieceRight(){
        undrawPiece();
        xRef.current = xRef.current + 1;
        drawPiece();
    }

    /*
    function checkCollision(x, y){
        for(let r = 0; r < testPiece.length; r++){
            for(let c = 0; c < testPiece.length; c++){
                if(!testPiece[r][c]){
                    continue;
                }

                let offsetX = r + testPiece.x + xRef.current;
                let offsetY = c + testPiece.y + yRef.current;

                if(offsetX < 0 || offsetX >= COLS || offsetY >= ROLS){
                    return true;
                }

                if(boardArray[r][c] !== "white"){
                    return true;
                }
            }
        }
    }
    */
    
    return (
        <div>
            
        </div>
    )
}
