// #1
const app = document.getElementById("app");
const status = document.getElementById("status");
const desc = document.getElementById("desc");
const time = document.getElementById("time");
const scoreDiv = document.getElementById("score");
const scoreTime = document.getElementById("scoreTime");
const gameoverDiv = document.getElementById("gameover");
const finalScore = document.querySelector(".finalScore");
const startBTN = document.getElementById("start");
const reset = document.getElementById("reset");

// #2
startBTN.addEventListener("click", createBoard);

// DO NOT TOUCH
reset.addEventListener("click", () => window.location.reload());

// CREATE AN ARRAY NAMED cards AND INSERT OBJECTS INTO OUR ARRAY
const cards = [
  {
    match: "Green Led Mask",
    src:
      "https://image.dhgate.com/0x0/f2/albu/g4/M00/BF/71/rBVaEVm8-7yAR2tuAACF9hIl9LU414.jpg"
  },
  {
    match: "Teal Led Mask",
    src:
      "https://cdn.shopify.com/s/files/1/1175/5014/products/Neon_Culture_Glow_Mask_7_1024x1024.png?v=1475747786"
  },
  {
    match: "Blue Led Mask",
    src: "http://belabeautycare.com/wp-content/uploads/2014/08/foto02klein.png"
  },
  {
    match: "rey mysterio mask",
    src:
      "http://sc01.alicdn.com/kf/HTB17iHuatfJ8KJjy0Feq6xKEXXaT/Individual-Design-Sound-Activated-Led-Face-Mask.jpg"
  },
  {
    match: "America Led Mask",
    src:
      "https://cdn.shopify.com/s/files/1/2595/0760/products/Green_Bigger_237fd0fd-b61f-4564-a996-0505a8641a90_1024x1024.jpg?v=1512357764"
  },
  {
    match: "Vendetta Mask",
    src:
      "https://i0.wp.com/top10halloweencostume.com/wp-content/uploads/2017/10/Luminous-LED-Mask-V-for-Vendetta-Guy-Halloween-Costume-Cosplay-Props-3.jpg?fit=800%2C800&ssl=1"
  },
  {
    match: "Spiked up",
    src:
      "https://img.etsystatic.com/il/dee5f4/1215216283/il_fullxfull.1215216283_98fl.jpg?version=1"
  },
  {
    match: "China DGX",
    src:
      "http://p.globalsources.com/IMAGES/PDT/S1157041684/LED-Display-Mask-Video-Wall.jpg"
  }
];

const dupCards = cards.map(c => c).concat(cards);

/*
* STEP 4
*/

// #1
let selectedCards = [];

// #2
let score = 0;

// #3
let colors = ["#3333ff", "#ff0000", "black", "#66ff33"];

// #4
let timer = 70;

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
    score = score + 10;
    timer = timer + 5;

    // #3
    status.textContent = "Match Found";

    // DON'T TOUCH BELOW
    updateClass("goodScore", "badScore");
    selectedCards.forEach(card => {
      card.element.classList.add("match");
      setTimeout(() => card.element.classList.add("fade"), 300);
    });
  } else {
    // #4
    score = score - 5;
    timer = timer - 5;

    // #5
    status.textContent = "Focus try harder";

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
      flipback(selectedCards);

      // DON'T TOUCH BELOW
      selectedCards = [];
    }
  }
}

/*
* STEP 12
*/

function gameOver() {
  const chosen = [...document.querySelectorAll(".match")];

  // #1
  if (chosen.length === dupCards.length) {
    // #2
    status.textContent = "i didnt think you was gonna make this far good job";
    // DO NOT TOUCH
    scoreTime.remove();
    status.remove();
    scoreDiv.remove();

    // DON'T TOUCH BELOW
    time.textContent = "";
    clearInterval(window.myMatchingGameInterval);
    setTimeout(() => chosen.forEach(image => image.remove()), 2000);

    // DON'T TOUCH BELOW
    setTimeout(() => {
      gameoverDiv.style.display = "block";
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
        "https://ae01.alicdn.com/kf/HTB1fBNtMXXXXXbuXVXXq6xXFXXXR/LED-clothing-EL-Masks-Halloween-gift-style-Science-geek-mask-luminous-helmet-Neon-Macabre-Clown-EL.jpg_640x640.jpg"
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
