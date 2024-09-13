import "./style.css";

//Spilerens nuværende position. Tallet svarer til kapitlets nummer.
let playerPosition = 0;

//Items som spillere samler op gemmes i dette array
let playerInventory = [];

//Gemmer de valg som spilleren har truffet som en liste.
let choicesLog = [];

//HTML refferencer
const choicesParentEl = document.getElementById("box22");
const descriptionsParentEl = document.getElementById("box2121");
const chapterTitleEl = document.getElementById("chapterTitle");
const chapterImageParentEl = document.getElementById("box211");
const inventoryEl = document.getElementById("inventory");

//Farver til styling af knapper
const buttonOverColor = "#DDDDDD";
const buttonOutColor = "#000000";
const buttonTextOverColor = "#000000";
const buttonTextOutColor = "#FFFFFF";

//array som indeholder to arrays til den tekst som skal vises til spilleren.
//Det første array er til descriptions, det andet er til choices.
//Funktionen 'compileTextToShow' tømmer og fylder dette array på ny hver gang spilleren
//træffer et valg.
let textToShow = [[], []];

//Array som holder styr på hvilke tekster spilleren har set, ved at gemme teksternes id-tags
let textSeenByPlayer = [];

// Overskrifter til kapitlerne
const chapterNames = [
  "Life is good", // chapter 0
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

//paths til kapitelbilleder
const chapterImagePaths = [
  "./images/chapter0.jpg",
  "./images/chapter1.jpg",
  "./images/chapter2.jpg",
  "./images/chapter3.jpg",
  "./images/chapter4.jpg",
  "./images/chapter5.jpg",
  "./images/chapter6.png",
  "./images/chapter7.jpg",
  "./images/chapter8-0.jpg",
  "./images/chapter9.jpg",
  "./images/chapter10.jpg",
  "./images/chapter11.jpg",
  "./images/chapter12.jpg",
];

//paths billeder i spillets ramme
const borderImagePaths = [
  "./images/left border.png",
  "./images/right border.png",
];

// Alle spillets tekster. Arrayets opbygning er chapters[kapitel nr][0 for beskrivelser, 1 for valg][beskrivelse/valg nr]
// alle kapitelbeskrivelser og valg er individuelle objekter.
let allText = [
  [
    //chapter 0
    [
      // chapter 0 descriptions
      {
        id: "0.0.0",
        text: `Your name is Carlos Polcheque, and right now you are living the best life a pirate can dream of. You serve as first mate under the revered Captain Charles Von Crutch, on the dreaded pirate vessel The Slaying Brat, and have just returned to port with the cargo filled to the brim with plundered riches and treasures. The crew’s spirits are high, and you are surrounded by friends, gold and gallons upon gallons of the finest rum that can be stolen. Even the old captain, who has seen better days, is celebrating with the crew. At sea, he spends his time either secluded in his cabin or firmly planted on the main deck, leaning on his crutch made from whale bones while shouting out orders to the crew. The captain approaches you with a seldom seen smile on his face, a jug of rum in one hand, the crutch in the other. 
        
        “Arrr, Polcheque! In all me days sailin' the seven seas as a captain, I’ve ne’er had a finer first mate than ye. Ye be a pirate of the blackest, filthiest, and mightiest blood. From the Isle o' Tortuga t' Port Royale t' the shores o' Barbados, I’ve ne’er met nor heard tell o' such splendid..."

While the captain continues to deliver a heartfelt praise of your work (usually, any such recognition from the mouth of the stern captain would be the stuff of dreams) you notice a faint taste of blood in your mouth. The merry singing and drunken shouting of your crewmates suddenly sound like distant howls and blurry wailing of some unimaginable terror. A stabbing soreness and the weight of your own body hits you like a ton of bricks. For a moment, you are completely disoriented. 
`,
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
        effectsOfChoice: function () {
          clearChoicesLog();
        },
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
        text: `You feel wet planks against the side of your face, unmistakably the deck of The Slaying Brat, which you’ve scrubbed countless times back when you served as an ordinary seaman. You open your eyes and see the bodies of your crewmates and fallen debris scattered across the deck, some of which must have knocked you out. A foul stench of rot and distant, monstrous howls reminds you your terrible predicament: An enormous creature from the darkest depths of the ocean is attacking the ship!
 
You get up on your feet.
From the main deck above, you hear the yells of Captain Von Crutch:
 
"Sea beast dead ahead! Grab the wheel and steer 'er starboard, ye scallywags!"
`,
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
        text: "Captain Charles Von Crutch stands in his usual spot for shouting out orders, leaning on his crutch. ",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "2.0.1",
        text: `Ahead of the ships bow, you see rows upon rows of sharp teeth and tentacles emerging up from the ocean. The captain sees you and immediately yells out:

"Polcheque! We've lost th' starboard cannons! Get yer scurvy hide movin' and bring those port-side cannons t' bear!
`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "2.0.2",
        text: `Capt. Von Crutch howls at you: 
        “What ye standing around for, Polcheque?! Load up them cannons!!"`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "2.0.3",
        text: `Cpt. Von Crutch almost falls over while he shouts in your face: 

        ”Polcheque ye artless sea cucumber you! Since when can’t ye tell the difference between starboard and port?! I hope ye gots another plan of attack ready…”`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "2.0.4",
        text: `You recall what you read in the logbook, and for a short moment, you catch a nervous look in the captains’ eyes before he exclaims: 
        
        ”Ayyy, what ye givin me that weird eye for, Polcheque?”`,
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
        text: `On the cargo deck, your gaze immediately falls upon several stacks of barrels with rum. While reminiscing about the joyful dream you had before waking up to this nightmarish reality, you consider having a sip of the rum, just to take the edge off. `,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "3.0.1",
        text: `You’ve enjoyed a generous sip of the rum in the cargo hold, and the alcohol creates a nice warm feeling in your body. You hear the strange howls of the sea monster from outside the ship, but it no longer fills you with the same fear as it did before. `,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "3.0.2",
        text: `In a corner of the cargo deck you notice a bag of gunpowder, which must have ended up here by mistake. `,
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
          allText[3][0][1 - 1].show = false;
          allText[3][0][2 - 1].show = true;
          if (choicesLog.includes("6.1.0") === true) {
            allText[4][0][5 - 1].show = false;
            allText[4][0][6 - 1].show = true;
          }
          if (
            choicesLog.includes("6.1.0") === true &&
            choicesLog.includes("5.1.4") === true
          ) {
            allText[4][0][5 - 1].show = false;
            allText[4][0][6 - 1].show = false;
            allText[4][0][7 - 1].show = true;
            allText[4][1][7 - 1].show = true;
          }

          allText[3][1][4 - 1].show = false;
          allText[3][1][5 - 1].show = true;
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
          allText[3][0][3 - 1].show = false;
          allText[4][0][3 - 1].show = false;

          allText[3][1][6 - 1].show = false;
          allText[4][1][4 - 1].show = true;

          playerInventory.push("A bag of gunpowder");
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
        text: "On the gun deck, the entire starboard side of the ship’s hull has been ripped open by the beast’s tentacles, and the cannons on this side have fallen overboard. On the port side, the cannons still appear to be intact.",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "4.0.1",
        text: `The ammo depot must have been lost to the sea as well, except for one last cannon ball.`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "4.0.2",
        text: "You don’t see any bags of gunpowder anywhere on the half-destroyed gun deck. ",
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "4.0.3",
        text: "Thanks to your helmsmanship at the wheel, the remaining cannons on the port side are lined up for a perfect attack against the abomination that lurks outside the ship.",
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "4.0.4",
        text: `Through the open wound in the starboard side of the hull, the monster stares in at you with one of its enormous, dead eyes. For a moment, the sight leaves you paralyzed with fear.`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "4.0.5",
        text: `The stupid monster gawks at you with its blank eye through the hole in the hull. 
You boldly return the gaze while swaying your arms drunkenly, just barely avoiding tripping over your own feet. The buzz from the rum has you convinced that the monster is the one who should be afraid of you. 

Arrr! "What ye starin' at, ye bloated squid? I'll swab the deck with ye remains!!" you shout in a slurry stream of words. 

If only you had a weapon on you…
`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "4.0.6",
        text: `The stupid monster gawks at you with its blank eye through the hole in the hull. 
Through your rum-infused mind’s eye, you reckon that you could easily jump from the cannon deck, through the big hole in the ship’s hull, onto the stinking abomination, and send it to hell with the captain’s cutlass. 
`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "4.0.7",
        text: `You've loaded up the nearest cannons with gunpowder`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "4.0.8",
        text: `You've loaded up the nearest cannon with a cannonball`,
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
            allText[8][0][2 - 1].show = true; //cannon fires
          }
          if (
            choicesLog.includes("6.1.0") == true &&
            choicesLog.includes("4.1.4") === false
          ) {
            allText[8][0][3 - 1].show = true; //cannon fires
            allText[8][1][0].show = false;
            allText[8][1][1].show = true;
            allText[8][1][2].show = true;
            allText[8][1][3].show = true;
            allText[8][1][4].show = true;
          }
          if (
            choicesLog.includes("6.1.1") === true &&
            choicesLog.includes("4.1.4") === true
          ) {
            allText[8][0][4 - 1].show = true; //cannon explodes
            choicesLog.push("badLoading");
          }
          if (
            choicesLog.includes("6.1.0") === true &&
            choicesLog.includes("4.1.4") === true
          ) {
            allText[8][0][5 - 1].show = true; // cannon explodes
            choicesLog.push("badLoading");
          }

          if (choicesLog.includes("4.1.4") === true) {
            allText[4][1][6 - 1].show = true;
          }
          allText[4][1][4 - 1].show = false;
          allText[4][0][7].show = true;

          removeItemFromInventory("A bag of gunpowder");
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
            allText[8][0][4 - 1].show = true; // cannon explodes
            choicesLog.push("badLoading");
          }
          if (
            choicesLog.includes("6.1.0") == true &&
            choicesLog.includes("4.1.3") === false
          ) {
            allText[8][0][5 - 1].show = true; // cannon explodes
            choicesLog.push("badLoading");
          }
          if (
            choicesLog.includes("6.1.1") === true &&
            choicesLog.includes("4.1.3") === true
          ) {
            allText[8][0][2 - 1].show = true; //cannon fires
          }
          if (
            choicesLog.includes("6.1.0") === true &&
            choicesLog.includes("4.1.3") === true
          ) {
            allText[8][0][3 - 1].show = true;
            allText[8][1][0].show = false;
            allText[8][1][1].show = true;
            allText[8][1][2].show = true;
            allText[8][1][3].show = true;
            allText[8][1][4].show = true;
          }

          if (choicesLog.includes("4.1.3") === true) {
            allText[4][1][6 - 1].show = true; // cannon fires
          }

          allText[4][1][5 - 1].show = false;
          allText[4][0][8].show = true;
        },
        seenByPLayer: false,
      },
      {
        id: "4.1.5",
        text: "Fire the canon",
        initShowState: false,
        show: false,
        destination: 8,
        effectsOfChoice: function () {
          allText[4][1][5].show = false;
          allText[4][0][7].show = false;
          allText[4][0][8].show = false;
        },
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
        text: `You enter the captain’s cabin, wherein you’re only allowed on very special occasions. On the floor lies the captain’s big logbook open on a page with ink writing. The book must have slid off of the desk during the battle with the monster. `,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "5.0.1",
        text: `On the wall hangs the captain’s legendary cutlass, a sword that has slain many foul beasts on the seven seas`,
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
            allText[4][0][5 - 1].show = false;
            allText[4][0][6 - 1].show = false;
            allText[4][0][6 - 1].show = true;
          }
          if (
            choicesLog.includes("6.1.0") === true &&
            choicesLog.includes("5.1.4") === true &&
            choicesLog.includes("3.1.3") === true
          ) {
            allText[4][0][5 - 1].show = false;
            allText[4][0][6 - 1].show = false;
            allText[4][0][7 - 1].show = true;
            allText[4][1][7 - 1].show = true;
          }
          allText[5][0][1].show = false;
          allText[5][1][5 - 1].show = false;

          playerInventory.push("The Captain's cutlass");
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
        text: `You stand before the wheel on the ship’s helm. Straight ahead from the ship, the monster has opened its cavernous mouth, ready to swallow the ship whole. You must change the ship’s heading immediately!`,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
    ],
    [
      //chapter 6 choices
      {
        id: "6.1.0",
        text: "Turn the ship's wheel to the left",
        initShowState: true,
        show: true,
        destination: 2,
        effectsOfChoice: function () {
          allText[2][0][2 - 1].show = false;
          allText[2][0][4 - 1].show = true;
          allText[4][0][3 - 1].show = false;
          allText[4][0][5 - 1].show = true;
          if (choicesLog.includes("3.1.3") === true) {
            allText[4][0][6 - 1].show = true;
            allText[4][0][5 - 1].show = false;
          }
          if (
            choicesLog.includes("3.1.3") === true &&
            choicesLog.includes("5.1.4") === true
          ) {
            allText[4][0][7 - 1].show = true;
            allText[4][0][5 - 1].show = false;
            allText[4][0][6 - 1].show = false;
          }
          allText[2][1][4 - 1].show = false;
        },
        seenByPLayer: false,
      },
      {
        id: "6.1.1",
        text: "Turn the ship's wheel to the right",
        initShowState: true,
        show: true,
        destination: 2,
        effectsOfChoice: function () {
          allText[2][0][2 - 1].show = false;
          allText[2][0][3 - 1].show = true;
          allText[4][0][4 - 1].show = true;
          allText[2][1][4 - 1].show = false;
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
        text: `You suddenly leap forward and grab the captain.

“Mutany! MUUTAANYYY!” he yells, as you drag the coward towards the railing, and toss him overboard. 

Just as the captain hits the dark surface of the ocean, the monster makes a huge leap and lands where the captain’s hand is still above the water, dragging him down into the deepest depths of the abyss. 

You stand for a moment, gazing into the waving void. You’d never have thought that you would turn on your own captain like that. Then again, the old fuckboy only got what was coming to him, and in the end, he was a toxic captain. 

You promote yourself to captain of The Slaying Brat and set the course towards the nearest pirate port to find yourself a new crew. 
`,
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
        text: `You light the cannon’s fuse and cover your ears while the sparkling flame dances along towards the ignition hole in the back of the cannon. `,
        initShowState: true,
        show: true,
        seenByPLayer: false,
      },
      {
        id: "8.0.1",
        text: `Through the port hole, you can just glimpse the wretched monster behind the cannon. The shot is perfectly aligned. 

BANG!!!

The monster lets out a haunting, wailing sound in pain, and retreats into the depths. 
Your heart is still racing but your nerves begin to settle, while you realize that you just fended off a leviathan single handedly. Although, you are unsure whether the beast might someday return, once its wounds have healed. 

You triumphantly tread up the stair to the main deck, where the captain stands at the railing, looking anxiously into the horizon. 

You stand for a moment by his side, until he turns to you and says:

“Well Polcheque, if you’ve got time to lean you’ve got time to clean”. 

He hands you the mop and order you to swab the decks. 

It’s a thankless job, but you’re lucky to still be alive. 
`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "8.0.2",
        text: `BANG! 

You watch the ship’s last cannon ball hurl through the air and splash graciously into the ocean.
For a moment you ponder what you were trying to achieve - the monster is behind you on the other side of the ship, still staring at you through the hole. 
`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "8.0.3",
        text: `Through the port hole, you can just glimpse the wretched monster behind the cannon. The shot is perfectly aligned. While the fuse is nearing the ignition point, a terrible thought strikes you like lightening: Did you load up the cannon in the correct order?!

BANG!!!

The cannon explodes, hurling fire and giant splinters of iron in all directions. The blast instantly kills you and the captain is eventually eaten by the sea monster. 
`,
        initShowState: false,
        show: false,
        seenByPLayer: false,
      },
      {
        id: "8.0.4",
        text: `While the fuse is nearing the ignition point you realize that the monster is on the other side of the ship, and you are about to shoot straight into the sea, but then a more terrible thought strikes you like lightening: Did you load up the cannon in the correct order?!

BANG!!!

The cannon explodes, hurling fire and giant splinters of iron in all directions. The blast instantly kills you and the captain is eventually eaten by the sea monster. 
`,
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
          clearInventory();
          console.log("game initialized");
        },
        seenByPLayer: false,
      },
      {
        id: "MainDeck",
        text: "Go to main deck",
        initShowState: false,
        show: false,
        destination: 2,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CargoDeck",
        text: "Go to cargo deck ",
        initShowState: false,
        show: false,
        destination: 3,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "GunDeck",
        text: "Go to gun deck",
        initShowState: false,
        show: false,
        destination: 4,
        effectsOfChoice: undefined,
        seenByPLayer: false,
      },
      {
        id: "CaptCab",
        text: "Go to captain's cabin",
        initShowState: false,
        show: false,
        destination: 5,
        effectsOfChoice: undefined,
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
        text: `You pick up the big, dusty logbook and begin reading the captains ink-blotted letters from the page that was open.

“Dear logbook. Lately, I been havin’ an itchy feelin’ that somethin’ from beneath the waves be huntin’ me. The sea be lookin’ mightily hungry, like it’s ready to swallow me whole. It’s gotta be the curse that scallywag shaman put on me, after I ghosted em’ last summer. Luckily, I’ve got meself a trusty crew o' expendable pirates to serve as me human shield when the curse comes callin’. Tis’ be the end of entry.”
`,
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
        text: `You start feeling very dizzy from all the rum, and collapse onto the barrels in the cargo deck. 
The captain keeps yelling out orders in vain, until eventually the sea monster destroys the ship, killing both you and the captain. At least that rum didn’t go to waste. 
`,
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
          clearInventory();
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
        text: `You grasp the cutlass tightly, as run towards the hole in the wall of the cannon deck.
In the air, above the roaring waves, you yell out 

“For the captaaain!!!” 

as you lunge forward with the cutlass into the eye of your gigantic opponent. You cut into the eyeball like a knife through pudding and slash your way into the creature’s central nervous system. The beast perishes, and sinks into the depths, dragging you down with it. 

You drown while lodged inside the brain of a hideous monster, having sacrificed yourself for the captain. 
`,
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
          clearInventory();
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
        text: `The ship sails directly into the cavernous mouth of the wretched seamonster. You spend the next following weeks being slowly digested together with the captain, who foul-mouthetly schools you in how the ill fate that you share could have been avoided by changing the ship's course, right until his mouth and vocalcoords have been etched away by stomach acid.`,
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
          clearInventory();

          console.log("game initialized");
        },
        seenByPLayer: false,
      },
    ],
  ],
];

