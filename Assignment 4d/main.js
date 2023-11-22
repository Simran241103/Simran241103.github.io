// Thanks to Renan Martineli for this version of the demo

// setup canvas

const para = document.querySelector('p');
let count = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Function to generate a random number within a range
function random(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
 }
 
 // Function to generate random RGB color value
 function randomRGB() {
   return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
 }
 
 // Define the Ball class
 class Ball {
   constructor(x, y, velX, velY, color, size, exists = true) {
     this.x = x;
     this.y = y;
     this.velX = velX;
     this.velY = velY;
     this.color = color;
     this.size = size;
     this.exists = exists;
   }
 
   draw(ctx) {
     ctx.beginPath();
     ctx.fillStyle = this.color;
     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
     ctx.fill();
   }
 
   update(width, height) {
     if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
       this.velX = -this.velX;
     }
 
     if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
       this.velY = -this.velY;
     }
 
     this.x += this.velX;
     this.y += this.velY;
   }
 
   collisionDetect(balls) {
     for (const ball of balls) {
       if (this !== ball && ball.exists) {
         const dx = this.x - ball.x;
         const dy = this.y - ball.y;
         const distance = Math.sqrt(dx * dx + dy * dy);
 
         if (distance < this.size + ball.size) {
           ball.color = this.color = randomRGB();
         }
       }
     }
   }
 }
 
 // Define the EvilCircle class
 class EvilCircle {
   constructor(x, y, size, color = 'white', velX = 20, velY = 20) {
     this.x = x;
     this.y = y;
     this.size = size;
     this.color = color;
     this.velX = velX;
     this.velY = velY;
   }
 
   draw(ctx) {
     ctx.beginPath();
     ctx.strokeStyle = this.color;
     ctx.lineWidth = 3;
     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
     ctx.stroke();
   }
 
   checkBounds(width, height) {
     if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
       this.x -= this.velX;
     }
 
     if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
       this.y -= this.velY;
     }
   }
 
   collisionDetect(balls, para) {
     for (const ball of balls) {
       if (ball.exists) {
         const dx = this.x - ball.x;
         const dy = this.y - ball.y;
         const distance = Math.sqrt(dx * dx + dy * dy);
 
         if (distance < this.size + ball.size) {
           ball.exists = false;
           para.textContent = 'Ball count: ' + (--count);
         }
       }
     }
   }
 }

 // Define array to store balls and populate it
 const balls = [];
 
 while (balls.length < 25) {
   const size = random(10, 20);
   const ball = new Ball(
     random(0 + size, width - size),
     random(0 + size, height - size),
     random(-7, 7),
     random(-7, 7),
     randomRGB(),
     size
   );
   balls.push(ball);
   count++;
   para.textContent = 'Ball count: ' + count;
 }
 
 const evilBall = new EvilCircle(random(0, width), random(0, height), 10);
 
 // The animation loop
 function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0, width, height);
 
   for (const ball of balls) {
     if (ball.exists) {
       ball.draw(ctx);
       ball.update(width, height);
       ball.collisionDetect(balls);
     }
   }
 
   evilBall.draw(ctx);
   evilBall.checkBounds(width, height);
   evilBall.collisionDetect(balls, para);
 
   requestAnimationFrame(loop);
 }
 
 loop();