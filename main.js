let myCanvas; //宣告畫布變數
let nextBtn;

let a = 0;
let b = 0;

var scene1 = true;
var scene2 = false;
var scene3 = false;

function preload(){
  Main = loadImage('img/main.png');
  rocket = loadImage('img/rocket.png');
  story = loadImage('img/story.png');
  loadImage('img/enter.png');
}


function centerCanvas()  {
  let x = windowWidth/2 - width/2;   //設定中心點x座標，視窗寬度的一半再減掉畫布寬度一半
  let y = windowHeight/2 - height/2; //設定中心點y座標，視窗高度的一半再減掉畫布高度一半
  myCanvas.position(x,y); //定義myCanvas畫布座標(起始點為左上角，與rect相同)
}

function setup() {
  myCanvas = createCanvas(1440, 900); //創建一個畫布指定給myCanvas
  centerCanvas(); //執行畫布置中function


  enterBtn = createImg('img/enter.png');
  enterBtn.size(958*0.12, 443*0.12);
  enterBtn.position(width/2 -75, height/2 + 250);
  enterBtn.mousePressed(function(){
    scene2 = true;
    scene1 = false;
    scene3 = false;
  })
  enterBtn.show();

  //next
  nextBtn = createButton('next');
  nextBtn.addClass('next');
  nextBtn.position(1500,858);
  nextBtn.mousePressed(function(){
    goNext();
  })
  nextBtn.hide();

}


function draw() {
  
  // if(415<mouseX<520 && 625<mouseY<665){
  //   a = random(-1, 1);
  //   b = random(-1, 1);

  //   fill(0);
  //   textSize(20);
  //   text(mouseX, width/2, height/2);
  //   text(mouseY, width/2, height/2+100);
  // }

  if(scene1 == true){

      a = random(-1.5, 1.5);
      b = random(-1, 1);

    imageMode(CENTER);
    image(Main, width/2, height/2, 1440, 900);
    image(rocket, width/2 - 252 + a, height/2-35 + b, 1863*0.07, 5546*0.07);
    enterBtn.position(width/2 -75 + a*0.7, height/2 + 250 + b*0.7);

    // fill(0);
    // textSize(20);
    // text(mouseX, width/2, height/2);
    // text(mouseY, width/2, height/2+100);

  } else if(scene2 == true){
    enterBtn.hide();
    push();  
    imageMode(CENTER);
    image(story, width/2, height/2, 1440, 900);
    pop();

    nextBtn.show();
  } 
}

function windowResized() {
  centerCanvas();//執行畫布置中function
}

function goNext(){
  window.open('index.html','_self'); // 連結至子頁
 }
