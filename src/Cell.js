import React, {Component} from 'react';

class Cell extends Component{
    constructor(props){
        super(props);
        this.state= {
            row: props.row,
            col: props.col,
            name: 'cell',
        };
        this.clickhandler = this.clickhandler.bind(this);
    }

    clickhandler(e){
        if(this.state.name !== 'cell')
            return;
        this.props.clickhandler(this.state.row,this.state.col);
        // console.log(e.target);
        const cellname = this.props.owner+'cell';
        this.setState((prevState)=>{
            return ({name:cellname})
        });
    }

    render(){
        return(
            <div className={this.state.name} onClick={this.clickhandler} />
        );
    }
}


export default Cell;
