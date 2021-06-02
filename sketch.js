let circles;

function setup() {
  createCanvas(1000, 1000);
  circles = [];
}

function draw() {
  background(0);
  frameRate(20);

  let total = 12;
  let count = 0;
  let attempts = 0;



  while (count < total) {

    let newC = newCircle();

    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 100) {
      noLoop();
      break;
    }
  }


  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) { //Check if touching an edge
        circle.growing = false;
      } else {
        for (let j = 0; j < circles.length; j++) {
          let otherC = circles[j];
          if (circle !== otherC) {
            let d = dist(circle.x, circle.y, otherC.x, otherC.y);
            let distance = circle.r + otherC.r;

            if (d - 2 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}



function newCircle() {
  let x = random(width);
  let y = random(height);
  let valid = true;
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    let d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
