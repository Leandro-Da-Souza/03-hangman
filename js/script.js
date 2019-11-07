// Globala variabler

const wordList = [
    'Daughters',
    'Neurosis',
    'Swans',
    'King Gizzard',
    'Sunn 0)))',
    'Tool',
    'Radiohead',
    'The Mars Volta',
    'Electric Wizard'
]; // Array: med spelets alla ord

let selectedWord = wordList[Math.floor(Math.random() * wordList.length)]; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
console.log(selectedWord);

let guesses = 0; // Number: håller antalet gissningar som gjorts
let hangmanImg = `../images/h${guesses}.png`; // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl = document.querySelector('#message'); // DOM-nod: Ger meddelande när spelet är över

let startGameBtnEl = document.querySelector('#startGameBtn'); // DOM-nod: knappen som du startar spelet med

let letterButtonEls = Array.from(
    document.querySelectorAll('#letterButtons > li')
); // Array av DOM-noder: Knapparna för bokstäverna

let letterBoxEls = document.querySelector('#letterBoxes > ul'); // Array av DOM-noder: Rutorna där bokstäverna ska stå
console.log(letterBoxEls);

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
startGameBtnEl.addEventListener('click', startGame);
function startGame() {}

// Funktion som slumpar fram ett ord
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
