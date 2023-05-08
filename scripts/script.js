const myButton = document.querySelector(".container > section:first-child > section:nth-of-type(2) button:nth-of-type(2)");
const myDiv = document.querySelector(".Character img:nth-of-type(2)");
const pipeContainer = document.querySelector(".container > section:first-child > section:nth-of-type(1)");
const grass = document.querySelector(".container > :nth-child(2n) > section");
const ground = document.querySelector(".container > :nth-child(2n)");
const oppositeButton = document.querySelector(".container > section:first-child > section:nth-of-type(2) button:nth-of-type(1)");


let currentPosition = 0;
const moveDistance = -100;

// Disable button 2 initially
oppositeButton.disabled = true;

myButton.addEventListener("click", () => {
  console.log("check");
  myDiv.classList.add("face-right");
  setTimeout(() => {
    myDiv.classList.remove("face-right");
  }, 500);

  if (currentPosition <= -1500) {
    currentPosition = -1500;
  } else {
    currentPosition += moveDistance;
  }
  
  pipeContainer.style.left = currentPosition + "px";
  grass.style.right = currentPosition + "px";
  ground.style.backgroundPosition = currentPosition + "px 32px";
  grass.style.backgroundPosition = currentPosition + "px 0";

  // Enable button 2 after #myButton is clicked once
  oppositeButton.disabled = false;
});

oppositeButton.addEventListener("click", function() {
  myDiv.classList.add("face-left");
  setTimeout(() => {
    myDiv.classList.remove("face-left");
  }, 500);

  if (currentPosition >= 0) {
    currentPosition = 0;
  } else {
    currentPosition -= moveDistance;
  }

  pipeContainer.style.left = currentPosition + "px";
  grass.style.right = -currentPosition + "px";
  ground.style.backgroundPosition = -currentPosition + "px 32px";
  grass.style.backgroundPosition = -currentPosition + "px 0";
});

// Add event listeners for the arrow keys
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight" || event.code === "KeyD") {
    myButton.click(); // Simulate a click on first button
  } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
    oppositeButton.click(); // Simulate a click on button 2
  }
});






// /////////////////////////////
// SCORE COUNTER //////////////
//////////////////////////////

// Initialize counter variable and last click time
let count = 0;
let lastClickTime = 0;

// Function to update counter and display in HTML
function updateCount() {
// Get current time
const now = Date.now();

// Only update count if at least 2 seconds have passed since last click
if (now - lastClickTime >= 2000) {
    count++;
    document.getElementById('count').textContent = count;
    lastClickTime = now;

    // Show the scoreboard if it is hidden
    if (count === 1) {
          // document.getElementById('scoreboard').style.display = 'block';
          document.querySelector('.container section:first-child header section').style.display = 'block';
        }

    // Drop money if count is multiple of 10
    if (count % 5 === 0) {
        const interval = setInterval(createMoney, 300);
        setTimeout(() => {
        clearInterval(interval);
        }, 5000);
          }
        }
      }

// Add click event listener to all elements with class "plant_img"
const plantImgs = document.getElementsByClassName('plant_img');
  for (let i = 0; i < plantImgs.length; i++) {
      plantImgs[i].addEventListener('click', updateCount);
  }





// /////////////////////////////
// PLANTS MOVEMENT/////////////
//////////////////////////////

const plants = document.querySelectorAll('.container > section:first-child > section > section img:nth-of-type(2)');

// define a function to add and remove the class randomly
function movePlant() {
  // randomly select a plant index
  const randomIndex = Math.floor(Math.random() * plants.length);
  // add the class to the randomly selected plant
  plants[randomIndex].classList.add('plantsUp');
  // remove the class from the randomly selected plant after 3 seconds
  setTimeout(() => {
    plants[randomIndex].classList.remove('plantsUp');
  }, 1000);
}

// call the function repeatedly with setInterval()
let movePlantInterval = setInterval(movePlant, 5000);

const pipes = document.querySelectorAll(".container > section:first-child > section > section");

