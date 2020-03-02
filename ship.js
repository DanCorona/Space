

var status = ["Idling","Traveling","Scanning","Minning"];
var gridChars='ABCDEFGHIJ';
var gridChars2='0123456789';
var spaceBodies={};
var spaceIcons={shipIcon:"🚀",asteroidIcon: '🌑',}
var timeHTML =``;
//emojis are cool 👨‍💻
const shipIcon = "🚀";
const asteroidIcon= '🌑';

function   makeRandomId(lengthChar,lengthNum) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let num ='0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < lengthChar; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let numLength = num.length;
  result +='-';
  for ( let i = 0; i < lengthNum; i++ ) {
    result += ''+num.charAt(Math.floor(Math.random() * numLength));
  }
  return result;
}
var menuArr=['']

class Button{
  constructor(text,id,graph){
    this.id=id;
    this.text=text;
    this.graph=graph;
    this.html =`<button class='menu_button_class' id='${id}'>${text}</button>`;
  }
  //menuBtn:"Menu",mapBtn:"Map",mineBtn:"Mine",cargoBtn:"Cargo",scanBtn:"Scan",saveBtn:"Save",loadBtn:"Load",}
  activateBtn(graph,sO){
    let btnListner= document.getElementById(this.id)

    btnListner.addEventListener("click",function(){
      switch (this.id) {
        case "mapBtn":
          graph.displayMap();
          break;
        case "menuBtn":
          graph.displayMenu();
          break;
        case "mineBtn":
          cdnn(5,"mining",graph,sO)
          document.getElementById("time").innerHTML = timeHTML
          document.getElementById('terminalMenu').innerHTML = `
          |${menu_Buttons.menuBtn.html}|
          `
          break;
        case "scanBtn":
          if (!sO.scanned){
            sO.generate_Minerals(1)
          }

          graph.displayMinerals(sO,graph);
          sO.scanned = true;
          break;
          case "saveBtn":
            graph.displayMap();
            break;
            case "loadBtn":
              graph.displayMap();
              break;
              case "cargoBtn":
                ship.cargoDisplay(graph);
                break;
        default:

      }


  });
  }



}


class Player {
  constructor(name){
    let hp = Math.floor(Math.random() * (20 - 16 + 1)) + 16; ;
    let mana = Math.floor(Math.random() * (20 - 12 + 1)) + 12; ;


    this.icon='🚀';
    this.name = name;
    this.hp = hp;
    this.maxHp=hp;
    this.maxMana=mana;
    this.mana = mana;
    this.position= 'A5';
    this.icon= shipIcon
    this.stats={
      air:100,
      food:100,
      water:100,
      power:100,
      fule:100

    }
    this.cargo={};

    this.equipment={
      scannerlv:1,items:[]
    };
    this.equippedWeapon ={

    };


  }
  addCargo(cargo){
    if ( this.cargo[cargo] === undefined){
      console.log(`%ccreate cargo listing for ${cargo} with value 0 in ${this.name}'s Cargo' `,"color:black;background:green")
      this.cargo[`${cargo}`]=0;
    }
    console.log(`%cIncrease cargo listing ${cargo} by 1 in ${this.name}'s Cargo`,"color:black;background:green")
    this.cargo[`${cargo}`]++
  };
  deleteCargo(cargo){
    console.log(`%c removeing 1 ${cargo} from  ${this.name}'s Cargo listing: ${Object.keys(this.cargo)}`,'background:rgba(0,0,0,1) ; color:rgba(0,255,0,.5)')
    this.cargo[cargo] --
    //clean up minerals
    for (var cargo in this.cargo){
      switch (this.cargo[cargo]) {
        case 0:
        console.log(`%cdeleteing ${cargo} with value of ${this.cargo[cargo]} from ${this.name}'s Cargo listing: ${Object.keys(this.cargo)} `,"color:red;background:black")
        delete this.cargo[cargo];
        break;
        case undefined:
        console.log(`%cdeleteing ${cargo} with value of ${this.cargo[cargo]} from ${this.name}'s Cargo listing: ${Object.keys(this.cargo)} `,"color:red;background:black")

        delete this.cargo[cargo];
        break;
        default:
      }
    }
  };
  ////////////////////////////////weapons list getter
  getWeapons(){
    let equipment = this.equipment.items;
    let html =``;
    for (let i in equipment) {
      console.log("weapons:" ,equipment[i]);
      html+=  `<tr>
      <td>${equipment[i]['name']}</td>
      <td> ${equipment[i]['damage']}</td>
      <td> ${equipment[i]['bonus']}</td>
      </tr>`;
    }
    return html;

  }
  /////////stats display//////////////

