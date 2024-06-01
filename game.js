const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dino = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    dy: 0,
    gravity: 0.6,
    jumpPower: -10,
    grounded: false
};

const obstacles = [];
const obstacleWidth = 10;
const obstacleSpeed = 3;
let frameCount = 0;
let gameOver = false;

function update() {
    if (gameOver) return;

    ++frameCount;

    // Move the dino
    if (!dino.grounded) {
        dino.dy += dino.gravity;
        dino.y += dino.dy;
    }

    if (dino.y + dino.height >= canvas.height) {
        dino.y = canvas.height - dino.height;
        dino.grounded = true;
        dino.dy = 0;
    } else {
        dino.grounded = false;
    }

    // Generate new obstacles
    if (frameCount % 100 === 0) {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 20,
            width: obstacleWidth,
            height: 20
        });
    }

    // Move and draw obstacles
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < obstacles.length; ++i) {
        obstacles[i].x -= obstacleSpeed;
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

    // Check collision
        if (
            dino.x < obstacles[i].x + obstacles[i].width &&
            dino.x + dino.width > obstacles[i].x &&
            dino.y < obstacles[i].y + obstacles[i].height &&
            dino.y + dino.height > obstacles[i].y
        ) {
            gameOver = true;
            alert('Game Over!');
        }
    }

    // Remove off-screen obstacles
    if (obstacles.length > 0 && obstacles[0].x + obstacles[0].width < 0) {
        obstacles.shift();
    }

    // Draw the dino
    ctx.fillStyle = 'black';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && dino.grounded) {
        dino.dy = dino.jumpPower;
        dino.grounded = false;
    }
});

update();
