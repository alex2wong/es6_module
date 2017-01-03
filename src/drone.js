
import Const from './const';
import Bullet from './bullet';
import { readonly, log } from './util';

// // Drone model script
// const firingTime = 1200, MAXSPEED = 3.900;

/**
 * Drone class with control method.
 */
export default class Drone {
    constructor(opts) {
        this.id;
        this.speed = opts.speed ? opts.speed: 1;
        this.direction = opts.direction ? opts.direction: 0;
        
        this.name = opts.name ? opts.name: this.randomName();
        this.life = Const.DroneParam.LIFE;
        this.bullets = [];
        this.firing = false;
        this.point = {
            type: 'Point',
            coordinates: [100, 30]
        }
        this.bulletNum = 2;
    }

    /**
     * maintask start interval to update its status.
     */
    updateDrone () {
        this.point.coordinates[0] += Math.sin(this.direction) * this.speed;
        this.point.coordinates[1] += Math.cos(this.direction) * this.speed;
        // updateDroneView. toDO in maintask.js
    }

    // @log
    randomName () {
        let randomNum = Math.random() * 10000;
        return "Player ".concat(randomNum.toFixed(0));
    }

    turnLeft () {
        if (this) {
            this.direction -= 0.1;
            // this.updateDrone();
        }
    }
        
    turnRight () {
        this.direction += 0.1;
        // this.updateDrone();
    }

    accelerate() {
        if (this.speed < Const.DroneParam.MAXSPEED) {
            this.speed += 1;
            // this.updateDrone();
        }
    }
        
    brake () {
        if (this.speed > 0) {
            this.speed -= 1;
            // this.updateDrone();
        }
    }

    fire () {
        
        if (this.bullets instanceof Array && 
                this.bullets.length > 0 && !this.firing) {
            let that = this;
            setTimeout(() => {
                that.firing = false;
                // clearInterval(that.interval);
            }, Const.DroneParam.FIRINGTIME)
            this.firing = true;
        } else if (!this.firing) {
            for (let i = 0; i < this.bulletNum; i++) {
                this.bullets.push(new Bullet(this));
            }
            // create Closure to handle the firing status change..
            let that = this;
            setTimeout(() => {
                that.firing = false;
                // clearInterval(that.interval);
            }, Const.DroneParam.FIRINGTIME)
            this.firing = true;
        } else {
            // this firing.. do nothing.
        }
    }
}
