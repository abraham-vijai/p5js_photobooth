// Constants
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 480;
const IMG_WIDTH = 170;
const IMG_HEIGHT = 150;
const SPACEBAR = '32';

// Variables
let video;
let canvas;
let stampArray = [];
let shapeArray = [];
let currentShape = null;
let currentShapeType;
let drawEnabled = false;
let isStamping = false
let imgObject;
let appliedFilter = 'opaque'

// Preloaded images
let stamp_glasses, stamp_santa, stamp_hat, stamp_moustache;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(VIDEO_WIDTH, VIDEO_HEIGHT);
  video.hide();
  preloadImages(); // Load stamp images
  UI.setupUI();
}

function draw() {
  background(150);
  image(video, (width - video.width) / 2, (height - video.height) / 2, VIDEO_WIDTH, VIDEO_HEIGHT);
  
  if (isStamping) {
    image(imgObject, mouseX, mouseY, IMG_WIDTH, IMG_HEIGHT)
  }
  
  Filter.applyFilter(); // Apply video filter
  drawStamps(); // Draw stamped images
  drawShapes(); // Draw shapes
  strokeWeight(5);
}

function mousePressed() {
  if (drawEnabled && mouseButton === LEFT && withinBounds(mouseX, mouseY)) {
    currentShape = new Shape(mouseX, mouseY, 0, 0, currentShapeType, UI.borderColor.value(), UI.fillColor.value(), UI.borderThickness.value());
  }
}

function mouseDragged() {
  if (currentShape && drawEnabled) {
    currentShape.w = mouseX - currentShape.x;
    currentShape.h = mouseY - currentShape.y;
  }
}

function mouseReleased() {
  if (currentShape && drawEnabled) {
    shapeArray.push(currentShape);
    currentShape = null;
  }
}

function mouseClicked() {
  if (isStamping) {
    stampImageAtMouse();
  }
}

function preloadImages() {
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

function stampImageAtMouse() {
  if (withinBounds(mouseX, mouseY)) {
    let stampedImg = { img: imgObject, x: mouseX, y: mouseY };
    stampArray.push(stampedImg);
    isStamping = false;
  }
}

function drawStamps() {
  for (let stamp of stampArray) {
    image(stamp.img, stamp.x, stamp.y, IMG_WIDTH, IMG_HEIGHT);
  }
}

function drawShapes() {
  for (let shape of shapeArray) {
    shape.draw();
  }
  if (currentShape && drawEnabled) {
    currentShape.draw();
  }
}

function saveCanvasImage(fileName = 'canvas_image.png') {
  let canvasImage = createImage(VIDEO_WIDTH, VIDEO_HEIGHT);
  canvasImage.copy(canvas, (width - video.width) / 2, (height - video.height) / 2, VIDEO_WIDTH, VIDEO_HEIGHT, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  canvasImage.save(fileName);
}

function reset() {
  shapeArray = [];
  stampArray = [];
  appliedFilter = "opaque";
}

function withinBounds(x, y) {
  return (x > (width - video.width) / 2 && y > (height - video.height) / 2 &&
          x < (width + video.width) / 2 && y < (height + video.height) / 2);
}

function createShape(shapeType) {
  drawEnabled = true;
  currentShape = null;
  currentShapeType = shapeType
}