//Starter spillet
startGame();

//Denne funktion tjekker hvilke tekster der skal hives ud af allText arrayet og ind i textToShow arrayet.
//Ud fra
function compileTextToShow(chapterNr) {
  let chapterToCompile = chapterNr;

  //tjekker om spilleren har ændret skibets kurs inden for 4 actions. Hvis ikke, sendes spilleren til slutningen på kapitel 12.
  if (
    choicesLog.length > 4 &&
    choicesLog.includes("6.1.0") === false &&
    choicesLog.includes("6.1.1") === false
  ) {
    playerPosition = 12;
    chapterToCompile = 12;
  }

  // rydder begge arrays inde i textToShow-arrayet.
  for (let i = 0; i < textToShow.length; i++) {
    let lengthBeforePopping = textToShow[i].length;
    for (let j = 0; j < lengthBeforePopping; j++) {
      textToShow[i].pop();
      //console.log("popped 1 element");
    }
  }

  // Evaluerer 'show' for alle kapitlets mulige descriptions.
  // Hvis 'show' er true for den pågældende description, føjes dens tekst til første del af textToShow arrayet.

  for (let i = 0; i < allText[chapterToCompile][0].length; i++) {
    if (allText[chapterToCompile][0][i].show === true) {
      textToShow[0].push(allText[chapterToCompile][0][i]);
    }
  }

  // Evaluerer 'show' for alle kapitlets mulige valgmuligheder.
  // Hvis 'show' er true for den pågældende valgmulighed, føjes dens tekst til første del af textToShow arrayet.
  for (let i = 0; i < allText[chapterToCompile][1].length; i++) {
    if (allText[chapterToCompile][1][i].show === true) {
      textToShow[1].push(allText[chapterToCompile][1][i]);
    }
  }
}

