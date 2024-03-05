let stars = [];
let today = new Date();
let dates = []; // Array to store dates
let sampleZNumbers = [];
let modal = null;
let colorSelector;
let titles = [];
let img = null;
// toprow colors on the color palette.
/*
let colorMatrix = [
  [255,38,0],
  [255,147,0],
  [255,251,0],
  [0,249,0],
  [0,253,255],
  [4,51,255],
  [255,64,255],
  [148,33,146],
  [170,121,66],
  [255,255,255],
  [145,145,145],
  //[0,0,0],
] 
*/

let colorMatrix = [
  //--- toprow colors on the color palette ---
  [255, 38, 0],
  [255, 147, 0],
  [255, 251, 0],
  [0, 249, 0],
  [0, 253, 255],
  [4, 51, 255],
  [255, 64, 255],
  [148, 33, 146],
  [170, 121, 66],
  [255, 255, 255],
  [145, 145, 145],
  // ------at least on my Macbook-----------
  [0, 0, 255],
  [0, 255, 0],
  [255, 0, 0],
  [255, 255, 255],
  [255, 0, 255],
  [247, 177, 56],
  [239, 102, 28],
  [244, 167, 107],
  [255, 255, 255],
  [128, 128, 128],
  [219, 112, 147],
  [178, 98, 44],
  [111, 54, 3],
  [100, 149, 237],
  [75, 0, 130],
  [0, 255, 255],
  [255, 165, 0],
  [255, 192, 203],
  [210, 105, 30],
  [220, 20, 60],
  [192, 192, 192],
  [255, 20, 147],
  [255, 140, 0],
  [72, 61, 139],
  [127, 255, 0],
  [70, 130, 180],
  [240, 230, 140],
  [34, 139, 34],
  [255, 105, 180],
  [255, 255, 0],
  [154, 205, 50],
  [255, 215, 0],
  [0, 128, 0],
  [0, 0, 128],
  [128, 0, 128],
  [0, 128, 128],
  [128, 128, 0],
  [0, 0, 128],
  [0, 128, 128],
  [128, 0, 128],
  [128, 128, 0],
  [0, 0, 139],
  [0, 139, 139],
  [139, 0, 139],
  [139, 139, 0],
  [0, 0, 147],
  [0, 147, 147],
  [147, 0, 147],
  [147, 147, 0],
  [0, 0, 156],
  [0, 156, 156],
  [156, 0, 156],
  [156, 156, 0],
  [0, 0, 165],
  [0, 165, 165],
  [165, 0, 165],
  [165, 165, 0],
  [0, 0, 174],
  [0, 174, 174],
  [174, 0, 174],
  [174, 174, 0],
  [0, 0, 183],
  [0, 183, 183],
  [183, 0, 183],
  [183, 183, 0],
  [0, 0, 192],
  [0, 192, 192],
  [192, 0, 192],
  [192, 192, 0],
  [0, 0, 201],
  [0, 201, 201],
  [201, 0, 201],
  [201, 201, 0],
  [0, 0, 210],
  [0, 210, 210],
  [210, 0, 210],
  [210, 210, 0],
  [0, 0, 219],
  [0, 219, 219],
  [219, 0, 219],
  [219, 219, 0],
  [0, 0, 228],
  [0, 228, 228],
  [228, 0, 228],
  [228, 228, 0],
  [0, 0, 237],
  [0, 237, 237],
  [237, 0, 237],
  [237, 237, 0],
  [0, 0, 246],
  [0, 246, 246],
  [246, 0, 246],
  [246, 246, 0],
  [0, 0, 255],
  [0, 255, 255],
  [255, 0, 255],
  [255, 255, 0],
];

function preload() {
  // Load random dates from text file
  loadStrings("star_data.txt", function (data) {
    dates = data.map((date) => new Date(date.trim()));
    // Calculate sample z numbers based on the dates
    let today = new Date(); // Get today's date
    sampleZNumbers = dates.map((date) => {
      let difference = today - date;
      let calZ = Math.floor(difference / (1000 * 60 * 60 * 24)); // Return the calculated z number (in days)
      let zNumber = map(calZ, 0, 4500, 100, 0); // Reverse the mapping to a value between 100 and 0
      return zNumber;
    });
  });
  // Load random dates from text file
  loadStrings("title_data.txt", function (dataTitles) {
    titles = dataTitles.map((title) => new String(title.trim()));
  });

  img = loadImage("movementSense.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //nStars = sampleZNumbers.length
  fillArray();
  //console.log(stars);
  for (let i = 0; i < stars.length; i++) {
    stars[i].makeConstellation(stars);
  }
  //colorSelector = new ColorSearchBox(200,235,50,50);
  colorSelector = createColorPicker();
  //colorSelector.position(200, 235);
  colorSelector.addClass("color-selector"); // Assign a class to the color selector element
}

function fillArray() {
  for (let s = 0; s < sampleZNumbers.length; s++) {
    //console.log(sampleZNumbers[s]);
    let p = new Star(sampleZNumbers[s]);
    //console.log(p);
    //console.log(p.pos.z);
    //console.log(p.radius);
    stars.push(p);
  }
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");

  let bigint = parseInt(hex, 16);

  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return color(r, g, b);
}

function findStarWithColor(color) {
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].color.toString() == color.toString()) {
      return stars[i];
    }
  }
}

