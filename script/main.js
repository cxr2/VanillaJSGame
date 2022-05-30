/// Import in keen-slider
import keenSlider from "https://cdn.skypack.dev/keen-slider";

/// Random number generator (at the top of the page)
function SingleRandomNumberGenerator(min = 0, max = 9) {
  // Returns a single integer between min (0) and max (9) inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomArrGenerator(min = 0, max = 9, length = 3) {
  /// generates random integers and returns them in an array
  let count = 0;
  const arr = [];
  while (count < length) {
    arr.push(SingleRandomNumberGenerator(min, max));
    count += 1;
  }
  return arr;
}

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
// const shuffled = shuffle(numbers);

// When player == true ==> player1's turn false ==> player2's turn
let player = true;
const player1Buttons = Array.from(document.querySelectorAll(".player1 button"));
const player1NudgeButtons = Array.from(
  document.querySelectorAll("player1 .nudge")
);
const player2Buttons = Array.from(document.querySelectorAll(".player2 button"));
const player2NudgeButtons = Array.from(
  document.querySelectorAll("player2 .nudge")
);
const allPlayerButtons = player1Buttons.concat(player2Buttons);
console.log(allPlayerButtons);

// function nudge(slider, player)

const doors = document.querySelectorAll(".door");
document.querySelector("#spinner").addEventListener("click", () => {
  spin();
  // set first player to player 1
  player = true;
  // enable player 1 buttons
  for (const button of player1Buttons) {
    button.toggleAttribute("disabled");
  }
});
document.querySelector("#reseter").addEventListener("click", init);

async function spin() {
  init(false, 1, 2);
  for (const door of doors) {
    const boxes = door.querySelector(".boxes");
    const duration = parseInt(boxes.style.transitionDuration);
    boxes.style.transform = "translateY(0)";
    await new Promise((resolve) => setTimeout(resolve, duration * 100));
  }
}

function init(firstInit = true, groups = 1, duration = 1) {
  for (const button of allPlayerButtons) {
    if (button.hasAttribute("disabled") == false) {
      button.toggleAttribute("disabled");
    }
  }

  for (const door of doors) {
    if (firstInit) {
      door.dataset.spinned = "0";
    } else if (door.dataset.spinned === "1") {
      return;
    }

    const boxes = door.querySelector(".boxes");
    const boxesClone = boxes.cloneNode(false);

    const pool = ["❓"];
    if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...numbers);
      }
      pool.push(...shuffle(arr));

      boxesClone.addEventListener(
        "transitionstart",
        function () {
          door.dataset.spinned = "1";
          this.querySelectorAll(".box").forEach((box) => {
            box.style.filter = "blur(1px)";
          });
        },
        { once: true }
      );

      boxesClone.addEventListener(
        "transitionend",
        function () {
          this.querySelectorAll(".box").forEach((box, index) => {
            box.style.filter = "blur(0)";
            if (index > 0) this.removeChild(box);
          });
        },
        { once: true }
      );
    }
    // console.log(pool);

    for (let i = pool.length - 1; i >= 0; i--) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = door.clientWidth + "px";
      box.style.height = door.clientHeight + "px";
      box.textContent = pool[i];
      boxesClone.appendChild(box);
    }
    boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
    boxesClone.style.transform = `translateY(-${
      door.clientHeight * (pool.length - 1)
    }px)`;
    door.replaceChild(boxesClone, boxes);
    // console.log(door);
  }
}

/// Shuffles the entries in an array
function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

init();

// Generate slider slides and appends them to target element programmatically
function slideGenerator(content = numbers, targetElement) {
  let slideNumber = 1;
  const frag = new DocumentFragment();
  for (const item of content) {
    const div = document.createElement("div");
    const className1 = `keen-slider__slide`;
    div.classList.add(className1);
    const className2 = `number-slide${slideNumber}`;
    // if the target element id contains the text player1 or player2
    if (targetElement.id.includes("player1")) {
      div.classList.add("player-1");
    } else if (targetElement.id.includes("player2")) {
      div.classList.add("player-2");
    }
    div.classList.add(className2);
    div.textContent = item;
    frag.appendChild(div);
    slideNumber += 1;
  }

  targetElement.appendChild(frag);
}

