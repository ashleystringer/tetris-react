import React, { useEffect, useState, useRef } from 'react'

export default function Piece({ boardCtx, drawPixel, x, y }) { //boardCtx, boardArray

    const [testPiece, setTestPiece] = useState([]);

    useEffect(()=>{
        console.log('boardCtx in Piece');
        console.log(boardCtx);

        setTestPiece([
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ]);

        drawPiece();

        pieceDown();
    }, [boardCtx]);

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
        /*
            undraw();
            x++;
            draw();
        */
    }
    function pieceRight(){
        /*
            undraw();
            x--;
            draw();
        */
    }

    /*
    this.piece = 0;
    this.X = 0;
    this.Y = 0;


    function draw(){
        for(let x = 0; x < piece.length; x++){
            for(let y = 0; y < piece.length; y++){
                //boardCtx.fillStyle();
                //boardCtx.fillRect();
            }
        }
    }
    function undraw(){

    }
    */
    /*
        - Draw a piece onto the Board canvas iterating through each "bit"
        - Undraw a piece
        - Create an X and Y for a piece that corresponds to directions on the Board
        - Simulate moving down, left, and right with these
            - Undraw, (X or Y), draw
        - Prevent a piece from going out of bounds using collision detection
    */
    return (
        <div>
            
        </div>
    )
}