// ændrer alle beskrivelser og svarmuligheders show-værdi til dens initial value.
function initializeShowStates() {
  for (let i = 0; i < allText.length; i++) {
    for (let j = 0; j < allText[i].length; j++) {
      for (let k = 0; k < allText[i][j].length; k++) {
        allText[i][j][k].show = allText[i][j][k].initShowState;
      }
    }
  }
}

// ryddet arrayet som holder styr på spillerens truffede valg
function clearChoicesLog() {
  let lengthBeforePopping = choicesLog.length;
  for (let i = 0; i < lengthBeforePopping; i++) {
    choicesLog.pop();
  }
}

// Rydder arrayet som holder styr på hvilke tekster spilleren har set
function clearTextSeen() {
  let lengthBeforePopping = textSeenByPlayer.length;
  for (let i = 0; i < lengthBeforePopping; i++) {
    textSeenByPlayer.pop();
  }
}

function showDescriptions(chapterNr) {
  chapterTitleEl.innerText = chapterNames[playerPosition]; // sætter kapitlets overskrift

  // to linjer ekstrem morbid kode som basically siger "har du børn? hvis ja, så dræber jeg det første jeg møder." Dette rydder de forrige tekster så nye kan indsættes.
  while (descriptionsParentEl.firstChild) {
    descriptionsParentEl.firstChild.remove();
  }

  // laver paragraphs for hver description i textToShow. Afhængig af værdien af textSeenByPlayer classificeres objekterne forskelligt, så de kan farves forskelligt med css.
  textToShow[0].forEach((obj) => {
    const newParagraph = document.createElement("p");
    if (textSeenByPlayer.includes(obj.id) === false) {
      newParagraph.setAttribute("class", "description new");
    } else {
      newParagraph.setAttribute("class", "description seen");
    }
    newParagraph.innerText = obj.text;
    descriptionsParentEl.append(newParagraph);
    textSeenByPlayer.push(obj.id); // tilføjer tekstobjektets id-nummer til arrayet.
  });
}

