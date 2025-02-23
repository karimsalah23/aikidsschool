document.addEventListener('DOMContentLoaded', function() {
    const entrepreneurshipQuestions = [
        {
            question: "ما هي ريادة الأعمال؟",
            answers: [
                "العمل في وظيفة حكومية",
                "إنشاء وإدارة مشروع خاص",
                "العمل كموظف في شركة كبيرة",
                "الدراسة فقط"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي صفات رائد الأعمال الناجح؟",
            answers: [
                "الخوف من المخاطرة",
                "الإبداع والمثابرة والتعلم المستمر",
                "العمل بدون تخطيط",
                "تجاهل آراء الآخرين"
            ],
            correctAnswer: 1
        },
        {
            question: "كيف يمكن للطفل البدء في ريادة الأعمال؟",
            answers: [
                "بيع الحلوى في المدرسة",
                "تعلم مهارات جديدة وإطلاق مشروع صغير",
                "طلب المال من الوالدين",
                "انتظار الكبر"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أهمية التخطيط في المشاريع؟",
            answers: [
                "لا أهمية للتخطيط",
                "وضع خطة واضحة للنجاح",
                "العمل بدون تفكير",
                "تجاهل التفاصيل"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي مصادر التمويل للمشاريع الصغيرة؟",
            answers: [
                "المال من الوالدين",
                "المنح والقروض والاستثمار",
                "سرقة المال",
                "الانتظار حتى الكبر"
            ],
            correctAnswer: 1
        },
        {
            question: "كيف يمكن للطفل اكتشاف موهبته؟",
            answers: [
                "التجربة والممارسة",
                "الانتظار فقط",
                "تجاهل الهوايات",
                "الاستماع للآخرين فقط"
            ],
            correctAnswer: 0
        },
        {
            question: "ما هي أهمية التعلم المستمر؟",
            answers: [
                "لا أهمية للتعلم",
                "تطوير المهارات والمعرفة باستمرار",
                "الاكتفاء بما نتعلمه",
                "التوقف عن التعلم"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي المهارات الأساسية لرائد الأعمال؟",
            answers: [
                "التسويق والتواصل وحل المشكلات",
                "معرفة لغة واحدة فقط",
                "العمل بدون تخطيط",
                "تجاهل آراء العملاء"
            ],
            correctAnswer: 0
        },
        {
            question: "كيف يمكن للطفل فهم احتياجات السوق؟",
            answers: [
                "الملاحظة والاستماع",
                "تجاهل الآخرين",
                "العمل بدون دراسة",
                "الاعتماد على التخمين"
            ],
            correctAnswer: 0
        },
        {
            question: "ما هي فوائد ريادة الأعمال للأطفال؟",
            answers: [
                "تنمية مهارات التفكير والإبداع",
                "لا فوائد",
                "إضاعة الوقت",
                "التركيز على الدراسة فقط"
            ],
            correctAnswer: 0
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
        const question = entrepreneurshipQuestions[questionIndex];
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
                    if (currentQuestionIndex < entrepreneurshipQuestions.length) {
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

        const percentage = Math.round((score / entrepreneurshipQuestions.length) * 100);
        let recommendation = '';
        let certificateColor = '';
        let certificateIcon = '';

        if (percentage >= 90) {
            recommendation = "مسار ريادة الأعمال المتقدم";
            certificateColor = "gold";
            certificateIcon = "🚀";
        } else if (percentage >= 70) {
            recommendation = "مسار التسويق والإدارة";
            certificateColor = "silver";
            certificateIcon = "💼";
        } else {
            recommendation = "مسار التعلم الأساسي";
            certificateColor = "bronze";
            certificateIcon = "🌱";
        }

        const certificateContainer = document.getElementById('certificate');
        certificateContainer.innerHTML = `
            <div class="certificate ${certificateColor}">
                <div class="certificate-header">
                    <h2>شهادة إتمام اختبار ريادة الأعمال</h2>
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
