const quizData = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "Which language is used for web development?", options: ["Python", "Java", "C++", "JavaScript"], answer: "JavaScript" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: "Einstein" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2O2"], answer: "H2O" }
];

const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function showStartScreen() {
    quizContainer.innerHTML = '<button class="start-btn">Start Quiz</button>';
    document.querySelector(".start-btn").addEventListener("click", startQuiz);
    nextButton.style.display = "none";
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
    nextButton.style.display = "block";
    nextButton.disabled = true;
}

function loadQuestion() {
    quizContainer.innerHTML = "";
    selectedAnswer = null;

    let questionData = quizData[currentQuestionIndex];
    let questionElement = document.createElement("h2");
    questionElement.textContent = questionData.question;
    quizContainer.appendChild(questionElement);

    questionData.options.forEach(option => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => selectAnswer(option, button);
        quizContainer.appendChild(button);
    });

    nextButton.disabled = true;
}

function selectAnswer(selected, button) {
    if (selectedAnswer) return;
    
    selectedAnswer = selected;
    nextButton.disabled = false;
    
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === quizData[currentQuestionIndex].answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selected) {
            btn.classList.add("wrong");
        }
    });
}

nextButton.addEventListener("click", () => {
    if (selectedAnswer === quizData[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score} / ${quizData.length}</p><button class="restart-btn">Restart Quiz</button>`;
    document.querySelector(".restart-btn").addEventListener("click", showStartScreen);
    nextButton.style.display = "none";
}

showStartScreen();
