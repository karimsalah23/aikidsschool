document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const levelDisplay = document.getElementById('levelDisplay');
    const startButton = document.getElementById('startButton');
    const jumpButton = document.getElementById('jumpButton');
    const instructionsButton = document.getElementById('instructionsButton');
    const instructionsModal = document.getElementById('instructionsModal');
    const closeModal = document.querySelector('.close');

    // Resize canvas
    function resizeCanvas() {
        const container = document.querySelector('.game-container');
        canvas.width = container.clientWidth * 0.95;
        canvas.height = 350;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Game variables
    let player, obstacles, coins, score, level, gameActive;

    // Player class
    class Player {
        constructor() {
            this.x = 50;
            this.y = canvas.height - 100;
            this.width = 40;
            this.height = 40;
            this.color = '#FFD700';
            this.jumpStrength = 8;
            this.velocity = 0;
            this.isJumping = false;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        jump() {
            if (!this.isJumping) {
                this.velocity = -this.jumpStrength;
                this.isJumping = true;
            }
        }

        update() {
            this.velocity += 0.5;
            this.y += this.velocity;

            if (this.y + this.height > canvas.height) {
                this.y = canvas.height - this.height;
                this.velocity = 0;
                this.isJumping = false;
            }
        }
    }

    // Obstacle class
    class Obstacle {
        constructor(x) {
            this.x = x;
            this.y = canvas.height - 50;
            this.width = 30;
            this.height = 50;
            this.color = '#FF6347';
            this.speed = -5;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        update() {
            this.x += this.speed;
        }
    }

    // Coin class
    class Coin {
        constructor(x) {
            this.x = x;
            this.y = canvas.height - 100;
            this.radius = 15;
            this.color = '#FFD700';
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x -= 5;
        }
    }

    // Game initialization
    function init() {
        player = new Player();
        obstacles = [];
        coins = [];
        score = 0;
        level = 1;
        gameActive = false;

        scoreDisplay.textContent = `النقاط: ${score}`;
        levelDisplay.textContent = `المستوى: ${level}`;
    }

    // Game loop
    function gameLoop() {
        if (!gameActive) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn obstacles and coins
        if (Math.random() < 0.02) {
            obstacles.push(new Obstacle(canvas.width));
        }
        if (Math.random() < 0.03) {
            coins.push(new Coin(canvas.width));
        }

        // Update and draw player
        player.update();
        player.draw();

        // Update and draw obstacles
        obstacles.forEach((obstacle, index) => {
            obstacle.update();
            obstacle.draw();

            // Collision detection
            if (
                player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y
            ) {
                gameActive = false;
                alert('انتهت اللعبة! حاول مرة أخرى');
            }

            // Remove off-screen obstacles
            if (obstacle.x + obstacle.width < 0) {
                obstacles.splice(index, 1);
            }
        });

        // Update and draw coins
        coins.forEach((coin, index) => {
            coin.update();
            coin.draw();

            // Coin collection
            if (
                player.x < coin.x + coin.radius &&
                player.x + player.width > coin.x - coin.radius &&
                player.y < coin.y + coin.radius &&
                player.y + player.height > coin.y - coin.radius
            ) {
                coins.splice(index, 1);
                score += 10;
                scoreDisplay.textContent = `النقاط: ${score}`;

                // Level up
                if (score % 100 === 0) {
                    level++;
                    levelDisplay.textContent = `المستوى: ${level}`;
                }
            }

            // Remove off-screen coins
            if (coin.x + coin.radius < 0) {
                coins.splice(index, 1);
            }
        });

        requestAnimationFrame(gameLoop);
    }

    // Event listeners
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameActive) {
            player.jump();
        }
    });

    startButton.addEventListener('click', () => {
        init();
        gameActive = true;
        gameLoop();
    });

    // Mobile jump button
    jumpButton.addEventListener('click', () => {
        if (gameActive) {
            player.jump();
        }
    });

    instructionsButton.addEventListener('click', () => {
        instructionsModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        instructionsModal.style.display = 'none';
    });

    // Initial setup
    init();
});
