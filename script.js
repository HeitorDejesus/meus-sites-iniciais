const questions = [
    {
        question: "Em qual época o Partenon foi construído?",
        options: ["550a.C", "740a.C", "450a.C", "460a.C"],
        answer: "460a.C"
    },
    {
        question: "O Partenon foi construído em homenagem a qual Deus grego?",
        options: ["Zeus", "Atena", "Afrodite", "Poseidon"],
        answer: "Atena"
    },
    {
        question: "Onde se localiza o Partenon?",
        options: ["Atenas", "Santorini", "Creta", "Esparta"],
        answer: "Atenas"
    },
    {
        question: "Qual era a capital da Grécia Antiga?",
        options: ["Creta", "Roma", "Atenas", "Santorini"],
        answer: "Atenas"
    },
    {
        question: "Quais eram as principais cores das casas gregas?",
        options: ["Verde e Azul", "Amarelo e Branco", "Azul e Cinza", "Azul e Branco"],
        answer: "Azul e Branco"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('start-btn');
const introScreen = document.getElementById('intro-screen');

startButton.addEventListener('click', startQuiz);

// Nova função para embaralhar o array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    introScreen.classList.add('hidden');
    quizContainer.innerHTML = '';
    currentQuestionIndex = 0;
    score = 0;
    shuffleArray(questions);
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const qData = questions[currentQuestionIndex];
        const questionHtml = `
            <div id="question-screen">
                <p class="question-text">${qData.question}</p>
                <div class="options-container">
                    ${qData.options.map(option => `
                        <div class="option" onclick="checkAnswer(this, '${option}')">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        quizContainer.innerHTML = questionHtml;
    } else {
        showResult();
    }
}

function checkAnswer(selectedOption, selectedAnswer) {
    const qData = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === qData.answer;
    
    if (isCorrect) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        const allOptions = document.querySelectorAll('.option');
        allOptions.forEach(option => {
            if (option.textContent === qData.answer) {
                option.classList.add('correct');
            }
        });
    }

    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.onclick = null;
    });

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1500);
}

function showResult() {
    const resultHtml = `
        <div id="result-screen">
            <h3>Quiz Concluído!</h3>
            <p>Você acertou ${score} de ${questions.length} perguntas.</p>
            <p>Sua porcentagem de acertos: ${Math.round((score / questions.length) * 100)}%</p>
            <button onclick="startQuiz()">Tentar Novamente</button>
        </div>
    `;
    quizContainer.innerHTML = resultHtml;
}

