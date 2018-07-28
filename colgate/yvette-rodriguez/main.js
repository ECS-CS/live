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
    match: "Exo",
    src:
      "https://pbs.twimg.com/profile_images/979337070706651136/Xk_lcZIy_400x400.jpg"
  },
  {
    match: "BTS",
    src:
      "https://cdn.shopify.com/s/files/1/1694/7799/products/bangtan-boys-bts-bts-official-light-stick-ver-2-army-bomb-505967869960.jpg?v=1525792722"
  },
  {
    match: "bigbang",
    src: "https://i.ebayimg.com/images/g/bGEAAOSwhcJWK1z6/s-l300.jpg"
  },
  {
    match: "blackpink",
    src: "https://pbs.twimg.com/media/DCpGenAVoAEThGg.jpg:large"
  },
  
  {
    match: "red velvet",
    src:
      "https://pm1.narvii.com/6447/81f703283ce4eae56258defd24d9b4545e393fc9_hq.jpg"
  },
  {
    match: "got 7",
    src:
      "https://cdn.shopify.com/s/files/1/2420/2037/products/0c86b8b595543bc03bb26bdee94b0c8a_1024x1024.jpg?v=1507735040"
  },
  {
    match: "shinee",
    src: "https://i.ebayimg.com/images/g/H6oAAOSwu6tacwLX/s-l640.jpg"
  },

  {
    match: "super junior",
    src: "https://i.ebayimg.com/images/g/nnYAAOSwsuhamBz3/s-l300.jpg"
  },
  {
    match: "wanna one",
    src:
      "https://images-na.ssl-images-amazon.com/images/I/41QZ3rPyRCL._SX342_.jpg"
  },
  {
    match: "mammoo",
    src:
      "https://media.karousell.com/media/photos/products/2017/05/31/mamamoo_official_lightstick_1496223538_96c0a4bd.jpg"
  },
  {
    match: "exid",
    src:"https://ae01.alicdn.com/kf/HTB1z8tbarEF6uJjSZFOq6xUvVXad/New-Kpop-EXID-Hand-Lamp-Lights-Official-Concert-Glow-Stick-lamp.jpg"  }
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
let colors = [
  "#ccffff",
  "#ffffcc",
  "#F08068",
  "#31D5A8",
  "#A071B8",
  "#FBD09C",
  "#CD5C5C",
  "#90EE90",
  "#802A2A	 ",
  "#ff0000"
];

// #4
let timer = 80;
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
    // or timer = timer - 1;

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
    status.textContent = "You are doing great!";

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
    status.textContent = "Try harder!";

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
    status.textContent = "Want to play again";
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
        "https://denelecampbell.files.wordpress.com/2018/02/o-music-heart-facebook.jpg"
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
