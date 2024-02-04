document.addEventListener('DOMContentLoaded', () => {
    // Game variables
    let score = 0;
    let timer = 30;
    let moleInterval;
    let gameRunning = false;

    // DOM elements
    const gameBoard = document.querySelector('#gameBoard');
    const scoreElement = document.querySelector('#score');
    const timerElement = document.querySelector('#timer');
    const startButton = document.querySelector('#startButton');
    const restartButton = document.querySelector('#restartButton');
    const resultDiv = document.querySelector('#result');
    const finalScoreElement = document.querySelector('#finalScore');

    // Generate holes on the board initially
    generateHoles();

    // Initialize the game
    function initializeGame() {
        score = 0;
        timer = 10;
        updateScore();
        hideResult();
        restartButton.style.display = 'none';
    }

    // Start the game
    function startGame() {
        if (!gameRunning) {
            gameRunning = true;
            startButton.style.display = 'none';
            restartButton.style.display = 'none';

            moleInterval = setInterval(popMole, 500);
            setInterval(updateTimer, 1000);
        }
    }

    // Pop up moles at random holes
    function popMole() {
        let holes = document.querySelectorAll('.hole');
        let randomIndex = Math.floor(Math.random() * holes.length);
        let randomHole = holes[randomIndex];

        if (!randomHole.classList.contains('mole')) {
            randomHole.classList.add('mole');
            setTimeout(() => {
                randomHole.classList.remove('mole');
            }, 800);
        }
    }

    // Whack functionality
    function hitMole(e) {
        if (gameRunning && e.target.classList.contains('mole')) {
            score++;
            updateScore();
            e.target.classList.remove('mole');
        }
    }

    // Update the score on the UI
    function updateScore() {
        scoreElement.innerText = score;
    }

    // Update the timer and end the game if time is up
    function updateTimer() {
        timer--;
        timerElement.innerText = timer;

        if (timer === 0) {
            clearInterval(moleInterval);
            showResult();
            timer = 0;
        }
    }

    // Show the result
    function showResult() {
        gameRunning = false;
        resultDiv.style.display = 'block';
        finalScoreElement.innerText = score;
        restartButton.style.display = 'inline';
    }

    // Hide the result
    function hideResult() {
        resultDiv.style.display = 'none';
    }

    // Restart the game
    function restartGame() {
        clearInterval(moleInterval);
        initializeGame();
        startGame();
    }

    // Generate holes on the board
    function generateHoles() {
        for (let i = 0; i < 9; i++) {
            let hole = document.createElement('div');
            hole.classList.add('hole');
            hole.addEventListener('click', hitMole);
            gameBoard.appendChild(hole);
        }
    }

    // Event listener for the start button
    startButton.addEventListener('click', () => {
        initializeGame();
        startGame();
    });

    // Initialize the game on page load
    initializeGame();
});


