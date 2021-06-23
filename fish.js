class Fish {
    constructor(x, y, w) {
      this.x = x; // x location of square 
      this.y = y; // y location of square 
      this.w = w; // speed of square 
      this.speed = 0; // size
      this.toggle = true;
    }
    display() {

    if(this.toggle == true){
      image(fish, this.x, this.y, 1257*0.05, 3001*0.05);
    }
    

    let d = dist(width - leftShoulder.x - 90 , leftShoulder.y - 150, this.x, this.y);
    // console.log(d);
    if(d <= 100 && this.toggle == true){
        score = score + 1;
        this.toggle = false;
    }

    // rDiv.html(d);
    }
  
    update() {
      // Add speed to location
      this.y = this.y + this.speed;
  
      // Add gravity to speed
      this.speed = this.speed + gravity;
  
      // If square reaches the bottom 
      // Reverse speed 
    //   if (this.y > height) {
    //     this.y = height;
    //     this.speed = this.speed * -0.95;
    //   }
    }
  }