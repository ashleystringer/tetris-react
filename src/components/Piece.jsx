import React, { useEffect } from 'react'

export default function Piece({ boardCtx }) { //boardCtx, boardArray

    useEffect(()=>{
        console.log(`boardCtx in Piece: ${boardCtx}`);
    }, [boardCtx]);

    /*
    this.piece = 0;
    this.X = 0;
    this.Y = 0;

    funtion pieceDown(){

    }
    funtion pieceLeft(){
        
    }
    funtion pieceRight(){
        
    }
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
