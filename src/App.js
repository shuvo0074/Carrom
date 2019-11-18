import React from 'react';
import logo from './logo.svg';
import './App.css';
const pawn_list=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s']
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
      available_angle:['down','left','right','right_c','left_c'],
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
  _checkLinear=(a,b,c)=>{
    if((b.y-a.y) / (b.x-a.x) == (c.y-a.y) / (c.x-a.x)){
      return true
    }
    else {
      return false
    }
  }
  _selectStrikerPosition=async (data)=>{
    let temp=this.state.pos_array
    temp[15][parseInt(data.target.value)]='z'
    this.setState({
      pos_array:temp
    })
    let arr=[]
    let arr2=pawn_list
    for (var i = 0; i < this.state.pos_array.length; i++) {
    for (let j=14;j>0;j--){
      if(this.state.pos_array[j][i]!='.'){
        arr.push(this.state.pos_array[j][i])
        arr2=arr2.filter((value)=>{
          return value != this.state.pos_array[j][i]
        })
        break
      }
    }
    }
    arr.map((t)=>{
      arr2.map((x)=>{
        if (
          !this._checkLinear({
          x:parseInt(data.target.value),
          y:15
        },this.getIndexOf(x),this.getIndexOf(t))
        ){
          arr2=arr2.filter((value)=>{
            return value != x
          })
        }
      })
    })

    arr.concat(arr2)
    this.setState({
      striker_pos:{
        x:parseInt(data.target.value),
        y:15
      },
      available_pawns:arr,
      Zselected:true
    })
  }
  _StrikerHit=(speed,pawn_position,own_position,pawn_id,own_id,pawn_angle)=>{
    let distance=parseInt(Math.sqrt((pawn_position.x-own_position.x)*(pawn_position.x-own_position.x)+(pawn_position.y-own_position.y)*(pawn_position.y-own_position.y)))
    let left_speed=speed-distance
    if(left_speed>0){
      let temp_array=this.state.pos_array
      temp_array[own_position.y][own_position.x]='.'
      temp_array[pawn_position.y][pawn_position.x]=own_id
      this._hit(left_speed,pawn_position,pawn_id,pawn_angle)
    }
    else {
      console.log("not enough speed !!")
    }
  }
  
  _hit=(speed,own_position,own_id,pawn_angle)=>{
    console.log(speed,own_position,own_id,pawn_angle)
    
            let new_position=
            pawn_angle==='left'?
            {...own_position,x:own_position.x+1}
            :pawn_angle==='down'?
            {...own_position,y:(own_position.y)-1}
            :pawn_angle==='right'?
            {...own_position,x:own_position.x-1}
            :pawn_angle==='left_c'?
            {y:own_position.y-1,x:own_position.x+1}
            :pawn_angle==='right_c'?
            {y:own_position.y-1,x:own_position.x-1}
            :{...own_position}
            let temp_array=this.state.pos_array
      
              if (new_position.x<15 && new_position.y>-1 && new_position.x>-1 && speed>0){
                this._hit(
                  speed-1,
                  new_position,
                  temp_array[new_position.y][new_position.x]=='.'?
                  own_id
                  : temp_array[new_position.y][new_position.x]
                ,pawn_angle
                          )
                
                temp_array[new_position.y][new_position.x]=own_id

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
                this._selectStrikerPosition(data)
                }
            }
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
                    this.setState({
                      pawnSelected:false,
                      Zselected:false,
                      angleSelected:false,
                      speedSelected:false
                    })
                    this._StrikerHit(this.state.speed,this.getIndexOf(this.state.pawn),this.state.striker_pos,this.state.pawn,'z',this.state.angle)
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
