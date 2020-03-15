terminal


var terminal = document.getElementById('terminal');
var gridChars='ABCDEFGHIJ';
let status = ['Idling','mining','traveling',]
var gridChars2='0123456789';
var spaceBodies={};
var spaceIcons={shipIcon:"🚀",asteroidIcon: '🌑',}
var timeHTML =``;
const shipIcon = "🚀";
const asteroidIcon= '🌑';
var ship= shipIcon;
var currentMap ;
var gameMap;
var buttons={};
var basePrice=5;
var utilPrice=10;
var menu_option={menuBtn:"📃:Menu",mapBtn:"🗺️:Map",mineBtn:"⛏️:Mine",cargoBtn:"📦:Cargo",scanBtn:"📡:Scan",saveBtn:"Save",loadBtn:"Load",buyMenuBtn:"Buy",sellMenuBtn:"Sell",repairBtn:"Repair",rechargeBtn:"Recharge"}


//emojis are cool 👨‍💻


function   makeRandomId(lengthChar,lengthNum,lengthSpecialChar) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var num ='0123456789';
  var specialChar='ΔΣΘΦΨΩ'
  var charactersLength = characters.length;
  var specialLength = specialChar.length;
  for ( let i = 0; i < lengthSpecialChar; i++ ) {
    result += specialChar.charAt(Math.floor(Math.random() * specialLength));
  }
  for ( let i = 0; i < lengthChar; i++ ) {
    result += ''+characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let numLength = num.length;
  result +='-';
  for ( let i = 0; i < lengthNum; i++ ) {
    result += ''+num.charAt(Math.floor(Math.random() * numLength));
  }
  return result;
}

function makeMenu(graph){
for(let k in menu_option){
  console.log(`${k}${menu_option[k]}`)
  let btn= new Button(menu_option[k],k,graph)
  buttons[k] = btn;
}

};


class Button{
  constructor(text,id,){
    this.id=id;
    this.text=text;
    //this.graph=graph;
    this.html =`<button class='menu_button_class' id='${id}'>${text}</button>`;
  }

