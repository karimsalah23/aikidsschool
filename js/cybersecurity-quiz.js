document.addEventListener('DOMContentLoaded', function() {
    const cybersecurityQuestions = [
        {
            question: "ما هو الأمن السيبراني؟",
            answers: [
                "برنامج كمبيوتر يحاكي الأمن المعلوماتي",
                "حماية الأنظمة والشبكات من التهديدات الإلكترونية",
                "جهاز إلكتروني متقدم",
                "شبكة حاسوب معقدة"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أنواع الهجمات الإلكترونية؟",
            answers: [
                "الفيروسات والتصيد الاحتيالي",
                "المكالمات الهاتفية",
                "الرسائل العادية",
                "الرسائل البريدية"
            ],
            correctAnswer: 0
        },
        {
            question: "كيف يمكن حماية كلمة المرور؟",
            answers: [
                "استخدام كلمة مرور بسيطة",
                "مشاركتها مع الآخرين",
                "استخدام كلمات مرور معقدة وفريدة",
                "كتابتها على الورق"
            ],
            correctAnswer: 2
        },
        {
            question: "ما هو التشفير؟",
            answers: [
                "نوع من الفيروسات",
                "تحويل البيانات لشكل غير مقروء",
                "برنامج حماية",
                "نوع من الإعلانات"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي مخاطر وسائل التواصل الاجتماعي؟",
            answers: [
                "لا توجد مخاطر",
                "التصيد الاحتيالي وسرقة البيانات",
                "التواصل فقط",
                "مشاركة الصور"
            ],
            correctAnswer: 1
        },
        {
            question: "كيف تتعرف على البريد الإلكتروني الاحتيالي؟",
            answers: [
                "روابط مشبوهة وطلبات غير متوقعة",
                "الرسائل الجميلة",
                "الرسائل القصيرة",
                "الرسائل من أصدقاء"
            ],
            correctAnswer: 0
        },
        {
            question: "ما هو جدار الحماية؟",
            answers: [
                "سور حقيقي",
                "برنامج لحماية الشبكات",
                "نوع من الفيروسات",
                "برنامج للتسوق"
            ],
            correctAnswer: 1
        },
        {
            question: "لماذا يجب تحديث البرامج باستمرار؟",
            answers: [
                "لا يوجد سبب",
                "سد الثغرات الأمنية",
                "زيادة حجم البرنامج",
                "تغيير المظهر فقط"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أهمية النسخ الاحتياطي؟",
            answers: [
                "حماية البيانات من الفقدان",
                "إهدار مساحة التخزين",
                "إبطاء الجهاز",
                "لا فائدة منه"
            ],
            correctAnswer: 0
        },
        {
            question: "كيف تحمي نفسك على الإنترنت؟",
            answers: [
                "عدم استخدام الإنترنت",
                "الحذر وعدم مشاركة معلومات شخصية",
                "مشاركة كل شيء",
                "قبول كل الدعوات"
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
        const question = cybersecurityQuestions[questionIndex];
        quizContainer.innerHTML = `
            <div class="question-card new-question-style">
                <div class="question-header">
                    <span class="question-number">السؤال ${questionIndex + 1}</span>
                    <h3>${question.question}</h3>
                </div>
                <div class="answers single-column-answers new-answers-style">
                    ${question.answers.map((answer, index) => `
                        <button class="answer-btn new-answer-style" data-index="${index}">
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
                    if (currentQuestionIndex < cybersecurityQuestions.length) {
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

        const percentage = Math.round((score / cybersecurityQuestions.length) * 100);
        let recommendation = '';
        let certificateColor = '';
        let certificateIcon = '';

        if (percentage >= 90) {
            recommendation = "مسار الأمن السيبراني المتقدم";
            certificateColor = "gold";
            certificateIcon = "🚀";
        } else if (percentage >= 70) {
            recommendation = "مسار البرمجة والتطوير";
            certificateColor = "silver";
            certificateIcon = "💻";
        } else {
            recommendation = "مسار التعلم الأساسي";
            certificateColor = "bronze";
            certificateIcon = "🌱";
        }

        const certificateContainer = document.getElementById('certificate');
        certificateContainer.innerHTML = `
            <div class="certificate ${certificateColor}">
                <div class="certificate-header">
                    <h2>شهادة إتمام اختبار الأمن السيبراني</h2>
                </div>
                <div class="certificate-body">
                    <div class="certificate-icon">${certificateIcon}</div>
                    <p>النتيجة: ${percentage}%</p>
                    <p>التوصية: ${recommendation}</p>
                </div>
                <div class="certificate-footer">
                    <button onclick="restartQuiz()">إعادة الاختبار</button>
                    <button onclick="goToCareers()">استكشف المسارات</button>
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
