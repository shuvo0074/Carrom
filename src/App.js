import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      pos_array:[
        ['0','.','.','.','.','.','.','.','.','.','.','.','.','.','.','0'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','a','b','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','c','d','e','f','g','.','.','.','.','.','.'],
        ['.','.','.','.','.','h','i','j','k','l','.','.','.','.','.','.'],
        ['.','.','.','.','.','m','n','o','p','q','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','r','s','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
        ['0','.','.','.','.','.','.','.','.','.','.','.','.','.','.','0'],
      ]
    }
  }
   getIndexOf=(k)=> {
    for (var i = 0; i < this.state.pos_array.length; i++) {
      var index = this.state.pos_array[i].indexOf(k);
      if (index > -1) {
        return {
          x:index,
          y:i
        };
      }
    }
  }
  _hit=(speed,pawn_position,own_position,pawn_id,own_id,pawn_angle)=>{
    let distance=parseInt(Math.sqrt((pawn_position.x-own_position.x)*(pawn_position.x-own_position.x)+(pawn_position.y-own_position.y)*(pawn_position.y-own_position.y)))
    let left_speed=speed-distance
    let temp_array=this.state.pos_array
    if(left_speed>0){
      for (let i=0;i<=left_speed;i++){

        if(pawn_angle==='left'){
          let new_position={...own_position,x:own_position.x+i}
          if(this.state.pos_array[new_position.x][new_position.y]!='.'){
            temp_array[pawn_position.y][pawn_position.x]=own_id
            this._hit(left_speed,new_position,pawn_position,this.state.pos_array[new_position.x][new_position.y],pawn_id,pawn_angle)
          }
        }
        else if(pawn_angle==='up'){
          let new_position={...own_position,y:own_position.y-i}
          //console.log("up",speed,pawn_position,own_position,pawn_id,own_id,pawn_angle,left_speed,i,new_position)

          if(this.state.pos_array[new_position.x][new_position.y]!='.')
        {          
          temp_array[pawn_position.y][pawn_position.x]=own_id
          this._hit(left_speed,new_position,pawn_position,this.state.pos_array[new_position.x][new_position.y],pawn_id,pawn_angle)
        }
        }
        else if(pawn_angle==='right'){
          let new_position={...own_position,x:own_position.x-i}
          if(this.state.pos_array[new_position.x][new_position.y]!='.')
        {          
          temp_array[pawn_position.y][pawn_position.x]=own_id
          this._hit(left_speed,new_position,pawn_position,this.state.pos_array[new_position.x][new_position.y],pawn_id,pawn_angle)
        }
        }
        else if(pawn_angle==='left_c'){
          let new_position={y:own_position.y-i,x:own_position.x+i}
          if(this.state.pos_array[new_position.x][new_position.y]!='.')
          {
          temp_array[pawn_position.y][pawn_position.x]=own_id
          this._hit(left_speed,new_position,pawn_position,this.state.pos_array[new_position.x][new_position.y],pawn_id,pawn_angle)
        }
        }
        else if(pawn_angle==='right_c'){
          let new_position={y:own_position.y-i,x:own_position.x-i}
          if(this.state.pos_array[new_position.x][new_position.y]!='.')
        {  temp_array[pawn_position.y][pawn_position.x]=own_id
          this._hit(left_speed,new_position,pawn_position,this.state.pos_array[new_position.x][new_position.y],pawn_id,pawn_angle)
        }
        }
      }
    }
    console.log("temp_array",temp_array)
    this.setState({
      pos_array:temp_array
    })

    
  }
  render(){
    let striker_pos = {
      x:8,
      y:15
    }
    let pawn_id='s'
    let pawn_position=this.getIndexOf(pawn_id)
    let speed='12' //0-15
    let pawn_angle="up"
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(d)=>{
              this._hit(speed,pawn_position,striker_pos,pawn_id,'z',pawn_angle)
                        }}
          >
            Learn React
          </button>
        </header>
      </div>
    );
  }
}

export default App;