  //menuBtn:"Menu",mapBtn:"Map",mineBtn:"Mine",cargoBtn:"Cargo",scanBtn:"Scan",saveBtn:"Save",loadBtn:"Load",}
  activateBtn(spaceObject){
    var btnListner= document.getElementById(this.id)

    btnListner.addEventListener("click",function(){
      switch (this.id) {
        case "sellMenuBtn":
        var option = 'sell'
          gameMap.trade(spaceObject,option);
        break;
        case "buyMenuBtn":
        var option = 'buy'
          gameMap.trade(spaceObject,option);

          break;
        case "mapBtn":
          gameMap.displayMap();
          break;
        case "menuBtn":
          menu()
          break;
        case "mineBtn":
          cdnn(5,"mining",gameMap,spaceObject)
          document.getElementById("time").innerHTML = timeHTML
          document.getElementById('terminalMenu').innerHTML = `
          |${buttons.menuBtn.html}|
          `
          break;
        case "scanBtn":
        if(spaceObject.spaceBodyType == "Space Station"){
          if (!spaceObject.scanned){
            spaceObject.generateMinerals(1)
          }
          //alert("%cNot Implemented","coror:red;background:black")
            spaceObject.stationMenu()

        }
          if(spaceObject.spaceBodyType == "Asteroid"){
          if (!spaceObject.scanned){
            spaceObject.generateMinerals(1)
          }

          gameMap.displayMinerals(spaceObject);
          spaceObject.scanned = true;
          }
          break;

          case "saveBtn":
            graph.displayMap();
            break;
            case "loadBtn":
              graph.displayMap();
              break;
              case "cargoBtn":
                ship.cargoHold.displayCargo();
                break;
        default:

      }


  });
  }



}
  let Ship = function(name){
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
        fule:100,
        credits:0

      }
        this.equipment={
        scannerlv:1,items:[]
      };
      this.equippedWeapon ={

      };

  }


  Ship.prototype.statsDisplay= function(){
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

let CargoHold =function(owner){
  this.cargo={};
  this.owner=owner;

};
CargoHold.prototype.displayCargo = function(){
          terminal.innerHTML = `<center>${this.owner}'s Cargo Hold <br>
          <div class='.grid-container' style=height:350px;>
          <div class='.grid-container' id='cargo' ></div>
          </div>
          <div class='terminalMenu' id='terminalMenu'>
          ${buttons.menuBtn.html}||  ${buttons.mapBtn.html}||
          </div>
          `;
          buttons.mapBtn.activateBtn()
          buttons.menuBtn.activateBtn()
        //  activatebtnBtn('mapBtn',this)




          let cargoEle = document.getElementById('cargo');
          //terminal.innerHTML = `<table id='t'> </table>`
          let v = Object.values(this.cargo);////empty before the above loop runs
          let k = Object.keys(this.cargo);
          let table = document.createElement('table');
          let row = document.createElement('tr')
          row.innerHTML=`<td><strong>cargo</strong></td><td><b>AMT</b></td>`
          table.appendChild(row)
          for(let val in this.cargo){

            let row = document.createElement('tr')
            let cell = document.createElement('td')
            let text = `<td> ${val}</td><td>${this.cargo[val].value}</td>`;
          //  let tt= `${k[i]}`;
            row.innerHTML=text;
            table.appendChild(row);
          } ;
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
      buttons.menuBtn.activateBtn()
    };
  CargoHold.prototype.addCargo=function(cargo){
    ///grid into array

    let id = cargo.name;
    newItem = new Mineral(id,cargo.price);
console.log(this.owner,id,':id',)

//console.log(this.cargo[id])
    if ( this.cargo[id] == undefined){
      console.log(`%c[addCargo]creating ${cargo.name} with value 1 in ${this.owner} `,'color:blue;background:green')
      this.cargo[id] = newItem;
      this.cargo[id].value =1;
      console.log(`${this.cargo[id].value}`)

    }else{
    console.log(`%c[addCargo]Increase ${id}:${this.cargo[id].value} by 1 in ${this.owner} `,'background:green;color:blue')
  //  let newVal =this.cargo[id].value +1
    //console.log(newVal);
    this.cargo[id].value ++
    console.table(this.cargo[id])
  }
}
CargoHold.prototype.deleteCargo=function(cargo){
    let item  = cargo.name;
   console.log(this.owner,':id',this.cargo[item],this.cargo[item].name,this.cargo[item].value)
   console.log(`%c[deleteCargo] removeing 1 ${cargo.name} from  ${this.owner} cargos: ${Object.keys(this.cargo)}`,'background:rgba(0,0,0,1) ; color:rgba(0,255,0,.5)')
        // let val =item.value - 1
   this.cargo[item].value --;
   console.log(this.owner,':id',this.cargo[item],this.cargo[item].value)


   for (let k in this.cargo){
       console.log(k,this.cargo[k].value)
     //  console.log(k.value,'kval',this.cargo[k],'minrelas')
       switch (this.cargo[k].value) {
       case 0:
       console.log(`%c[deleteCargo:CLeanup]value of 0 deleteing ${cargo.name} with value of ${this.cargo[cargo.name].value} from this's cargos: ${Object.keys(this.cargo)} `,"color:red;background:black")
       delete this.cargo[k];
       break;
       case undefined:
       console.log(`%c[deleteCargo:cleanup]undefined deleteing ${cargo.name} with value of undefined from ${this.owner}'s cargos: ${Object.keys(this.cargo)} `,"color:red;background:black")
       delete this.cargo[k];
       break;
       default:
     }
   }



};
  CargoHold.prototype.cleanUp = () =>{
    //clean up cargos

  }
  var Mineral =    function (name,price,){
        this.name = name;
        this.price = price;
        this.text="buy";
        //this.graph=graph;
        this.html =`<button class='menu_button_class' id='${name}'>${this.text}</button>`;

      };




var buyItem=(spaceObject,item)=>{
  console.log(  `%c[ItemSell]${item.name}`,`background:red;color:black`,)
  console.table(item)
  if(ship.stats.credits >= item.price){
    console.log(`%cEnough credits to buy. Creits: ${ship.stats.credits}|Cost:${item.price}`,`backgorund:green;color:white`)
    ship.stats.credits -= item.price;
    ship.cargoHold.addCargo(item);
    spaceObject.cargoHold.deleteCargo(item)
    gameMap.trade(spaceObject,"buy")
  }else{
    console.log(`%cnot enough Credits!credits:${ship.stats.credits}|cost:${item.price}`,`color:red;background:black`)
    document.getElementById('cargo').innerHTML =`
    <span class ="blinking" style="color:red"><h3>[Not Enough Credits]</h3></span>
    `;
    setTimeout(()=>{gameMap.trade(spaceObject,"buy")},5000)
  }



};
var sellItem=(spaceObject,item)=>{
  console.log(  `%c[ItemSell]Selling ${item.name} from ${ship.name}to ${spaceObject.name}`,`background:red;color:black`,spaceObject.cargoHold.cargo[item.name],item)

    console.log(`%cselling . Creits: ${ship.stats.credits}|Cost:${item.price}`,`backgorund:green,color:white`)
    ship.stats.credits += item.price;
    ship.cargoHold.deleteCargo(item);
    spaceObject.cargoHold.addCargo(item)
    console.log(`%cCreits: ${ship.stats.credits}`,`backgorund:green,color:white`)



  gameMap.trade(spaceObject,"sell")
};



/*
𝕤𝕡𝕒𝕔𝕖𝕊𝕥𝕒𝕥𝕚𝕠𝕟*/
///create buying window
var buyerMenu = (spaceObject)=>{
    let tradeButtons =makeBuyButtons(spaceObject);
  let cargoEle
  //terminal.innerHTML = `<table id='t'> </table>`
  let v = Object.values(spaceObject.cargoHold.cargo);////empty before the above loop runs
  let k = Object.keys(spaceObject.cargoHold.cargo);
  let table = document.createElement('table');
  let row = document.createElement('tr')
  let tableHTML=`
    <table>
    <tr>
      <td><strong>cargo</strong></td>
      <td><b>AMT</b></td>
      </tr>`
  table.appendChild(row)
  let buttonsList = [];
  for(let val in spaceObject.cargoHold.cargo){
  //  console.log(val)
if (spaceObject.cargoHold.cargo[val].value != 0)
    tableHTML += `
    <tr>
      <td> ${val}</td>
      <td>${spaceObject.cargoHold.cargo[val].value}</td>
      <td>${spaceObject.cargoHold.cargo[val].html}</td>
    </tr>
    `;

  } ;
  //cargoEle.
//  console.log(buttonsList)
//  buybuttons(spaceObject)

  switch (Object.keys(spaceObject.cargoHold.cargo).length) {

  case 0:
  console.log(`%c${spaceObject.name} has No cargo`,"background:red;color:blue")
  let row = document.createElement('tr')
  row.innerHTML=`<td>No cargo</td>`
  table.appendChild(row)
  break;

  default:
  }
  return tableHTML
//  var tradeButtons =spaceObject.makeBuyButtons()



};
var buyWindow =function(spaceObject,option){

  //let tradeBtn = new Button(option);

          terminal.innerHTML = `<center>${spaceObject.name}'s Shop <br>
          <div class='.grid-container' style=height:350px;>
          <div class='.grid-container' id='cargo' >${buyTable}</div>
          </div>
          <div class='terminalMenu' id='terminalMenu'>
          ${buttons.menuBtn.html}||  ${buttons.mapBtn.html}||
          </div>
          `;

          buttons.mapBtn.activateBtn()
          buttons.menuBtn.activateBtn()
          tradeButtonsActivator(spaceObject,option)

    };

var makeBuyButtons=function(spaceObject){
  let tradeButtons={}
  for(let k in spaceObject.cargoHold.cargo){
  ///  console.log(`${k}`,spaceObject.cargoHold.cargo[k])
    let btn= new Button(`buy`,`${k}`)
    ;
    tradeButtons[k] = btn;


  }
  return(tradeButtons);
};

var tradeButtonsActivator = function(spaceObject,option){
  /*
  DAN WHEN YOU GET BACK MAKE THIS BUY FUNCTION
  */
  console.log("option:",option)
  var clicker;

  for(let i in spaceObject.cargoHold.cargo){
    //var id= tradeButtons[i].name;
    let tbutton = document.getElementById(`${i}`)

    if(tbutton== null){
    }else
  //  console.log(tradeButtons[i].id,tbutton)
{
tbutton.innerHTML = option
  tbutton.addEventListener("click",function(){
  let item = spaceObject.cargoHold.cargo[i]
  switch (option) {
    case "buy":
      buyItem(spaceObject,item)
      break;
      case"sell":
     sellItem(spaceObject,item)
      break
    default:

  }




  let t = document.getElementById("info") ;
  t.innerHTML= `${ship.statsDisplay()}`;
    })}
  }
};

let SpaceStation = function (){
  this.name = makeRandomId(1,1,1);
  if(this.name == undefined){this.name = makeRandomId(1,2)}
  let stationType = Math.random() > 0.5 ? 1: 2;
  if(stationType > 1 ){
    this.type = 'Trade Station';
    this.description = `${this.type} - ${this.name}`;

  }else{
    this.type = 'Repair Station';
    this.description = `${this.type} - ${this.name}`;
  }
  let randChar1 =gridChars[Math.round(Math.random()*9)];
  let randChar2=gridChars2[Math.round(Math.random()*9)];
  let randPos =randChar1+randChar2;
  this.position = randPos;
  this.icon = `🛰️`;
  this.scanned =false;
  this.spaceBodyType='Space Station';
}




SpaceStation.prototype.sellWindow=function(graph){

      terminal.innerHTML=`<div class='terminalContent'>
    </div>
    ${buttons.mapBtn.html} ${buttons.menuBtn.html}
  `;

  buttons.menuBtn.activateBtn()
  buttons.mapBtn.activateBtn()

}
SpaceStation.prototype.stationMenu=function(){
    this.scanned=true;
    var option;
    var activator=[];
    var buttonsList =[buttons.mapBtn, buttons.menuBtn];
    switch (this.type) {
    case "Trade Station":
      buttonsList.push(buttons.buyMenuBtn)
      buttonsList.push(buttons.sellMenuBtn)
      option=`
      ${buttonsList[2].html}
      ${buttonsList[3].html}
      `


      break;
    case "Repair Station":

    buttonsList.push(buttons.repairBtn)
    buttonsList.push(buttons.rechargeBtn)
    option=`
    ${buttonsList[2].html}
    ${buttonsList[3].html}
    `

      break;
    default:

  }
  terminal.innerHTML = `<center>
    <div id="trade-window" class="terminalContent">
    ${this.description}
    ${option}
    </div>
    ${buttons.mapBtn.html} ${buttons.menuBtn.html}
  `;
    for(let i in buttonsList){
      buttonsList[i].activateBtn(this);
    }

  //buttons.menuBtn.activateBtn(this)
  //buttons.mapBtn.activateBtn(this)
}

SpaceStation.prototype.generateMinerals=function(scanlv){

  let base_minerals= ['iron','Aluminum','copper','zinc','nickel','tin'];
  let precious_metals=['Gold','Silver','Platinum','Palladium'];
  let utility_metals=['Titanium','Uranium','Lithium'];
  var price;
  var bScan =0;
  var pScan =0;
  var uScan =0;
  var bPrice=5;
  var uPrice=10;
  // if (this.scanned ==true){
  //   console.log('scanned')
  // }else{
  if(scanlv<=1){//generate base metals
    bScan =7

    let uScanChance = Math.round((2/3)*100);
    let chance = Math.floor(Math.random()*100);
    if(uScanChance >= chance){
      console.log(`utility metals!`)
      uScan=6
    }else{console.log(`no utility metal ${chance}`)}
  }
  if(scanlv >=2){
    bScan =7
    pScan =2
  }
  if(scanlv >=3){
    bScan =10
  }
  ///  base metals scan

  for (let i = 0; i < bScan; i++) {
    let baseMinerals = base_minerals[Math.floor(Math.random()* base_minerals.length)];
    //let mineral = baseMinerals;

    let mineral = new Mineral(baseMinerals,bPrice);
    console.log(`%c[SpaceStration Generation]Creating ${mineral.name}`,'backgorund:gold;color:purple')
    this.cargoHold.addCargo(mineral)

  }
  for (let i = 0; i < uScan; i++) {
    let utilityMetals = utility_metals[Math.floor(Math.random()* utility_metals.length)];
    let metal = utilityMetals;

    metal = new Mineral(metal,uPrice);
    console.log(`%c[SpaceStration Generation]Creating ${metal.name}`,'background:gold;color:purple')
    this.cargoHold.addCargo(metal)

  }
  // }
  this.scanned=true;
};

///asteroid CLASS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

_    _    _    _    _    _    _    _
/ \  / \  / \  / \  / \  / \  / \  / \
( A )( s )( t )( e )( r )( o )( i )( d )
\_/  \_/  \_/  \_/  \_/  \_/  \_/  \_/
*/
let Asteroid =function() {
  let asteroidType = Math.random() > 0.5 ? 1: 2;
  if(asteroidType > 1 ){
    this.type = 'Type-C'
  }else{this.type = 'Type-A'}
  this.name = makeRandomId(3,5);
  this.description = 'test';
  //this.type = ``;// type c :more water little minerals, type a more metals little water , type s  10x metals
  //this.minerals ={} ;
  let randChar1 =gridChars[Math.round(Math.random()*9)];
  let randChar2=gridChars2[Math.round(Math.random()*9)];
  let randPos =randChar1+randChar2;
  this.position = randPos;
  this.icon = '🌑';
  this.scanned =false;
  this.spaceBodyType='Asteroid';

};
Asteroid.prototype.generateMinerals=function(scanlv){
  this.minerals= new CargoHold;
  let base_minerals= ['iron','Aluminum','copper','zinc','nickel','tin'];
  let precious_metals=['Gold','Silver','Platinum','Palladium'];
  let utility_metals=['Titanium','Uranium','Lithium'];
  var price;
  var bScan =0;
  var pScan =0;
  var uScan =0;
  var bPrice=5;
  var uPrice=10;
  // if (this.scanned ==true){
  //   console.log('scanned')
  // }else{
  if(scanlv<=1){//generate base metals
    bScan =5

    let uScanChance = Math.round((1/3)*100);
    let chance = Math.floor(Math.random()*100);
    if(uScanChance >= chance){
      console.log(`utility metal`)
      uScan=1
    }else{console.log(`no utility metal ${chance}`)}
  }
  if(scanlv >=2){
    bScan =7
    pScan =2
  }
  if(scanlv >=3){
    bScan =10
  }
  ///  base metals scan

  for (let i = 0; i < bScan; i++) {
    let baseMinerals = base_minerals[Math.floor(Math.random()* base_minerals.length)];
    //let mineral = baseMinerals;

    let mineral = new Mineral(baseMinerals,bPrice);
    console.log(`%cCreating ${mineral.name}`,'backgorund:gold;color:purple')
    this.minerals.addCargo(mineral)

  }
  for (let i = 0; i < uScan; i++) {
    let utilityMetals = utility_metals[Math.floor(Math.random()* utility_metals.length)];
    let metal = utilityMetals;

    metal = new Mineral(metal,uPrice);
    console.log(`%cCreating ${metal.name}`,'background:gold;color:purple')
    this.minerals.addCargo(metal)

  }
  // }
  this.scanned=true;
};
Asteroid.prototype.mineMinerals=function(){
    switch (this.minerals.cargo) {
      case undefined:
      console.log(`%cError undefined ${this.minerals.cargo}`,`background:red;color:blue`)
      document.getElementById('terminalMenu').innerHTML = `

      `
      break;
      default:
      console.log(this.minerals.cargo)
      let mineralKeys= Object.keys(this.minerals.cargo);
      let mineralVals= Object.values(this.minerals.cargo)
       console.log(`%cList of Minerals ${mineralKeys}`,'background:black,color:white')
      let mineralsLength= mineralVals.length;
      let randomMineralNum = Math.round(Math.random()*mineralsLength )
      let randomMineral=  mineralVals[randomMineralNum]

      if(randomMineral==undefined){
        console.log(`%cundefined index ${randomMineralNum}in ${this.name}'s minerals :${mineralVals} `,'background:red;color:white')
        randomMineralNum --
        randomMineral = mineralVals[randomMineralNum];
        console.log(`%cnew mineral ${randomMineral}`,`background:green;color:white`)
      }
      console.log(`%c Mining ${randomMineral.name}`,"background:green;color:white")
      this.minerals.deleteCargo(randomMineral) ;
      console.log(this.minerals.cargo)
      ship.cargoHold.addCargo(randomMineral);
      //console.log(this.minerals)
    }




  };
//end asteroid class
function spaceBodiesGenerator(aNum,sNum,graph){
  for (var i = 0; i < aNum; i++) {
    let a = new Asteroid;
      for (let asteroid in graph.spaceBodies){
      if (graph.spaceBodies[asteroid].position == a.position){
        console.log('%cbad grav mann111','background: #222; color: #bada55')
        a = new Asteroid;
      }

    }
    graph.spaceBodies[a.name]= a;
  }
  for (var i = 0; i < sNum; i++) {
    let s = new SpaceStation;
      for (let asteroid in graph.spaceBodies){
      if (graph.spaceBodies[asteroid].position == s.position){
        console.log('%cbad grav mann111','background: #222; color: #bada55')
        s = new SpaceStation;
      }
      s.cargoHold= new CargoHold(s.name);

    }
    graph.spaceBodies[s.name]= s;
  }

}
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var menu =function(){


document.getElementById('terminal').innerHTML = `
<center>
  ${buttons.mapBtn.html}<br>
  ${buttons.cargoBtn.html}<br>
  ${buttons.saveBtn.html}<br>
  ${buttons.loadBtn.html}
  </center>
  `;
buttons.mapBtn.activateBtn()
buttons.cargoBtn.activateBtn()
buttons.saveBtn.activateBtn()
buttons.loadBtn.activateBtn()
}

/*
graph loop
var graphMap = new Graph; -> graphMap.makeMap() -> graphMap.displayMap()

graphMap.displayMap() -> this.mapSpaceBodies(); ||-> this.mapClick('travel');
*/

let Grid = function(aValue,bValue,aIndex,bIndex){
  this.value=aValue+bValue;
  this.aIndex=aIndex;
  this.bIndex=bIndex;
  this.edges=[];
  this.searched =false;
  this.parent=null;

}
Grid.prototype.addEdge=(sides)=>{
    this.edges.push(sides);
  }
const Graph =function(){
    this.index=makeRandomId(2,2,1)
    this.grids =[];//nodes
    this.graph={};
    this.start= null;
    this.end = null;
    this.showGrids='noGrids';
    this.graphHTML='';
    this.spaceBodies={};
}
Graph.prototype.addGrid= function(g){
    ///grid into array
    this.grids.push(g);
    let id = g.value;
    /// grid into table"hash"
    this.graph[id] = g;
}
Graph.prototype.getGrid= function(num){
    let n = this.graph[num];
    return n;
  }
Graph.prototype.setStart=function(node){
    this.start=this.graph[node]
    return this.start;
}
Graph.prototype.setEnd=function(node){
    this.end=this.graph[node]
    return this.end;
}
Graph.prototype.makeMap=function(){
    this.grids =[];
    let result =`<center>Sector:${this.index}</center>
    <table class='mist  sd' id='mapTable'>`;
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

    result +=`</table>${buttons.menuBtn.html}
    <span id='space' style='font-size:16px'; scroll:auto ></span>
    `


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
      };
      if(this.graph[direction.right] ==undefined){
        //  console.log(`undefined found right ${direction.right}`)

      } else{
        grid.edges.push(this.graph[direction.right])
        //  console.log(direction.right)
      };
      ////////////
      if(this.graph[direction.upLeft] ==undefined){
        //console.log(`undefined found up ${direction.up}`)


      }else{
        grid.edges.push(this.graph[direction.upLeft])
        //  console.log(direction.up,)
      }
      if(this.graph[direction.downLeft] ==undefined){
        //  console.log(`undefined found down ${direction.down}`)

      }else{
        grid.edges.push(this.graph[direction.downLeft])
        //  console.log(direction.down)
      };

      if(this.graph[direction.upRight] ==undefined){
        //  console.log(`undefined found right ${direction.right}`)

      }else{
        grid.edges.push(this.graph[direction.upRight])
        //  console.log(direction.right)
      };
      if(this.graph[direction.downRight] ==undefined){
        //  console.log(`undefined found right ${direction.right}`)

      }else{
        grid.edges.push(this.graph[direction.downRight])
        //  console.log(direction.right)
      };
      ///////////

    };
    ///////////////<~~~~~~~~~~~~~Makes a grid ~~~~~~~~~~~~~~~~~~~~>
    /*
    0a|0b|0c|0d|0e|0f|0g|0h|0i|0j
    1a|1b|1c|1d|1e|1f|1g|1h|1i|1j
    2a|2b|2c|2d|2e|2f|2g|2h|2i|2j
    3a|3b|3c|3d|3e|3f|3g|3h|3i|3j
    4a|4b|4c|4d|4e|4f|4g|4h|4i|4j
    5a|5b|5c|5d|5e|5f|5g|5h|5i|5j
    6a|6b|6c|6d|6e|6f|6g|6h|6i|6j
    7a|7b|7c|7d|7e|7f|7g|7h|7i|7j
    8a|8b|8c|8d|8e|8f|8g|8h|8i|8j
    9a|9b|9c|9d|9e|9f|9g|9h|9i|9j
    */

    this.graphHTML=result
    return result;

}