function showChoices() {
  // to linjer ekstrem morbid kode som basically siger "har du børn? hvis ja, så dræber jeg det første jeg møder." Dette rydder de forrige tekster så nye kan indsættes.
  while (choicesParentEl.firstChild) {
    choicesParentEl.firstChild.remove();
  }

  textToShow[1].forEach((obj) => {
    //knapper oprettes
    const newButton = document.createElement("div");
    newButton.setAttribute("class", "box button");
    newButton.style.width = Math.floor(100 / textToShow[1].length) + "%";
    newButton.style.display = "flex";
    newButton.style.alignItems = "center";
    newButton.style.justifyContent = "center";

    //knapper får text
    const newButtonText = document.createElement("p");
    newButtonText.setAttribute("class", "buttonText");
    newButtonText.innerText = obj.text;

    //events
    newButton.addEventListener("mouseover", function (event) {
      newButton.style.backgroundColor = buttonOverColor;
      newButtonText.style.color = buttonTextOverColor;
    });

    newButton.addEventListener("mouseout", function (event) {
      newButton.style.backgroundColor = buttonOutColor;
      newButtonText.style.color = buttonTextOutColor;
    });

    newButton.addEventListener("click", function (event) {
      choiceMade(obj);
    });

    //append
    choicesParentEl.append(newButton);
    newButton.append(newButtonText);
  });
}

