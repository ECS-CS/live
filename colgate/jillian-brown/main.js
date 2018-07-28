// #1
const app = document.getElementById("app");
const status = document.getElementById("status");
const desc = document.getElementById("desc");
const time = document.getElementById("time");
const scoreDiv = document.getElementById("score");
const scoreTime = document.getElementById("scoreTime");
const gameoverDiv = document.getElementById("gameover");
const startBTN = document.getElementById("start");
const reset = document.getElementById("reset");

// #2
startBTN.addEventListener("click", createBoard);

// DO NOT TOUCH
const finalScore = document.querySelector(".finalScore");
reset.addEventListener("click", () => window.location.reload());

// CREATE AN ARRAY NAMED cards AND INSERT OBJECTS INTO OUR ARRAY
const cards = [
  {
    match: "Banto",
    src:
      "https://vignette.wikia.nocookie.net/booga-booga-roblox/images/3/3f/RobloxScreenShot20180224_153512244.png/revision/latest?cb=20180225013248"
  },
  {
    match: "Chick",
    src:
      "https://vignette.wikia.nocookie.net/booga-booga-roblox/images/6/67/RobloxScreenShot20180224_153321542.png/revision/latest?cb=20180225023241"
  },

  {
    match: "Shelly",
    src:
      "https://vignette.wikia.nocookie.net/booga-booga-roblox/images/a/a3/Photo_2018-03-23_at_12.01.43_PM.jpg/revision/latest?cb=20180323184030"
  },
  {
    match: "Mammoth",
    src:
      "https://vignette.wikia.nocookie.net/booga-booga-roblox/images/6/65/RobloxScreenShot20180224_145246388.png/revision/latest?cb=20180224205720"
  },
  {
    match: "Sand Mammoth",
    src:
      "https://vignette.wikia.nocookie.net/booga-booga-roblox/images/a/ae/Sand_Mammoth.png/revision/latest?cb=20180321220056"
  },
  {
    match: "Shark Fin",
    src:
      "https://vignette.wikia.nocookie.net/booga-booga-roblox/images/e/ed/Lurky.png/revision/latest?cb=20180322175248"
  },
  {
    match: "Red God",
    src:
      "https://vignette.wikia.nocookie.net/booga-booga-roblox/images/3/31/Hateful_God.png/revision/latest?cb=20180322002409"
  },
  {
    match: "God",
    src:
      "https://vignette.wikia.nocookie.net/rblx-booga-booga/images/0/07/Oldgod.png/revision/latest?cb=20180222085635"
  },
   {
    match: "Pro",
    src: "https://i.ytimg.com/vi/reUoPP5Rgd8/maxresdefault.jpg"
  }
];

const dupCards = cards.map(c => c).concat(cards);

// #1
let selectedCards = [];

// #2
let score = [0];

// #3
let colors = [
  "#fa8072",
  "#ADD8E6",
  "#483D8B",
  "#FF69B4",
  "#FFA500",
  "#FF6347",
  "#008000",
  "#FF00FF",
  "#0000CD",
  "#B22222",
  "#DB7093"
];
// #4
let timer = 60;

/*
* STEP 5
*/

function randomColor(arr) {
  const random = Math.floor(Math.random() * arr.length);

  // #1
  return arr[random];
}
/*
* STEP 6
*/

/*
* Fisher-Yates Algorithm 
* Source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
*/
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
/*
* STEP 7
*/

function gameTimer() {
  window.myMatchingGameInterval = setInterval(() => {
    // #1
    timer--;

    time.textContent = `${timer} seconds left`;

    // #2
    if (timer === 0) {
      status.textContent = "";
      clearInterval(window.myMatchingGameInterval);

      // DO NOT TOUCH
      [...document.body.querySelectorAll(".scene")].forEach(image => {
        image.removeEventListener("click", flipCard);
        image.classList.add("fade");
        setTimeout(() => image.remove(), 2000);
      });

      // DO NOT TOUCH
      scoreTime.remove();
      status.remove();
      scoreDiv.remove();

      // DO NOT TOUCH
      setTimeout(() => {
        gameoverDiv.style.display = "block";
        finalScore.textContent = score;
      }, 1500);
      // DO NOT TOUCH
    } else if (timer % 10 === 0) {
      // #3
      document.body.style.background = randomColor(colors);
    }
  }, 1000);
}
/*
* STEP 8
*/

