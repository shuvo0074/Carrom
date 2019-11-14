import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      //z 8,15,y 9,12
      available_pawns:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s'],
      pawn: '',
      speed:1,
      pawnSelected:false,
      Zselected:false,
      angleSelected:false,
      striker_pos:{x:0,y:15},
      striker:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      available_angle:['right','left'],
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
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
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
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <select
            className=""
            onChange={(data)=>{
                this.setState({
                  striker_pos:{
                    x:parseInt(data.target.value),
                    y:15
                  },
                  Zselected:true
                })}}
            >
            <option selected disabled value={null} >{"select striker position"}</option>
            {
                this.state.striker.map(data=>
                  <option value={data} >{data}</option>
                )
                }
            </select>
          {
            this.state.Zselected?
          <div>
          <select
            className=""
            onChange={(data)=>{
                this.setState({
                  pawn:data.target.value,
                  pawnSelected:true
                })}}
            >
            <option selected disabled value={null} >{"select pawn to hit"}</option>
                {
                this.state.available_pawns.map(data=>
                  <option value={data} >{data}</option>
                )
                }
            </select>
            {
              this.state.pawnSelected?
              <div>
              <select
            className=""
            onChange={(data)=>{
                this.setState({
                  angle:data.target.value,
                  angleSelected:true
                })}}
            >
            <option selected disabled value={null} >{"select side of pawn to hit"}</option>
              {
                this.state.available_angle.map(data=>
                  <option value={data} >{data}</option>
                )
                }
            </select>
            {
              this.state.angleSelected?
              <div>
              <select
                className=""
                onChange={(data)=>{
                    this.setState({
                      speed:data.target.value,
                      speedSelected:true
                    })}}
                >
                <option selected disabled value={null} >{"select speed of striker"}</option>
                  {
                    this.state.striker.slice(1,16).map(data=>
                      <option value={data} >{data}</option>
                    )
                    }
                </select>
              {
                this.state.speedSelected?
                <button
                  className="App-link"
                  onClick={(d)=>{
                    console.log(this.getIndexOf(this.state.pawnSelected))
                    this._hit(this.state.speed,this.getIndexOf(this.state.pawn),this.state.striker_pos,this.state.pawn,'z',this.state.angle)
                              }}
                >
                  hit!
                </button>
          :<div/>
              }
          </div>
          :<div/>
            }
            </div>:
            <div/>
            }
            </div>
            :<div/>
          }
        </header>
      </div>
    );
  }
}

export default App;
