let stars = [];
let today = new Date();
let dates = []; // Array to store dates
let sampleZNumbers = [];
let modal = null;

function preload() {
  // Use preload() function to load data before setup() is called
  loadStrings("star_data.txt", function (data) {
    dates = data.map((date) => new Date(date.trim()));
    //console.log(dates); // Log the dates array to the console
    // Calculate sample z numbers here, inside the callback
    let today = new Date(); // Get today's date
    sampleZNumbers = dates.map((date) => {
      let difference = today - date;
      let calZ = Math.floor(difference / (1000 * 60 * 60 * 24)); // Return the calculated z number
      let zNumber = map(calZ, 0, 3500, 0, 100);
      return zNumber;
    });

    //console.log(sampleZNumbers); // Log the sample z numbers array to the console
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //nStars = sampleZNumbers.length
  fillArray();
  //console.log(stars);
  for (let i = 0; i < stars.length; i++) {
    stars[i].makeConstellation(stars);
  }
}

function fillArray() {
  for (let s = 0; s < sampleZNumbers.length; s++) {
    //console.log(sampleZNumbers[s]);
    let p = new Star(sampleZNumbers[s]);
    //console.log(p);
    //console.log(p.radius);
    stars.push(p);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
    stars[i].update();
    stars[i].checkMouseOver();
    if (modal) {
      modal.show();
    }
  }
}

class Star {
  constructor(z) {
    this.title = "";
    this.notes = "";
    this.location = "";
    this.img = "";
    this.sound = "";
    this.sense = "";
    this.ogZNumber = z;
    this.pos = createVector(
      random(0, windowWidth - 20),
      random(0, windowHeight - 20),
      z
    );
    this.radius = map(z, 0, 100, 12, 1); // calculating radius based on the z index. The bigger the z index, the smaller the radius
    this.alpha = random(200, 255);
    this.fadeAmount = random(1, 5); //the amount that alpha is de/increased for every update
    this.rotationSpeed = random(-0.02, 0.02);
    this.angle = random(-90, 90); // Angle for rotation
    this.speed = random(-0.05, 0.0);
    this.color = color(
      random([
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
        [0, 0, 0],
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
      ])
    );
    this.constellation = [];
    this.isClicked = false;
    this.orbitRadius = random(-50, 50);
    this.lerpNumber = random(0.01, 0.1);
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
      //console.log(this.constellation);
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
    return d < this.radius;
  }
  engorge() {
    if (this.mouseOver() && this.radius < 25) {
      this.radius++;
      this.pos.z = 0;
    }
    for (let i = 0; i < this.constellation.length; i++) {
      // Update the angle for the current star
      this.constellation[i].angle += 0.01; // Adjust the speed as needed
      this.constellation[i].radius = this.radius;
      this.constellation[i].pos.z = random(0.1, 2);

      // Calculate the target position of the current star in its orbit
      let x = this.pos.x + this.orbitRadius * cos(this.constellation[i].angle);
      let y = this.pos.y + this.orbitRadius * sin(this.constellation[i].angle);
      let target = createVector(x, y);

      // lerp function to move the current star towards the target position
      this.constellation[i].pos = p5.Vector.lerp(
        this.constellation[i].pos,
        target,
        this.constellation[i].lerpNumber
      );

      //console.log(this.constellation[i].pos.z);
    }
  }
  // Deflate the star when mouse is not over
  deflate() {
    if (!this.mouseOver()) {
      this.radius = map(this.ogZNumber, 0, 100, 12, 1);
      this.pos.z = this.ogZNumber;

      // Generate a random target position for each star only if they don't already have one
      for (let i = 0; i < this.constellation.length; i++) {
        if (!this.constellation[i].target) {
          let x = random(width);
          let y = random(height);
          this.constellation[i].target = createVector(x, y);
        }
      }
    }
    for (let i = 0; i < this.constellation.length; i++) {
      // lerp function to move the current star towards the target position
      this.constellation[i].pos = p5.Vector.lerp(
        this.constellation[i].pos,
        this.constellation[i].target,
        0.05
      );
    }
  }

  checkMouseOver() {
    if (this.mouseOver()) {
      this.engorge();
    } else {
      this.deflate();
    }
  }

  handleClick() {
    if (this.mouseOver()) {
      this.isClicked = true;
      // Create the modal when star is clisked
      modal = new Modal(this);
      console.log("a modal was created!");
      modal.toggle(); //Toggle the visibility of the modal
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
    this.title = "Star Details";
    this.description =
      "This is a star with radius " +
      this.starRadius +
      " and z-position " +
      this.belong;
    this.bulletPoints = ["Point 1", "Point 2", "Point 3"]; // Replace with actual properties

    // Define the size and position of the modal
    this.width = 800;
    this.height = 500;
    this.x = (windowWidth - this.width) / 2;
    this.y = (windowHeight - this.height) / 2;

    // Define the size and position of the close button
    this.closeButtonSize = 20;
    this.closeButtonText = "X";
    this.closeButtonX = this.x + this.width - this.closeButtonSize;
    this.closeButtonY = this.y;
    this.color = star.color;
  }

  show() {
    if (this.isVisible) {
      noStroke();
      fill(color(this.color)); // Background color

      // Draw the modal
      rect(this.x, this.y, this.width, this.height);

      // Draw the title
      fill(color(0, 0, 0)); // Text color
      text(this.title, this.x + 10, this.y + 20);

      // Draw the description
      text(this.description, this.x + 10, this.y + 40);

      // Draw the bullet points
      for (let i = 0; i < this.bulletPoints.length; i++) {
        text("- " + this.bulletPoints[i], this.x + 10, this.y + 70 + i * 20);
      }
      let iconSize = 50;
      let iconMargin = 10;
      let iconY = this.y + 100;
      for (let i = 0; i < 4; i++) {
        let iconX = this.x + 10 + i * (iconSize + iconMargin);
        noFill();
        stroke(0);
        rect(iconX, iconY, iconSize, iconSize);
      }

      fill(color(255, 0, 0)); // Close button color
      rect(
        this.closeButtonX,
        this.closeButtonY,
        this.closeButtonSize,
        this.closeButtonSize
      );
    }
  }

  hide() {
    this.isVisible = false;
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  clicked(x, y) {
    // Check if the close button was clicked
    if (
      x > this.closeButtonX &&
      x < this.closeButtonX + this.closeButtonSize &&
      y > this.closeButtonY &&
      y < this.closeButtonY + this.closeButtonSize
    ) {
      this.hide();
    }
  }
}
