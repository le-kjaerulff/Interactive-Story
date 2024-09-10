import "./style.css";

//var properLoadingProcedure; // bliver true hvis hvis ballLoaded er false når spilleren lader kanonen med krudt
// bliver false hvis gunpowderLoaded er false når spilleren lader kanonen med kuglen

//Spilerens nuværende position. Tallet svarer til kapitlets nummer.
let playerPosition = 4;

let latestPlayerAnswer;

//Gemmer de valg som spilleren har truffet som en liste.
let choicesLog = [];

//array som indeholder to arrays til den tekst som skal vises til spilleren.
//Det første array er til descriptions, det andet er til choices.
//Funktionen 'compileTextToShow' tømmer og fylder dette array på ny hver gang spilleren
//træffer et valg.
let textToShow = [[], []];

//Array som holder styr på hvilke tekster spilleren har set, ved at gemme teksternes id-tags
let textSeenByPlayer = ["4.0.0"];

const chapterNames = [
  "Among friends", // chapter 0
  "Waking up in a nightmare", // chapter 1
  "The main deck", // chapter 2
  "The cargo deck", // chapter 3
  "The Gun Deck", // chapter 4
  "The captain's cabin", // chapter 5
  "By the wheel", // chapter 6
  "Mutany!", // chapter 7
  "Fire in the hole!", // chapter 8
  "The captain's logbook", // chapter 9
  "Wasted...", // chapter 10
  "For the captain!", // chapter 11
  "Lunch", // chapter 12
];

