
var status = ["Idling","Traveling","Scanning","Minning"];
var gridChars='ABCDEFGHIJ';
var gridChars2='0123456789';
class Player {
  constructor(name){
    let hp = Math.floor(Math.random() * (20 - 16 + 1)) + 16; ;
    let mana = Math.floor(Math.random() * (20 - 12 + 1)) + 12; ;



   this.name = name;
   this.hp = hp;
   this.maxHp=hp;
   this.maxMana=mana;
   this.mana = mana;
   this.position= 'A5';
   this.stats={
     air:100,
     food:100,
     water:100,
     power:100,
     fule:100

   }


   this.equipment={
     scannerlv:1,items:[]
   };
   this.equippedWeapon ={

   };


  }
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
    let commander = this;
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
  <table >

  <tr><td>Name</td><td> damage</td> <td> cost</td></tr>
  ${this.getWeapons()}
  </table>
  </td>
  </table>
  commanderattack w:${this.attackWeapon()}
  <br>
  commanderattack m :
  `;

  return html;
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
    this.name = this.makeid();
    this.description = 'test';
    //this.type = ``;// type c :more water little minerals, type a more metals little water , type s  10x metals
    this.minerals ={} ;
    let randChar1 =gridChars[Math.round(Math.random()*9)];
    let randChar2=gridChars2[Math.round(Math.random()*9)];
    let randPos =randChar1+randChar2;
    this.position = randPos;


  }
  generate_Minerals(scanlv){
    let base_minerals= ['iron','Lithium','Aluminum','copper','zinc','nickel','tin']
    let precious_metals=['gold','silver','platinum','Palladium']
    let utility_metals=['titanium','uranium']
    let terminal = document.getElementById('terminal');
    let bscan =0;
    let pscan =0;
    let uscan =0;
    terminal.innerHTML = `${this.name} <br>`;
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
        let min = `${baseMinerals}`;

        if ( this.minerals[min] === undefined){
          console.log(`creaing ${min} with value 0 `)
          this.minerals[`${min}`]=0;
        }
        this.minerals[`${min}`]++
        console.log(`min`,min)
        console.log( this.minerals[`${baseMinerals}`])
        console.log('base',baseMinerals)
      }
//terminal.innerHTML = `<table id='t'> </table>`
        let v = Object.values(this.minerals);////empty before the above loop runs
        let k = Object.keys(this.minerals)
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

        }
      ///  table.className = ``;



        terminal.appendChild( table);

        console.log(k,v);///key and value of minerals

  }///end generate_Minerals
   makeid(length) {
     let result           = '';
     let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
     let num ='0123456789';
     let charactersLength = characters.length;
     for ( let i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     let numLength = num.length;
     result +='-';
     for ( let i = 0; i < 3; i++ ) {
        result += ''+num.charAt(Math.floor(Math.random() * numLength));
     }
     return result;
  }


}//end asteroid class
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
class Grid{
  constructor(aValue,bValue,aIndex,bIndex){
    this.value=aValue+bValue;
    this.aIndex=aIndex;
    this.bIndex=bIndex;
  this.edges=[]
  this.searched =false
  this.parent=null
  }
  addEdge(sides){
    this.edges.push(sides)
  }

}
class Graph{
  constructor(){
    this.grids =[];//nodes
    this.graph={};
    this.start= null;
    this.end = null;
  }
  addGrid(g){
    ///grid into array
    this.grids.push(g);
    let id = g.value
    /// grid into table"hash"
    this.graph[id] = g;
  }
  getGrid(num){
    var n = this.graph[num]
    return n
  }
  setStart(node){
    this.start=this.graph[node]
    return this.start;
  }
  setEnd(node){
    this.end=this.graph[node]
    return this.end;
  }
  map(){
          let result =`<table class='mist' id='map'>`;

          let charLength = gridChars.length;
          let m =0;
          let gridLength = 10;
          let cBI= document.getElementById(`g${commander.position}`)//commander border indicader

            //create grid points and store them
            for(let i =0;i<charLength;i++){
          result += `<tr class='mist'>`

            var lChars = gridChars2[i]
           for(let n =0;n<gridChars.length;n++){
             let node = `${gridChars[i]}${gridChars2[n]}`
             m++
             if(node==asteroid1.position){
              let num = gridChars2[n] //actors
              let numPointer = this.getGrid(num);
              if(numPointer == undefined){
                var points = new Grid(gridChars[i],gridChars2[n],i,n);
              }


               this.addGrid(points);
               result += `<td id='${node}' class='mist sd'  ${cBI} style='color:rgba(255,0, 38, 1)'>X</td>`
                }else {

/////
                 let num = gridChars2[n] //actors
                let numPointer = this.getGrid(num);
                if(numPointer == undefined){
                  var points = new Grid(gridChars[i],gridChars2[n],i,n);
                }


                 this.addGrid(points);
                // console.log(`num :${n}`)

                  result += `<td id='${node}'  class='mist'>${gridChars[i]}${gridChars2[n]}</td>`;
                }

            }

              result += `</tr>`;
          }


          result += ` ${this.name}`
        //  console.log(gridChars[(this.grids[0].aIndex +1)],`:aindex`);
          for(let j = 0;j<this.grids.length;j++){
            let undefed = `includes("undefined");`
            let grid = this.grids[j];
            let aIndex=this.grids[j].aIndex;
            let bIndex=this.grids[j].bIndex;
            let direction = {
              up: `${gridChars[(aIndex -1)]}${bIndex}`,
             down:`${gridChars[(aIndex +1)]}${bIndex}`,
             left:`${gridChars[aIndex]}${(bIndex -1)}`,
             right:`${gridChars[aIndex]}${(bIndex +1)}`

          }
          if(this.graph[direction.up] ==undefined){
            console.log(`undefined found up ${direction.up}`)


          }else{
            grid.edges.push(this.graph[direction.up])
          //  console.log(direction.up,)
          }
          if(this.graph[direction.down] ==undefined){
            console.log(`undefined found down ${direction.down}`)

          }else{
            grid.edges.push(this.graph[direction.down])
          //  console.log(direction.down)
          }
          if(this.graph[direction.left] ==undefined){
            console.log(`undefined found left ${direction.let}`)

          }else{
            grid.edges.push(this.graph[direction.left])
          //  console.log(direction.left)
          }
          if(this.graph[direction.right] ==undefined){
            console.log(`undefined found right ${direction.right}`)

          }else{
            grid.edges.push(this.graph[direction.right])
          //  console.log(direction.right)
          }

        }
          return result;
  }
}


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
    var queue =[];
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
    document.getElementById(distance[i]).style.backgroundColor = 'red';
    document.getElementById(distance[i]).innerHTML = 'o';}, i*1000);


}

}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/////countdown functions

function cdnn(secs){
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

commander.status = status[1];///['Idling',`Traveling`,"Scanning","Minning"];
let x = setInterval(function() {
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
  document.getElementById("options").innerHTML = `
<center>
  <table>
  <th align='center'>Travel Time</th>
  <tr><td>
  <table>
  <tr><td>days</td><td>hours</td><td>minutes</td><td>seconds</td></tr>
  <tr><td>${days}</td><td>${hours}</td><td>${minutes}</td><td>${seconds}</td></tr>
  </ table>
    </td></tr>
    </table>
  <br> commander fule ${Math.round(commander.stats.fule)}
  `;

document.getElementById("info").innerHTML = commander.statsDisplay();
  // If the count down is finished, write some text
  if (nowt > newTimeDate) {
    commander.status = status[0];///['Idling',`Traveling`,"Scanning","Minning"];
    clearInterval(x);
    document.getElementById("options").innerHTML = "arived";
    document.getElementById("info").innerHTML = commander.statsDisplay();
  }
  if (commander.stats.fule == 0) {
    commander.status = status[0];///['Idling',`Traveling`,"Scanning","Minning"];
    clearInterval(x);
    document.getElementById("options").innerHTML = "Ran out of fule";
    document.getElementById("info").innerHTML = commander.statsDisplay();
  }
commander.stats.fule -= 1
}, 1000)};}
////end the cound down timer
function scanner(){
  let roll= Math.random() *20 +1;
  let distance = 0;
  let gridNum =0;
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
  let result ='<table>';
  let gridChars='ABCDEFGHIJ';
  let charLength = gridChars.length;
  let m =0;
  let gridLength = 10;


 // let aP= Math.random()*this.graph.length  ;
  //asteroid.position = aP;
 // console.log(this.graph. )
this.grids =[];

document.getElementById('terminal').innerHTML = `${graphMap.map()}`;
  let ras =asteroid1.position
 // console.log(ras,'ras')


};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
//create a commander hero
var commander = new Player("bob");
var graphMap = new Graph;
var asteroid1 = new Asteroid();
console.log(asteroid1.position,'apos')
 console.log(status,status[0])
commander.status = status[0];///['Idling',`Traveling`,"Scanning","Minning"];
 let sword= {name:"sword",damage:3,bonus:0};


// commander.spellbook.fireball = {...commander.spellbook,...fireball};

 commander.equipment.items.push(sword);


  commander.equippedWeapon =sword;
 console.log("Commander " + commander.name + "!",commander);
console.log(commander.equippedWeapon.damage)
let t = document.getElementById("info") ;


//cdnn(120);
t.innerHTML= `${commander.statsDisplay()}`;
//console.log(timeNow);
// create asteroid and generate minerals for it


 //let scannerButton = document.getElementById('scannerButton');
//scannerButton.addEventListener('click',scanner());


/*scan for asteroid ->
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
  scanner()
});

let bfsscan= document.getElementById('bfs')
bfsscan.addEventListener("click",function(){
  let graph = graphMap;
  let start= commander.position;
  let end= asteroid1.position;
  bfs(graph,start,end) //pass start and End cord
});
