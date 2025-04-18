document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const gameContainer = document.getElementById('game-container');
    const character = document.getElementById('character');
    const scoreDisplay = document.getElementById('score');
    const gameOverDisplay = document.getElementById('game-over');
    const finalScoreDisplay = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');
    const mobileControls = document.getElementById('mobile-controls');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    
    // Game constants
    const gameWidth = gameContainer.clientWidth;
    const gameHeight = gameContainer.clientHeight;
    const characterWidth = 40;
    const characterHeight = 40;
    const platformWidth = 70;
    const platformHeight = 15;
    
    // Game variables
    let platforms = [];
    let characterX = gameWidth / 2 - characterWidth / 2;
    let characterY = gameHeight - 200;
    let velocityY = 0;
    let velocityX = 0;
    let gravity = 0.4;
    let score = 0;
    let highestPlatformY = 0;
    let gameRunning = true;
    let movingLeft = false;
    let movingRight = false;
    let animationFrameId = null;
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Show mobile controls if on mobile device
    if (isMobile) {
        mobileControls.style.display = 'flex';
    }
    
    function init() {
        // Cancel any existing animation frame
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        // Clear all existing elements
        document.querySelectorAll('.platform').forEach(platform => platform.remove());
        
        // Reset game state
        platforms = [];
        characterX = gameWidth / 2 - characterWidth / 2;
        characterY = gameHeight - 200;
        velocityY = 0;
        velocityX = 0;
        score = 0;
        highestPlatformY = 0;
        gameRunning = true;
        
        scoreDisplay.textContent = '0';
        gameOverDisplay.style.display = 'none';
        
        // Create initial platforms
        createInitialPlatforms();
        
        // Update character position
        character.style.left = characterX + 'px';
        character.style.top = characterY + 'px';
        
        // Draw all platforms
        drawPlatforms();
        
        // Start game loop
        animationFrameId = requestAnimationFrame(gameLoop);
    }
    
    function createInitialPlatforms() {
        // Create a platform right under the character
        platforms.push({
            x: characterX,
            y: gameHeight - 150,
            width: platformWidth,
            height: platformHeight
        });
        
        // Create additional platforms
        for (let i = 0; i < 99; i++) {
            const platformY = gameHeight - 150 - (i + 1) * 80;
            platforms.push({
                x: Math.random() * (gameWidth - platformWidth),
                y: platformY,
                width: platformWidth,
                height: platformHeight
            });
            
            if (platformY < highestPlatformY || highestPlatformY === 0) {
                highestPlatformY = platformY;
            }
        }
    }
    
    function createPlatform() {
        const platformY = highestPlatformY - 80 - Math.random() * 50;
        platforms.push({
            x: Math.random() * (gameWidth - platformWidth),
            y: platformY,
            width: platformWidth,
            height: platformHeight
        });
        
        highestPlatformY = platformY;
    }
    
    function drawPlatforms() {
        // Remove existing platforms
        document.querySelectorAll('.platform').forEach(platform => platform.remove());
        
        // Draw new platforms
        platforms.forEach(platform => {
            const platformElement = document.createElement('div');
            platformElement.className = 'platform';
            platformElement.style.width = platform.width + 'px';
            platformElement.style.height = platform.height + 'px';
            platformElement.style.left = platform.x + 'px';
            platformElement.style.top = platform.y + 'px';
            gameContainer.appendChild(platformElement);
        });
    }
    
    function updateCharacter() {
        // Apply gravity
        velocityY += gravity;
        
        // Update horizontal position
        if (movingLeft) {
            velocityX = -5;
        } else if (movingRight) {
            velocityX = 5;
        } else {
            velocityX = 0;
        }
        
        characterX += velocityX;
        
        // Screen wrapping
        if (characterX < -characterWidth) {
            characterX = gameWidth;
        } else if (characterX > gameWidth) {
            characterX = -characterWidth;
        }
        
        // Update vertical position
        characterY += velocityY;
        
        // Check for platform collisions if character is moving downward
        if (velocityY > 0) {
            for (let i = 0; i < platforms.length; i++) {
                const platform = platforms[i];
                if (
                    characterX + characterWidth > platform.x &&
                    characterX < platform.x + platform.width &&
                    characterY + characterHeight > platform.y &&
                    characterY + characterHeight < platform.y + platform.height + 10 &&
                    velocityY > 0
                ) {
                    // Bounce on platform
                    velocityY = -13;
                    break;
                }
            }
        }
        
        // Update character DOM element
        character.style.left = characterX + 'px';
        character.style.top = characterY + 'px';
        
        // Check if character has fallen below the screen
        if (characterY > gameHeight) {
            gameOver();
        }
    }
    
    function updateCamera() {
        // Move camera up if character is in the upper half of the screen
        if (characterY < gameHeight / 2) {
            const cameraOffset = gameHeight / 2 - characterY;
            
            // Move platforms down
            platforms.forEach(platform => {
                platform.y += cameraOffset;
            });
            
            // Move character down
            characterY += cameraOffset;
            
            // Update score based on height
            score += Math.floor(cameraOffset);
            scoreDisplay.textContent = score;
            
            // Remove platforms that are below the screen
            platforms = platforms.filter(platform => platform.y < gameHeight);
            
            // Add new platforms at the top
            while (highestPlatformY > -100) {
                createPlatform();
            }
        }
    }
    
    function gameOver() {
        gameRunning = false;
        finalScoreDisplay.textContent = score;
        gameOverDisplay.style.display = 'block';
        
        // Cancel the animation frame to stop the game loop
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
    
    function gameLoop() {
        if (!gameRunning) return;
        
        updateCharacter();
        updateCamera();
        drawPlatforms();
        
        animationFrameId = requestAnimationFrame(gameLoop);
    }
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            movingLeft = true;
        } else if (e.key === 'ArrowRight') {
            movingRight = true;
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') {
            movingLeft = false;
        } else if (e.key === 'ArrowRight') {
            movingRight = false;
        }
    });
    
    // Mobile touch controls
    leftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default behavior
        movingLeft = true;
    }, { passive: false });
    
    leftBtn.addEventListener('touchend', () => {
        movingLeft = false;
    });
    
    rightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default behavior
        movingRight = true;
    }, { passive: false });
    
    rightBtn.addEventListener('touchend', () => {
        movingRight = false;
    });
    
    // Mouse controls for buttons (for testing on desktop)
    leftBtn.addEventListener('mousedown', () => {
        movingLeft = true;
    });
    
    leftBtn.addEventListener('mouseup', () => {
        movingLeft = false;
    });
    
    leftBtn.addEventListener('mouseleave', () => {
        movingLeft = false;
    });
    
    rightBtn.addEventListener('mousedown', () => {
        movingRight = true;
    });
    
    rightBtn.addEventListener('mouseup', () => {
        movingRight = false;
    });
    
    rightBtn.addEventListener('mouseleave', () => {
        movingRight = false;
    });
    
    // Restart game
    restartBtn.addEventListener('click', () => {
        init();
    });
    
    // Initialize the game
    init();
});