import React, {Component} from 'react';

class Cell extends Component{
    constructor(props){
        super(props);
        this.state= {
            row: props.row,
            col: props.col,
            value: props.value,
        };
        this.clickhandler = this.clickhandler.bind(this);
    }

    clickhandler(e){
        // console.log(e.target);
        if(!this.props.clickhandler(this.state.row,this.state.col))
            return ;
        if(this.state.name !== 'cell')
            return ;
/*
        const cellname = this.props.owner+'cell';
        this.setState((prevState)=>{
            return ({name:cellname})
        });
*/
    }
    circleColor = (value)=>{
        let name;
        //console.log(`r: ${this.state.row} c: ${this.state.col} v: ${value}`);
        if(value === 1)
            name = 'pinkcell';
        else if(value === 2)
            name = 'bluecell';
        else
            name = 'cell';
        return name;
    }
    render(){
        return(
            <div className={this.circleColor(this.props.value)} onClick={this.clickhandler} />
        );
    }
}


export default Cell;