function archieveBlackhole() {}

function chase(mouse, cat, speed) {
  mouse.x = mouseX;
  mouse.y = mouseX;
  let rX = mouseX - cat.pos.x;
  let rY = mouseY - cat.pos.y;

  //step 2
  let rlen = sqrt(rX ** 2 + rY ** 2);

  //step 3
  let uX = (1 / rlen) * rX;
  let uY = (1 / rlen) * rY;

  //step 4
  cat.pos.x += speed * uX;
  cat.pos.y += speed * uY;
}

function draw() {
  background(0);
  let cHex = colorSelector.value();
  let cRGB = hexToRgb(cHex);

  let colorSelectedStar = findStarWithColor(cRGB);
  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
    stars[i].update();
    if (colorSelectedStar == stars[i]) {
      stars[i].setStarSelect(true);
    } else {
      stars[i].setStarSelect(false);
    }
    stars[i].showConstellation();
    if (modal) {
      modal.show();
    }
  }

  //console.log(cRGB.toString());
  //console.log(stars[1].color.toString())
}

class Star {
  constructor(z) {
    this.title = random(titles);
    this.notes =
      "Business concept: Launch a gourmet ice cream sandwich truck offering a unique twist on the classic treat. We'll use homemade, artisanal ice cream packed between freshly-baked cookies, waffles, or brownies. This mobile business will cater to a broad audience, from children to adults, by offering a wide range of flavors, including vegan and gluten-free.";
    this.location = "📍Isamageriet";
    this.img = "SV_NotExist.jpg";
    this.sound = "";
    this.senses = "";
    this.ogZNumber = z;
    this.pos = createVector(
      random(0, windowWidth - 30),
      random(0, windowHeight - 30),
      z
    );
    this.radius = map(this.pos.z, 0, 100, 1, 12);
    this.alpha = random(200, 255);
    this.fadeAmount = random(1, 5); //the amount that alpha is de/increased for every update
    this.rotationSpeed = random(0.02, 0.2);
    this.angle = random(-80, 90); // Angle for rotation
    this.speed = random(0, 0.2);
    this.color = color(random(colorMatrix));
    this.constellation = [];
    this.isClicked = false;
    this.orbitRadius = random(0, 58);
    this.lerpNumber = random(0.1, 0.5);
    this.selected = false;
  }

  makeConstellation(stars) {
    for (let i = 0; i < stars.length; i++) {
      if (
        stars[i] !== this &&
        stars[i].color.toString() === this.color.toString()
      ) {
        this.constellation.push(stars[i]);
        console.log("We belong together!");
      }
    }
  }

  setRadius(r) {
    this.radius = r;
  }

  moveTo(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  mouseOver() {
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d < this.radius) {
      push();
      rectMode(CENTER);
      fill("#e37400");
      let str = this.title;
      text(str, this.pos.x, this.pos.y, 200, 30, 999); // Increase the z number by 1
      pop();
    }
    return d < this.radius;
  }
  engorge() {
    if (this.radius < 30) {
      this.radius++;
      this.pos.z = 105;
    }
    for (let i = 0; i < this.constellation.length; i++) {
      // Update the angle for the current star
      this.constellation[i].angle += 0.001; // Adjust the speed as needed
      this.constellation[i].radius = this.radius - 10;
      this.constellation[i].pos.z = random(101, 104);
      this.constellation[i].orbitRadius = 5;
      this.constellation[i].speed = 0.01;

      // Calculate the target position of the current star in its orbit
      let x = this.pos.x + this.orbitRadius * cos(this.constellation[i].angle);
      let y = this.pos.y + this.orbitRadius * sin(this.constellation[i].angle);
      let target = createVector(x, y);

      // Use the lerp function to move the current star towards the target position
      this.constellation[i].pos = p5.Vector.lerp(
        this.constellation[i].pos,
        target,
        this.constellation[i].lerpNumber
      ); // Adjust the lerp factor as needed
      push();
      //fill('white')
      strokeWeight(2);
      stroke(this.color);
      drawingContext.setLineDash([15, 10]);
      line(
        this.pos.x,
        this.pos.y,
        this.constellation[i].pos.x,
        this.constellation[i].pos.y
      );
      pop();
      //console.log(this.color.toString())
      //console.log(this.constellation[i].pos.z);
    }
  }
  // Deflate the star when mouse is not over
  deflate() {
    this.radius = map(this.ogZNumber, 0, 100, 1, 12);
    this.pos.z = this.ogZNumber;

    // Generate a random target position for each star only if they don't already have one
    for (let i = 0; i < this.constellation.length; i++) {
      if (!this.constellation[i].target) {
        let x = random(windowWidth - 30);
        let y = random(windowHeight - 30);
        this.constellation[i].target = createVector(x, y);
      }
    }
    for (let i = 0; i < this.constellation.length; i++) {
      // Move current star  towards the target position
      this.constellation[i].pos = p5.Vector.lerp(
        this.constellation[i].pos,
        this.constellation[i].target,
        0.05
      ); // Adjust the lerp factor as needed
    }
  }