let allText = [
  // Alle spillets tekster. Arrayets opbygning er chapters[kapitel nr][0 for beskrivelser, 1 for valg][beskrivelse/valg nr]
  [
    //chapter 0
    [
      // chapter 0 descriptions
      {
        id: "0.0.0",
        text: "Introduction part 1 text here",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      // chapter 0 choices
      {
        id: "0.1.0",
        text: "Continue",
        initShowState: true,
        show: true,
        destination: 1,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 1

    [
      //chapter 1 descriptions
      {
        id: "1.0.1",
        text: "Introduction part 2 text here",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 1 choices
      {
        id: "MainDeck",
        text: "Go to main deck",
        initShowState: true,
        show: true,
        destination: 2,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CargoDeck",
        text: "Go to cargo deck ",
        initShowState: true,
        show: true,
        destination: 3,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "GunDeck",
        text: "Go to gun deck",
        initShowState: true,
        show: true,
        destination: 4,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CaptCab",
        text: "Go to captain's cabin",
        initShowState: true,
        show: true,
        destination: 5,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 2
    [
      //chapter 2 descriptions
      {
        id: "2.0.0",
        text: "Old Captain Charles Von Crutch stands on the main deck, leaning on his whalebone crutch ",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "2.0.1",
        text: `A hideous monster towers up from the sea in front of the ship's bow.
        The captain yells towards you: "Polcheque! We've lost th' starboard cannons! 
        Get yer scurvy hide movin' and bring those port-side cannons t' bear!`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "2.0.2",
        text: "The captain orders you below deck to load up the cannons",
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "2.0.3",
        text: "The captain reprimands you for not knowing the difference between starboard and port",
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "2.0.4",
        text: "The captain gives you a nervous look",
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 2 choices
      {
        id: "CargoDeck",
        text: "Go to cargo deck",
        initShowState: true,
        show: true,
        destination: 3,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "GunDeck",
        text: "Go to gun deck",
        initShowState: true,
        show: true,
        destination: 4,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CaptCab",
        text: "Go to captain's cabin",
        initShowState: true,
        show: true,
        destination: 5,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "2.1.3",
        text: "Go to the ship's helm and take the wheel",
        initShowState: true,
        show: true,
        destination: 6,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "2.1.4",
        text: "Throw the captain overboard",
        initShowState: false,
        show: false,
        destination: 7,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 3
    [
      //chapter 3 descriptions
      {
        id: "3.0.0",
        text: "The first thing you see in the cargo hold is the rum stash. You consider having a sip, just to lighten your spirits",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "3.0.1",
        text: `The alcohol makes you feel fearless, as if you could overcome anything. There is still plenty of rum in the stash`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "3.0.2",
        text: "In a corner of the cargo deck you spot a bag of gunpowder, which must have ended up here by mistake",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 3 choices
      {
        id: "MainDeck",
        text: "Go to main deck",
        initShowState: true,
        show: true,
        destination: 2,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "GunDeck",
        text: "Go to gun deck",
        initShowState: true,
        show: true,
        destination: 4,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CaptCab",
        text: "Go to captain's cabin",
        initShowState: true,
        show: true,
        destination: 5,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "3.1.3",
        text: "Take a generous sip of the rum",
        initShowState: true,
        show: true,
        destination: 3,
        effectsOfChoice: function () {
          allText[3][0][1].show = false;
          allText[3][0][2].show = true;
          if (choicesLog.includes("6.1.0") === true) {
            allText[4][0][5].show = false;
            allText[4][0][6].show = true;
          }
          if (
            choicesLog.includes("6.1.0") === true &&
            choicesLog.includes("5.1.4") === true
          ) {
            allText[4][0][5].show = false;
            allText[4][0][6].show = false;
            allText[4][0][7].show = true;
          }

          allText[3][1][4].show = false;
          allText[3][1][5].show = true;
        },
        seenByPLayer: false,
      },
      {
        id: "3.1.4",
        text: "Drink more of the rum",
        initShowState: false,
        show: false,
        destination: 10,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "3.1.5",
        text: "Pick up the bag of gunpowder",
        initShowState: true,
        show: true,
        destination: 3,
        effectsOfChoice: function () {
          allText[4][0][3].show = false;

          allText[3][1][6].show = false;
          allText[4][1][4].show = true;
        },
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 4
    [
      //chapter 4 descriptions
      {
        id: "4.0.0",
        text: "On the gun deck, the entire starboard side of the ship's hull has been ripped open by something huge, and all the cannons on this side must have fallen into the sea. On the port side, all cannos still appear to be intact.",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "4.0.1",
        text: `The ammo depot must have fallen overboard as well, exept for one single cannon ball`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "4.0.2",
        text: "You look around for a bag of gun powder, but find nothing of the sort",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "4.0.3",
        text: "Thanks to you, the cannons on the port-side are in perfect position for an attack against the monster",
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "4.0.4",
        text: `Through the hole in the starboard-side hull, the monster gazes in at you with one of its gigantic eyeballs.
        For a moment you feel paralyzed with fear`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "4.0.5",
        text: `Through the hole in the starboard-side hull, the monster gazes in at you with one of its gigantic eyeballs.
        The buzz from the rum has you convinced that the sea monster is the one who should be afraid of you!
        If only you had a weapon to attack with...`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "4.0.6",
        text: `Through the hole in the starboard-side hull, the monster gazes in at you with one of its gigantic eyeballs.
        The buzz from the rum has you convinced that the sea monster is the one who should be afraid of you!
        You drunkenly reckon that you could easily jump from the cannon deck, through the big hole in the ship 
        onto the wretched beast, and slay it with the captain's cutlass. `,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 4 choices
      {
        id: "MainDeck",
        text: "Go to main deck",
        initShowState: true,
        show: true,
        destination: 2,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CargoDeck",
        text: "Go to cargo deck",
        initShowState: true,
        show: true,
        destination: 3,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CaptCab",
        text: "Go to captain's cabin",
        initShowState: true,
        show: true,
        destination: 5,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "4.1.3",
        text: "Load up the canon with the gunpowder",
        initShowState: false,
        show: false,
        destination: 4,
        effectsOfChoice: function () {
          if (
            choicesLog.includes("6.1.1") === true &&
            choicesLog.includes("4.1.4") === false
          ) {
            allText[8][0][2].show = true;
          }
          if (
            choicesLog.includes("6.1.0") == true &&
            choicesLog.includes("4.1.4") === false
          ) {
            allText[8][0][3].show = true;
          }
          if (
            choicesLog.includes("6.1.1") === true &&
            choicesLog.includes("4.1.4") === true
          ) {
            allText[8][0][4].show = true;
          }
          if (
            choicesLog.includes("6.1.0") === true &&
            choicesLog.includes("4.1.4") === true
          ) {
            allText[8][0][5].show = true;
          }

          if (choicesLog.includes("4.1.4") === true) {
            allText[4][1][6].show = true;
          }
          allText[4][1][4].show = false;
        },
        seenByPLayer: false,
      },
      {
        id: "4.1.4",
        text: "Load up the canon with the canonball",
        initShowState: true,
        show: true,
        destination: 4,
        effectsOfChoice: function () {
          if (
            choicesLog.includes("6.1.1") === true &&
            choicesLog.includes("4.1.3") === false
          ) {
            allText[8][0][4].show = true;
          }
          if (
            choicesLog.includes("6.1.0") == true &&
            choicesLog.includes("4.1.3") === false
          ) {
            allText[8][0][5].show = true;
          }
          if (
            choicesLog.includes("6.1.1") === true &&
            choicesLog.includes("4.1.3") === true
          ) {
            allText[8][0][2].show = true;
          }
          if (
            choicesLog.includes("6.1.0") === true &&
            choicesLog.includes("4.1.3") === true
          ) {
            allText[8][0][3].show = true;
          }

          if (choicesLog.includes("4.1.3") === true) {
            allText[4][1][6].show = true;
          }
          allText[4][1][5].show = false;
        },
        seenByPLayer: false,
      },
      {
        id: "4.1.5",
        text: "Fire the canon",
        initShowState: false,
        show: false,
        destination: 8,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "4.1.6",
        text: "Fearlessly attack the beast with the sword",
        initShowState: false,
        show: false,
        destination: 11,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 5
    [
      //chapter 5 descriptions
      {
        id: "5.0.0",
        text: `You're in the captain's cabin. Some of the furniture has been flipped over during the battle with the monster
        A the foot of a table in the corner, you spot the captain's logbook, which has fallen from the table and lies open on the floor`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "5.0.1",
        text: `On the wall hangs the captain's mighty cutlass, which has slain many foul beasts on the seven seas`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 5 choices
      {
        id: "MainDeck",
        text: "Go to main deck",
        initShowState: true,
        show: true,
        destination: 2,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CargoDeck",
        text: "Go to cargo deck",
        initShowState: true,
        show: true,
        destination: 3,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "GunDeck",
        text: "Go to gun deck",
        initShowState: true,
        show: true,
        destination: 4,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "5.1.3",
        text: "Read the open page in the captains logbook",
        initShowState: true,
        show: true,
        destination: 9,
        effectsOfChoice: function () {
          allText[2][0][4].show = true;

          allText[2][1][4].show = true;
        },
        seenByPLayer: false,
      },
      {
        id: "5.1.4",
        text: "Borrow the captain's cutlass",
        initShowState: true,
        show: true,
        destination: 5,
        effectsOfChoice: function () {
          //if (choicesLog.includes("6.1") === true) {
          //   descriptions[4 - 1][5 - 1].show = false;
          //   descriptions[4 - 1][6 - 1].show = true;
          //   }
          if (
            choicesLog.includes("6.1.0") === true &&
            choicesLog.includes("5.1.4") === true
          ) {
            allText[4][0][5].show = false;
            allText[4][0][6].show = false;
            allText[4][0][7].show = true;
          }

          allText[5][1][5].show = false;
        },
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 6
    [
      //chapter 6 descriptions
      {
        id: "6.1.0",
        text: `You stand behind the wheel on the ships helm. Ahead from the ships the bow, the monster is ready to swallow the ship whole.
        You must change the course immediately!`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 6 choices
      {
        id: "6.1.0",
        text: "Turn the wheel to the left",
        initShowState: true,
        show: true,
        destination: 2,
        effectsOfChoice: function () {
          allText[2][0][2].show = false;
          allText[2][0][4].show = true;
          allText[4][0][3].show = false;
          allText[4][0][5].show = true;
          if (choicesLog.includes("3.1.3") === true) {
            allText[4][0][6].show = true;
            allText[4][0][5].show = false;
          }
          if (
            choicesLog.includes("3.1.3") === true &&
            choicesLog.includes("5.1.4") === true
          ) {
            allText[4][0][7].show = true;
            allText[4][0][5].show = false;
            allText[4][0][6].show = false;
          }
          allText[2][1][4].show = false;
        },
        seenByPLayer: false,
      },
      {
        id: "6.1.1",
        text: "Turn the wheel to the right",
        initShowState: true,
        show: true,
        destination: 2,
        effectsOfChoice: function () {
          allText[2][0][2].show = false;
          allText[2][0][3].show = true;
          allText[4][0][4].show = true;
          allText[2][1][4].show = false;
        },
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 7
    [
      //chapter 7 descriptions
      {
        id: "7.0.0",
        text: `You throw the captain overboard and the monster immidiately dives after him, pulling him into the dark abyss. You survive.`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 7 choices
      {
        id: "7.1.0",
        text: "Go back to the beginning",
        initShowState: true,
        show: true,
        destination: 1,
        effectsOfChoice: function () {
          clearChoicesLog();
          clearTextSeen();
          initializeShowStates();
          console.log("game initialized");
        },
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 8
    [
      //chapter 8 descriptions
      {
        id: "8.0.0",
        text: `You light the fuse on the cannon`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "8.0.1",
        text: `You kill the monster with the cannon`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "8.0.2",
        text: `You fire a cannonball directly into the sea`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "8.0.3",
        text: `You're about to kill the monster with the cannon but the cannon explodes and kills you`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "8.0.4",
        text: `You're about to shoot the ship's last cannon ball into the sea, but the cannon explodes and kills you`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 8 choices
      {
        id: "8.1.0",
        text: "Go back to the beginning",
        initShowState: true,
        show: true,
        destination: 1,
        effectsOfChoice: function () {
          clearChoicesLog();
          clearTextSeen();
          initializeShowStates();
          console.log("game initialized");
        },
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 9
    [
      //chapter 9 descriptions
      {
        id: "9.0.0",
        text: `You read the captain's logbook and learn of his secret`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 9 choices
      {
        id: "9.1.0",
        text: "Put away the captain's logbook",
        initShowState: true,
        show: true,
        destination: 5,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 10
    [
      //chapter 10 descriptions
      {
        id: "10.0.0",
        text: `You suddenly feel very dizzy and collapse on the floor. Eventually the seabeast eats the ship, painfully digesting you and the captain over several weeks`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 10 choices
      {
        id: "10.1.0",
        text: "Go back to the beginning",
        initShowState: true,
        show: true,
        destination: 1,
        effectsOfChoice: function () {
          clearChoicesLog();
          clearTextSeen();
          initializeShowStates();
          console.log("game initialized");
        },
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 11
    [
      //chapter 11 descriptions
      {
        id: "11.0.0",
        text: `You fearlessly attack the beast with the cutlass and kill both the beast and yourself in the process`,
        initShowState: true,
        show: true,
      },
    ],
    [
      //chapter 11 choices
      {
        id: "11.1.0",
        text: "Go back to the beginning",
        initShowState: true,
        show: true,
        destination: 1,
        effectsOfChoice: function () {
          clearChoicesLog();
          clearTextSeen();
          initializeShowStates();
          console.log("game initialized");
        },
        seenByPLayer: false,
      },
    ],
  ],
  [
    //chapter 12
    [
      //chapter 12 descriptions
      {
        id: "12.0.0",
        text: `The ship sails directly into the cavernous mouth of the wretched seamonster. You spend the next following weeks being slowly digested together with the captain, who foul-mouthetly schools you in how the ill fate that you share could have been avoided, right until his mouth and vocalcoords have been etched away by stomach acid `,
        initShowState: true,
        show: true,
      },
    ],
    [
      //chapter 12 choices
      {
        id: "12.1.0",
        text: "Go back to the beginning",
        initShowState: true,
        show: true,
        destination: 1,
        effectsOfChoice: function () {
          clearChoicesLog();
          clearTextSeen();
          initializeShowStates();
          console.log("game initialized");
        },
        seenByPLayer: false,
      },
    ],
  ],
];

/*
//html stuff
//const body = document.body; //mah body
const app = document.getElementById("app");

let descriptionParagraphs = [];
let choiceLabels = [];
let choiceInputs = [];

const chapterTitle = app.createElement("h1");
const divChapterText = app.createElement("div");
divChapterText.setAttribute("id", "chapterText");

const formChoices = app.createElement("form");
formChoices.setAttribute("action", "/choose-an-action");
formChoices.setAttribute("id", "choicesText");

//body.append(chapterNames[playerPosition]);
app.append(chapterTitle);
app.append(divChapterText);

chapterTitle.innerText = chapterNames[playerPosition];

compileTextToShow(playerPosition);
createDescriptionParagraphs(textToShow[0].length);

divChapterText.append(formChoices);
createChoiceInputs(textToShow[1].length);
*/

//Gameloop
/*
while (true) {
  console.log(`Choices made so far ${choicesLog}`);

  compileTextToShow(playerPosition);
  body.append(chapterNames[playerPosition]);
  createDescriptionParagraphs(textToShow[0].length);
  //latestPlayerAnswer = prompt(generatePrompt());

  addPlayerChoiceToLog(latestPlayerAnswer);

  updateShowStates(latestPlayerAnswer);

  updateTextSeen();
  if (
    (choicesLog.length > 5 && choicesLog.includes("6.1.0") === false) ||
    (choicesLog.length > 5 && choicesLog.includes("6.1.1") === false)
  ) {
    playerPosition = 12;
  } else {
    playerPosition = getDestinationFromPlayerAnswer(latestPlayerAnswer);
  }
}
*/
function compileTextToShow(chapterNr) {
  // rydder begge arrays inde i textToShow-arrayet.
  for (let i = 0; i < textToShow.length; i++) {
    let lengthBeforePopping = textToShow[i].length;
    for (let j = 0; j < lengthBeforePopping; j++) {
      textToShow[i].pop();
      console.log("popped 1 element");
    }
  }

  // Evaluerer 'show' for alle kapitlets mulige descriptions.
  // Hvis 'show' er true for den pågældende description, føjes dens tekst til første del af textToShow arrayet.

  for (let i = 0; i < allText[chapterNr][0].length; i++) {
    if (allText[chapterNr][0][i].show === true) {
      textToShow[0].push(allText[chapterNr][0][i]);
    }
  }

  // Evaluerer 'show' for alle kapitlets mulige valgmuligheder.
  // Hvis 'show' er true for den pågældende valgmulighed, føjes dens tekst til første del af textToShow arrayet.
  for (let i = 0; i < allText[chapterNr][1].length; i++) {
    if (allText[chapterNr][1][i].show === true) {
      textToShow[1].push(allText[chapterNr][1][i]);
    }
  }
}

function generatePrompt() {
  var result = "";
  for (let i = 0; i < textToShow[0].length; i++) {
    if (textSeenByPlayer.includes(textToShow[0][i].id) === false) {
      result += "\n" + "NEW " + textToShow[0][i].text;
    } else {
      result += "\n" + textToShow[0][i].text;
    }
  }
  for (let i = 0; i < textToShow[1].length; i++) {
    if (textSeenByPlayer.includes(textToShow[1][i].id) === false) {
      result +=
        "\n\n" + "NEW " + textToShow[1][i].text + `(Type in "${i + 1}")`;
    } else {
      result += "\n\n" + textToShow[1][i].text + `(Type in "${i + 1}")`;
    }
  }

  return result;
}

function getDestinationFromPlayerAnswer(answer) {
  return textToShow[1][answer - 1].destination;
}

function addPlayerChoiceToLog(answer) {
  choicesLog.push(textToShow[1][answer - 1].id);
}

function updateShowStates(answer) {
  if (textToShow[1][answer - 1].effectsOfChoice !== undefined) {
    textToShow[1][answer - 1].effectsOfChoice();
  }
}

function initializeShowStates() {
  for (let i = 0; i < allText.length; i++) {
    for (let j = 0; j < allText[i].length; j++) {
      for (let k = 0; k < allText[i][j].length; k++) {
        allText[i][j][k].show = allText[i][j][k].initShowState;
      }
    }
  }
}

function clearChoicesLog() {
  let lengthBeforePopping = choicesLog.length;
  for (let i = 0; i < lengthBeforePopping; i++) {
    choicesLog.pop();
  }
}

function updateTextSeen() {
  for (let i = 0; i < textToShow.length; i++) {
    for (let j = 0; j < textToShow[i].length; j++) {
      textSeenByPlayer.push(textToShow[i][j].id);
    }
  }
}

function clearTextSeen() {
  let lengthBeforePopping = textSeenByPlayer.length;
  for (let i = 0; i < lengthBeforePopping; i++) {
    textSeenByPlayer.pop();
  }
}

function createDescriptionParagraphs(numberOfParagraphs) {
  for (let i = 0; i < numberOfParagraphs; i++) {
    descriptionParagraphs.push(document.createElement("p"));
    if (textSeenByPlayer.includes(textToShow[0][i].id) === false) {
      descriptionParagraphs[i].setAttribute(
        "class",
        "chapterText description new"
      );
    } else {
      descriptionParagraphs[i].setAttribute(
        "class",
        "chapterText description seen"
      );
    }
    descriptionParagraphs[i].innerText = textToShow[0][i].text;
    divChapterText.append(descriptionParagraphs[i]);
  }
}

function createChoiceInputs(numberOfChoices) {
  for (let i = 0; i < numberOfChoices; i++) {
    choiceLabels.push(document.createElement("label"));
    choiceLabels[i].innerText = textToShow[1][i].text;
    choiceLabels[i].setAttribute("class", "chapterText choice");

    choiceInputs.push(document.createElement("input"));
    choiceInputs[i].setAttribute("i", i);
    choiceInputs[i].setAttribute("type", "radio");
    choiceInputs[i].setAttribute("name", "available-choices");

    formChoices.append(choiceLabels[i]);
    choiceLabels[i].append(choiceInputs[i]);

    formChoices.append(document.createElement("br"));
  }
  let button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.innerText = "Submit";
  formChoices.append(button);
}
