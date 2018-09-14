import React from 'react';
import Cell from './Cell.js';

import './Style.css';

function renderCol(row, props){
    const cl = props.col;
    let colCell=[];
    for(let i=0;i<cl;++i)
        colCell.push(<Cell key={`cell-${row}-${i}`} 
                           row={row} 
                           col={i}
                           owner={props.owner}
                           clickhandler={props.clickhandler}/>);

    return(colCell);
}

const Board = (props)=>{
    const row = props.row;

    let rowCell=[];
    
    for(let i=0; i<row; ++i){
        rowCell.push(
            <div className='App' key={`row${i}`}>
            {renderCol(i, props)}
            </div>
        );
    }

    return(rowCell);
}

export default Board;