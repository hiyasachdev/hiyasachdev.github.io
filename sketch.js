let hearts = [];
let colors = [];
let config = {
  dateCategories: {
  mainActivity: ["Listen to Coldplay", "Talk about your dream careers", "Watch TED Talks", "Have a virtual spa day together by applying facemasks", "Practice learning a new language together", "Listen to an audiobook", "Discuss a book", "Create a shared playlist and have a virtual dance party",
"Host a virtual trivia night on your favorite topic", "Window shop online", "Plan your next trip together", "Sing together on virtual karaoke", "Create a digital scrapbook of your favorite memories together", "Learn a dance routine together", "Learn origami virtually", "Create a pinterest board for home decor", "Explore and read poetry together online", "Play a digital card game", "Take an online personality test together and discuss the results", "Explore videos on DIY home improvement"],
  chores: ["while doing laundry", "while cooking food", "while cleaning furniture", "while organizing your room", "while exercising", "while sorting mail", "while changing bed linens", "while wiping countertops", "while cleaning windows", "while taking out the trash", "while washing dishes", "while ironing clothes", "while setting the table", "while cleaning the bathroom", "while disinfecting surfaces", "while organizing your closet", "while cleaning kitchen appliances", "while cleaning and reorganizing the fridge", "while watering the plants", "while filling water bottles", "while recycling trash", "while mopping floors", "while tidying your room", "while creating a grocery shopping list", "while disposing of expired items"],
  timing: ["on Friday evening", "on Saturday morning", "on Saturday afternoon", "on Saturday evening", "on Sunday morning", "on Sunday afternoon", "on Sunday evening"],
},
colors: {
    heart: '#FF1493', // Light pink for hearts as string
    buttonHover: '#D81B60', // Darker pink for button hover as string
    buttonNormal: '#E91E63', // Original button color as string
    text: '#FFFFFF', // White text as string
    gradientTop: '#965D72', // Gradient top as string
    gradientBottom: '#FFDCE6' // Gradient bottom as string
  },
  fonts: {
    heading: "Jacques Francois",
    body: "Roboto"
  }
};


let generatedDate = "";

function setup() {
  createCanvas(1280,832);
  
  // Convert color strings to p5.js color objects
  for (let key in config.colors) {
    config.colors[key] = color(config.colors[key]);
  }
  createHearts(); // Create initial set of hearts
  
   textSize(40); // Size for heading
  let headingHeight = textAscent() + textDescent();
  let headingY = 50;
  let subheadingY = headingY + headingHeight + 20; // Fixed Y position 
  
    textSize(18);
   let subheadingHeight = textAscent() + textDescent();
  let buttonY = subheadingY + subheadingHeight + 20; // Position for button, 20 is additional spacing

  // Button to generate a virtual date idea
  let button = createButton('Find Date Idea 🤍');
 button.position(width / 2 - button.width / 2, buttonY);
  button.mousePressed(generateVirtualDate);
  styleButton(button);

  textAlign(CENTER);
}



function draw() {
  drawBackground(); // Draw gradient background
  moveHearts(); // Animate floating hearts
  drawHearts(); // Draw hearts
  drawText(); // Draw heading, subheading, and generated date idea
  displayGeneratedDate();
}

function drawText() {
  // Heading
  textFont(config.fonts.heading, 40);
  fill(config.colors.text);
  text("🥰 Long Distance Chore Idea Generator", width / 2, 50);

  // Subheading
  textFont(config.fonts.body, 18);
  text("Transform your virtual dates with our LDR Date Generator!\n Say goodbye to routine video calls and hello to shared laughter and productivity\n as our algorithm crafts engaging household tasks, turning chores into cherished moments.", width / 2, 100); // Adjust the Y position as needed
}

function displayGeneratedDate() {
  if (generatedDate) {
    fill(config.colors.text);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(generatedDate, width / 2, 400); // Adjust the Y position as needed to not overlap with heading and subheading
  }
}

  // Display the generated date idea
  if (generatedDate) {
    fill(config.colors.text);
    text(generatedDate, width / 2, height - 100);
  }

function styleButton(button) {
  button.style('border-radius', '5px');
  button.style('background-color', config.colors.buttonNormal);
  button.style('color', 'white');
  button.mouseOver(() => button.style('background-color', config.colors.buttonHover));
  button.mouseOut(() => button.style('background-color', config.colors.buttonNormal));
}

function generateVirtualDate() {
  let mainActivity = generateRandomCategoryEntry("mainActivity");
  let chores = generateRandomCategoryEntry("chores");
  let timing = generateRandomCategoryEntry("timing");

  generatedDate = `${mainActivity}\n${chores}\n${timing}`;
}

  // Center the generated idea vertically
  let generatedTextHeight = textAscent() + textDescent();
  let centerY = height / 2 - generatedTextHeight / 2;
  text(generatedDate, width / 2, centerY);


function createHearts() {
  for (let i = 0; i < 20; i++) { // Increased number of hearts for better effect
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(15, 30),
      speed: random(1, 3),
      trail: [], // Array to store trail positions
      pulse: random(0.9, 1.1) // Pulse rate for size change
    });
  }
}


function drawBackground() {
  // Create pink gradient background
  let colorTop = color(150, 93, 114);
  let colorBottom = color(255, 220, 230);
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(colorTop, colorBottom, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function moveHearts() {
  for (let heart of hearts) {
    heart.y -= heart.speed;
    if (heart.y < -heart.size) {
      heart.y = height + heart.size;
    }
  }
}

function drawHearts() {
  for (let heart of hearts) {
    fill(255, 0, 0); // Red color for hearts
    noStroke();
    heartShape(heart.x, heart.y, heart.size);
  }
}

function heartShape(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function generateRandomCategoryEntry(category) {
  let entries = config.dateCategories[category];
  return entries[floor(random(entries.length))];
}
