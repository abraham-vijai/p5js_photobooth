let video;
let appliedFilter = "opaque"
let stamp_glasses;
let stamp_santa;
let stamp_hat;
let stamp_moustache;
let isStamping = false;
let currX = 0;
let currY = 0;

let imgObject
let stampArray = [];

const VIDEO_WIDTH = 640
const VIDEO_HEIGHT = 480

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas of size 640x480

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
  filter(appliedFilter);

  if (UI.HasFilter.checked()) {
    appliedFilter = "opaque";
  }

  if(isStamping){
    image(imgObject, mouseX, mouseY, 100, 100)
  }
  // Display stamped images from stampArray
  for (let stamp of stampArray) {
    image(stamp.img, stamp.x, stamp.y, 100, 100);
  }
}


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

function mouseClicked(params) {
  if (isStamping) {
    if (mouseX > (width - video.width) / 2
      && mouseY > (height - video.height) / 2
      && mouseX < (width + video.width) / 2
      && mouseY < (height + video.height) / 2) {

      // Stamp image at current mouse position
      let stampedImage = {
        img: imgObject, // Replace with actual image object
        x: mouseX,
        y: mouseY
      };
      stampArray.push(stampedImage); // Add stamped image to stampArray
      isStamping = false
    }    
  }
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