Graph.prototype.mapClick=function(option){
  for (var i = 0; i < this.grids.length; i++) {
    let  grid = document.getElementById(this.grids[i].value)
    let end = this.grids[i].value;
    let start = ship.position;
    //let graph= graphMap;
    switch(option){
      case "travel":

      grid.onclick = () => BFS(this,ship.position,end);

      break;
      case "mapInfo":
      break;
    }




  };
};
Graph.prototype.displayMap=function(){
  let roll= Math.random() *20 +1;
  this.makeMap(this);

  terminal.innerHTML = `${this.graphHTML }`;
  buttons.menuBtn.activateBtn();
  mapSpaceBodies(this);

  this.mapClick('travel');

};

Graph.prototype.sectorScan=function(spaceObject){

  let html=``;
  document.getElementById('terminal').innerHTML += `${html}`;


  console.log(`sector scanning`)

  //  console.log('derp?')
  let spaceDsp=document.getElementById('space')
  spaceDsp.innerHTML = `
  [${spaceObject.icon} ${spaceObject.name}] ${buttons.scanBtn.html}

  `;
  buttons.scanBtn.activateBtn(spaceObject)

};
Graph.prototype.displayMinerals=function(spaceObject){
  terminal.innerHTML = `<center>${spaceObject.name} <br>
  <div class='.grid-container' style=height:350px;>
  <div class='.grid-container' id='minerals' ></div>
  </div>
  <div class='sd' id='time' style=display:inline-block;></div>
  <div class='terminalMenu' id='terminalMenu'>
  ${buttons.menuBtn.html}||  ${buttons.mapBtn.html}||${buttons.mineBtn.html}
  </div>

  `;
  buttons.mapBtn.activateBtn(spaceObject)
  buttons.mineBtn.activateBtn(spaceObject)
  buttons.menuBtn.activateBtn(spaceObject)
//  activatebtnBtn('mapBtn',this)




  let minerals = document.getElementById('minerals');
  //terminal.innerHTML = `<table id='t'> </table>`
  let v = Object.values(spaceObject.minerals);////empty before the above loop runs
  let k = Object.keys(spaceObject.minerals);
  let table = document.createElement('table');
  let row = document.createElement('tr')
  row.innerHTML=`<td><strong>Mineral</strong></td><td><b>AMT</b></td>`
  table.appendChild(row)
  for(let mineral in spaceObject.minerals.cargo){

    let row = document.createElement('tr')
    let cell = document.createElement('td')
    let text = `<td> ${mineral}</td><td>${spaceObject.minerals.cargo[mineral].value}</td>`;
    //let tt= `${k[i]}`;
    row.innerHTML=text;
    table.appendChild(row);

  } ;
  ///  table.className = ``;



  minerals.appendChild( table);
  // let     mineBTN=document.getElementById('mineBtn');
  // mineBTN.onclick = function (){//graph.displayMining(spaceObject);
  //
  //
  // }
  //  console.log(k,v);///key and value of minerals
  switch (Object.keys(spaceObject.minerals).length) {
    case 0:
    console.log(`%c ${spaceObject.name} has No minerals`,"background:'red';color:'blue'")
    let row = document.createElement('tr')
    row.innerHTML=`<td>No Minerals Found!</td>`
    table.appendChild(row)
    document.getElementById('terminalMenu').innerHTML = `
    ${buttons.mapBtn.html}|${buttons.menuBtn.html}
    `
    buttons.mapBtn.activateBtn(this,);
    buttons.menuBtn.activateBtn(this,);
    break;
    default:
  }
};
Graph.prototype.trade = (spaceObject,option)=> {
  var trader ;
  var htmls;
  switch (option) {
    case "buy":
        trader = spaceObject
        htmls ="buy"
      break;
      case "sell":
        trader = ship
        htmls ="sell"
        break;
    default:

  }
  terminal.innerHTML = `<center>${trader.name} <br>
  <div class='.grid-container' style=height:350px;>
  <div class='.grid-container' id='cargo' ></div>
  </div>
  <div class='sd' id='time' style=display:inline-block;></div>
  <div class='terminalMenu' id='terminalMenu'>
  ${buttons.menuBtn.html}||  ${buttons.mapBtn.html}||
  </div>

  `;
  buttons.mapBtn.activateBtn(spaceObject)
  buttons.menuBtn.activateBtn(spaceObject)

//  activatebtnBtn('mapBtn',this)




  let cargoEle = document.getElementById('cargo');
  //terminal.innerHTML = `<table id='t'> </table>`
  let v = Object.values(trader.cargoHold);////empty before the above loop runs
  let k = Object.keys(trader.cargoHold);
  let table = document.createElement('table');
  let row = document.createElement('tr')
  row.innerHTML=`<td><strong>cargo</strong></td><td><b>AMT</b></td>`
  table.appendChild(row)
  for(let cargo in trader.cargoHold.cargo){

    let row = document.createElement('tr')
    let cell = document.createElement('td')
    let text = `<td> ${cargo}</td><td>${trader.cargoHold.cargo[cargo].value}</td><td>${trader.cargoHold.cargo[cargo].html}</td>`;
    //let tt= `${k[i]}`;
    row.innerHTML=text;
    table.appendChild(row);

  } ;
  ///  table.className = ``;



  cargoEle.appendChild( table);
  // let     mineBTN=document.getElementById('mineBtn');
  // mineBTN.onclick = function (){//graph.displayMining(trader);
  //
  //
  // }
  //  console.log(k,v);///key and value of minerals
  switch (Object.keys(trader.cargoHold).length) {
    case 0:
    console.log(`%c ${trader.name} has No minerals`,"background:'red';color:'blue'")
    let row = document.createElement('tr')
    row.innerHTML=`<td>No Minerals Found!</td>`
    table.appendChild(row)
    document.getElementById('terminalMenu').innerHTML = `
    ${buttons.mapBtn.html}|${buttons.menuBtn.html}
    `
    buttons.mapBtn.activateBtn(this,);
    buttons.menuBtn.activateBtn(this,);
    break;
    default:
  }

  tradeButtonsActivator(spaceObject,option)
  let t = document.getElementById("info") ;
  t.innerHTML= `${ship.statsDisplay()}`;
};