//køres når spilleren træffer et valg
function choiceMade(playerChoice) {
  choicesLog.push(playerChoice.id); //valget tilføjes til loggen
  console.log(playerChoice.id);
  console.log(choicesLog);
  if (playerChoice.effectsOfChoice !== undefined) {
    playerChoice.effectsOfChoice(); // hvis valg-objektet har en defineret funktion med navnet effectsOfChoice, køres den.
  }

  playerPosition = playerChoice.destination; // spillerens position opdateres på baggrund af valget.

  // spillet gøres klar til at vise næste kapitel.
  compileTextToShow(playerPosition);
  showDescriptions();
  showChoices();
  showChapterImage(playerPosition);
  viewInventory();
}

function showChapterImage(chapterNr) {
  const newChapterImage = document.createElement("img");
  newChapterImage.setAttribute("id", "currentChapterImage");
  newChapterImage.setAttribute("class", "chapterImage");

  // det her if-statement er lidt noget snørklet lort. Burde nok have lavet et ekstra kapitel, i stedet for at have et kapitel hvor der kan vises to forskellige billeder afhængigt af spilleren valg.
  if (chapterNr === 8) {
    switch (choicesLog.includes("badLoading")) {
      case false:
        newChapterImage.setAttribute("src", "images/chapter8-0.jpg");
        chapterImageParentEl.append(newChapterImage);
        break;
      case true:
        newChapterImage.setAttribute("src", "images/chapter8-1.jpg");
        chapterImageParentEl.append(newChapterImage);
        break;
      default:
        break;
    }
  } else {
    newChapterImage.setAttribute("src", chapterImagePaths[chapterNr]);
    chapterImageParentEl.append(newChapterImage);
  }
}

function startGame() {
  compileTextToShow(playerPosition);
  showChoices();
  showDescriptions(playerPosition);
  showChapterImage(playerPosition);
  viewInventory();
}

// Fjerner et objekt fra spillerens inventory med string-væriden "item"
function removeItemFromInventory(item) {
  for (let i = 0; i < playerInventory.length; i++) {
    if (playerInventory[i] === item) {
      playerInventory = playerInventory
        .slice(0, i)
        .concat(playerInventory.slice(i + 1, playerInventory.length)); // arrayet splittes op inden og efter værdien af i, og splejses sammen til et nyt array.
    }
  }
}

// viser sgu bare spillerens inventory
function viewInventory() {
  inventoryEl.innerText = playerInventory;
}

// rydder spillerens inventory
function clearInventory() {
  let lengthBeforePopping = playerInventory.length;
  for (let i = 1; i < lengthBeforePopping; i++) {
    playerInventory.pop();
  }
}
