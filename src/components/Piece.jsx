import React, { useEffect, useState, useRef } from 'react'

export default function Piece({ boardCtx, drawPixel, x, y, setY, isGameRunning }) { //boardCtx, boardArray

    //const [y, setY] = useState(0);
    const [testPiece, setTestPiece] = useState([]);
    const animRef = useRef();

    useEffect(() => {
        console.log("Y in useEffect hook");
    }, [y]);

    useEffect(()=>{
        console.log('boardCtx in Piece');
        console.log(boardCtx);

        setTestPiece([
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ]);

    }, [boardCtx]);

    useEffect(() => {
        console.log(`isGameRunning: ${isGameRunning}`);
        let dropTime = Date.now();
        function drop(){
            console.log(`x: ${x}, y: ${y}`);
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
    function pieceDown()
    {
        undrawPiece();
        y++;
        //setY(num => num++);
        //console.log(setY);
        //console.log(`y: ${y}`);
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
    
    return (
        <div>
            
        </div>
    )
}
