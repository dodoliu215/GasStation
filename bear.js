let myCanvas; //宣告畫布變數

let graphics; //使用者畫黑線的地方
let checkGraphics; //偵測用的圖層
let BearBody; //熊身體的黑邊
let colorCanvas; //上色的圖層
let white; //放white熊白底的圖層
let bg;

var scene1 = true;
var scene2 = false;

let cBtn = [];
var col = {
  r : 0,
  g : 0,
  b : 0
}
var colMode = false;

let clearButton;
let checkBtn;
let startBtn;

let userName;

let doodleClassifier;
let resultsDiv;


function preload(){
  BG = loadImage('img/p.2.png');
  loadImage('img/drawTittle.png');
  loadImage('img/myname.png');
  Bstroke = loadImage('stroke-01.png');
  White = loadImage('white-01.png');
  loadImage('img/start.png');
  loadImage('img/thick.png');
  loadImage('img/thin.png');
}


function centerCanvas()  {
  let x = windowWidth/2 - width/2;   //設定中心點x座標，視窗寬度的一半再減掉畫布寬度一半
  let y = windowHeight/2 - height/2; //設定中心點y座標，視窗高度的一半再減掉畫布高度一半
  myCanvas.position(x,y); //定義myCanvas畫布座標(起始點為左上角，與rect相同)
}

function setup() {

  myCanvas = createCanvas(1440, 900); //創建一個畫布指定給myCanvas
  centerCanvas(); //執行畫布置中function

  bg = createGraphics(1440, 900);
  bg.background(BG);

  //先產出隱藏color button
  for(let i=0; i<=8; i++){
    cBtn[i] = createButton('');
    cBtn[i].style('font-size','30px');
    cBtn[i].size(40,40);
    cBtn[i].position(1115+i*50, 690);
    cBtn[i].hide();
  }

  graphics = createGraphics(800, 850);
  // graphics.background(240,20);
  
  //熊身體的黑邊
  BearBody = createGraphics(400*1.25,500*1.25);
  BearBody.background(Bstroke);
  
   //熊區塊的底
  white = createGraphics(400*1.25,500*1.25);
  white.background(White);
  
  //colorCanvas
  colorCanvas = createGraphics(800, 850);
  // colorCanvas.background(240);

  //生成偵測區塊
  checkGraphics = createGraphics(300,300);
  checkGraphics.background(240);

  userName = createInput();
  userName.position(1110,370);

  penWeight = createSlider(1, 30, 5);
  penWeight.position(1170, 637);
  penWeight.hide();

  var s = 0.16;
  //細
  thinIcon = createImg('img/thin.png');
  thinIcon.position(1120, 630);
  thinIcon.size(247*s, 164*s);
  thinIcon.hide();

  //粗
  thickIcon = createImg('img/thick.png');
  thickIcon.position(1320, 630);
  thickIcon.size(247*s, 164*s);
  thickIcon.hide();

  tittle = createImg('img/drawTittle.png');
  tittle.position(width/2 - 100, 20);
  tittle.size(3280*0.2, 975*0.2);

  myName = createImg('img/myname.png');
  myName.position(width/2 + 367, 300);
  myName.size(1524*0.13, 398*0.13);
  
  checkBtn = createButton('偵測');
  checkBtn.addClass('check');
  checkBtn.position(1110, 450);
  checkBtn.mousePressed(checkCanvas);
  
  clearBtn = createButton('我要重畫');
  clearBtn.addClass('re');
  clearBtn.position(1200, 450);
  clearBtn.mousePressed(clearCanvas);
  
  startBtn = createImg('img/start.png');
  startBtn.size(1076*0.13, 437*0.13);
  startBtn.position(1250, 820);
  startBtn.hide();
  startBtn.mousePressed(function(){
    scene1 = false;
    scene2 = true;
    console.log('cool');
    goSave();
  });
  
  doodleClassifier =ml5.imageClassifier('DoodleNet',modelReady);
  resultsDiv = createDiv('請等等');
  resultsDiv.position(1115, 550);
  resultsDiv.style('font-size','20px');
  // resultsDiv.style('background-color','green');
  resultsDiv.style('width','590px');

}

function modelReady() {
  // console.log('model loaded');
  resultsDiv.html('開始畫吧！');
  // doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  window.location.reload();
}