  statsDisplay(){
    let e = Object.entries(this.stats);
    let html =`name:${this.name}
    hp:${this.hp}
    mana:${this.mana}
    Status:${this.status}

    <table>`;

    for (let i in e){

      html+=`
      <td>${e[i][0]}</td>
      <td>${e[i][1]}</td>
      `
    }

    html += `
    </td><td>
    <br>
    `;

    return html;
  };
  cargoDisplay(graph){



        let terminal = document.getElementById('terminal');
        terminal.innerHTML = `<center>${this.name} <br>
        <div class='.grid-container' style=height:350px;>



    <div class='.grid-container' id='cargo' ></div>

        </div>

        <div class='terminalMenu' id='terminalMenu'>
      ${menu_Buttons.menuBtn.html}||  ${menu_Buttons.mapBtn.html}||
        </div>

        `;
        menu_Buttons.mapBtn.activateBtn(graph)
        menu_Buttons.menuBtn.activateBtn(graph)
      //  activatebtnBtn('mapBtn',this)




        let cargoEle = document.getElementById('cargo');
        //terminal.innerHTML = `<table id='t'> </table>`
        let v = Object.values(this.cargo);////empty before the above loop runs
        let k = Object.keys(this.cargo);
        let table = document.createElement('table');
        let row = document.createElement('tr')
        row.innerHTML=`<td><strong>cargo</strong></td><td><b>AMT</b></td>`
        table.appendChild(row)
        for(let i in k){

          let row = document.createElement('tr')
          let cell = document.createElement('td')
          let text = `<td> ${k[i]}</td><td>${v[i]}</td>`;
          let tt= `${k[i]}`;
          row.innerHTML=text;
          table.appendChild(row);

        } ;
        ///  table.className = ``;



        cargoEle.appendChild( table);
    switch (Object.keys(this.cargo).length) {

      case 0:
      console.log(`%c${this.name} has No cargo`,"background:red;color:blue")
      let row = document.createElement('tr')
      row.innerHTML=`<td>No cargo</td>`
      table.appendChild(row)
break;

      default:
    }

    //for(items in this.cargo)
    menu_Buttons.menuBtn.activateBtn(graph)
  };
  //////////////////main weapon attack
  attackWeapon(){
    console.log(this.equippedWeapon.damage)
    let weapon = this.equippedWeapon.damage;
    //  let attacks =
    let damage =  Math.round(Math.random()*  weapon) ;
    console.log(damage);
    //return attacks;
    return damage;

  }
  //////////////////////end attack

};////end player class

///asteroid CLASS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

_    _    _    _    _    _    _    _
/ \  / \  / \  / \  / \  / \  / \  / \
( A )( s )( t )( e )( r )( o )( i )( d )
\_/  \_/  \_/  \_/  \_/  \_/  \_/  \_/
*/

