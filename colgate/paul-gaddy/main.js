
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
  
  const finalScore = document.querySelector(".finalScore");
  reset.addEventListener("click", () => window.location.reload());
  
  // CREATE AN ARRAY NAMED cards AND INSERT OBJECTS INTO OUR ARRAY
  
  const cards = [
    {
      match: "katarina",
      src:
  "https://78.media.tumblr.com/e720b8aa023067831185bb1937e74b2f/tumblr_oy2w6dOiAh1vuzisuo2_500.png"
    },
    {
      match: "leblanc",
      src: "https://lolskinshop.com/wp-content/uploads/2015/04/Leblanc_4.jpg"
    },
    {
      match: "riven",
      src:
        "https://78.media.tumblr.com/2d666dd0d066c55f422fa96adaa42792/tumblr_or48u3Wbpx1vuzisuo2_500.png"
    },
    {
      match: "yasuo",
      src:
        "https://lolskinshop.com/wp-content/uploads/2016/02/Blood-moon-Yasou-skin-loading-screen.jpg"
    },
    {
      match: "akali",
      src:
        "http://4.bp.blogspot.com/-rcnFn6C2ccg/VO-Qe25QbJI/AAAAAAAAkxk/xU9LoC2-mJk/s1600/Akali_7.jpg"
    },
    {
      match: "vlad",
      src:
        "https://www.mobafire.com/images/champion/skins/portrait/vladimir-academy.jpg"
    },
  {
      match: "irelia",
     src:"https://78.media.tumblr.com/965aaa61ebb8344b6448f81f826dc8ab/tumblr_p6vnrlGoeq1x40hq9o2_1280.png"
    },
  {
      match: "nf",
     src:"http://www.davibemag.com/wp-content/uploads/2017/11/NF-Publicity-Image-4-copie.jpg"
    },
    {
      match: "eminem",
     src:"https://www.bet.com/music/photos/2016/03/still-shocking--the-slim-shady-lp-s-10-wildest-lyrics/_jcr_content/mainCol/imagegallerycontainer/galleryimage_6.custom1540fx865fx0xcrop.dimg/__1457382353399/030716-music-still-shocking-the-slim-shady-lp-s-10-wildest-lyrics-eminem-9.jpg"
    },
    {
      match:"witt",
      src:"https://www.flare.com/wp-content/uploads/2016/05/4-WITT-LOWRY-1.png"
    },
    {
      match: "g eazy",
     src:"https://i.pinimg.com/originals/ab/0e/d2/ab0ed2450d9499dd2ab3e4ef9ae92921.jpg"
    },
    {
      match: "rich brian",
     src:"https://ih1.redbubble.net/image.507828382.5279/flat,1000x1000,075,f.u1.jpg"
    },
  ];

  const dupCards = cards.map(c => c).concat(cards);
  
  let selectedCards = [ ];
  let score = 0;
  let bgImages = ["url('https://i1.wp.com/datpizz.com/wp-content/uploads/2017/02/pouya.jpg?resize=1096%2C640')", "url('https://songtexte.co/Images/Artists/niki-songtexte-lyrics-a854ca.jpg')", "url('https://www.ebony.com/wp-content/uploads/2018/03/Jhene-Aiko-Never-Call-Me-565x377.jpg')"]
  var timer = 90;
  
  function randomColor(arr) {
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
  }
  
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
  
  function gameTimer() {
    window.myMatchingGameInterval = setInterval(() => {
      // #1
      timer--;
  
      time.textContent = `${timer} seconds left`;
  
      // #2
      if (timer <  0) {
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
        // document.body.style.background = randomColor(colors);
        document.body.style.backgroundImage = randomColor(bgImages);
      }
    }, 1000);
  }
  /*
  * STEP 8
  */
  function checkForMatch() {
    // #1
    if(selectedCards[0].card.match === selectedCards[1].card.match){
  
      // #2
      score++;
      timer = timer + 2;

      // #3
      status.textContent = 'you got one';
  
      // DON'T TOUCH BELOW
      updateClass('goodScore', 'badScore');
      selectedCards.forEach(card => {
        card.element.classList.add('match');
        setTimeout(() => card.element.classList.add('fade'), 300);
      });
    } else {
      // #4
      score--;
      timer = timer - 1;

      // #5
      status.textContent = '';
  
      // DON'T TOUCH BELOW
      updateClass('badScore', 'goodScore');
      flipBack(selectedCards);
    }
  
    // #6
    gameOver();
  
    // #7
    selectedCards = [];
  
    // DON'T TOUCH BELOW
    scoreDiv.textContent = score;
  }
  
  function updateClass(newClass, oldClass) {
    scoreDiv.classList.remove(oldClass);
    scoreDiv.classList.add(newClass);
  }

  function flipBack(cards) {
    cards.forEach(({ element }) =>
      setTimeout(
        () => element.querySelector(".card").classList.remove("is-flipped"),
        1000
      )
    );
  }

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
    if (selectedCards.length == 2) {
  
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

  function gameOver(){
    const chosen = [...document.querySelectorAll('.match')];
  
    // #1
    if(chosen.length === dupCards.length){
  
      // #2
      status.textContent = '';
      
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
          "https://pbs.twimg.com/media/DG0oJt_UMAAOmAK.jpg"
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