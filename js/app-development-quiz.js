document.addEventListener('DOMContentLoaded', function() {
    const appDevelopmentQuestions = [
        {
            question: "ما هو تطوير التطبيقات؟",
            answers: [
                "برنامج كمبيوتر يحاكي تطوير البرمجيات",
                "إنشاء برامج للهواتف والحواسيب",
                "جهاز إلكتروني متقدم",
                "شبكة حاسوب معقدة"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي لغة البرمجة الأكثر شيوعًا في تطوير التطبيقات؟",
            answers: [
                "Python",
                "Java",
                "C++",
                "JavaScript"
            ],
            correctAnswer: 1
        },
        {
            question: "ما معنى واجهة المستخدم في تطوير التطبيقات؟",
            answers: [
                "تعليم التطبيق بشكل مباشر",
                "قدرة التطبيق على التفاعل مع المستخدم",
                "برمجة الروبوتات",
                "إنشاء خوارزميات معقدة"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو مثال على تطبيق في الحياة اليومية؟",
            answers: [
                "المكانس الكهربائية",
                "تطبيقات التواصل الاجتماعي",
                "الهاتف العادي",
                "الساعة الرقمية"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي وظيفة متجر التطبيقات؟",
            answers: [
                "تصميم المواقع الإلكترونية",
                "توزيع وتحميل التطبيقات",
                "محاكاة عمل المطورين",
                "إدارة قواعد البيانات"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو الفرق بين التطبيقات الأصلية والهجينة؟",
            answers: [
                "لا يوجد فرق",
                "التطبيقات الأصلية مخصصة لنظام تشغيل معين",
                "التطبيقات الهجينة أكثر تعقيدًا",
                "الذكاء الاصطناعي أهم"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أهمية البرمجة في تطوير التطبيقات؟",
            answers: [
                "لا أهمية لها",
                "تطوير تطبيقات مبتكرة وفعالة",
                "كتابة ألعاب الفيديو فقط",
                "تصميم المواقع الإلكترونية"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو دور التصميم في تطوير التطبيقات؟",
            answers: [
                "لا دور له",
                "تحسين تجربة المستخدم وجذب المستخدمين",
                "تعطيل عمل التطبيق",
                "تقليل كفاءة التطبيق"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أحد تطبيقات تطوير التطبيقات في التعليم؟",
            answers: [
                "استبدال المعلمين",
                "منصات التعلم الذكية والتفاعلية",
                "إلغاء الامتحانات",
                "تقليل ساعات الدراسة"
            ],
            correctAnswer: 1
        },
        {
            question: "كيف يساهم تطوير التطبيقات في حل المشكلات المعقدة؟",
            answers: [
                "لا يساهم",
                "توفير حلول رقمية مبتكرة وسريعة",
                "تعقيد المشكلات",
                "زيادة التكلفة"
            ],
            correctAnswer: 1
        }
    ];

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    let currentQuestionIndex = 0;
    let score = 0;

    // إضافة ملفات الأصوات
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

    // دالة لتشغيل صوت عشوائي
    function playRandomSound(soundsArray) {
        const randomIndex = Math.floor(Math.random() * soundsArray.length);
        soundsArray[randomIndex].play();
    }

    function displayQuestion(questionIndex) {
        const question = appDevelopmentQuestions[questionIndex];
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
                    if (currentQuestionIndex < appDevelopmentQuestions.length) {
                        displayQuestion(currentQuestionIndex);
                    } else {
                        showCertificate();
                    }
                }, 1000);
            });
        });
    }

    function showCertificate() {
        // إخفاء عناصر الاختبار
        const quizContainer = document.getElementById('quiz');
        const submitButton = document.getElementById('submit');
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';

        const percentage = Math.round((score / appDevelopmentQuestions.length) * 100);
        let recommendation = '';
        let certificateColor = '';
        let certificateIcon = '';

        if (percentage >= 90) {
            recommendation = "مسار تطوير التطبيقات المتقدم";
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

        // إنشاء الشهادة
        const certificateContainer = document.getElementById('certificate');
        certificateContainer.innerHTML = `
            <div class="certificate ${certificateColor}">
                <div class="certificate-header">
                    <h2>شهادة إتمام اختبار تطوير التطبيقات</h2>
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

        // تشغيل المؤثرات الصوتية والبصرية
        playConfetti();
        playVictorySound();
    }

    function playConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        confettiContainer.innerHTML = ''; // مسح أي عناصر موجودة مسبقًا
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
        submitButton.style.display = 'block';
    }

    function goToCareers() {
        window.location.href = 'career-path.html';
    }

    // بدء الاختبار من السؤال الأول
    displayQuestion(currentQuestionIndex);
});
