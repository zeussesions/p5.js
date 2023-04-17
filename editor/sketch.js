let clickList = [];
let clickCount = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // draw the previous clicks
  noStroke();
  fill(255, 0, 0);
  for (let i = 0; i < clickList.length; i++) {
    let sublist = clickList[i];
    if (sublist.length >= 2) {
      // ellipse(sublist[0].x, sublist[0].y, 20, 20);
      // ellipse(sublist[1].x, sublist[1].y, 20, 20);
      stroke(0);
      line(sublist[0].x, sublist[0].y, sublist[1].x, sublist[1].y);
    }
  }
}

function mousePressed() {
  if (clickCount % 2 == 0) {
    // add a new sublist for the current line
    clickList.push([]);
  }
  
  // add the mouse click to the last sublist in the list
  let click = createVector(mouseX, mouseY);
  clickList[clickList.length-1].push(click);
  
  clickCount++;
}


function dumpClickListToFile(filename) {
  let content = '';
  for (let i = 0; i < clickList.length; i++) {
    let sublist = clickList[i];
    if (sublist.length >= 2) {
      content += `${sublist[0].x},${sublist[0].y},${sublist[1].x},${sublist[1].y}\n`;
    }
  }
  
  saveStrings([content], filename);
}


function keyPressed() {
  if (keyCode === ENTER) {
    dumpClickListToFile(`lines.txt`);
  }
}


function parseClickListFromFile(fileName) {
  let fileContent = '';
  // Load the file content using the fileName argument
  loadStrings(fileName, function(data) {
    fileContent = data.join('\n');
  });

  let lines = fileContent.split('\n');
  let clickList = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.trim() !== '') {
      let coords = line.split(',');
      let x1 = parseInt(coords[0]);
      let y1 = parseInt(coords[1]);
      let x2 = parseInt(coords[2]);
      let y2 = parseInt(coords[3]);
      clickList.push([{x: x1, y: y1}, {x: x2, y: y2}]);
    }
  }
  return clickList;
}