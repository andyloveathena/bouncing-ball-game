//初始設置
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const canvasheight = c.height;
const canvaswidth = c.width;
const unit = 40;
let xspeed = 20;
let yspeed = 20;
//圓
let circle_x = 160;
let circle_y = 60;
let radius = 20;

let ground_x = 100;
let ground_y = 500;
let groundheight = 5;
//拖板控制
c.addEventListener("mousemove", control);

function control(e) {
  ground_x = e.clientX;
}

//托球板子
let board = [];

board[0] = {
  x: 540,
  y: 520,
};
board[1] = {
  x: 500,
  y: 520,
};
board[2] = {
  x: 460,
  y: 520,
};
board[3] = {
  x: 420,
  y: 520,
};

let arr = [];
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    arr.push(this);
    console.log(this.x, this.y);
  }

  drawmanybr() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchingball(circle_x, circle_y) {
    return (
      circle_x >= this.x - radius &&
      circle_x <= this.x + this.width + radius &&
      circle_y >= this.y - radius &&
      circle_y <= this.y + this.height + radius
    );
  }
}

function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

for (let i = 0; i < 10; i++) {
  new Brick(rand(0, 950), rand(0, 550));
}

function drawcircle() {
  //更新重畫canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvaswidth, canvasheight);

  //托球板子
  ctx.fillStyle = "lightblue";
  ctx.fillRect(ground_x, ground_y, 200, groundheight);

  //顯示每個磚塊
  arr.forEach((brick) => {
    brick.drawmanybr();
  });

  //每個arr列表裡面的index都是class Brick
  arr.forEach((brick, index) => {
    //假如class Brick 裡面的 touchingball prototype功能是true的話執行以下功能
    if (brick.touchingball(circle_x, circle_y)) {
      if (circle_y >= brick.y + brick.height || circle_y <= brick.y) {
        //如果球撞擊方塊上方的話往反方向彈,下方亦是如此
        yspeed *= -1;
      }
      if (circle_x >= brick.x + brick.width || circle_x <= brick.x) {
        //如果球撞擊方塊左方的話往反方向彈,右方亦是如此
        xspeed *= -1;
      }

      arr.splice(index, 1);
      if (arr.length == 0) {
        alert("Game Over");
        clearInterval(game);
      }
    }
  });

  //畫圓
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();

  //確認球的方向
  if (circle_x >= canvaswidth - radius) {
    xspeed *= -1;
  }

  if (circle_x <= radius) {
    xspeed *= -1;
  }

  if (circle_y >= canvasheight - radius) {
    yspeed *= -1;
  }

  if (circle_y <= radius) {
    yspeed *= -1;
  }

  //確認有沒有打到托球版
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + 5 + radius
  ) {
    if (yspeed > 0) {
      circle_y -= 40;
      yspeed *= -1;
    } else {
      circle_y += 40;
    }
  }

  //球的變向
  circle_x += xspeed;
  circle_y += yspeed;
}

let game = setInterval(drawcircle, 25);
