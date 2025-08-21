const easyQuestions = [
    {
        question: "Qual é o resultado de 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "A soma dos ângulos internos de um triângulo é?",
        options: ["90°", "180°", "270°", "360°"],
        answer: "180°"
    },
    {
        question: "Qual é o nome da transformação geométrica que 'espelha' uma figura?",
        options: ["Translação", "Rotação", "Reflexão", "Dilatação"],
        answer: "Reflexão"
    },
    {
        question: "Qual o maior país em extensão territorial?",
        options: ["Canadá", "China", "Rússia", "EUA"],
        answer: "Rússia"
    }
];

const hardQuestions = [
    {
        question: "Considerando a equação $3x^2 - 10x + 3 = 0$, qual é o valor de uma das raízes?",
        options: ["x = 1/3", "x = 1", "x = 2", "x = 3"],
        answer: "x = 3"
    },
    {
        question: "Em um triângulo retângulo, a hipotenusa mede 13cm e um dos catetos mede 5cm. Qual a medida do outro cateto?",
        options: ["8cm", "10cm", "12cm", "15cm"],
        answer: "12cm"
    },
    {
        question: "Qual o nome do fenômeno geológico que causa a separação dos continentes?",
        options: ["Vulcanismo", "Tectonismo", "Deriva Continental", "Erosão"],
        answer: "Deriva Continental"
    },
    {
        question: "Qual filósofo grego foi discípulo de Platão e tutor de Alexandre, o Grande?",
        options: ["Sócrates", "Aristóteles", "Pitágoras", "Heráclito"],
        answer: "Aristóteles"
    }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let isHardMode = false; // Variável para controlar a dificuldade

const quizContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('start-btn');
const introScreen = document.getElementById('intro-screen');

startButton.addEventListener('click', startQuiz);

// Função para embaralhar o array
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

    if (isHardMode) {
        currentQuestions = [...hardQuestions]; // Usa perguntas difíceis
    } else {
        currentQuestions = [...easyQuestions]; // Usa perguntas fáceis
    }

    shuffleArray(currentQuestions);
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < currentQuestions.length) {
        const qData = currentQuestions[currentQuestionIndex];
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
    const qData = currentQuestions[currentQuestionIndex];
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
    isHardMode = true; // <--- Aqui o modo difícil é ativado para a próxima rodada

    const resultHtml = `
        <div id="result-screen">
            <h3>Quiz Concluído!</h3>
            <p>Você acertou ${score} de ${currentQuestions.length} perguntas.</p>
            <p>Sua porcentagem de acertos: ${Math.round((score / currentQuestions.length) * 100)}%</p>
            <button onclick="startQuiz()">Tentar Novamente</button>
        </div>
    `;
    quizContainer.innerHTML = resultHtml;
}http://127.0.0.1:5500/treino.html
