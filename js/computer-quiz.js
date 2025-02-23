document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('computer-quiz');
    const resultContainer = document.getElementById('computer-quiz-results');
    const certificateContainer = document.getElementById('computer-quiz-certificate');
    const submitButton = document.getElementById('submit-computer-quiz');
    const computerQuestions = [
        {
            question: "ما هو الحاسوب؟",
            answers: [
                "جهاز إلكتروني لمعالجة البيانات",
                "آلة تصوير",
                "هاتف ذكي",
                "جهاز استقبال تلفزيوني"
            ],
            correctAnswer: 0
        },
        {
            question: "ما هي وحدة المعالجة المركزية (CPU)؟",
            answers: [
                "جهاز تخزين",
                "عقل الحاسوب الرئيسي",
                "شاشة العرض",
                "لوحة المفاتيح"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أنواع الذاكرة في الحاسوب؟",
            answers: [
                "RAM و ROM",
                "كاميرا وميكروفون",
                "سماعات وماوس",
                "شاشة وطابعة"
            ],
            correctAnswer: 0
        },
        {
            question: "ما هي أهمية نظام التشغيل؟",
            answers: [
                "لا أهمية له",
                "إدارة موارد الحاسوب وتشغيل البرامج",
                "زيادة تكلفة الحاسوب",
                "تعطيل عمل الحاسوب"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو الفرق بين البرامج والأجهزة؟",
            answers: [
                "لا يوجد فرق",
                "البرامج هي التعليمات والأجهزة المكونات المادية",
                "البرامج أهم من الأجهزة",
                "الأجهزة أهم من البرامج"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي شبكات الحاسوب؟",
            answers: [
                "لا دور لها",
                "اتصال الحواسيب لتبادل المعلومات",
                "جهاز واحد فقط",
                "برنامج واحد"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي أهمية الإنترنت؟",
            answers: [
                "لا أهمية له",
                "التواصل وتبادل المعلومات عالميًا",
                "زيادة تكلفة الاتصال",
                "إبطاء سرعة الحاسوب"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هي لغات البرمجة؟",
            answers: [
                "لغات التخاطب",
                "لغات للتواصل مع الحاسوب",
                "لغات جغرافية",
                "لغات الطبخ"
            ],
            correctAnswer: 1
        },
        {
            question: "ما هو دور قواعد البيانات؟",
            answers: [
                "لا دور لها",
                "تخزين وإدارة المعلومات بكفاءة",
                "زيادة حجم الملفات",
                "إبطاء عمل الحاسوب"
            ],
            correctAnswer: 1
        },
        {
            question: "كيف يساهم الحاسوب في حل المشكلات؟",
            answers: [
                "لا يساهم",
                "معالجة البيانات وتحليلها بسرعة",
                "زيادة التعقيد",
                "استهلاك الطاقة"
            ],
            correctAnswer: 1
        }
    ];

    function buildQuiz() {
        const output = [];

        computerQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (let i = 0; i < currentQuestion.answers.length; i++) {
                answers.push(
                    `<label class="quiz-option">
                        <input type="radio" name="question${questionNumber}" value="${i}">
                        ${currentQuestion.answers[i]}
                    </label>`
                );
            }

            output.push(
                `<div class="quiz-question">
                    <p>${currentQuestion.question}</p>
                    <div class="quiz-options">${answers.join('')}</div>
                </div>`
            );
        });

        quizContainer.innerHTML = output.join('');
    }

    // استماع للتغيرات في الرابط
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#computer-quiz') {
            // إظهار قسم الاختبار
            quizContainer.style.display = 'block';
            
            // إخفاء الأقسام الأخرى
            const otherSections = document.querySelectorAll('section');
            otherSections.forEach(section => {
                if (section.id !== 'computer-quiz') {
                    section.style.display = 'none';
                }
            });
        } else {
            // إخفاء قسم الاختبار
            quizContainer.style.display = 'none';
        }
    });

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.quiz-options');
        let numCorrect = 0;

        computerQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer == currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // Calculate percentage
        const percentage = Math.round((numCorrect / computerQuestions.length) * 100);
        const passed = percentage >= 60;

        // Store score in localStorage
        localStorage.setItem('computerQuizScore', percentage.toString());

        showCertificate(percentage);
    }

    function showCertificate(percentage) {
        // إخفاء عناصر الاختبار
        const quizContainer = document.getElementById('computer-quiz');
        const submitButton = document.getElementById('submit-computer-quiz');
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';

        let recommendation = '';
        let certificateColor = '';
        let certificateIcon = '';

        if (percentage >= 90) {
            recommendation = "مسار علوم الحاسوب المتقدم";
            certificateColor = "gold";
            certificateIcon = "💻";
        } else if (percentage >= 70) {
            recommendation = "مسار تقنية المعلومات";
            certificateColor = "silver";
            certificateIcon = "🖥️";
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

        certificateContainer.innerHTML = `
            <div class="certificate-container">
                <div class="certificate ${certificateColor}">
                    <div class="certificate-header">
                        <img src="https://i.ibb.co/hLDFpQN/DALL-E-2025-01-12-04-45-22-A-friendly-and-playful-logo-for-a-kids-school-named-Ai-Ki-DS-SCHOOL-featu.png" alt="AI Kids School Logo" class="certificate-logo">
                        <h1>شهادة إتمام</h1>
                        <h2>اختبار الحاسوب</h2>
                    </div>
                    <div class="certificate-body">
                        <div class="certificate-icon">${certificateIcon}</div>
                        <p>النتيجة: ${percentage}%</p>
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
                        <li>استكشف دورات علوم الحاسوب</li>
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

        // إظهار الشهادة
        certificateContainer.style.display = 'block';

        // إضافة زر للانتقال للمرحلة التالية
        if (percentage >= 60) {
            resultContainer.innerHTML += `
                <div class="next-step text-center mt-4">
                    <p>أحسنت! يمكنك الآن المتابعة إلى المسار التالي</p>
                    <a href="index.html#personalized-path" class="btn btn-primary">اختر مسارك المهني</a>
                </div>
            `;
        }

        // If passed, enable career path quiz
        if (percentage >= 60) {
            const careerPathQuizSection = document.getElementById('personalized-path');
            if (careerPathQuizSection) {
                careerPathQuizSection.classList.remove('disabled');
                careerPathQuizSection.querySelector('.path-card-header').innerHTML += 
                    '<span class="badge bg-success">مؤهل للاختبار</span>';
            }
        }
    }

    // Start the quiz
    buildQuiz();

    // Submit button handler
    submitButton.addEventListener('click', showResults);

    // التحقق من الرابط عند التحميل
    if (window.location.hash === '#computer-quiz') {
        quizContainer.style.display = 'block';
    }
});
