document.addEventListener('DOMContentLoaded', function() {
    const gameDevelopmentQuestions = [
        {
            question: "ما هو تطوير الألعاب؟",
            answers: [
                "برنامج كمبيوتر يحاكي تجربة اللعب",
                "روبوت متطور للألعاب",
                "جهاز إلكتروني للترفيه",
                "شبكة حاسوب للألعاب"
            ],
            correctAnswer: 0
        },
        {
            question: "ما هي لغة البرمجة الأكثر شيوعًا في تطوير الألعاب؟",
            answers: [
                "Java",
                "C++",
                "Python",
                "JavaScript"
            ],
            correctAnswer: 1
        },
        {
            question: "ما معنى محرك الألعاب؟",
            answers: [
                "تعليم اللاعبين بشكل مباشر",
                "برنامج لإنشاء وتطوير الألعاب",
                "برمجة الروبوتات",
                "إنشاء رسومات معقدة"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو مثال على أداة تطوير الألعاب؟",
            answers: [
                "المكانس الكهربائية",
                "Unity",
                "الهاتف العادي",
                "الساعة الرقمية"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي وظيفة محرك الرسومات في الألعاب؟",
            answers: [
                "تصميم واجهات المستخدم",
                "معالجة حركة الشخصيات",
                "إنشاء مشاهد ثلاثية الأبعاد",
                "إدارة قواعد البيانات"
            ],
            correctAnswer: 2
        },
        {
            question: "ما هو الفرق الرئيسي بين الرسومات ثنائية وثلاثية الأبعاد؟",
            answers: [
                "عدد الألوان المستخدمة",
                "عمق وواقعية الصورة",
                "سرعة تحميل اللعبة",
                "حجم ملف اللعبة"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي مكونات القصة في تطوير الألعاب؟",
            answers: [
                "الخلفية التقنية للعبة",
                "الشخصيات والحبكة والتطور",
                "إعدادات الكمبيوتر",
                "قائمة المستخدمين"
            ],
            correctAnswer: 1
        },
        {
            question: "ما معنى التفاعلية في تطوير الألعاب؟",
            answers: [
                "عدد المستخدمين",
                "استجابة اللعبة لتحركات اللاعب",
                "سرعة الإنترنت",
                "عدد الأزرار في اللعبة"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أهمية اختبار الألعاب؟",
            answers: [
                "تزيين واجهة اللعبة",
                "اكتشاف وإصلاح الأخطاء",
                "زيادة سعر اللعبة",
                "تغيير لون الخلفية"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو دور المصمم في تطوير الألعاب؟",
            answers: [
                "كتابة التعليمات البرمجية فقط",
                "تصميم الواجهة والتجربة البصرية",
                "إدارة السيرفر",
                "تحديد أسعار اللعبة"
            ],
            correctAnswer: 1
        }
    ];

    const correctSounds = [
        new Audio('sounds/correct1.mp3'),
        new Audio('sounds/correct2.mp3'),
        new Audio('sounds/correct3.mp3')
    ];

    const incorrectSounds = [
        new Audio('sounds/incorrect1.mp3'),
        new Audio('sounds/incorrect2.mp3'),
        new Audio('sounds/incorrect3.mp3')
    ];

    function playRandomSound(soundsArray) {
        const randomIndex = Math.floor(Math.random() * soundsArray.length);
        soundsArray[randomIndex].play();
    }

    function shuffleQuestions(questions) {
        return questions.sort(() => Math.random() - 0.5);
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');

    let currentQuestionIndex = 0;
    let score = 0;

    function displayQuestion(questionIndex) {
        const question = gameDevelopmentQuestions[questionIndex];
        quizContainer.innerHTML = `
            <div class="question-card cybersecurity-question-card">
                <div class="question-header">
                    <span class="question-number">السؤال ${questionIndex + 1}</span>
                    <h3>${question.question}</h3>
                </div>
                <div class="answers cybersecurity-answers">
                    ${question.answers.map((answer, index) => `
                        <button class="answer-btn cybersecurity-answer-btn" data-index="${index}">
                            <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="answer-text">${answer}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        const answerButtons = document.querySelectorAll('.answer-btn');

        answerButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedIndex = parseInt(button.getAttribute('data-index'));
                
                answerButtons.forEach(btn => btn.classList.remove('selected', 'correct', 'incorrect'));
                
                button.classList.add('selected');
                if (selectedIndex === question.correctAnswer) {
                    button.classList.add('correct');
                    score++;
                    playRandomSound(correctSounds);
                } else {
                    button.classList.add('incorrect');
                    answerButtons[question.correctAnswer].classList.add('correct');
                    playRandomSound(incorrectSounds);
                }

                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < gameDevelopmentQuestions.length) {
                        displayQuestion(currentQuestionIndex);
                    } else {
                        showCertificate();
                    }
                }, 1000);
            });
        });
    }

    function showCertificate() {
        const quizContainer = document.getElementById('quiz');
        quizContainer.style.display = 'none';

        const percentage = Math.round((score / gameDevelopmentQuestions.length) * 100);
        let recommendation = '';
        let certificateColor = '';
        let certificateIcon = '';

        if (percentage >= 90) {
            recommendation = "مسار تطوير الألعاب المتقدم";
            certificateColor = "gold";
            certificateIcon = "🎮";
        } else if (percentage >= 70) {
            recommendation = "مسار البرمجة والتصميم";
            certificateColor = "silver";
            certificateIcon = "💻";
        } else {
            recommendation = "مسار التعلم الأساسي";
            certificateColor = "bronze";
            certificateIcon = "🌱";
        }

        const certificateContainer = document.getElementById('certificate');
        certificateContainer.innerHTML = `
            <div class="certificate cybersecurity-certificate ${certificateColor}">
                <div class="certificate-header">
                    <h2>شهادة إتمام اختبار تطوير الألعاب</h2>
                </div>
                <div class="certificate-body">
                    <div class="certificate-icon">${certificateIcon}</div>
                    <p>النتيجة: ${percentage}%</p>
                    <p>التوصية: ${recommendation}</p>
                </div>
                <div class="certificate-footer">
                    <button onclick="restartQuiz()" class="cybersecurity-btn">إعادة الاختبار</button>
                    <button onclick="goToCareers()" class="cybersecurity-btn">استكشف المسارات</button>
                </div>
            </div>
        `;

        playConfetti();
        playVictorySound();
    }

    function playConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        confettiContainer.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiContainer.appendChild(confetti);
        }
    }

    function playVictorySound() {
        const victorySound = new Audio('sounds/victory.mp3');
        victorySound.play();
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion(currentQuestionIndex);
        document.getElementById('certificate').innerHTML = '';
        quizContainer.style.display = 'block';
    }

    function goToCareers() {
        window.location.href = 'career-path.html';
    }

    displayQuestion(currentQuestionIndex);
});
