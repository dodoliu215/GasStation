let myCanvas; //宣告畫布變數
let classifier;
//貼上Teachable Machine的sharable link
let url = 'https://teachablemachine.withgoogle.com/models/nfgcUZiWR/'; 
let label = 'waiting...';
let percent = 0;

let upX;
let upY = 600;

var scene1 = true;
var scene2 = false;
var scene3 = false;

function preload(){
  classifier = ml5.soundClassifier(url+'model.json', modelReady);
  Earth = loadImage('img/earth.png');
  rocket = loadImage('img/greenfart2.png');
  fart = loadImage("img/fart.gif");
  last = loadImage('img/lastP.png');
  loadImage('img/ok.png');
}

function modelReady() {
  print('Model Loaded');
}

function centerCanvas()  {
  let x = windowWidth/2 - width/2;   //設定中心點x座標，視窗寬度的一半再減掉畫布寬度一半
  let y = windowHeight/2 - height/2; //設定中心點y座標，視窗高度的一半再減掉畫布高度一半
  myCanvas.position(x,y); //定義myCanvas畫布座標(起始點為左上角，與rect相同)
}

function setup() {
  myCanvas = createCanvas(1440, 900); //創建一個畫布指定給myCanvas
  centerCanvas(); //執行畫布置中function

  classifyAudio();

  okBtn = createImg('img/ok.png');
  okBtn.size(562*0.12, 518*0.12);
  okBtn.position(width/2 + 240, height/2 + 223);
  okBtn.mousePressed(function(){
    scene2 = true;
    scene1 = false;
    scene3 = false;
  })
  okBtn.show();

  restartBtn = createImg('img/restart.png');
  restartBtn.size(1966*0.12, 573*0.12);
  restartBtn.position(width/2 + 400, height/2 + 150);
  restartBtn.hide();
  restartBtn.mousePressed(function(){
    goBack();
  })
}

function classifyAudio(){
  classifier.classify(gotResults);
}

function gotResults(error,results){
  if(error){
    console.error(error);
    return
  }
  label = results[0].label;
  percent = results[0].confidence;
}


function draw() {
  if(scene1 == true){
    push();  
    imageMode(CENTER);
    image(Earth, width/2, height, 9288*0.16, 3663*0.16);
    // image(rocket, width/2, upY, 1870*0.1, 4143*0.1);
    background(220, 150);
    image(fart, width/2, height/2-50, 10240*0.12, 6400*0.12);
    pop();


  } else if(scene2 == true){
    okBtn.hide();
    background(200);
    imageMode(CENTER);

    image(Earth, width/2, height, 9288*0.16, 3663*0.16);
    image(rocket, width/2, upY, 1870*0.1, 4143*0.1);


    if(label == 'gas' && percent >= 0.8){
      // A new ball object
      upY = upY - 1.5;
    } else {
      upY = upY + 0.5;
    }

    if(label == 'Background Noise'){
      upY = upY + 0.7;
    }

    if(upY >= 600){
      upY = 600;
    }

    if(upY <= -5){
      scene3 = true;
      scene2 = false;
      scene1 = false;
    }

    // //score字
    // fill(0);
    // noStroke();
    // textSize(50)
    // text('gasss = '+score,width/2,200);

    // textSize(20);
    // textAlign(CENTER,CENTER);
    // fill(0);
    // text(upY, width/2, height/2);
    // text(label,width/2,height-40);
    // text(percent.toFixed(2),width/2,height-60);
  } else if(scene3 == true){
    okBtn.hide();
    push();  
    imageMode(CENTER);
    image(last, width/2, height/2, 1440, 900);
    pop();

    restartBtn.show();
  }
}

function windowResized() {
  centerCanvas();//執行畫布置中function
}

function goBack(){
  window.open('main.html','_self'); // 連結至子頁
 }