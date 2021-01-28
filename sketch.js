/*as of now, ball movements are async(ball mov differs from one browser to another)
Goal: To make the ball movement syncho

Before: How to read and write data
Ujjwal:1
Section:B

JSON data structure: key:value

on--- read data from database on("value", function(data){})
update--- update some 
set-- .set().. delete all then it will update the new data into the database
*/
var myball;
var database;
var position;
var myBallPosition;
function setup(){
    createCanvas(500,500);
    myball = createSprite(250,250,10,10);
    myball.shapeColor = "red";


    database= firebase.database();
     
    var myBallPosition= database.ref('ball/position');
    myBallPosition.on("value", readPos)

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    //readDB();
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
'x': position.x +x,
'y': position.y+y
    })
}

function readPos(data){
    position = data.val();
    console.log(position.x);

    myBallPosition.x = position.x;
    myBallPosition.y = position.y;
}