function randomSlideGenerator(array = numbers, targetElement) {
  const shuffled = shuffle(array);
  slideGenerator(shuffled, targetElement);
}

// Create slider_1_2 slides
const player1_slider1 = document.getElementById("ks-player1-1");
randomSlideGenerator(numbers, player1_slider1);

const player1_slider2 = document.getElementById("ks-player1-2");
randomSlideGenerator(numbers, player1_slider2);

const player1_slider3 = document.getElementById("ks-player1-3");
randomSlideGenerator(numbers, player1_slider3);

/// create the slider 1_1
const slider_1_1 = new keenSlider("#ks-player1-1", {
  loop: true,
  created: () => {
    console.log("created");
  },
  slides: {
    perView: 1,
  },
  drag: false,
  // selector: null,
  vertical: true,
  // initial: 5,
  // range: {
  //   min: 0,
  //   max: 9,
  // },
});

const slider_1_2 = new keenSlider("#ks-player1-2", {
  loop: true,
  created: () => {
    console.log("created");
  },
  slides: {
    perView: 1,
  },
  drag: false,
  // selector: null,
  vertical: true,
  // initial: 5,
  // range: {
  //   min: 0,
  //   max: 9,
  // },
});

const slider_1_3 = new keenSlider("#ks-player1-3", {
  loop: true,
  created: () => {
    console.log("created");
  },
  slides: {
    perView: 1,
  },
  drag: false,
  // selector: null,
  vertical: true,
  // initial: 5,
  // range: {
  //   min: 0,
  //   max: 9,
  // },
});

console.dir(slider_1_1);

//p1 Coins Remaining

let p1coinsRemaining = 10;
const p1coinsRemainingDisplay = document.getElementById("p1-coins-remaining");
p1coinsRemainingDisplay.textContent = p1coinsRemaining;

// **** Player 1 Slider 1 buttons
// Get the ks-player1-1-full-roll element
const ks_player1_1_full_roll = document.querySelector(
  "#ks-player1-1-full-roll"
);
const ks_player1_1_nudge = document.querySelector("#ks-player1-1-nudge");

