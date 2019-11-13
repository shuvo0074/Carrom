import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      //z 8,15,y 9,12
      angle:'',
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
        if(pawn_angle==='left'){
          for (let i=1;i<=left_speed;i++){
            let new_position={...pawn_position,x:pawn_position.x+i}
            temp_array[pawn_position.y][pawn_position.x]=own_id
            if(pawn_id==='.')
            {
              this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],own_id,pawn_angle)
            }
            else
            {
              this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],pawn_id,pawn_angle)
            }
            break
        }
        }
        else if(pawn_angle==='down'){
          for (let i=1;i<=left_speed;i++){
          let new_position={...pawn_position,y:(pawn_position.y)-i}
          temp_array[pawn_position.y][pawn_position.x]=own_id
          if(pawn_id==='.')
          {
            this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],own_id,pawn_angle)
          }
          else
          {
            this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],pawn_id,pawn_angle)
          }
          break
      }
        }
        else if(pawn_angle==='right'){
          for (let i=1;i<=left_speed;i++){
            let new_position={...pawn_position,x:pawn_position.x-i}
            temp_array[pawn_position.y][pawn_position.x]=own_id
            if(pawn_id==='.')
            {
              this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],own_id,pawn_angle)
            }
            else
            {
              this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],pawn_id,pawn_angle)
            }
            break
        }
        }
        else if(pawn_angle==='left_c'){
          for (let i=1;i<=left_speed;i++){
            let new_position={y:pawn_position.y-i,x:pawn_position.x+i}
            temp_array[pawn_position.y][pawn_position.x]=own_id
            if(pawn_id==='.')
            {
              this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],own_id,pawn_angle)
            }
            else
            {
              this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],pawn_id,pawn_angle)
            }
            break
        }
        }
        else if(pawn_angle==='right_c'){
          for (let i=1;i<=left_speed;i++){
            let new_position={y:pawn_position.y-i,x:pawn_position.x-i}
            temp_array[pawn_position.y][pawn_position.x]=own_id
            if(pawn_id==='.')
            {
              this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],own_id,pawn_angle)
            }
            else
            {
              this._hit(left_speed,new_position,pawn_position,temp_array[new_position.y][new_position.x],pawn_id,pawn_angle)
            }
            break
        }
        }
      
    }
    if (left_speed<=0){
      this.setState({
        pos_array:temp_array,
        angle:pawn_angle
      })
      console.log(this.state.pos_array)
    } 
  }
  render(){
    let striker_pos = {
      x:8,
      y:15
    }
    let pawn_id='s'
    let pawn_position=this.getIndexOf(pawn_id)
    let speed=12 //0-15
    let pawn_angle="down"
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