function checkCanvas(){
  // image(checkGraphics,900,0,450,450);
  doodleClassifier.classify(checkGraphics, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(results);
  let c = [];
  var bearMode = false;

  for(i=0; i<=2; i++){
    if(results[i].label == 'bear'){

      c[4] = `${results[i].label} 
      ${nf(100 * results[i].confidence, 2, 1)}%`;
      c[i] = `${results[4].label} 
      ${nf(100 * results[4].confidence, 2, 1)}%`;

      bearMode = true;

    } else if(results[i].label != 'bear'){

      c[i] = `${results[i].label} 
      ${nf(100 * results[i].confidence, 2, 1)}%`;
    }
  }
  if(bearMode == true){
    resultsDiv.html('他是一個『'+c[4]+'』「'+c[0]+'」「'+c[1]+' 」「'+c[2]+'」的熊誒！');
    //進行上色
    paintColor();

  }else{
    resultsDiv.html('他是一個「'+c[0]+'」「'+c[1]+' 」「'+c[2]+'」的熊誒！');
    startBtn.hide();
    colMode = false;
    for(let i=0; i<=8; i++){
      cBtn[i].hide();
    }
    thickIcon.hide();
    thinIcon.hide();
    penWeight.hide();
  }
}

function paintColor(){
  colMode = true;
  // console.log(colorMode);

  for(let i=0; i<=8; i++){
    cBtn[i].show();
  }
  startBtn.show();
  thinIcon.show();
  thickIcon.show();
  penWeight.show(); //筆畫粗細的拉桿

  cBtn[0].style('background-color','#CE8B54');
  cBtn[1].style('background-color','#83502E');
  cBtn[2].style('background-color','#DB3838');
  cBtn[3].style('background-color','#F9A228');
  cBtn[4].style('background-color','#FECC2F');
  cBtn[5].style('background-color','#B2C225');
  cBtn[6].style('background-color','#40A4D8');
  cBtn[7].style('background-color','#A363D9'); 
  cBtn[8].style('background-color','#EE657A'); 

}

function draw() {
  if(mouseIsPressed && colMode == false){
    graphics.stroke(col.r, col.g, col.b);
    graphics.strokeWeight(5);
    graphics.line(pmouseX,pmouseY,mouseX,mouseY);
    
    //for偵測用
      checkGraphics.stroke(0);
      checkGraphics.strokeWeight(16);
      checkGraphics.line(pmouseX-370, pmouseY-150, mouseX-370, mouseY-150);

    } else if(mouseIsPressed && colMode == true){

      colorCanvas.stroke(col.r, col.g, col.b);
      colorCanvas.strokeWeight(penWeight.value());
      colorCanvas.line(pmouseX,pmouseY,mouseX,mouseY);

        //按btn上色
      cBtn[0].mousePressed(function(){
      col.r = 206
      col.g = 139 
      col.b = 84
      saveButton.show(); //上色後就可以存圖送出
      })

      cBtn[1].mousePressed(function(){
      col.r = 131
      col.g = 80
      col.b = 46
      saveButton.show(); //上色後就可以存圖送出
      })

      cBtn[2].mousePressed(function(){
      col.r = 219
      col.g = 56
      col.b = 56
      saveButton.show(); //上色後就可以存圖送出
      })

      cBtn[3].mousePressed(function(){
      col.r = 249
      col.g = 162
      col.b = 40
      saveButton.show(); //上色後就可以存圖送出
      })

      cBtn[4].mousePressed(function(){
      col.r = 254
      col.g = 204
      col.b = 47
      saveButton.show(); //上色後就可以存圖送出
      })

      cBtn[5].mousePressed(function(){
      col.r = 178
      col.g = 194
      col.b = 37
      saveButton.show(); //上色後就可以存圖送出
      })

      cBtn[6].mousePressed(function(){
      col.r = 64
      col.g = 164
      col.b = 216
      saveButton.show(); //上色後就可以存圖送出
      })
  
      cBtn[7].mousePressed(function(){
      col.r = 163
      col.g = 99
      col.b = 217
      saveButton.show(); //上色後就可以存圖送出
      })

      cBtn[8].mousePressed(function(){
      col.r = 238
      col.g = 101
      col.b = 122
      saveButton.show(); //上色後就可以存圖送出
      })
    }

  if(scene1 == true){
    // image(bg,0,0);
    image(white,290,190);
    image(colorCanvas,0,0);
    image(BearBody,290,190);
    image(graphics,0,0);
    // image(checkGraphics,700,0,400,400);

    fill(0);
    textSize(20);
    textStyle(BOLD);
    text(userName.value(), 580, 550);

  } else if(scene2 == true){
    push();
    image(white,290,190);
    image(colorCanvas,0,0);
    image(BearBody,290,190);
    image(graphics,0,0);

    fill(0);
    textSize(20);
    textStyle(BOLD);
    text(userName.value(), 580, 550);

    // fill(0);
    // circle(width/2, height/2, 50);
    pop();
  }
}

function windowResized() {
  centerCanvas();//執行畫布置中function
}

function goSave(){
  // saveMode = true;
  saveCanvas(canvas, 'bear.png');
  window.open('https://dodoliu215.github.io/Gas-clap/');
  // window.open('bodyClap.html','_self'); // 連結至子頁
}