class Asteroid {
  constructor() {
    let asteroidType = Math.random() > 0.5 ? 1: 2;
    if(asteroidType > 1 ){
      this.type = 'Type-C'
    }else{this.type = 'Type-A'}
    this.name = makeRandomId(3,5);
    this.description = 'test';
    //this.type = ``;// type c :more water little minerals, type a more metals little water , type s  10x metals
    this.minerals ={} ;
    let randChar1 =gridChars[Math.round(Math.random()*9)];
    let randChar2=gridChars2[Math.round(Math.random()*9)];
    let randPos =randChar1+randChar2;
    this.position = randPos;
    this.icon = '🌑';
    this.scanned =false;
    this.spaceBodieType='Asteroid';

  }
  generate_Minerals(scanlv){

    let base_minerals= ['iron','Lithium','Aluminum','copper','zinc','nickel','tin'];
    let precious_metals=['gold','silver','platinum','Palladium'];
    let utility_metals=['titanium','uranium'];

    let bscan =0;
    let pscan =0;
    let uscan =0;
    // if (this.scanned ==true){
    //   console.log('scanned')
    // }else{
    if(scanlv<=1){//generate base metals
      bscan =5
    }
    if(scanlv >=2){
      bscan =7
      pScan =2
    }
    if(scanlv >=3){
      bscan =10
    }
    ///  base metals scan

    for (let i = 0; i < bscan; i++) {
      let baseMinerals = base_minerals[Math.floor(Math.random()* base_minerals.length)];
      let mineral = `${baseMinerals}`;
      console.log(`mineral`,mineral)
      this.addMineral(mineral)

      console.log( this.minerals[`${baseMinerals}`])
      console.log('base',baseMinerals)
      this.scanned=true;
    }
    // }

  }
  addMineral(mineral){
    if ( this.minerals[mineral] === undefined){
      console.log(`creaing ${mineral} with value 0 in ${this.name} `)
      this.minerals[`${mineral}`]=0;
    }
    console.log(`Increase ${mineral} by 1 in ${this.name}`)
    this.minerals[`${mineral}`]++
  }
  deleteMineral(mineral){
    console.log(`%c removeing 1 ${mineral} from  ${this.name} minerals: ${Object.keys(this.minerals)}`,'background:rgba(0,0,0,1) ; color:rgba(0,255,0,.5)')
    this.minerals[mineral] --
    //clean up minerals
    for (var mineral in this.minerals){
      switch (this.minerals[mineral]) {
        case 0:
        console.log(`%cdeleteing ${mineral} with value of ${this.minerals[mineral]} from ${this.name}'s minerals: ${Object.keys(this.minerals)} `,"color:red;background:black")
        delete this.minerals[mineral];
        break;
        case undefined:
        console.log(`%cdeleteing ${mineral} with value of ${this.minerals[mineral]} from ${this.name}'s minerals: ${Object.keys(this.minerals)} `,"color:red;background:black")

        delete this.minerals[mineral];
        break;
        default:

      }


    }

  }
  ///end generate_Minerals
  mineMinerals(graph){
    switch (this.minerals) {
      case undefined:
      console.log(`%cError undefined ${this.minerals}`,`background:'red';color:'blue'`)
      document.getElementById('terminalMenu').innerHTML = `

      `
      break;
      default:
      console.log(this.minerals)
      let mineralKeys= Object.keys(this.minerals);
      let mineralsLength= mineralKeys.length;
      let randomMineralNum = Math.round(Math.random()*mineralsLength )
      let randomMineral=  mineralKeys[randomMineralNum]
      if(randomMineral==undefined){
        console.log(`%cundefined index ${randomMineralNum}in ${this.name}'s minerals :${mineralKeys} `,'background:red;color:white')
        randomMineralNum --
        randomMineral = mineralKeys[randomMineralNum];
        console.log(`%cnew mineral ${randomMineral}`,`background:'green';color:'white'`)
      }

      this.deleteMineral(randomMineral) ;
      ship.addCargo(randomMineral);
      //console.log(this.minerals)
    }




  };

};//end asteroid class

function generator(n){
  for (var i = 0; i < n; i++) {

    let a = new Asteroid;

    for (let asteroid in spaceBodies){
      if (spaceBodies[asteroid].position == a.position){
        console.log('%cbad grav mann111','background: #222; color: #bada55')
        a = new Asteroid;
      }

    }
    spaceBodies[a.name]= a;


  }

}
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
graph loop
var graphMap = new Graph; -> graphMap.makeMap() -> graphMap.displayMap()

graphMap.displayMap() -> this.mapSpaceBodies(); ||-> this.mapClick('travel');
*/
class Grid{
  constructor(aValue,bValue,aIndex,bIndex){
    this.value=aValue+bValue;
    this.aIndex=aIndex;
    this.bIndex=bIndex;
    this.edges=[];
    this.searched =false;
    this.parent=null;

  }
  addEdge(sides){
    this.edges.push(sides);
  }

}
class Graph{
  constructor(){
    this.index=makeRandomId(2,2)
    this.grids =[];//nodes
    this.graph={};
    this.start= null;
    this.end = null;
    this.showGrids='grids';
    this.graphHTML='';
  }
  addGrid(g){
    ///grid into array
    this.grids.push(g);
    let id = g.value;
    /// grid into table"hash"
    this.graph[id] = g;
  }
  getGrid(num){
    var n = this.graph[num];
    return n;
  }
  setStart(node){
    this.start=this.graph[node]
    return this.start;
  }
  setEnd(node){
    this.end=this.graph[node]
    return this.end;
  }

