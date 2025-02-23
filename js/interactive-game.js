document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const startGameBtn = document.getElementById('start-game');
    const scoreDisplay = document.getElementById('game-score span');

    // Game variables
    let player, obstacles, score, gameActive;

    // Player class
    class Player {
        constructor() {
            this.x = 50;
            this.y = canvas.height / 2;
            this.width = 50;
            this.height = 50;
            this.color = '#007bff';
            this.jumpStrength = 10;
            this.gravity = 0.5;
            this.velocity = 0;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        jump() {
            if (this.y === canvas.height - this.height) {
                this.velocity = -this.jumpStrength;
            }
        }

        update() {
            // Apply gravity
            this.velocity += this.gravity;
            this.y += this.velocity;

            // Ground collision
            if (this.y > canvas.height - this.height) {
                this.y = canvas.height - this.height;
                this.velocity = 0;
            }
        }
    }

    // Obstacle class
    class Obstacle {
        constructor() {
            this.width = 30;
            this.height = Math.random() * 100 + 50;
            this.x = canvas.width;
            this.y = canvas.height - this.height;
            this.color = '#28a745';
            this.speed = 5;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        update() {
            this.x -= this.speed;
        }
    }

    function init() {
        player = new Player();
        obstacles = [];
        score = 0;
        gameActive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scoreDisplay.textContent = score;
    }

    function spawnObstacle() {
        if (Math.random() < 0.02 && gameActive) {
            obstacles.push(new Obstacle());
        }
    }

    function checkCollision() {
        obstacles.forEach((obstacle, index) => {
            if (
                player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y
            ) {
                gameActive = false;
                alert('انتهت اللعبة! حاول مرة أخرى.');
            }

            // Remove obstacles that are off screen
            if (obstacle.x + obstacle.width < 0) {
                obstacles.splice(index, 1);
                score++;
                scoreDisplay.textContent = score;
            }
        });
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (gameActive) {
            spawnObstacle();
            
            player.update();
            player.draw();

            obstacles.forEach(obstacle => {
                obstacle.update();
                obstacle.draw();
            });

            checkCollision();
        }

        requestAnimationFrame(gameLoop);
    }

    // Event Listeners
    startGameBtn.addEventListener('click', () => {
        init();
        gameActive = true;
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameActive) {
            player.jump();
        }
    });

    canvas.addEventListener('click', () => {
        if (gameActive) {
            player.jump();
        }
    });

    // Initialize game
    init();
    gameLoop();
});
