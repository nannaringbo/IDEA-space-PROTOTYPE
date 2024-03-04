let colPic; // variable for colorpicker
let inputTitle; // to variabler for input fields
let inputDes;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");

  fill("white");
  text("Title:", windowWidth / 2 - 100 - 55, windowHeight / 2 - 140);
  inputTitle = createInput();
  inputTitle.position(windowWidth / 2 - 100, windowHeight / 2 - 150);
  inputTitle.size(200, 20);

  text("Describe the idea:", windowWidth / 2 - 100 - 125, 100 + 150);
  inputDes = createInput();
  inputDes.position(windowWidth / 2 - 100, 240);
  inputDes.size(200, 50);

  text("Pick a color for the star:", windowWidth / 2 - 350, 140 + 220);
  colPic = createColorPicker("green");
  colPic.position(windowWidth / 2 - 200, 340);

  let button = createButton(" Add Idea ");
  button.position(windowWidth / 2 + 50, windowHeight / 2 + 200);
  button.mouseClicked(goToStarField);
}
function goToStarField() {
  window.location.href = "starField.html";
}

function draw() {
  fill(colPic.color());
  noStroke();
  circle(windowWidth / 2, windowHeight / 2 + 100, 200);
}
