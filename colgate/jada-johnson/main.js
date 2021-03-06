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
    match: "empanadas",
    src:
      "http://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/image/recipes/cl/13/05/beef-empanadas-cl-x.jpg?itok=j5FPgHkb"
  },
  {
    match: "ny pizza",
    src:
      "https://img.grouponcdn.com/deal/fcee6922d4714176a1cda904c21d70bc/bc/v1/c700x420.jpg"
  },
  {
    match: "hot wings",
    src: "https://s3-media1.fl.yelpcdn.com/bphoto/98jZQAgpb98XRduQmMBLMw/ls.jpg"
  },
  {
    match: "seafoodfeast",
    src: "https://i.ytimg.com/vi/cRk7QGZ_wb4/maxresdefault.jpg"
  },
  {
    match: "cardib",
    src:
      "https://lh6.googleusercontent.com/proxy/WFSA1VPXl4yNwcqxLZ5zkSx07dNQMcNJydWEIj6Ukn9KIbSuUY1vRqTn-XIRdKuEZhkbaAge3z5NrzateHnd-jGxpRJSretcQKFIJfj4gQ=w1200-h630-p-k-no-nu"
  },
  {
    match: "nickiminaj",
    src:
      "https://ionehiphopwired.files.wordpress.com/2017/12/15088796117143.jpg?w=1024&quality=85&strip=all&h=681&quality=80&strip=all"
  },
  {
    match: "aboogie",
    src: "https://bckonline.com/wp-content/uploads/2018/02/Boogie.jpg"
  },
  {
    match: "six9ine",
    src:
      "http://s3.amazonaws.com/hiphopdx-production/2018/07/180724-Nicki-Minaj-886x664.jpg"
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
let colors = ["#4dd2ff", "#cc66ff", "#ff8095", "#8cff1a"];

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
    if (timer < 0) {
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
    timer = timer + 2;

    // #3
    status.textContent = "AEOWWWWWWW YOU GOT IT!!!!OKURRRRRRR";

    // DON'T TOUCH BELOW
    updateClass("goodScore", "badScore");
    selectedCards.forEach(card => {
      card.element.classList.add("match");
      setTimeout(() => card.element.classList.add("fade"), 300);
    });
  } else {
    // #4
    score--;
    timer = timer - 5;

    // #5
    status.textContent = "Are you dumb? Try again silly goose";

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

function gameOver() {
  const chosen = [...document.querySelectorAll(".match")];

  // #1
  if (chosen.length === dupCards.length) {
    // #2
    status.textContent = "You did it... finally hhrrrrhahhh";
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
        "https://media.timeout.com/images/103444978/630/472/image.jpg"
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