/// Create a random number generator that selects a number between 0 and 9
ks_player1_1_full_roll.addEventListener("click", () => {
  let ksPlayer1Index = 0;
  ksPlayer1Index = SingleRandomNumberGenerator();

  if (p1coinsRemaining >= 1) {
    p1coinsRemainingDisplay.textContent = p1coinsRemaining -= 1;
    slider_1_1.moveToIdx(ksPlayer1Index, true);
    endTurn();
  } else {
    disablePlayerButtons(player1Buttons);
    // document.getElementsByTagName("button");
    // Array.from(document.getElementsByTagName("button")).forEach(
    //   (b) => (b.disabled = true)
    // );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// Add event listener to the ks-player1-1-nudge element that will trigger the slider to go to the next slide
ks_player1_1_nudge.addEventListener("click", () => {
  if (p1coinsRemaining < 2) {
    GrowlNotification.notify({
      title: "Sorry!",
      description: "You do not have enough coins.",
      type: "warning",
      position: "top-center",
      closeTimeout: 0,
    });
    disablePlayerButtons(player1NudgeButtons);
  } else if (p1coinsRemaining >= 2) {
    slider_1_1.next();
    p1coinsRemainingDisplay.textContent = p1coinsRemaining -= 2;
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// **** Player 1 Slider 2 buttons
// Get the ks-player1-2-full-roll element
const ks_player1_2_full_roll = document.querySelector(
  "#ks-player1-2-full-roll"
);
const ks_player1_2_nudge = document.querySelector("#ks-player1-2-nudge");

/// Create a random number generator that selects a number between 0 and 9
ks_player1_2_full_roll.addEventListener("click", () => {
  let ksPlayer1Index = 0;
  ksPlayer1Index = SingleRandomNumberGenerator();

  console.log(
    "🚀 ~ file: main.js ~ line 125 ~ ks_player1_1_full_roll.addEventListener ~ ksPlayer1Index",
    ksPlayer1Index
  );
  if (p1coinsRemaining >= 1) {
    p1coinsRemainingDisplay.textContent = p1coinsRemaining -= 1;
    slider_1_2.moveToIdx(ksPlayer1Index, true);
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// Add event listener to the ks-player1-1-nudge element that will trigger the slider to go to the next slide
ks_player1_2_nudge.addEventListener("click", () => {
  if (p1coinsRemaining < 2) {
    GrowlNotification.notify({
      title: "Sorry!",
      description: "You do not have enough coins.",
      type: "warning",
      position: "top-center",
      closeTimeout: 0,
    });
  } else if (p1coinsRemaining >= 2) {
    slider_1_2.next();
    p1coinsRemainingDisplay.textContent = p1coinsRemaining -= 2;
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// **** Player 1 Slider 3 buttons
// Get the ks-player1-2-full-roll element
const ks_player1_3_full_roll = document.querySelector(
  "#ks-player1-3-full-roll"
);
const ks_player1_3_nudge = document.querySelector("#ks-player1-3-nudge");

ks_player1_3_full_roll.addEventListener("click", () => {
  let ksPlayer1Index = 0;
  ksPlayer1Index = SingleRandomNumberGenerator();

  console.log(
    "🚀 ~ file: main.js ~ line 125 ~ ks_player1_1_full_roll.addEventListener ~ ksPlayer1Index",
    ksPlayer1Index
  );
  if (p1coinsRemaining >= 1) {
    slider_1_3.moveToIdx(ksPlayer1Index, true);
    p1coinsRemainingDisplay.textContent = p1coinsRemaining -= 1;
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// Add event listener to the ks-player1-1-nudge element that will trigger the slider to go to the next slide
ks_player1_3_nudge.addEventListener("click", () => {
  if (p1coinsRemaining < 2) {
    GrowlNotification.notify({
      title: "Sorry!",
      description: "You do not have enough coins.",
      type: "warning",
      position: "top-center",
      closeTimeout: 0,
    });
  } else if (p1coinsRemaining >= 2) {
    slider_1_3.next();
    p1coinsRemainingDisplay.textContent = p1coinsRemaining -= 2;
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// **** Player 1 Roll All Button
const ks_player1_all_full_roll = document.querySelector(
  "#ks-player1-all-full-roll"
);

ks_player1_all_full_roll.addEventListener("click", () => {
  if (p1coinsRemaining >= 1) {
    const ksPlayer1Index1 = SingleRandomNumberGenerator();
    slider_1_1.moveToIdx(ksPlayer1Index1, true);
    const ksPlayer1Index2 = SingleRandomNumberGenerator();
    slider_1_2.moveToIdx(ksPlayer1Index2, true);
    const ksPlayer1Index3 = SingleRandomNumberGenerator();
    slider_1_3.moveToIdx(ksPlayer1Index3, true);
    console.log(ksPlayer1Index1, ksPlayer1Index2, ksPlayer1Index3);
    p1coinsRemainingDisplay.textContent = p1coinsRemaining -= 1;
    endTurn();
  } else {
    disablePlayerButtons(player1Buttons);
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
  }
});

//**  Generate Player 2 Slides **/
const player2_slider1 = document.getElementById("ks-player2-1");
randomSlideGenerator(numbers, player2_slider1);

const player2_slider2 = document.getElementById("ks-player2-2");
randomSlideGenerator(numbers, player2_slider2);

const player2_slider3 = document.getElementById("ks-player2-3");
randomSlideGenerator(numbers, player2_slider3);

// ***** Player 2 Sliders
/// create the slider 1_1
const slider_2_1 = new keenSlider("#ks-player2-1", {
  loop: true,
  created: () => {
    console.log("created");
  },
  slides: {
    perView: 1,
  },
  drag: false,
  // selector: null,
  vertical: true,
  // initial: 5,
  // range: {
  //   min: 0,
  //   max: 9,
  // },
});

const slider_2_2 = new keenSlider("#ks-player2-2", {
  loop: true,
  created: () => {
    console.log("created");
  },
  slides: {
    perView: 1,
  },
  drag: false,
  // selector: null,
  vertical: true,
  // initial: 5,
  // range: {
  //   min: 0,
  //   max: 9,
  // },
});

const slider_2_3 = new keenSlider("#ks-player2-3", {
  loop: true,
  created: () => {
    console.log("created");
  },
  slides: {
    perView: 1,
  },
  drag: false,
  // selector: null,
  vertical: true,
  // initial: 5,
  // range: {
  //   min: 0,
  //   max: 9,
  // },
});

let p2coinsRemaining = 10;
const p2coinsRemainingDisplay = document.getElementById("p2-coins-remaining");
p2coinsRemainingDisplay.textContent = p2coinsRemaining;

// ***** Player 2 Controls
// **** Player 2 Slider 1 buttons
const ks_player2_1_full_roll = document.querySelector(
  "#ks-player2-1-full-roll"
);
const ks_player2_1_nudge = document.querySelector("#ks-player2-1-nudge");

ks_player2_1_full_roll.addEventListener("click", () => {
  let ksPlayer1Index = 0;
  ksPlayer1Index = SingleRandomNumberGenerator();

  if (p2coinsRemaining >= 1) {
    p2coinsRemainingDisplay.textContent = p2coinsRemaining -= 1;
    slider_2_1.moveToIdx(ksPlayer1Index, true);
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

ks_player2_1_nudge.addEventListener("click", () => {
  if (p2coinsRemaining < 2) {
    GrowlNotification.notify({
      title: "Sorry!",
      description: "You do not have enough coins.",
      type: "warning",
      position: "top-center",
      closeTimeout: 0,
    });
  } else if (p2coinsRemaining >= 2) {
    slider_2_1.next();
    p2coinsRemainingDisplay.textContent = p2coinsRemaining -= 2;
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// **** Player 2 Slider 2 buttons
const ks_player2_2_full_roll = document.querySelector(
  "#ks-player2-2-full-roll"
);
const ks_player2_2_nudge = document.querySelector("#ks-player2-2-nudge");

ks_player2_2_full_roll.addEventListener("click", () => {
  let ksPlayer1Index = 0;
  ksPlayer1Index = SingleRandomNumberGenerator();

  if (p2coinsRemaining >= 1) {
    slider_2_2.moveToIdx(ksPlayer1Index, true);
    p2coinsRemainingDisplay.textContent = p2coinsRemaining -= 1;
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

ks_player2_2_nudge.addEventListener("click", () => {
  if (p2coinsRemaining < 2) {
    GrowlNotification.notify({
      title: "Sorry!",
      description: "You do not have enough coins.",
      type: "warning",
      position: "top-center",
      closeTimeout: 0,
    });
  } else if (p2coinsRemaining >= 2) {
    slider_2_2.next();
    p2coinsRemainingDisplay.textContent = p2coinsRemaining -= 2;
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// **** Player 2 Slider 3 buttons
// Get the ks-player1-2-full-roll element
const ks_player2_3_full_roll = document.querySelector(
  "#ks-player2-3-full-roll"
);
const ks_player2_3_nudge = document.querySelector("#ks-player2-3-nudge");

ks_player2_3_full_roll.addEventListener("click", () => {
  let ksPlayer1Index = 0;
  ksPlayer1Index = SingleRandomNumberGenerator();

  console.log(
    "🚀 ~ file: main.js ~ line 125 ~ ks_player1_1_full_roll.addEventListener ~ ksPlayer1Index",
    ksPlayer1Index
  );
  if (p2coinsRemaining >= 1) {
    slider_2_3.moveToIdx(ksPlayer1Index, true);
    p2coinsRemainingDisplay.textContent = p2coinsRemaining -= 1;
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

ks_player2_3_nudge.addEventListener("click", () => {
  if (p2coinsRemaining < 2) {
    GrowlNotification.notify({
      title: "Sorry!",
      description: "You do not have enough coins.",
      type: "warning",
      position: "top-center",
      closeTimeout: 0,
    });
  } else if (p2coinsRemaining >= 2) {
    slider_2_3.next();
    p2coinsRemainingDisplay.textContent = p2coinsRemaining -= 2;
    endTurn();
  } else {
    document.getElementsByTagName("button");
    Array.from(document.getElementsByTagName("button")).forEach(
      (b) => (b.disabled = true)
    );
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

// **** Player 2 Roll All Button
const ks_player2_all_full_roll = document.querySelector(
  "#ks-player2-all-full-roll"
);

ks_player2_all_full_roll.addEventListener("click", () => {
  if (p2coinsRemaining >= 1) {
    const ksPlayer1Index1 = SingleRandomNumberGenerator();
    slider_2_1.moveToIdx(ksPlayer1Index1, true);
    const ksPlayer1Index2 = SingleRandomNumberGenerator();
    slider_2_2.moveToIdx(ksPlayer1Index2, true);
    const ksPlayer1Index3 = SingleRandomNumberGenerator();
    slider_2_3.moveToIdx(ksPlayer1Index3, true);
    console.log(ksPlayer1Index1, ksPlayer1Index2, ksPlayer1Index3);
    p2coinsRemainingDisplay.textContent = p2coinsRemaining -= 1;
    endTurn();
  } else {
    disablePlayerButtons(player2Buttons);
    GrowlNotification.notify({
      title: "Game Over!",
      description: "You are out of coins.",
      type: "error",
      position: "top-center",
      closeTimeout: 0,
    });
    endTurn();
  }
});

/// Game evaluation
/* 1) Write a function that retrieves the text content 
2) Create and push the textContent to an array for the target, p1 and p2 
3) For each player, concatenate the values of the current index of each slider to get a single 3 digit number
4) Trigger all of this from the 'Who won?' button 

*/
const winChecker = document.querySelector("#winner");

function getValue(element) {
  return element.textContent;
}

winChecker.addEventListener("click", () => checkWin());

function checkWin() {
  // create arrays
  const target = new Array();
  const player1 = new Array();
  const player2 = new Array();

  /// For all with div class .box, return the value of the textContent and store it as a single string
  for (const element of document.querySelectorAll(".box")) {
    target.push(getValue(element));
  }

  /// push the values of the sliders into the array
  /// Player 1
  const p1_1Index = slider_1_1.track.details.abs;
  const p1_2Index = slider_1_2.track.details.abs;
  const p1_3Index = slider_1_3.track.details.abs;

  player1.push(getValue(player1_slider1.children[p1_1Index]));
  player1.push(getValue(player1_slider2.children[p1_2Index]));
  player1.push(getValue(player1_slider3.children[p1_3Index]));

  /// Player 2
  const p2_1Index = slider_2_1.track.details.abs;
  const p2_2Index = slider_2_2.track.details.abs;
  const p2_3Index = slider_2_3.track.details.abs;

  player2.push(getValue(player2_slider1.children[p2_1Index]));
  player2.push(getValue(player2_slider2.children[p2_2Index]));
  player2.push(getValue(player2_slider3.children[p2_3Index]));

  console.log("🚀 ~ file: main.js ~ line 566 ~ target", target);
  console.log("🚀 ~ file: main.js ~ line 566 ~ p1", player1);
  console.log("🚀 ~ file: main.js ~ line 566 ~ p2", player2);

  const player1Score = player1.join("") * -1;
  const player2Score = player2.join("") * -1;
  const targetScore = target.join("") * -1;

  /// See if player1Score is closer to targetScore than player2Score
  if (
    Math.abs(player1Score - targetScore) < Math.abs(player2Score - targetScore)
  ) {
    GrowlNotification.notify({
      title: "Player 1 wins!",
      description: "Congratulations!",
      type: "success",
      position: "top-center",
      closeTimeout: 0,
    });
  } else if (
    Math.abs(player1Score - targetScore) > Math.abs(player2Score - targetScore)
  ) {
    GrowlNotification.notify({
      title: "Player 2 wins!",
      description: "Congratulations!",
      type: "success",
      position: "top-center",
      closeTimeout: 0,
    });
  } else {
    GrowlNotification.notify({
      title: "It's a draw!",
      description: "Good game!",
      type: "success",
      position: "top-center",
      closeTimeout: 0,
    });
  }
  console.log(
    `player1Score(${player1Score}) - targetScore(${targetScore})`,
    Math.abs(player1Score - targetScore)
  );
  console.log(
    `player2Score(${player2Score}) - targetScore(${targetScore})`,
    Math.abs(player2Score - targetScore)
  );
}

function checkCanAffordNudge(playerBoolean) {
  if (playerBoolean == true) {
    const coinsRemaining = p1coinsRemaining;
    const nudgeButtons = player1NudgeButtons;
    if (coinsRemaining < 2) {
      return false;
    } else {
      return true;
    }
  }
  if (playerBoolean == false) {
    const coinsRemaining = p2coinsRemaining;
    const nudgeButtons = player2NudgeButtons;
    if (coinsRemaining < 2) {
      return false;
    } else {
      return true;
    }
  }
}

// Current player data
let playerNudgeButtons;
let playerButtons;
let playerCoins;

function getPlayaData() {
  if (player) {
    playerNudgeButtons = player1NudgeButtons;
    playerButtons = player1Buttons;
    playerCoins = p1coinsRemaining;
    console.log("Player 1's turn");
  } else {
    playerNudgeButtons = player2NudgeButtons;
    playerButtons = player2Buttons;
    playerCoins = p2coinsRemaining;
    console.log("Player 2's turn");
  }
}
function checkCoins() {
  getPlayaData();
  if (p1coinsRemaining < 1 && p2coinsRemaining < 1) {
    checkWin();
  }

  if (playerCoins < 2) {
    disablePlayerButtons(playerNudgeButtons);
  }
}

function disablePlayerButtons(playerButtonsArr) {
  for (const button of playerButtonsArr) {
    if (button.hasAttribute("disabled") == false) {
      button.toggleAttribute("disabled");
    }
  }
}

function endTurn() {
  for (const button of allPlayerButtons) {
    // turns off buttons player who just played
    // and turns on buttons for next player
    button.toggleAttribute("disabled");
  }
  player = !player;
  checkCanAffordNudge(player);
  checkCoins();

  // //checks if player can afford nudge and disables
  // if (player === true && p1coinsRemaining < 2) {
  //   for (const button of player1NudgeButtons) {
  //     if (button.hasAttribute("disabled") !== true) {
  //       button.toggleAttribute("disable");
  //     }
  //   }
  // }
  // if (player === false && p2coinsRemaining < 2) {
  //   for (const button of player2NudgeButtons) {
  //     if (button.hasAttribute("disabled") !== true) {
  //       button.toggleAttribute("disable");
  //     }
  //   }
  // }
  // if (p1coinsRemaining === 0 && p2coinsRemaining === 0) {
  //   checkWin();
  // }
}
