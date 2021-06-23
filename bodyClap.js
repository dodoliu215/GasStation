let myCanvas; //宣告畫布變數
let nextBtn;
let startBtn;

let classifier;
//貼上Teachable Machine的sharable link
let url = 'https://teachablemachine.withgoogle.com/models/FLY6UlOhz/'; 
let label = 'waiting...';
let percent = 0;

let bouncers = []; // We start with an array with just one element.
let gravity = 0.1;
let fishX;
let fishY;
let leftShoulder;
let d;
let score = 0;
let count = 0;
let rDiv;


let video;
let poseNet;
let poses = [];

var scene1 = true;
var scene2 = false;
var scene3 = false;
var scene4 = false;

function preload(){
  classifier = ml5.soundClassifier(url+'model.json', modelReady);
  fish = loadImage('img/happyfish.png');
  Earth = loadImage('img/earth.png');
  Bear = loadImage('img/bear.png');
  step1 = loadImage(src="img/step.0.gif");
  step2 = loadImage(src="img/step.1.gif");
  step3 = loadImage(src="img/step.2.gif");
  loadImage('img/next.png');
  loadImage('img/start-02.png');
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

  nextBtn = createImg('img/next.png');
  nextBtn.size(798*0.12, 422*0.12);
  nextBtn.position(width/2 + 495, height/2 + 160);
  nextBtn.show();

  startBtn = createImg('img/start-02.png');
  startBtn.size(827*0.12, 493*0.12);
  startBtn.position(width/2 + 225, height/2 + 225);
  startBtn.mousePressed(function(){
    scene4 = true;
    scene1 = false;
    scene2 = false;
    scene3 = false;
  })
  startBtn.hide();

  classifyAudio();

  
  video = createCapture(VIDEO);
  poseNet = ml5.poseNet(video,'single', modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();

  // rDiv = createDiv('d');
  // rDiv.position(870, 400);
  // rDiv.style('font-size','20px');


  leftShoulder = createVector(0,0);

  for (let i = 0; i < 0; i++) {
    let x = random(width);
    let y = random(height);
    // let r = random(12,32);
    bouncers.push(new Fish(x,y));
  }
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
    scale(-1,1);
    image(video, 0, 0, -width, height);
    translate(-width,0);
    drawKeypoints();
    pop();

    background(255,150);

    push();  
    imageMode(CENTER);
    image(Earth, width/2, height-15, 9288*0.16, 3663*0.16);
    image(Bear, width - leftShoulder.x + 30, leftShoulder.y - 120 , 2880*0.25, 1800*0.25);
    image(step1, width/2, height/2-50, 10240*0.12, 6400*0.12);
    pop();

  } else if(scene2 == true){

    push();
    scale(-1,1);
    image(video, 0, 0, -width, height);
    translate(-width,0);
    drawKeypoints();
    pop();

    background(255,150);

    push();  
    imageMode(CENTER);
    image(Earth, width/2, height-15, 9288*0.16, 3663*0.16);
    image(Bear, width - leftShoulder.x + 30, leftShoulder.y - 120 , 2880*0.25, 1800*0.25);
    image(step2, width/2, height/2-50, 10240*0.12, 6400*0.12);
    pop();


  } else if(scene3 == true){

    push();
    scale(-1,1);
    image(video, 0, 0, -width, height);
    translate(-width,0);
    drawKeypoints();
    pop();

    background(255,150);

    push();  
    imageMode(CENTER);
    image(Earth, width/2, height-15, 9288*0.16, 3663*0.16);
    image(Bear, width - leftShoulder.x + 30, leftShoulder.y - 120 , 2880*0.25, 1800*0.25);
    image(step3, width/2, height/2-50, 10240*0.12, 6400*0.12);
    pop();
    
    nextBtn.hide();
    startBtn.show();
    

  } else if(scene4 == true){
    nextBtn.hide();
    startBtn.hide();

    push();
    scale(-1,1);
    image(video, 0, 0, -width, height);
    translate(-width,0);
    drawKeypoints();
    pop();
  
    background(255,80);
  
    push();  
    imageMode(CENTER);
    image(Earth, width/2, height-15, 9288*0.16, 3663*0.16);
    image(Bear, width - leftShoulder.x + 30, leftShoulder.y - 120 , 2880*0.25, 1800*0.25);
    // fill(0);
    // circle(width - leftShoulder.x -50 , leftShoulder.y - 150, 30);
    pop();
  
      // Update and display all balls
    for (var i = 0; i < bouncers.length; i++) { // Whatever the length of that array, update and display all of the objects.
      bouncers[i].update();
      bouncers[i].display();
    }
  
    if(label == 'clap' && percent >= 0.90){
      // A new ball object
      count ++;
      if(count >= 40){
        fishX = random(200, width-200);
        fishY = random(-10, -20);
        var b = new Fish(fishX, fishY); // Make a new object at the mouse location.
        bouncers.push(b);
        count = 0;
      }
    }
  
    if(bouncers.length > 20){ 
      bouncers.splice(0,1); // 0-> 刪除陣列的編號 ， 1-> 刪除的數量
    }

    //score字
    fill('#FFE800');
    noStroke();
    textSize(40);
    textStyle(BOLD);
    text('fish = ' + score + ' / 10', width - 330, height/2 - 200);
    // text(d,width/2,300);
  
    // textSize(20);
    // textAlign(CENTER,CENTER);
    // fill(0);
    // text(label,width/2,height-40);
    // text(percent.toFixed(2),width/2,height-60);

    if(score == 10){
      goNext();
    }
  }

  //nextBtn
  nextBtn.mousePressed(function(){

    if(scene1 == true){
      scene2 = true;
      scene1 = false;
      scene3 = false;
      scene4 = false;

    } else if(scene2 == true){
      scene3 = true;
      scene1 = false;
      scene2 = false;
      scene4 = false;

    } else if(scene3 == true){
      scene4 = true;
      scene1 = false;
      scene2 = false;
      scene3 = false;
    }

  })

}
  
  function drawKeypoints()  {
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {
          if(j==5){
              leftShoulder.x = keypoint.position.x;
              leftShoulder.y = keypoint.position.y;
          }
        }
      }
    }
  }
function windowResized() {
  centerCanvas();//執行畫布置中function
}

function goNext(){
  window.open('gas.html','_self'); // 連結至子頁
 }