  makeMap(){this.grids =[];
    let result =`<center>${this.index}</center>
    <table class='mist sd ' id='mapTable'>`;
    let charLength = gridChars.length;
    let m =0;
    var styleClass=' styleClass';
    if (this.showGrids == 'noGrids') {
      styleClass=`class='grids'`;

    }else if(this.showGrids == 'grids'){
      styleClass = `class='noGrids'`
    }
    //create grid points and store them
    for(let i =0;i<charLength;i++){
      result += `<tr class='mist' id='mapTableRow'>`
      for(let n =0;n<gridChars.length;n++){
        let node = `${gridChars[i]}${gridChars2[n]}`
        m++
        let num = gridChars2[n] //actors
        let numPointer = this.getGrid(num);
        if(numPointer == undefined){
          var points = new Grid(gridChars[i],gridChars2[n],i,n);
          this.addGrid(points);
        }


        result += `<td id='${node}' name='mapdata'  class='grids'></td>`;

      }
      result += `</tr>`;
    };


    // result += `</table>
    // <br>
    // | <span id='mapBtn'>[map]</span> |
    //
    // | <span id= 'scanstroid'>[scan]</span> |
    // `
    //  console.log(gridChars[(this.grids[0].aIndex +1)],`:aindex`);
    //add edges for the grids
    for(let j = 0;j<this.grids.length;j++){
      let undefed = `includes("undefined");`
      let grid = this.grids[j];
      let aIndex=this.grids[j].aIndex;
      let bIndex=this.grids[j].bIndex;
      let direction = {
        up: `${gridChars[(aIndex -1)]}${bIndex}`,
        down:`${gridChars[(aIndex +1)]}${bIndex}`,
        left:`${gridChars[aIndex]}${(bIndex -1)}`,
        right:`${gridChars[aIndex]}${(bIndex +1)}`,
        upLeft:`${gridChars[aIndex -1]}${(bIndex -1)}`,
        downLeft:`${gridChars[aIndex +1]}${(bIndex -1)}`,
        downRight:`${gridChars[aIndex +1]}${(bIndex +1)}`,
        upRight:`${gridChars[aIndex -1]}${(bIndex +1)}`,

      }
      if(this.graph[direction.up] ==undefined){
        //console.log(`undefined found up ${direction.up}`)


      }else{
        grid.edges.push(this.graph[direction.up])
        //  console.log(direction.up,)
      }
      if(this.graph[direction.down] ==undefined){
        //  console.log(`undefined found down ${direction.down}`)

      }else{
        grid.edges.push(this.graph[direction.down])
        //  console.log(direction.down)
      };
      if(this.graph[direction.left] ==undefined){
        //  console.log(`undefined found left ${direction.let}`)

      }else{
        grid.edges.push(this.graph[direction.left])
        //  console.log(direction.left)
      }
      if(this.graph[direction.right] ==undefined){
        //  console.log(`undefined found right ${direction.right}`)

      }
      else{
        grid.edges.push(this.graph[direction.right])
        //  console.log(direction.right)
      };

    };
    ///////////////<~~~~~~~~~~~~~Makes a grid ~~~~~~~~~~~~~~~~~~~~>
    /*
    0a0b0c0d0e0f0g0h0i0j
    1a1b1c1d1e1f1g1h1i1j
    2a2b2c2d2e2f2g2h2i2j
    3a3b3c3d3e3f3g3h3i3j
    4a4b4c4d4e4f4g4h4i4j
    5a5b5c5d5e5f5g5h5i5j
    6a6b6c6d6e6f6g6h6i6j
    7a7b7c7d7e7f7g7h7i7j
    8a8b8c8d8e8f8g8h8i8j
    9a9b9c9d9e9f9g9h9i9j
    */

    this.graphHTML=result
    return result;
  };
  displayMenu(){
  var  buttons= [
      menu_Buttons.mapBtn,
      menu_Buttons.cargoBtn,
      menu_Buttons.saveBtn,
      menu_Buttons.loadBtn,]
      var buttonsList=''

const map1 = buttons.map(x => buttonsList = `${x.html}<br>`);

  document.getElementById('terminal').innerHTML = `
    ${menu_Buttons.mapBtn.html}
    ${menu_Buttons.cargoBtn.html}
    ${menu_Buttons.saveBtn.html}
    ${menu_Buttons.loadBtn.html}`;
  menu_Buttons.mapBtn.activateBtn(this)
  menu_Buttons.cargoBtn.activateBtn(this)
  menu_Buttons.saveBtn.activateBtn(this)
  menu_Buttons.loadBtn.activateBtn(this)
  }
  mapClick(option){
    for (var i = 0; i < this.grids.length; i++) {
      let  grid = document.getElementById(this.grids[i].value)
      let end = this.grids[i].value;
      let start = ship.position;
      //let graph= graphMap;
      switch(option){
        case "travel":

        grid.onclick = () => bfs(this,ship.position,end);

        break;
        case "mapInfo":
        break;
      }




    };
  };

