document.addEventListener('DOMContentLoaded', function() {
    const programmingAIQuestions = [
        {
            question: "ما هو الذكاء الاصطناعي؟",
            answers: [
                "برنامج كمبيوتر يحاكي الذكاء البشري",
                "روبوت متطور",
                "جهاز إلكتروني متقدم",
                "شبكة حاسوب معقدة"
            ],
            correctAnswer: 0
        },
        {
            question: "ما هي لغة البرمجة الأكثر شيوعًا في مجال الذكاء الاصطناعي؟",
            answers: [
                "Java",
                "Python",
                "C++",
                "JavaScript"
            ],
            correctAnswer: 1
        },
        {
            question: "ما معنى التعلم الآلي؟",
            answers: [
                "تعليم الحاسوب بشكل مباشر",
                "قدرة الحاسوب على التعلم من البيانات",
                "برمجة الروبوتات",
                "إنشاء خوارزميات معقدة"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو مثال على تطبيق الذكاء الاصطناعي في الحياة اليومية؟",
            answers: [
                "المكانس الكهربائية",
                "أنظمة التوصية في التطبيقات",
                "الهاتف العادي",
                "الساعة الرقمية"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي وظيفة الشبكات العصبية؟",
            answers: [
                "تصميم المواقع الإلكترونية",
                "معالجة اللغات الطبيعية",
                "محاكاة عمل الدماغ البشري",
                "إدارة قواعد البيانات"
            ],
            correctAnswer: 2
        },
        {
            question: "ما هو الفرق بين الذكاء الاصطناعي والبرمجة التقليدية؟",
            answers: [
                "لا يوجد فرق",
                "الذكاء الاصطناعي يتعلم ويتكيف",
                "البرمجة التقليدية أكثر تعقيدًا",
                "الذكاء الاصطناعي يعتمد على الصدفة"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أهمية البرمجة في عصر الذكاء الاصطناعي؟",
            answers: [
                "لا أهمية لها",
                "تطوير تطبيقات مبتكرة",
                "كتابة ألعاب الفيديو فقط",
                "تصميم المواقع الإلكترونية"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو دور البيانات في الذكاء الاصطناعي؟",
            answers: [
                "لا دور لها",
                "مصدر رئيسي للتعلم والتدريب",
                "تعطيل عمل الذكاء الاصطناعي",
                "تقليل كفاءة الخوارزميات"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أحد تطبيقات الذكاء الاصطناعي في التعليم؟",
            answers: [
                "استبدال المعلمين",
                "أنظمة التعلم الذكية والتكيفية",
                "إلغاء الامتحانات",
                "تقليل ساعات الدراسة"
            ],
            correctAnswer: 1
        },
        {
            question: "كيف يساهم الذكاء الاصطناعي في حل المشكلات المعقدة؟",
            answers: [
                "لا يساهم",
                "تحليل كميات هائلة من البيانات بسرعة",
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
        const question = programmingAIQuestions[questionIndex];
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
                    if (currentQuestionIndex < programmingAIQuestions.length) {
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

        const percentage = Math.round((score / programmingAIQuestions.length) * 100);
        let recommendation = '';
        let certificateColor = '';
        let certificateIcon = '';

        if (percentage >= 90) {
            recommendation = "مسار الذكاء الاصطناعي المتقدم";
            certificateColor = "gold";
            certificateIcon = "🚀";
        } else if (percentage >= 70) {
            recommendation = "مسار البرمجة والتطوير";
            certificateColor = "silver";
            certificateIcon = "💻";
        } else {
            recommendation = "مسار التعلم الأساسي";
            certificateColor = "bronze";
            certificateIcon = "📚";
        }

        // إضافة مؤثرات احتفالية
        const confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti-container');
        document.body.appendChild(confettiContainer);

        // إنشاء أشكال الكونفيتي
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiContainer.appendChild(confetti);
        }

        // تشغيل صوت احتفالي
        const celebrationSound = new Audio('sounds/celebration.mp3');
        celebrationSound.play();

        resultsContainer.innerHTML = `
            <div class="certificate-container">
                <div class="certificate ${certificateColor}">
                    <div class="certificate-header">
                        <img src="https://i.ibb.co/hLDFpQN/DALL-E-2025-01-12-04-45-22-A-friendly-and-playful-logo-for-a-kids-school-named-Ai-Ki-DS-SCHOOL-featu.png" alt="AI Kids School Logo" class="certificate-logo">
                        <h1>شهادة إتمام</h1>
                        <h2>اختبار البرمجة والذكاء الاصطناعي</h2>
                    </div>
                    <div class="certificate-body">
                        <div class="certificate-icon">${certificateIcon}</div>
                        <p>النتيجة: ${score} / ${programmingAIQuestions.length}</p>
                        <p>النسبة المئوية: ${percentage}%</p>
                        <h3>التوصية: ${recommendation}</h3>
                    </div>
                    <div class="certificate-footer">
                        <p>تهانينا على إكمال الاختبار!</p>
                        <div class="certificate-seal">معتمد</div>
                    </div>
                </div>
                <div class="next-steps">
                    <h3>الخطوات التالية</h3>
                    <ul>
                        <li>استكشف دورات البرمجة المتاحة</li>
                        <li>تابع التعلم في مسار ${recommendation}</li>
                        <li>شارك في ورش عمل تفاعلية</li>
                    </ul>
                    <a href="#" class="btn btn-primary">استكشف المسارات</a>
                </div>
            </div>
        `;

        // إضافة CSS للتأثيرات
        const style = document.createElement('style');
        style.textContent = `
            .confetti-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 10000;
            }
            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                opacity: 0.7;
                transform: rotate(0deg);
                animation: fall 3s linear infinite;
            }
            @keyframes fall {
                0% {
                    top: -10px;
                    transform: rotate(0deg);
                }
                100% {
                    top: 100%;
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);

        // إزالة الكونفيتي بعد 5 ثواني
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    };

    // بدء الاختبار من السؤال الأول
    displayQuestion(currentQuestionIndex);
});
