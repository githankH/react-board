import React, { Component } from 'react';
import Board from './Board';
import './Style.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
        row: '8',
        column: '8',
        owner: Math.floor((Math.random()+0.5))? 'pink': 'blue',
        win: {flag: false, blueWin: 0, pinkWin: 0},
        cellvalue:[]
    }
    this.clickhandler = this.clickhandler.bind(this);
  }

  componentWillMount(){
    this.resetGame(); 
  }

  initCellValue = (row,col)=>{
    let cell =[];
    for(let i=0; i<row; ++i){
        cell.push(new Array(col).fill(0));
    }
    return cell;
  }

  checkWinfromHorizontal=(row,col,target,length)=>{
    //give column and check the value on length path is all the same
      let tmpary=[];
      let adjustCol = col;
      for(let i=col;i>=0;--i){
          if(i === 0){
              //i-1 < 0, boom !!
              adjustCol=0;
              break;
          }         
          if(this.state.cellvalue[row][i]!==this.state.cellvalue[row][i-1]){
              adjustCol=i;
              break;
          } 
      }
      if(adjustCol+length > this.state.column){
        return false;
      }
      tmpary=this.state.cellvalue[row].slice(adjustCol,adjustCol+length);
      return tmpary.every((value)=>value===target);
  }

  checkWinfromVertical=(row,col,target,length)=>{
    //give column and check the value on length path is all the same
      let tmpary=[];
      let adjustRow = row;
      for(let i=row;i>=0;--i){
          if(i === 0){
              //i-1 < 0, boom !!
              adjustRow=0;
              break;
          }
          if(this.state.cellvalue[i][col]!==this.state.cellvalue[i-1][col]){
              adjustRow=i;
              break;
          } 
      }
      if(adjustRow+length > this.state.row){
        return false;
      }
      for(let j=0; j<length;++j){
        //row-i is 'correct' start
        tmpary[j]=this.state.cellvalue[adjustRow+j][col];
      }
      return tmpary.every((value)=>value===target);

  }

  checkWinfromSlashLine=(row,col,target,length)=>{
      let tmpary=[];
      let adjustRow = row;
      let adjustCol = col;
      let i,j;
      for(i=row, j=col; i>=0,j<this.state.column; --i,++j){
          if(i===0 || j===(this.state.column-1)){
              adjustRow=i;
              adjustCol=j;
              break;
          }
          if(this.state.cellvalue[i][j]!==this.state.cellvalue[i-1][j+1]){
              adjustRow=i;
              adjustCol=j;
              break;
          } 
      }
      if(adjustCol-length < 0){
          return false;
      }
      if(adjustRow+length > this.state.row){
          return false;
      }

      for(let j=0; j<length;++j){
          //row-i is 'correct' start
          tmpary[j]=this.state.cellvalue[adjustRow+j][adjustCol-j];
      }
      return tmpary.every((value)=>value===target);
  }

  checkWinfromBackSlashLine=(row,col,target,length)=>{
      let tmpary=[];
      let adjustRow = row;
      let adjustCol = col;
      let i,j;
      for( i=row,j=col; i>=0,j>=0; --i,--j){
          if(i===0 || j===0){
              adjustRow=i;
              adjustCol=j;
              break;
          }
          if(this.state.cellvalue[i][j]!==this.state.cellvalue[i-1][j-1]){
              adjustRow=i;
              adjustCol=j;
              //console.log(`${(adjustRow)}-${adjustCol}`);
              break;
          } 
      }
      if(adjustRow+length > this.state.row){
          return false;
      }
      if(adjustCol+length > this.state.column){
          return false;
      }

      for(let j=0; j<length;++j){
          //row-i is 'correct' start
          tmpary[j]=this.state.cellvalue[adjustRow+j][adjustCol+j];
      }
      return tmpary.every((value)=>value===target);
  }

  clickhandler(row, col){
      if(this.state.win.flag)
          return false;

      let newValue = this.state.cellvalue.concat();
      let name;
      // console.log(newValue);
      if(newValue[row][col] > 0)
          return false;
      
      if(this.state.owner === 'pink'){
        newValue[row][col]=1;
        name='blue';
      }else{
        newValue[row][col]=2;
        name='pink';
      }

      if(this.checkWinfromHorizontal(row,col,newValue[row][col],5) ||
         this.checkWinfromVertical(row,col,newValue[row][col],5) || 
         this.checkWinfromBackSlashLine(row,col,newValue[row][col],5) ||
         this.checkWinfromSlashLine(row,col,newValue[row][col],5) ){
          let {blueWin, pinkWin}=this.state.win;
          if(this.state.owner === 'pink'){
              pinkWin++;
          }else{
              blueWin++;
          }
          this.setState({
              win: {
                  flag:true,
                  blueWin: blueWin,
                  pinkWin: pinkWin,
                }
          });
      }else{
          this.setState({owner:name,cellvalue:newValue});
      }
      return true;
  }

  restartGame= ()=>this.setState({
      cellvalue: this.initCellValue(8,8),
      win:{flag:false,blueWin: this.state.win.blueWin, pinkWin: this.state.win.pinkWin}
    });
  resetGame = ()=>this.setState({
    cellvalue: this.initCellValue(8,8),
    win:{flag:false,blueWin: 0, pinkWin: 0}
  });

  render() {
    return (
      <div className='container'>
          <h1 className='gametitle'>五子棋: <span style={{color:this.state.owner}}>{this.state.owner.toUpperCase()}</span> {this.state.win.flag? " Win" :" Turn" }</h1>
          <div className='board'>
          <Board col={this.state.column} row={this.state.row} 
                 cells={this.state.cellvalue} clickhandler={this.clickhandler}/>
          </div>
          <div className='gameinfo'>
              <h2>HISTORY</h2>
              <h4><span style={{color:'pink'}}>PINK</span> : <span style={{color:'rgb(137, 243, 253)'}}>Blue</span></h4>
              <h4>{this.state.win.pinkWin} : {this.state.win.blueWin}</h4>
              <button onClick={this.restartGame}>restart</button>
              <button onClick={this.resetGame}>reset</button>
          </div>
      </div>
    );
  }
}

export default App;
