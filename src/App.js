import React from 'react';
// import logo from './logo.svg';
import './App.css';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      //z 8,15,y 9,12
      pawns_on_board:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s'],
      available_pawns:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s'],
      pawn: '',
      speed:1,
      pawnSelected:false,
      Zselected:false,
      angleSelected:false,
      striker_pos:{x:0,y:15},
      striker:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      available_angle:[],
      angle:'',
      pos_array:[
        ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
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
    this.setState({
      striker_pos:{
        x:parseInt(data.target.value),
        y:15
      }
    })
    let temp=this.state.pos_array
    if (temp[0][0]!='.' || temp[0][15]!='.'){

      let arr=this.state.pawns_on_board
      arr=arr.filter((value)=>{
        return value != temp[0][15]
      })

      arr=arr.filter((value)=>{
        return value != value != temp[0][0]
      })

      temp[0][0] = '.'
      temp[0][15] = '.'
      await this.setState({
        pawns_on_board:arr
      })
    }
    for (var i = 0; i < this.state.pos_array.length; i++) {
      var index = this.state.pos_array[i].indexOf('z');
      if (index > -1) {
        temp[i][index]='.'
      }
    }
    temp[15][parseInt(this.state.striker_pos.x)]='z'
    this.setState({
      pos_array:temp
    })
    let arr=[]
    let arr2=this.state.pawns_on_board
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
          x:parseInt(this.state.striker_pos.x),
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
  _cleanRepeatedValue=async(arr,id,pos,angle)=>{
    if (angle==='left'){
      let i=pos.y
        for (let j=0;j<pos.x;j++){
          if (arr[i][j]===id){
            arr[i][j]='.'
          }
      }
    }
    else if (angle==='right'){
      let i=pos.y
        for (let j=pos.x+1;j<arr[i].length;j++){
          if (arr[i][j]===id){
            arr[i][j]='.'
          }
      }
    }
    else {
      for (let i=pos.y+1;i<arr.length;i++){
        for (let j=0;j<arr[i].length;j++){
          if (arr[i][j]===id){
            arr[i][j]='.'
          }
        }
      }
    }
    return arr
  }
  _onPawnSelect=(data)=>{
    let pos=this.getIndexOf(data.target.value)
    let arr=[]
    if (this.state.pos_array[pos.y+1][pos.x]==='.'){
      arr.push('down')
    }
    if (this.state.pos_array[pos.y+1][pos.x+1]==='.' && this.state.striker_pos.x>pos.x && pos.x<15){
      arr.push('right_c')
    }
    if (this.state.pos_array[pos.y+1][pos.x-1]==='.' && this.state.striker_pos.x<pos.x && pos.x>1){
      arr.push('left_c')
    }
    if (this.state.pos_array[pos.y][pos.x+1]==='.' && this.state.striker_pos.x>pos.x && pos.x<15){
      arr.push('right')
    }
    if (this.state.pos_array[pos.y][pos.x-1]==='.' && this.state.striker_pos.x<pos.x && pos.x>1){
      arr.push('left')
    }
    this.setState({
      available_angle:arr,
      pawn:data.target.value,
      pawnSelected:true
    })
  }
  _hit=async(speed,own_position,own_id,pawn_angle)=>{    
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

      if (new_position.x<=15 && new_position.y>-1 && new_position.x>-1 && speed>0){
        this._hit(
          speed-1,
          new_position,
          temp_array[new_position.y][new_position.x]=='.'?
          own_id
          : temp_array[new_position.y][new_position.x]
        ,pawn_angle
                  )
        
        temp_array[new_position.y][new_position.x]=own_id
        this._cleanRepeatedValue(temp_array,own_id,await this.getIndexOf(own_id),pawn_angle).then(
          (ar)=>{
            this.setState({
              pos_array:ar,
              angle:pawn_angle
            })
            console.log(this.state.pos_array)
          }
        )
    }
    else {
      temp_array[own_position.y][own_position.x]=own_id
      this.setState({
        pos_array:temp_array,
        angle:pawn_angle
      })
      console.log("xced",this.state.pos_array)
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
                this._onPawnSelect(data)
                }}
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
