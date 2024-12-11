/*
Filename    : sketch.js
Author      : Abraham Vijai
Date        : 2024-11-24
Description : This is the sketch.js function
*/

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
let isStamping = false;
let imgObject;
let appliedFilter = 'opaque';

// Preloaded images
let stamp_glasses, stamp_santa, stamp_hat, stamp_moustache;

/*
Method name  : setup
Description  : Initializes the canvas, video capture, and UI elements.
Parameters   : None
Return value : None
*/
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(VIDEO_WIDTH, VIDEO_HEIGHT);
  video.hide();
  preloadImages(); // Load stamp images
  UI.setupUI(); // Initialize UI elements
}

/*
Method name  : draw
Description  : Main draw loop that displays the video feed, stamps, shapes, and applies filters.
Parameters   : None
Return value : None
*/
function draw() {
  background(150);
  image(video, (width - video.width) / 2, (height - video.height) / 2, VIDEO_WIDTH, VIDEO_HEIGHT);

  // Draw stamped image if stamping mode is active
  if (isStamping) {
    image(imgObject, mouseX, mouseY, IMG_WIDTH, IMG_HEIGHT);
  }

  Filter.applyFilter(); // Apply video filter
  drawStamps(); // Draw stamped images
  drawShapes(); // Draw shapes
  strokeWeight(5);
}

/*
Method name  : mousePressed
Description  : Handles the event when the mouse button is pressed, initiating shape drawing if enabled.
Parameters   : None
Return value : None
*/
function mousePressed() {
  if (drawEnabled && mouseButton === LEFT && withinBounds(mouseX, mouseY)) {
    currentShape = new Shape(mouseX, mouseY, 0, 0, currentShapeType, UI.borderColor.value(), UI.fillColor.value(), UI.borderThickness.value());
  }
}

/*
Method name  : mouseDragged
Description  : Handles the event when the mouse is dragged, updating dimensions of the current shape being drawn.
Parameters   : None
Return value : None
*/
function mouseDragged() {
  if (currentShape && drawEnabled) {
    currentShape.w = mouseX - currentShape.x;
    currentShape.h = mouseY - currentShape.y;
  }
}

/*
Method name  : mouseReleased
Description  : Handles the event when the mouse button is released, finalizing the current shape and adding it to the array.
Parameters   : None
Return value : None
*/
function mouseReleased() {
  if (currentShape && drawEnabled) {
    shapeArray.push(currentShape);
    currentShape = null;
  }
}

/*
Method name  : mouseClicked
Description  : Handles the event when the mouse is clicked, stamping an image at the current mouse position if stamping mode is active.
Parameters   : None
Return value : None
*/
function mouseClicked() {
  if (isStamping) {
    stampImageAtMouse();
  }
}

/*
Method name  : preloadImages
Description  : Preloads the stamp images from file paths.
Parameters   : None
Return value : None
*/
function preloadImages() {
  stamp_glasses = loadImage('assets/glasses.png');
  stamp_santa = loadImage('assets/santa-claus.png');
  stamp_moustache = loadImage('assets/moustache.png');
  stamp_hat = loadImage('assets/hat.png');
}

/*
Method name  : stampImage
Description  : Sets the image object to stamp based on the specified image type.
Parameters   : imageType (string) - The type of image to stamp ("glasses", "hat", "moustache", "santa").
Return value : None
*/
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
  isStamping = true; // Enable stamping mode
}

/*
Method name  : stampImageAtMouse
Description  : Stamps the currently selected image at the current mouse position.
Parameters   : None
Return value : None
*/
function stampImageAtMouse() {
  if (withinBounds(mouseX, mouseY)) {
    let stampedImg = { img: imgObject, x: mouseX, y: mouseY };
    stampArray.push(stampedImg); // Add stamped image to array
    isStamping = false; // Disable stamping mode
  }
}

/*
Method name  : drawStamps
Description  : Draws all stamped images onto the canvas.
Parameters   : None
Return value : None
*/
function drawStamps() {
  for (let stamp of stampArray) {
    image(stamp.img, stamp.x, stamp.y, IMG_WIDTH, IMG_HEIGHT);
  }
}

/*
Method name  : drawShapes
Description  : Draws all shapes from the shape array onto the canvas.
Parameters   : None
Return value : None
*/
function drawShapes() {
  for (let shape of shapeArray) {
    shape.draw();
  }
  // Draw the current shape being drawn (if any)
  if (currentShape && drawEnabled) {
    currentShape.draw();
  }
}

/*
Method name  : saveCanvasImage
Description  : Saves the current canvas image as a PNG file with optional filename.
Parameters   : fileName (string) - Optional name for the saved PNG file (default is 'canvas_image.png').
Return value : None
*/
function saveCanvasImage(fileName = 'canvas_image.png') {
  let canvasImage = createImage(VIDEO_WIDTH, VIDEO_HEIGHT);
  canvasImage.copy(canvas, (width - video.width) / 2, (height - video.height) / 2, VIDEO_WIDTH, VIDEO_HEIGHT, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  canvasImage.save(fileName);
}

/*
Method name  : reset
Description  : Resets the shape and stamp arrays, and resets the applied filter.
Parameters   : None
Return value : None
*/
function reset() {
  shapeArray = [];
  stampArray = [];
  appliedFilter = "opaque";
}

/*

Method name  : withinBounds
Description  : Checks if the given coordinates are within the bounds of the video feed.
Parameters   : x (number) - The x-coordinate to check.
               y (number) - The y-coordinate to check.
Return value : boolean - True if the coordinates are within bounds, false otherwise.

*/
function withinBounds(x, y) {
  return (x > (width - video.width) / 2 && y > (height - video.height) / 2 &&
          x < (width + video.width) / 2 && y < (height + video.height) / 2);
}

/*
Method name  : createShape
Description  : Enables drawing mode for a specified shape type.
Parameters   : shapeType (string) - The type of shape to enable drawing for.
Return value : None
*/
function createShape(shapeType) {
  drawEnabled = true;
  currentShape = null;
  currentShapeType = shapeType;
}

// Additional classes and UI elements can be added and documented similarly for further structure and organization