  displayMap(){
    let roll= Math.random() *20 +1;
    this.makeMap(this);

    document.getElementById('terminal').innerHTML = `${this.graphHTML }`;
    this.mapSpaceBodies();

    this.mapClick('travel');
  };

  sectorScan(object){

    let html=`<div id='space'></div>`;
    document.getElementById('terminal').innerHTML += `${html}`;


    console.log(`sector scanning`)

    //  console.log('derp?')
    let spaceDsp=document.getElementById('space')
    spaceDsp.innerHTML = `
    [${object.icon} ${object.name}] ${menu_Buttons.scanBtn.html}

    `;
    menu_Buttons.scanBtn.activateBtn(this,object)


    // let scanstroid= document.getElementById('scanstroid')
    // scanstroid.addEventListener("click",function(){
    //   if (!object.scanned){
    //     object.generate_Minerals(1)
    //   }
    //
    //   graphMap.displayMinerals(object,graphMap);
    //   object.scanned = true;
    // });



    //document.getElementById('scanstroid').style.onclick = spaceBodies[bodies].generate_Minerals()

  };
  displayMinerals(sO){



    let terminal = document.getElementById('terminal');
    terminal.innerHTML = `<center>${sO.name} <br>
    <div class='.grid-container' style=height:350px;>



<div class='.grid-container' id='minerals' ></div>

    </div>
    <div class='sd' id='time' style=display:inline-block;
    >  </div>
    <div class='terminalMenu' id='terminalMenu'>
  ${menu_Buttons.menuBtn.html}||  ${menu_Buttons.mapBtn.html}||${menu_Buttons.mineBtn.html}

    </div>

    `;
    menu_Buttons.mapBtn.activateBtn(this,sO)
    menu_Buttons.mineBtn.activateBtn(this,sO)
    menu_Buttons.menuBtn.activateBtn(this,sO)
  //  activatebtnBtn('mapBtn',this)




    let minerals = document.getElementById('minerals');
    //terminal.innerHTML = `<table id='t'> </table>`
    let v = Object.values(sO.minerals);////empty before the above loop runs
    let k = Object.keys(sO.minerals);
    let table = document.createElement('table');
    let row = document.createElement('tr')
    row.innerHTML=`<td><strong>Mineral</strong></td><td><b>AMT</b></td>`
    table.appendChild(row)
    for(let i in k){

      let row = document.createElement('tr')
      let cell = document.createElement('td')
      let text = `<td> ${k[i]}</td><td>${v[i]}</td>`;
      let tt= `${k[i]}`;
      row.innerHTML=text;
      table.appendChild(row);

    } ;
    ///  table.className = ``;



    minerals.appendChild( table);
    // let     mineBTN=document.getElementById('mineBtn');
    // mineBTN.onclick = function (){//graph.displayMining(sO);
    //
    //
    // }
    //  console.log(k,v);///key and value of minerals
    switch (Object.keys(sO.minerals).length) {
      case 0:
      console.log(`%c ${sO.name} has No minerals`,"background:'red';color:'blue'")
      let row = document.createElement('tr')
      row.innerHTML=`<td>No Minerals Found!</td>`
      table.appendChild(row)
      document.getElementById('terminalMenu').innerHTML = `
      ${menu_Buttons.mapBtn.html}|${menu_Buttons.menuBtn.html}
      `
      menu_Buttons.mapBtn.activateBtn(this,);
      menu_Buttons.menuBtn.activateBtn(this,);
      break;
      default:
    }
  };
  displayMining(sO){


  }
  mapSpaceBodies(){
    let terminal = document.getElementById('terminal');
    //Display space bodie if it is within the edges of the ship
    for(var grid in graphMap.graph[ship.position].edges){
      //  console.log(`${graphMap.graph[ship.position].value},edge${graphMap.graph[ship.position].edges[grid].value}`)
      for (var spaceObject in spaceBodies) {
        if(spaceBodies[spaceObject]){}
        if (spaceBodies[spaceObject].scanned == true) {
          let mapCord = document.getElementById(spaceBodies[spaceObject].position);
          //  console.log(spaceBodies[spaceObject].position)
          mapCord.style.color = 'red';
          mapCord.innerHTML=`<span class='parent'><span class='verticalcentered1'>${spaceBodies[spaceObject].icon}</span></span> `;

        }
        if (spaceBodies[spaceObject].position == graphMap.graph[ship.position].edges[grid].value ||spaceBodies[spaceObject].position == graphMap.graph[ship.position].value) {
          this.sectorScan(spaceBodies[spaceObject])
          let mapCord = document.getElementById(spaceBodies[spaceObject].position);
          //  console.log(spaceBodies[spaceObject].position)
          mapCord.style.color = 'red';
          mapCord.innerHTML=`<span class='parent'><span class='verticalcentered1'>${spaceBodies[spaceObject].icon}</span></span> `;

        }

      }
    }




    let comNode= document.getElementById(ship.position)
    comNode.style.borderColor = "rgba(74, 246, 38, 1)";
    comNode.innerHTML += `<span class=' ship'>${ship.icon}</span>`;
  };
};


