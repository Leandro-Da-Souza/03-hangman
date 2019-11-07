// Globala variabler
let gameIsOn = false;

const wordList = [
    'Daughters',
    'Neurosis',
    'Swans',
    'King Gizzard',
    'Boris',
    'Tool',
    'Radiohead',
    'The Mars Volta',
    'Electric Wizard'
]; // Array: med spelets alla ord

let selectedWord = wordList[Math.floor(Math.random() * wordList.length)]; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0; // Number: håller antalet gissningar som gjorts

let hangmanImg = document.querySelector('#hangman'); // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl = document.querySelector('#message'); // DOM-nod: Ger meddelande när spelet är över

let startGameBtnEl = document.querySelector('#startGameBtn'); // DOM-nod: knappen som du startar spelet med

let letterButtonEls = Array.from(
    document.querySelectorAll('#letterButtons > li > button')
); // Array av DOM-noder: Knapparna för bokstäverna

let letterBoxEls = document.querySelector('#letterBoxes > ul'); // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
startGameBtnEl.addEventListener('click', startGame);
function startGame() {
    gameIsOn = true;

    if (gameIsOn) {
        startGameBtnEl.removeEventListener('click', startGame);
    }

    let randomWord = randomWordGen();
    createLetterBoxEls(randomWord);

    guessLetters(randomWord);
}

// Funktion som slumpar fram ett ord
function randomWordGen() {
    let randomWord = Array.from(selectedWord);
    return randomWord;
}
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createLetterBoxEls(letters) {
    letterBoxEls.innerHTML = '';
    letters.forEach(letter => {
        let output = document.createElement('li');
        if (letter !== ' ') {
            output.innerHTML += `
            <input type="text" disabled value="${letter}" />
        `;
        } else {
            output.innerHTML += `&nbsp&nbsp&nbsp&nbsp`;
        }
        letterBoxEls.appendChild(output);
    });
    let inputs = document.querySelectorAll('#letterBoxes > ul > li > input ');

    Array.from(inputs).forEach(input => {
        input.style.backgroundColor = '#666';
        input.style.border = '1px solid #fff';
    });
}
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guessLetters(word) {
    letterButtonEls.forEach(letterBtn => {
        if (letterBtn.hasAttribute('disabled')) {
            letterBtn.removeAttribute('disabled');
        }

        letterBtn.addEventListener('click', e => {
            let btnVal = e.path[0].value;
            let regex = new RegExp(word.join('|'), 'i');
            console.log(word);

            if (regex.test(btnVal)) {
                console.log('guess right');
                let inputs = Array.from(
                    document.querySelectorAll('#letterBoxes > ul > li > input ')
                );
            } else {
                console.log('guess wrong');
                guesses++;
                hangmanImg.src = `../images/h${guesses}.png`;
                if (guesses === 6) {
                    gameOver('lose');
                }
                console.log(guesses);
            }
        });
    });
}
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
function gameOver(state) {
    if (state === 'lose') {
        console.log('YOU LOSE');
        letterButtonEls.forEach(letterBtn => {
            letterBtn.setAttribute('disabled', true);
        });
        gameIsOn = false;
        startGameBtnEl.addEventListener('click', startGame);
    }
}
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
