let video; 
const VIDEO_WIDTH = 640
const VIDEO_HEIGHT = 480
let appliedFilter = "opaque"
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
  image(video, (width - video.width) / 2, (height - video.height) / 2);
  filter(appliedFilter)

  if(UI.HasFilter.checked()){
    appliedFilter = "opaque"
  }
}