const mapSpaceBodies= function(map){

  //Display space bodie if it is within the edges of the ship
  for(var grid in map.graph[ship.position].edges){
    //  console.log(`${graphMap.graph[ship.position].value},edge${graphMap.graph[ship.position].edges[grid].value}`)
    for (var spaceObject in map.spaceBodies) {

      if (map.spaceBodies[spaceObject].scanned == true) {
        let mapCord = document.getElementById(map.spaceBodies[spaceObject].position);
        //  console.log(spaceBodies[spaceObject].position)
        mapCord.style.color = 'red';
        mapCord.innerHTML=`<span id="boss"class='parent'><span id='test' class='verticalcentered1'>${map.spaceBodies[spaceObject].icon}</span></span> `;

      }
      if (map.spaceBodies[spaceObject].position == map.graph[ship.position].value ) {
        map.sectorScan(map.spaceBodies[spaceObject])
        let mapCord = document.getElementById(map.spaceBodies[spaceObject].position);
        //  console.log(spaceBodies[spaceObject].position)
        mapCord.style.color = 'red';
        mapCord.innerHTML=`<span class='parent '><span id='test' class='verticalcentered1'>${map.spaceBodies[spaceObject].icon}</span><spin class="spin" style='color:rgba(0,0,0,.9); font-size:5px;text-align:left '> ${map.spaceBodies[spaceObject].icon} </spin></span> `;

      }
      if (map.spaceBodies[spaceObject].position == map.graph[ship.position].edges[grid].value ) {
        //map.sectorScan(map.spaceBodies[spaceObject])
        let mapCord = document.getElementById(map.spaceBodies[spaceObject].position);
        //  console.log(spaceBodies[spaceObject].position)
        mapCord.style.color = 'red';
        mapCord.innerHTML=`<span class='parent '><span id='test' class='verticalcentered1'>${map.spaceBodies[spaceObject].icon}</span><spin class="spin" style='color:rgba(0,0,0,.9); font-size:5px;text-align:left '> ${map.spaceBodies[spaceObject].icon} </spin></span> `;

      }


    }
  }




  let comNode= document.getElementById(ship.position)
  comNode.style.borderColor = "rgba(74, 246, 38, 1)";
  comNode.innerHTML += `<span id='rocket'class=' ship'>${ship.icon}</span>`;
  buttons.menuBtn.activateBtn(map)
  ;

};

