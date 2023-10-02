const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris",
        attempted: false, // Added property to track if the question has been attempted
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars",
        attempted: false,
    },
    {
        question: "What is the largest mammal?",
        options: ["Giraffe", "Elephant", "Whale", "Kangaroo"],
        answer: "Whale",
        attempted: false,
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Hg"],
        answer: "Au",
        attempted: false,
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide",
        attempted: false,
    },
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");
const resultText = document.getElementById("result");

function displayQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;

    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });

    submitButton.style.display = "block";
    nextButton.style.display = "none";
    resultText.textContent = "";
    updateProgressBar();
    startTimer();
}

function selectOption(selectedIndex) {
    if (questions[currentQuestion].attempted) {
        return; // If the question has already been attempted, do nothing
    }
    
    questions[currentQuestion].attempted = true; // Mark the question as attempted

    const question = questions[currentQuestion];
    const selectedOption = question.options[selectedIndex];

    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach((optionElement, index) => {
        optionElement.style.pointerEvents = 'none'; // Disable all options
        if (index === selectedIndex) {
            optionElement.classList.add('selected-option'); // Apply style to the selected option
        }
        if (question.options[index] === question.answer) {
            optionElement.classList.add('correct-option'); // Apply style to the correct option
        }
    });

    if (selectedOption === question.answer) {
        score++;
        resultText.textContent = "Correct!";
    } else {
        resultText.textContent = "Incorrect. The correct answer is: " + question.answer;
    }

    submitButton.style.display = "none";
    nextButton.style.display = "block";
}

function nextQuestion() {
    stopTimer(); // Stop the timer when moving to the next question
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    questionText.textContent = "Quiz Completed";
    optionsContainer.innerHTML = "";
    resultText.textContent = "Your Score: " + score + " out of " + questions.length;
    submitButton.style.display = "none";
    nextButton.style.display = "none";
    restartButton.style.display = "block"; // Display the restart button
}

submitButton.addEventListener("click", () => selectOption());
nextButton.addEventListener("click", nextQuestion);


const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.getElementById("progress-bar-container");

function updateProgressBar() {
    const progress = (currentQuestion + 1) / questions.length * 100;
    progressBar.style.width = `${progress}%`;
}

const timerElement = document.getElementById("timer");

let timer;
const timerDuration = 20; // 20 seconds for each question

function startTimer() {
    let timeRemaining = timerDuration;
    timerElement.textContent = `Time Left: ${timeRemaining} seconds`;

    timer = setInterval(() => {
        timeRemaining--;

        if (timeRemaining >= 0) {
            timerElement.textContent = `Time Left: ${timeRemaining} seconds`;
        } else {
            clearInterval(timer);
            timerElement.textContent = "Time's up!";
            nextQuestion();
        }
    }, 1000); // Update every second (1000 milliseconds)
}

function stopTimer() {
    clearInterval(timer);
    timerElement.textContent = "";
}

const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    restartQuiz();
});

function restartQuiz() {
    for (const question of questions) {
        question.attempted = false;
    }
    displayQuestion();
    resultText.textContent = "";
    progressBar.style.width = "0%";
    restartButton.style.display = "none";
}



// Initial display
displayQuestion();