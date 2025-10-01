// DOM Elements
const startButton = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const introScreen = document.getElementById('intro-screen');
const closingScreen = document.getElementById('closing-screen');
const restartButton = document.getElementById('restart-quiz');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const finalScore = document.getElementById('final-score');

// Questions Array
const questions = [
    {
        question: "What is an earthquake?",
        options: [
            "A. The movement of clouds causing rain.",
            "B. A shaking of the Earth's surface due to energy release in the lithosphere.",
            "C. The melting of glaciers causing ground collapse.",
            "D. A man-made event caused by mining activities."
        ],
        answer: "B"
    },
    {
        question: "What causes a tsunami?",
        options: [
            "A. Hurricanes and strong winds over the ocean.",
            "B. A large displacement of water due to earthquakes, volcanic eruptions, or landslides.",
            "C. Excessive rainfall causing flooding.",
            "D. The Earth's magnetic field changing suddenly."
        ],
        answer: "B"
    },
    {
        question: "What scale is commonly used to measure the magnitude of earthquakes?",
        options: [
            "A. Celsius Scale",
            "B. Richter Scale",
            "C. Beaufort Scale",
            "D. Decibel Scale"
        ],
        answer: "B"
    },
    {
        question: "What is the 'Ring of Fire'?",
        options: [
            "A. A region in Africa known for high temperatures.",
            "B. A tectonically active area in the Pacific Ocean known for earthquakes and volcanoes.",
            "C. A famous volcanic mountain range in Europe.",
            "D. A nickname for lava flows near tectonic plates."
        ],
        answer: "B"
    },
    {
        question: "Which of the following are primary safety steps during an earthquake?",
        options: [
            "A. Run to the nearest exit immediately.",
            "B. Take cover under sturdy furniture and hold on.",
            "C. Stand in a doorway for safety.",
            "D. Avoid going outside until shaking stops."
        ],
        answer: "B"
    },
    {
        question: "What are warning signs of a tsunami?",
        options: [
            "A. Unusually high tide and sudden heatwaves.",
            "B. A strong earthquake, receding shoreline, or loud ocean noises.",
            "C. A rise in air pressure and thunderstorm-like conditions.",
            "D. Frequent lightning strikes over the ocean."
        ],
        answer: "B"
    },
    {
        question: "What is the difference between the epicenter and the hypocenter of an earthquake?",
        options: [
            "A. Epicenter is the focus within the Earth, and hypocenter is on the surface.",
            "B. Epicenter is on the surface above where the earthquake starts, and hypocenter is the actual origin within the Earth.",
            "C. Epicenter causes damage, while hypocenter does not.",
            "D. Epicenter is smaller than the hypocenter."
        ],
        answer: "B"
    },
    {
        question: "Why are aftershocks considered dangerous?",
        options: [
            "A. They often cause tsunamis.",
            "B. They are always more powerful than the main earthquake.",
            "C. They can damage already weakened structures and cause additional hazards.",
            "D. They usually occur underwater, causing flooding."
        ],
        answer: "C"
    },
    {
        question: "What is a seismograph used for?",
        options: [
            "A. To detect changes in weather patterns.",
            "B. To measure ocean depth.",
            "C. To detect and record earthquake vibrations.",
            "D. To analyze volcanic eruptions."
        ],
        answer: "C"
    },
    {
        question: "What are the three main types of plate boundaries?",
        options: [
            "A. Divergent, Convergent, and Transform.",
            "B. Tectonic, Volcanic, and Magnetic.",
            "C. Oceanic, Continental, and Subduction.",
            "D. Magnetic, Fracture, and Stress."
        ],
        answer: "A"
    }

];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;

// Event Listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

// Functions
function startQuiz() {
    introScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = ''; // Clear previous answers

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(button, option, currentQuestion.answer));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
    const feedback = document.createElement('div'); // Feedback popup
    feedback.classList.add('feedback');

    if (selectedAnswer.charAt(0) === correctAnswer.charAt(0)) {
        score++;
        feedback.textContent = "+1 ✔";
        feedback.classList.add('correct');
    } else {
        feedback.textContent = "✖";
        feedback.classList.add('incorrect');
    }

    button.appendChild(feedback);
    button.disabled = true;

    Array.from(answersContainer.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.charAt(0) === correctAnswer.charAt(0)) {
            btn.classList.add('correct-answer');
        }
    });

    setTimeout(() => {
        feedback.remove();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.add('hidden');
    closingScreen.classList.remove('hidden');
    finalScore.textContent = score;
}

function restartQuiz() {
    closingScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
    score = 0;
    currentQuestionIndex = 0;
}

// CSS to add in your styles
/*
.feedback {
    position: absolute;
    top: -10px;
    right: 10px;
    font-size: 16px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.correct {
    color: green;
    transform: translateY(-20px);
}

.incorrect {
    color: red;
    transform: translateY(-20px);
}

.correct-answer {
    background-color: #d4edda;
    color: #155724;
}
*/
