// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = Math.floor(Math.random() * 100) + 50;
    this.row = Math.floor(Math.random() * 3) + 1;

    this.x = Math.floor(Math.random() * 20) - 20;
    this.y = this.row * 83 - 30;

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.col = 2;
    this.row = 5;
    
    this.x = this.col * 101;
    this.y = this.row * 83;

    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {
    this.x = this.col * 101;
    this.y = this.row * 83;
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
        this.row = Math.max(0, this.row - 1);
    } else {
        this.row = Math.min(5, this.row + 1);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(), new Enemy()];
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
