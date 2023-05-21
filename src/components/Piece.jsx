import React, { useEffect, useState, useRef } from 'react'

export default function Piece({ boardCtx, drawPixel, x, isGameRunning }) { //boardCtx, boardArray

    //const [y, setY] = useState(0);
    const xRef = useRef(0);
    const yRef = useRef(0);
    const [testPiece, setTestPiece] = useState([]);
    const animRef = useRef();

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

    /*
    const piece = () => {
        const randomInt = Math.floor(Math.random() * pieces.length);
        return pieces[randomInt];
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
    function pieceDown()
    {
        undrawPiece();
        //y++;
        yRef.current = yRef.current + 1;
        console.log(yRef.current);
        //setY(num => num++);
        //console.log(setY);
        //console.log(`y: ${y}`);
        drawPiece();
    }
    function pieceLeft(){
        undrawPiece();
        xRef.current = xRef.current - 1;
        //x--;
        drawPiece();
    }
    function pieceRight(){
        undrawPiece();
        xRef.current = xRef.current + 1;
        //x++;
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
