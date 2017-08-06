import {SCALE} from './Constants';
import GameLevels from './Levels';

/**
 * Space comet class.
 */
export default class Comet {
    /**
     * Class constructor.
     *
     * @param {Spaceguard} spaceguard Spaceguard game instance.
     */
    constructor(spaceguard) {
        this.sg = spaceguard;
        this.x;
        this.y;
        this.a; // extra direction handling
        this.width = 60 * SCALE;
        this.height = 60 * SCALE;
        this.speedX = GameLevels[this.sg.level].comet.speed * Math.random();
        this.speedY = GameLevels[this.sg.level].comet.speed * Math.random();
        this.damage = Math.floor(Math.random() * GameLevels[this.sg.level].comet.damage);
        this.dfs = 30 * SCALE; // initial distance from scene
        this.destroyed = false;
    }

    /**
     * Update comet position on screen.
     */
    position() {
        let canvasSide = Math.ceil(Math.random() * 4);

        switch (canvasSide) {
            case 1: // top
                this.y = -1 * this.dfs;
                this.x = Math.ceil(Math.random() * spaceguard.canvas.width);
                if (this.x > this.sg.canvas.width / 2) this.speedX = -1 * this.speedX;
                this.speedY = -1 * this.speedY;
                break;
            case 2: // right
                this.x = spaceguard.canvas.width + this.dfs;
                this.y = Math.ceil(Math.random() * spaceguard.canvas.height);
                if (this.y > this.sg.canvas.height / 2) this.speedY = -1 * this.speedY;
                this.speedX = -1 * this.speedX;
                break;
            case 3:  // bottom
                this.y = spaceguard.canvas.height + this.dfs;
                this.x = Math.ceil(Math.random() * spaceguard.canvas.width);
                if (this.x > this.sg.canvas.width / 2) this.speedX = -1 * this.speedX;
                break;
            case 4: // left
                this.x = -1 * this.dfs;
                this.y = Math.ceil(Math.random() * spaceguard.canvas.height);
                if (this.y > this.sg.canvas.height / 2) this.speedY = -1 * this.speedY;
        }

        this.a = Math.random() * 1;
    }

    /**
     * Draw comet object on screen.
     */
    draw() {
        // Move
        this.x += this.a * Math.ceil(Math.random() * this.speedX) + Math.round(this.speedX / 2);
        this.y += this.a * Math.ceil(Math.random() * this.speedY) + Math.round(this.speedY / 2);

        // Check if comet is out of map
        this.isOutOfMap();

        // Draw
        this.sg.ctx.drawImage(this.sg.sprites.comet, this.x, this.y);
    }

    /**
     * Check whether the comet has gone out of the map.
     */
    isOutOfMap() {
        // If the comet is too far from the map frame it means that it needs to be destroyed cause it will
        // no longer play any part on the game.
        const dist = Math.abs(Math.sqrt(Math.pow(this.x - this.sg.cx, 2) + Math.pow(this.y - this.sg.cy, 2)));

        if (dist > (this.sg.canvas.width)) {
            this.destroyed = true;
        }
    }
};