/*
###############################
##Breadth-first search      ##
##Finding the fastest rout  ##
###############################
https://en.wikipedia.org/wiki/Breadth-first_search

*/
//start cord and end cord passed in
function bfs(g,s,e){
  var graph = g;


  var start=  graph.setStart(s);
  var end =  graph.setEnd(e);
  let queue =[];


  //  console.log(start)
  //  console.log(end)
  queue.push(start)
  start.searched =true;
  queue.push(start);

  while (queue.length>0) {
    var current =queue.shift()
    console.log(current.value);


    if (current== end) {
      console.log('found',current.value)
      break;
    }
    //  console.log(current)
    var edges = current.edges
    for(let l=0;l<edges.length;l++){
      var neighbor= edges[l];
      if(!neighbor.searched){

        neighbor.searched = true;
        neighbor.parent=current;
        queue.push(neighbor);


      }

    }

  }
  var path =[]
  path.push(end)
  var next= end.parent;
  while(next != null){
    path.push(next);
    next =next.parent;

  }


  /////Maping out the path
  let distance = [];///text for console
  ///reverse the path
  for (let i =path.length -1;i>=0;i--){

    let n =path[i];

    distance.push(n.value);
  }

  console.log(distance);
  //multiply the timer by I   delaying the color chage

  for(let i =0;i<distance.length;i++){
    setTimeout(function(){
      ship.position =distance[i]
      graph.displayMap()
      //  document.getElementById(distance[i]).style.backgroundColor = 'red';
      //document.getElementById(distance[i]).innerHTML = shipIcon;
    }, i*50);


  }
  //reset the map when done  & set the ships position



}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/////countdown functions

