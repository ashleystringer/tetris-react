import React, { useEffect, useState, useRef } from 'react'

export default function Piece({ boardCtx, drawPixel, x, y, isGameRunning }) { //boardCtx, boardArray

    const [testPiece, setTestPiece] = useState([]);

    useEffect(()=>{
        console.log('boardCtx in Piece');
        console.log(boardCtx);

        setTestPiece([
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ]);

        //drawPiece();

        pieceDown();

        //drop(dropTime);
        


    }, [boardCtx]);

    useEffect(() => {
        console.log(`isGameRunning: ${isGameRunning}`);
        let dropTime = Date.now();
        function drop(){
            let now = Date.now();
            let deltaTime = now - dropTime;
            if(deltaTime > 1000){
                pieceDown();
                dropTime = Date.now();
            }
            requestAnimationFrame(drop);
        }

        drop(); 

       return () => { cancelAnimationFrame(drop)}
    }, [isGameRunning]);


    function drawPiece(){
        for(let r = 0; r < testPiece.length; r++){
            for(let c = 0; c < testPiece.length; c++){
                if(testPiece[r][c]){
                    drawPixel(r + x, c + y, "blue");   
                }
            }
        }
    }
    function undrawPiece(){
        for(let r = 0; r < testPiece.length; r++){
            for(let c = 0; c < testPiece.length; c++){
                drawPixel(r + x, c + y, "white");
            }
        }
    }
    function pieceDown(){
        undrawPiece();
        y++;
        drawPiece();
    }
    function pieceLeft(){
        undrawPiece();
        x--;
        drawPiece();
    }
    function pieceRight(){
        undrawPiece();
        x++;
        drawPiece();
    }

    //let dropTime = new Date.now();
    function drop(dropTime){
        //console.log('drop');
        //console.log(`dropTime: ${dropTime}`);
        let now = Date.now();
        let deltaTime = now - dropTime;
        console.log(`deltaTime: ${deltaTime}`);

        if(deltaTime > 1000 && isGameRunning){
            //pieceDown();
            dropTime = Date.now();
            console.log("deltaTime");
        }
        requestAnimationFrame(drop);
    }
    
    return (
        <div>
            
        </div>
    )
}