function checkForMatch() {
  // #1
  if (selectedCards[0].card.match === selectedCards[1].card.match) {
    // #2
    score++;

    // #3
    status.textContent = "Booga Booga";

    // DON'T TOUCH BELOW
    updateClass("goodScore", "badScore");
    selectedCards.forEach(card => {
      card.element.classList.add("match");
      setTimeout(() => card.element.classList.add("fade"), 300);
    });
  } else {
    // #4
    score--;

    // #5
    status.textContent = "Do not be a faliure, win.";

    // DON'T TOUCH BELOW
    updateClass("badScore", "goodScore");
    flipBack(selectedCards);
  }

  // #6
  gameOver();
  // #7
  selectedCards = [];

  // DON'T TOUCH BELOW
  scoreDiv.textContent = score;
}
/*
* STEP 9
*/

function updateClass(newClass, oldClass) {
  scoreDiv.classList.remove(oldClass);
  scoreDiv.classList.add(newClass);
}
/*
* STEP 10
*/

function flipBack(cards) {
  cards.forEach(({ element }) =>
    setTimeout(
      () => element.querySelector(".card").classList.remove("is-flipped"),
      1000
    )
  );
}
/*
* STEP 11
*/

function flipCard() {
  // DON'T TOUCH BELOW
  const card = this;
  const index = card.dataset.index;
  card.querySelector(".card").classList.add("is-flipped");
  card
    .querySelector(".card__face--back")
    .querySelector("img")
    .setAttribute("src", dupCards[index].src);
  selectedCards.push({ card: dupCards[index], element: card });

  // #1
  if (selectedCards.length === 2) {
    // #2
    if (selectedCards[0].element !== selectedCards[1].element) {
      // DON'T TOUCH BELOW
      setTimeout(() => checkForMatch(), 300);
    } else {
      // DON'T TOUCH BELOW
      status.textContent = "Can't choose the same card twice! Try again!";

      // #3
      flipBack(selectedCards);

      // DON'T TOUCH BELOW
      selectedCards = [];
    }
  }
}
/*
* STEP 12
*/

function gameOver(){
  const chosen = [...document.querySelectorAll('.match')];

  // #1
  if(chosen.length === dupCards.length ){

    // #2
    status.textContent = 'You owe me coffee byeeee.';
    // DO NOT TOUCH

    scoreTime.remove();
    status.remove();
    scoreDiv.remove();
    
    // DON'T TOUCH BELOW
    time.textContent = '';
    clearInterval(window.myMatchingGameInterval);
    setTimeout(() => chosen.forEach(image => image.remove()), 2000);

    // DON'T TOUCH BELOW
    setTimeout(() => {
      gameoverDiv.style.display = 'block';
      finalScore.textContent = score;
   }, 3000);
  }
}
/*
* STEP 13
*/

function createBoard() {
  startBTN.style.display = "none";
  desc.style.display = "none";
  scoreTime.style.display = "grid";

  // START THE GAME TIMER AFTER 4 SECONDS
  setTimeout(() => gameTimer(), 4000);

  return shuffle(dupCards).forEach((card, idx) => {
    // AN EXAMPLE OF HOW TO USE createElement TO CREATE AN 'img'
    const imgFront = document.createElement("img");

    // #1
    const imgBack = document.createElement("img");

    // #2
    const scene = document.createElement("div");
    const cardDiv = document.createElement("div");
    const cardFace = document.createElement("div");
    const cardBack = document.createElement("div");

    // DON'T TOUCH BELOW
    imgFront.setAttribute("src", dupCards[idx].src);
    cardFace.appendChild(imgFront);
    cardBack.appendChild(imgBack);

    // DON'T TOUCH BELOW
    scene.classList.add("scene");
    cardDiv.classList.add("card");
    cardFace.classList.add("card__face", "card__face--front");
    cardBack.classList.add("card__face", "card__face--back");

    // DON'T TOUCH BELOW
    scene.dataset.match = card.match;
    scene.dataset.index = idx;

    // DON'T TOUCH BELOW
    setTimeout(() => {
      imgFront.setAttribute(
        "src",
        // #3
        "https://static-cdn.jtvnw.net/jtv_user_pictures/hsdogdog-profile_image-5550ade194780dfc-300x300.jpeg"
      );
      scene.addEventListener("click", flipCard);
    }, 4000);

    // DON'T TOUCH BELOW
    cardDiv.appendChild(cardFace);
    cardDiv.appendChild(cardBack);
    scene.appendChild(cardDiv);
    app.appendChild(scene);
  });
}