function cdnn(secs,option,graph,space_object){
  let countInfo =document.getElementById("countInfo");
  let condition =option;
  let now = new Date();
  let timeNow = now.getTime()/1000;
  let newTime = (timeNow + secs ); //add 1 minute
  let newTimeDate = new Date(newTime*1000);
  if(newTimeDate == `Invalid Date`){
    let op =document.getElementById("options");
    op.style.backgroundColor = `rgba(0,0,0,.9)`;
    op.style.color = `rgba(0,255,0,1)`
    op.innerHTML = "ERRROR";
  }else {

    ship.status = status['1'];///['Idling',`Traveling`,"Scanning","Minning"];
    let x = setInterval(function() {
      switch (option) {
        case "mining":
        var condi= ` ship power ${Math.round(ship.stats.power)}`
        var stat =ship.stats.power
        break;
        case "tavel":
        var condi= ` ship fule ${Math.round(ship.stats.fule)}`
        ship.stats.fule
        break;
        default:

      }
      console.log(timeNow)
      console.log(newTime)
      console.log(now)
      console.log(newTimeDate);
      let nowt = new Date().getTime();
      let nowx =newTimeDate.getTime();
      let distance = nowx-nowt;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      timeHTML = `
      <center>
      <table>
      <th id="countInfo" align='center'>${option}</th>
      <tr><td>
      <table>
      <tr>
      <td>days</td>
      <td>hours</td>
      <td>minutes</td>
      <td>seconds</td>
      </tr>
      <tr>
      <td>${days}</td>
      <td>${hours}</td>
      <td>${minutes}</td>
      <td>${seconds}</td>
      </tr>
      </ table>
      </td></tr>
      </table>
      <br> ${condi}

      `;

      var  timeEle = document.getElementById('time');
      if(timeEle == null){
        timeEle = document.createElement("time");
        timeEle.innerHTML = timeHTML
      }else {
        timeEle.innerHTML = timeHTML;
      }
      document.getElementById("info").innerHTML = ship.statsDisplay();
      // If the count down is finished, write some text
      if (nowt >= newTimeDate) {
        ship.status = status['0'];///['Idling',`Traveling`,"Scanning","Minning"];
        clearInterval(x);
        switch (option) {
          case 'travel':
          countInfo.innerHTML = "Arived";
          break;
          case 'mining':
          if(document.getElementById("countInfo") != null){
            document.getElementById("countInfo").innerHTML = "Mining Done";}
            space_object.mineMinerals();
            graph.displayMinerals(space_object,graph);
            break;
            default:

          }

          document.getElementById("info").innerHTML = ship.statsDisplay();
        }
        if (stat <= 0) {
          ship.status = status[0];///['Idling',`Traveling`,"Scanning","Minning"];
          clearInterval(x);

          switch (option) {
            case 'travel':
            document.getElementById("countInfo").innerHTML = "Ran out of fule";
            break;
            case 'mining':
            document.getElementById("countInfo").innerHTML = "No POWER!";;
            break;
            default:

          }

          document.getElementById("info").innerHTML = ship.statsDisplay();
        }
        ship.stats.power -= .5
      }, 1000)
    };
  }
  ////end the cound down timer
  var menu_Buttons={};
  var menu_option={menuBtn:"Menu",mapBtn:"Map",mineBtn:"Mine",cargoBtn:"Cargo",scanBtn:"Scan",saveBtn:"Save",loadBtn:"Load",}

function makeMenu(graph){
  for(let k in menu_option){
    console.log(`${k}${menu_option[k]}`)
    let btn= new Button(menu_option[k],k,graph)
    menu_Buttons[k] = btn;
  }

}
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
  //create a ship hero
  var ship = new Player("bob");
  var graphMap = new Graph;
  var asteroid1 = new Asteroid();

  let mapbtn = new Button('[Map]','mapBtn',graphMap)
  makeMenu(graphMap)
  graphMap.makeMap()
  //asteroids.push(asteroid1)
  generator(4);
  //console.log(asteroid1.position,'apos')
  console.log(status,status[0])
  ship.status = status[0];///['Idling',`Traveling`,"Scanning","Minning"];
  let sword= {name:"sword",damage:3,bonus:0};


  // ship.spellbook.fireball = {...ship.spellbook,...fireball};

  ship.equipment.items.push(sword);


  ship.equippedWeapon =sword;
  console.log("ship " + ship.name + "!",ship);
  console.log(ship.equippedWeapon.damage)
  let t = document.getElementById("info") ;


  //cdnn(120);
  t.innerHTML= `${ship.statsDisplay()}`;
  //console.log(timeNow);
  // create asteroid and generate minerals for it



  /*scan for spaceObject ->
  /~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
  /~~~~~~~~~~~~~~Map making~~~~~~~~~~~~~~~~~~~~~~~~~/
  /~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/

  Roll 20
  1-5 1 hour away
  5-10: 30 mins away
  10-15 :15 mins away
  15-18 :10
  19-20 :5 minuets
  */


  //////////<~~~~~~~~~~~~~~~~~~Ends Make Grid~~~~~~~~~~~~~~>
  let scannerButton= document.getElementById('scannerButton')
  scannerButton.addEventListener("click",function(){
    graphMap.displayMap()
  });

  let bfsscan= document.getElementById('bfs')
  bfsscan.addEventListener("click",function(){

  });
// function mapbtnclick(){
//   let mapBttn = document.getElementById('mapBtn')
//   mapBttn.addEventListener("click",function(){
//   let graph = mapBttn.getAttribute('data-graph');
//   console.log(graph)
//
//
//   });
// }
  // var scanstroid= document.getElementById('scanstroid');
  // scanstroid.addEventListener("click",function(){
  // spaceBodies[bodies].generate_Minerals()
  // });
