import * as resource_exports from '../resources.js';
Object.entries(resource_exports).forEach(([name, exported]) => window[name] = exported);

export class Button extends Sprite {
	constructor(img, x, y, width, height, click) {
		super(img, x, y, width, height, false);
		this.click = click;
	}

	clickEvent() {
		this.click();
	}

	update() {
		checkClick(this);
	}
}

export class Item extends Body {
	constructor(x, y, width, height, sprite, collideEvt) {
		super(x, y, width, height, sprite, collideEvt);

		this.bob_frame = 0;
		this.bob_height = 16;
		this.bob_invert = false;

		this.can_pickup = false;
		this.pickup_delay = 60;

		this.is_trigger = true;
	}

	collideEvent(collider) {
		let success = false
		if (collider instanceof Player && this.can_pickup) {
			success = this.collideEvt();
			if (success) {
				this.hide();
			}
		}
		return success;
	}

	update() {
		this.can_pickup = true;
		if (this.pickup_delay > 0) {
			this.can_pickup = false;
			this.pickup_delay--;
		}
		super.update();
	}

	draw() {
		if (this.bob_frame > this.bob_height) {
			this.bob_invert = true;
		}
		if (this.bob_frame < 0) {
			this.bob_invert = false;
		}
		super.draw(undefined, this.y + this.sprite.y - this.bob_frame);
		if (self.time % 4 === 0) {
			if (this.bob_invert) {
				this.bob_frame--;
			} else {
				this.bob_frame++;
			}
		}	
	}
}

export class Particle extends Sprite {
	constructor(img, x, y, width, height, animated, frame_time, life_time) {
		super(img, x, y, width, height, animated, frame_time);
		this.life_time = life_time;

		this.age = 0;

		this.visible = true;
	}

	update() {
		this.frame_time = Math.floor(this.life_time / this.frames);

		if (this.age >= this.life_time) {
			this.visible = false;
		}
		this.age++;
	}
}
