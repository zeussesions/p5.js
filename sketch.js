let boundaries = [];

let wall;
let ray;
let particle;

let a = "/editor/clickList.txt"

function setup() {
    createCanvas(400, 400);
    particle = new Particle()
    loadBoundaryData('boundaries.txt', function (data) {
        boundaries = data;
    });
}
function draw() {
    background(0);
    for (let boundary of boundaries) {
        boundary.show();
    }
    particle.update(mouseX, mouseY);
    particle.show();
    // particle.look(boundaries);
}

function mouseClicked() {
}

function regenerateWalls(ammount, borders, show) {
    walls = [];
    let fileContent = '';
    loadStrings(a, function (data) {
        fileContent = data.join('\n');
    });

    let x1;
    let y1;
    let x2;
    let y2;

    let lines = fileContent.split('\n');
    let boundaryList = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.trim() !== '') {
            let coords = line.split(',');
            x1 = parseInt(coords[0]);
            y1 = parseInt(coords[1]);
            x2 = parseInt(coords[2]);
            y2 = parseInt(coords[3]);
            walls.push(new Boundary(x1, y1, x2, y2));
            console.log(cords);
        }
    }
    if (borders) {
        walls.push(new Boundary(0, 0, width, 0))
        walls.push(new Boundary(width, 0, width, height))
        walls.push(new Boundary(width, height, 0, height))
        walls.push(new Boundary(0, height, 0, 0))
    }
    console.log(x1, y1, x2, y2)
}

function loadBoundaryData(filename, callback) {
    loadStrings(filename, function (data) {
        let cords = [];
        for (let i = 0; i < data.length; i++) {
            let line = data[i].split(",");
            if (line.length === 4) {
                let x1 = parseInt(line[0]);
                let y1 = parseInt(line[1]);
                let x2 = parseInt(line[2]);
                let y2 = parseInt(line[3]);
                cords.push(new Boundary(x1, y1, x2, y2));
            }
        }
        callback(cords);
    });
}