const buttonColors = ['red', 'blue', 'green', 'yellow']; // Default colors for buttons

let gamePattern = []; // Array containing the game pattern to follow
let userPattern = []; // Array containing the user pattern

let gameHasStarted = false; // Checks if the game has started or not

let gameLevel = 0; // Keeps track of the current game level

let headingText = $('h1').text; // The text content of the main heading

// Starting the game for the first time when a user press the key
$('h1').on('click', function() {
    if (!gameHasStarted) {
        $('.btn').addClass('cursor-pointer');

        nextSequence();
        gameHasStarted = true;

        // Adding Click EventListener on the buttons
        $('.btn').on('click', function() {
            let userChosenColor = $(this).attr('id'); // Getting the userChosenColor id name
            userPattern.push(userChosenColor); // Pushing the color id name in the userPattern array

            playSound(userChosenColor);
            buttonPress(userChosenColor);

            checkAnswer(userPattern.length - 1);
        });

    }
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {

        if (userPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } 
        
    } else {

        $('h1').text('Game Over!');
        playSound('wrong');

        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 100)

        gameHasStarted = false;
        gameLevel = 0;
        gamePattern = [];

        $('.btn').off('click');
        
        setTimeout(function() {
            $('h1').text('Try Again');
        }, 1000);
    }
}


// Function that triggers the next game sequence
function nextSequence() {
    userPattern = [];

    gameLevel++; // Increasing level by 1 each time nextSequence() gets called

    $('h1').text('Level ' + gameLevel); // Changing the heading into the current level number

    let randomNumber = Math.floor(Math.random() * 4); // Generating a random number to choose a random color
    let randomChosenColor = buttonColors[randomNumber]; // Choosing a random color from the buttonColors array using the index

    gamePattern.push(randomChosenColor); // Pushing the color into the gamePattern array

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


// Function that creates a new audio object and plays it
function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}


// Function to simulate the pressed button animation
function buttonPress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 100)
}