  //this conflicts with the colorSelector, introduce a starSelect variable instead of only checking mouseOver().
  checkMouseOver() {
    if (this.mouseOver()) {
      this.engorge();
    } else {
      this.deflate();
    }
  }

  setStarSelect(colorSelected) {
    if (this.mouseOver() || colorSelected) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  showConstellation() {
    if (this.selected) {
      this.engorge();
    } else {
      this.deflate();
    }
  }

  //Fix here ----------
  checkStarSelect(color) {
    if (color.toString() == this.color.toString()) {
      this.engorge();
    } else {
      this.deflate();
    }
  }
  //-----------

  handleClick() {
    if (this.mouseOver()) {
      this.isClicked = true;
      // Create and show the modal
      modal = new Modal(this);
      console.log("a modal was created!");
      modal.toggle();
    } else {
      this.isClicked;
    }
  }

  movement() {
    let xoffset = cos(this.angle) * this.speed;
    let yoffset = sin(this.angle) * this.speed;
    this.pos.x = (this.pos.x + xoffset + windowWidth) % windowWidth;
    this.pos.y = (this.pos.y + yoffset + windowHeight) % windowHeight;
    this.angle += 0.01; // Increment the angle by a small value
  }

  twinkle() {
    // Update alpha and fade
    this.alpha -= this.fadeAmount;
    if (this.alpha < 15 || this.alpha > 254) {
      this.fadeAmount *= -1;
    }
  }

  update() {
    this.movement();
    this.twinkle();
  }

  show() {
    noStroke();

    // Define gradient colors

    for (let r = 0; r <= this.radius; r++) {
      // Calculate alpha value based on distance from center
      let alpha = map(r, 0, this.radius, this.alpha, 0);
      let colorAtRadius = lerpColor(this.color, this.color, 0.01); // Interpolate between colors
      fill(
        red(colorAtRadius),
        green(colorAtRadius),
        blue(colorAtRadius),
        alpha
      );
      circle(this.pos.x, this.pos.y, r * 2); // Draw ellipse with varying radius
    }
  }
}

// Loop through all stars and check if any are clicked
function mouseClicked() {
  let starClicked = false;
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].mouseOver()) {
      stars[i].handleClick();
      starClicked = true;
    }
  }
  // If a star is not clicked, hide the currently active modal
  if (!starClicked && modal) {
    modal.hide();
    modal = null;
  }
}

//Modal (right now it is just a placeholder) for the pop-up with description/details about star
class Modal {
  constructor(star) {
    this.belong = star.pos.z;
    this.starRadius = star.radius;
    this.isVisible = false;
    this.title = star.title;
    this.description = star.notes;
    this.senses = img; // Replace with actual properties
    this.color = star.color;

    // Get the modal elements
    this.modal = document.getElementById("starModal");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalDescription = document.getElementById("modalDescription");
    this.modalSenses = document.getElementById("modalSenses");
    this.closeButton = document.getElementById("closeButton");

    // Add event listener to the close button
    this.closeButton.addEventListener("click", () => this.hide());
  }

  show() {
    if (this.isVisible) {
      // Set the modal content
      this.modalTitle.textContent = this.title;
      this.modalDescription.textContent = this.description;
      this.modalSenses.innerHTML = `<img src="sensesImage.png" alt="Senses Image">`;

      // Show the modal
      this.modal.style.display = "block";
    }
  }

  hide() {
    this.isVisible = false;
    this.modal.style.display = "none";
  }

  toggle() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.show();
    } else {
      this.hide();
    }
  }
}
