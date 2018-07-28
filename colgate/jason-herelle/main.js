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
    match: "1",
    src: "https://i.pinimg.com/564x/a0/33/34/a03334209c89761cb29771b94878ac61.jpg"
  },
  {
    match: "2",
    src: "https://i.pinimg.com/564x/5f/98/25/5f98258e2031eafe62b9b01171fabf56.jpg"
  },
  {
    match: "3",
    src: "http://www.ctmglifestyle.com/images/SK206KCUZAYm/men-air-jordan-4-shoes-black-81NZ.jpg"
  },
  {
    match: "4",
    src: "https://sneakernews.com/wp-content/uploads/2017/03/air-jordan-13-dmp-release-info-0.jpg"
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
let colors = ["red", "blue", "purple", "green"];

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
    timer = timer + 5;

    // #3
    status.textContent = "Your trapping and finnesing, Keep it up Gz";

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
    status.textContent = "Just Stop";

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
    status.textContent = "Try again next time!!";
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
        "http://www.bakuganbuzz.com/wp-content/uploads/2008/12/battlegear_card_back.png"
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
