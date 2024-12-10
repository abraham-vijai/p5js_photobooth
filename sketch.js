let video;
let stamp_glasses;
let stamp_santa;
let stamp_hat;
let stamp_moustache;

let appliedFilter = "opaque"
let isStamping = false;
let isDrawing = false;
let currX = 0
let currY = 0
let imgObject
let stampArray = [];
let shapeArray = [];
let currentShape; //= null;  // Variable to store the current shape being drawn
let drawEnabled;// = false;  // Flag to enable drawing
let currentShapeType;
let fillColor;
let borderThickness;

const VIDEO_WIDTH = 640
const VIDEO_HEIGHT = 480
const IMG_WIDTH = 170
const IMG_HEIGHT = 150

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas of size 640x480

  drawEnabled = false;
  currentShape = null;

  // Create a video capture object
  video = createCapture(VIDEO);
  video.size(VIDEO_WIDTH, VIDEO_HEIGHT);
  video.hide();

  UI.setupUI();
}

function draw() {
  background(150);

  // Draw the captured video feed centered horizontally and vertically
  image(video, (width - video.width) / 2, (height - video.height) / 2, 640, 480);

  Filter.applyFilter()

  if (isStamping) {
    image(imgObject, mouseX, mouseY, IMG_WIDTH, IMG_HEIGHT)
  }

  // Display stamped images from stampArray
  for (let stamp of stampArray) {
    image(stamp.img, stamp.x, stamp.y, IMG_WIDTH, IMG_HEIGHT);
  }


  // Draw all shapes in the array
  for (let shape of shapeArray) {
    shape.draw();
  }

  // Draw the current shape being drawn (if any) and drawing is enabled
  if (currentShape && drawEnabled) {
    currentShape.draw();
  }

  strokeWeight(5)
}

function withinBounds(x, y) {
  if (x > (width - video.width) / 2 && y > (height - video.height) / 2 && x < (width + video.width) / 2 && y < (height + video.height) / 2) {
    return true
  }
  else {
    return false
  }
}
// ================= MOUSE FUNCTIONS =================

function mousePressed() {
  // Start drawing a new shape if drawing is enabled and left mouse button is pressed
  if (drawEnabled === true && mouseButton === LEFT && withinBounds(mouseX, mouseY)) {
    currentShape = new Shape(mouseX, mouseY, 0, 0, currentShapeType, UI.borderColor.value(), UI.fillColor.value(), UI.borderThickness.value());
  }
}

function mouseDragged() {
  // Update the current shape's dimensions if drawing is enabled
  if (currentShape && drawEnabled) {
    currentShape.w = mouseX - currentShape.x;
    currentShape.h = mouseY - currentShape.y;
  }
}

function mouseReleased() {
  // Finalize the current shape and add it to the shapes array if drawing is enabled
  if (currentShape && drawEnabled) {
    shapeArray.push(currentShape);

    // Reset currentShape
    currentShape = null;
  }
}

function mouseClicked(params) {
  if (isStamping) {
    if (mouseX > (width - video.width) / 2
      && mouseY > (height - video.height) / 2
      && mouseX < (width + video.width) / 2
      && mouseY < (height + video.height) / 2) {

      // Stamp image at current mouse position
      let stampedImage = {
        img: imgObject,
        x: mouseX,
        y: mouseY
      };

      // Add stamped image to stampArray
      stampArray.push(stampedImage);

      isStamping = false
    }
  }
}

// ================= MOUSE FUNCTIONS =================

/*
Method name  : preload
Description  : Preloads the image before the sketch starts running.
Parameters   : void
Return value : void
*/
function preload() {
  stamp_glasses = loadImage('assets/glasses.png');
  stamp_santa = loadImage('assets/santa-claus.png');
  stamp_moustache = loadImage('assets/moustache.png');
  stamp_hat = loadImage('assets/hat.png');
}


function stampImage(imageType) {
  switch (imageType) {
    case "glasses":
      imgObject = stamp_glasses;
      break;
    case "hat":
      imgObject = stamp_hat;
      break;
    case "moustache":
      imgObject = stamp_moustache;
      break;
    case "santa":
      imgObject = stamp_santa;
      break;
    default:
      break;
  }

  isStamping = true;
}

// Button handler for rectangle and ellipse button
function createShape(shapeType) {
  drawEnabled = true;
  currentShape = null;
  currentShapeType = shapeType
}


function reset(params) {
  shapeArray =[]
  stampArray = []
  appliedFilter = "opaque"
}