import { playSound } from '../tools.js';
import * as other from './other.js'
export class Coin extends other.Item{
    constructor(x, y, worth) {
        let width = 32;
        let height = 32;
        let sprite = new Sprite(coin_img, 0, 0, 32, 32, true, 15);
        if (!defined(x) || !defined(y)) {
            let x = -2;
            let y = -2;
        }
		super(x, y, width, height, sprite);
        if (worth === undefined) {
            this.worth = 1;
        } else {
            this.worth = worth;
        }

        this.pickup_delay = 40;
    }

    collideEvent(collider) {
        let success = super.collideEvent(collider);
        if (success) {
            self.plr.money += this.worth;
            playSound(coin_collect);
        }
        return success
    }
}