/*
###############################
##Breadth-first search      ##
##Finding the fastest rout  ##
###############################
https://en.wikipedia.org/wiki/Breadth-first_search

*/
//start cord and end cord passed in
const BFS = (g,s,e)=>{
  var start=  g.setStart(s);
  var end =  g.setEnd(e);
  let queue =[];
  start.searched =true;
  queue.push(start);
  while (queue.length>0) {
    var current =queue.shift()
    console.log(current.value);
    if (current== end) {
      console.log('found',current.value)
      break;
    }
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
  /////Maping out the path form end to start
  var path =[]
  path.push(end)
  var next= end.parent;
  while(next != null){
    path.push(next);
    next =next.parent;
  }
  console.log('path',path)
  let distance = [];
  ///reverse loop for the path
  for (let i =path.length -1;i>=0;i--){

    let n =path[i];

    distance.push(n.value);
  }

  console.log(distance);
  //multiply the timer by I   delaying the color chage
  //animate ship moving
  for(let i =0;i<distance.length;i++){
    setTimeout(function(){
      ship.position =distance[i]
      g.displayMap()
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
            gameMap.displayMinerals(space_object);
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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\





  //cdnn(120);

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
  let scannerButton= document.getElementById('startGameButton')
  scannerButton.addEventListener("click",function(){

    ship = new Ship("bob");
    ship.cargoHold= new CargoHold(ship.name);
    console.log(status,status[0])
    ship.status = status[0];///['Idling',`Traveling`,"Scanning","Minning"];

    console.log("ship " + ship.name + "!",ship);

    let t = document.getElementById("info") ;
    t.innerHTML= `${ship.statsDisplay()}`;
     gameMap = new Graph;
    currentMap = gameMap;
    //var asteroid1 = new Asteroid();
console.log( gameMap)
    let mapbtn = new Button('[Map]','mapBtn',gameMap)
    makeMenu(gameMap)
    gameMap.makeMap()
    //asteroids.push(asteroid1)
    spaceBodiesGenerator(10,5,gameMap);
    gameMap.displayMap();

  });

  let bfsscan= document.getElementById('bfs')
  bfsscan.addEventListener("click",function(){

  });
