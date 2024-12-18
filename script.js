
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ball = { x: 300, y: 200, radius: 10, dx: 2, dy: 2 };
let score = 0;

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// Update ball position
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
}

// Draw score
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Check for click
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distance = Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2);
    if (distance < ball.radius) {
        score += 1;
        ball.dx *= 1.1;
        ball.dy *= 1.1;
    }
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawScore();
    updateBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();