pipes.forEach(pipe => {
  // Add event listener to the first image inside the .pipe element
  pipe.querySelector("img:first-of-type").addEventListener('click', event => {
    event.stopPropagation(); // Stop event propagation to the .pipe element
    const img1 = event.target.closest(".container > section:first-child > section > section").querySelector(".sub-mario_img");
    const marioInfo = event.target.closest(".container > section:first-child > section > section").querySelector("article");

    // Check if the target pipe already has the img_clicked class
    if (img1.classList.contains("img_clicked")) {
      // Remove the classes from the target pipe
      img1.classList.remove("img_clicked");
      marioInfo.classList.remove("infoUp");

      // Resume the movement of the plant images
      movePlantInterval = setInterval(movePlant, 5000);
    } else {
      // Remove the classes from any other pipe that has them
      pipes.forEach(p => {
        p.querySelector(".sub-mario_img").classList.remove("img_clicked");
        p.querySelector("article").classList.remove("infoUp");
      });

      // Add the classes to the target pipe
      img1.classList.add("img_clicked");
      marioInfo.classList.add("infoUp");

      // Stop the movement of the plant images
      clearInterval(movePlantInterval);
    }
  });
});



// /////////////////////////////
// TOGGLE INFO    /////////////
//////////////////////////////

function toggleInfo() {

  const img1 = document.querySelector(".img_clicked");
  if (img1) {
    // Remove the classes from the image and the info box
    const marioInfo = img1.closest(".container > section:first-child > section > section").querySelector("article");
    img1.classList.remove("img_clicked");
    marioInfo.classList.remove("infoUp");
  
    // Toggle the classes on the pipe element
    const pipe = img1.closest(".container > section:first-child > section > section");
    pipe.classList.toggle("img_clicked");
    pipe.querySelector("article").classList.toggle("infoUp");
  
    // Clear and restart the movement of the plant images
    clearInterval(movePlantInterval);
    movePlantInterval = setInterval(movePlant, 5000);
  }
  
}


// Toggle info back down with cross
const closeButtons = document.querySelectorAll('span.close');

closeButtons.forEach(close => {
  close.addEventListener('click', () => {
    const img1 = document.querySelector(".img_clicked");
    const marioInfo = img1.closest(".container > section:first-child > section > section").querySelector("article");

    img1.classList.toggle('img_clicked');
    marioInfo.classList.toggle('infoUp');
  });
});




// /////////////////////////////
// SOUND EFFECTS  /////////////
//////////////////////////////

const pipeClicks = document.querySelectorAll('.container > section:first-child > section > section img');

function playAudio() {
    let audio = new Audio("./images/open_sound.mp3");
    audio.play();
}

pipeClicks.forEach(function(pipeClick) {
    pipeClick.addEventListener("click", playAudio);
});


// on close

const closeClicks = document.querySelectorAll('span.close');

function playAudioClose() {
    let audio = new Audio("./images/open_sound.mp3");
    audio.play();
}

closeClicks.forEach(function(closeClick) {
    closeClick.addEventListener("click", playAudioClose);
});


// walk

const buttonClicks = document.querySelectorAll('button');
const audio = new Audio("./images/walk.mp3");

function playAudioWalk() {
  audio.play();
    if (audio.ended) {
        audio.play();
    }
}

buttonClicks.forEach(function(buttonClick) {
    buttonClick.addEventListener("click", playAudioWalk);
});


// /////////////////////////////////////////////////////////////////
// Money rain /////////////////////////////////////////////////////
// code from: https://codepen.io/luanmanara/pen/ZEWxmym?editors=0110

function createMoney() {
  const money = document.createElement("div");
  money.innerHTML = '<img src="./images/mario_coin.gif">';
  money.classList.add("heart");

  money.style.left = `${Math.random() * 100}vw`;
  money.style.animationDuration = `${Math.random() * 2 + 2}s`;

  // Set the width and height of the image
  const img = money.querySelector('img');
  img.style.width = '50px';
  img.style.height = '50px';

  document.body.appendChild(money);

  setTimeout(() => {
    money.remove();
  }, 5000);
}
