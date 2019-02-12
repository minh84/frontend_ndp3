// Helpers functions

// convert col => x
function col2x(col) {
    return col * 101;
}

// convert row => y
function row2y(row) {
    return row * 83 - 20;
}

// check if collide with player
function isCollide(player, enemy) {
    if (player.row === enemy.row) {
        // if x-coodinate is close enough we conside it collided
        return Math.abs(enemy.x - player.x) < 50;
    }

    return false;
}

// Enemies our player must avoid
var Enemy = function(xStart, row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed * 100 + 50*Math.random();
    this.row = row;

    this.xStart = xStart;
    this.x = xStart;
    this.y = row2y(row);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make the bug to go round again
    if (this.x > 600) {   
        this.x = this.xStart;
    }

    if (isCollide(this, player)) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.score = 0;
    this.highestScore = 0;
    this.col = 2;
    this.row = 5;
    
    this.x = col2x(this.col);
    this.y = row2y(this.row);

    this.sprite = 'images/char-boy.png';
}

Player.prototype.reset = function() {
    this.col = 2;
    this.row = 5;
    this.score = 0;

    this.x = col2x(this.col);
    this.y = row2y(this.row);
}

Player.prototype.update = function(dt) {
    this.x = col2x(this.col);
    this.y = row2y(this.row);

    // use for ... of so that we can break from the loop
    for (const enemy of allEnemies) {
        if (isCollide(this, enemy)) {
            this.reset();
            break;
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.col = Math.max(0, this.col - 1);
    } else if (key === 'right') {
        this.col = Math.min(4, this.col + 1);
    } else if (key === 'up') {
        if (this.row === 1) {
            // reset the position since we reached the water
            this.score += 1;
            if (this.score > this.highestScore) {
                this.highestScore = this.score;
            }
            this.row = 5;
            this.col = 2;
        } else {
            this.row -= 1;
        }
    } else {
        this.row = Math.min(5, this.row + 1);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(-100, 1, 1), new Enemy(-250, 1, 1), new Enemy(-500, 1, 3),
                  new Enemy(-100, 2, 1), new Enemy(-250, 2, 1), new Enemy(-1000, 2, 4),
                  new Enemy(-100, 3, 1), new Enemy(-250, 3, 2), new Enemy(-500, 3, 3)
                    ];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
