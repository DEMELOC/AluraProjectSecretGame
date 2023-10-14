let numberAlreadyGuessedList = [];
let limitNumber = 50;
let secretNumber = generateRandomNumber();
let tentatives = 1;

showInitialMessage();

function showTextOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female', {rate:1.2});
}

function showInitialMessage(){
    showTextOnScreen('h1', 'Game of the Secret Number');
    showTextOnScreen('p', 'Choose one number between 1 and 100');
}


function checkGuess(){
    let guess = document.querySelector('input').value;
    
    if (guess == secretNumber) {
        showTextOnScreen('h1', 'Correct!');
        let wordTentative = tentatives > 1 ? 'tentatives' : 'tentative';
        let countTentatives = `You discovered the secret number with ${tentatives} ${wordTentative}!`;
        showTextOnScreen('p', countTentatives);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber){
            showTextOnScreen('p','The secret number is lower');
        } else {
            showTextOnScreen('p','The secret number is higher');
        }
        tentatives++;
        clearField();

    }
}

function generateRandomNumber() {
    let guessedNumber = parseInt(Math.random() * 10 + 1);
    let quantityOfNumberInTheList = numberAlreadyGuessedList.length;

    if(quantityOfNumberInTheList == limitNumber){
        numberAlreadyGuessedList = [];
    }

    if (numberAlreadyGuessedList.includes(guessedNumber)){
        return generateRandomNumber();
    } else {
        numberAlreadyGuessedList.push(guessedNumber)
        console.log(numberAlreadyGuessedList);
        return guessedNumber;
    }
    
}

function clearField(){
    guess = document.querySelector('input');
    guess.value = "";
}

function gameRestart(){
    secretNumber = generateRandomNumber();
    clearField();
    tentatives = 1;
    showInitialMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}