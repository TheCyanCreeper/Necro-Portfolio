//Canvas
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

import {default as col} from'../collisions.js';
import * as tool from '../tools.js';

export class Sprite {
	constructor(img, x, y, width, height, animated, frame_time) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.animated = animated;
		this.frame_time = frame_time;

		this.frame = 0;
		this.frames = 0;

		this.visible = true;
		this.is_background = false
	}

	hide() {
		this.visible = false;
	}

	show() {
		this.visible = true;
	}

	draw(x, y) {
		if (x === undefined) {
			x = this.x;
		}
		if (y === undefined) {
			y = this.y;
		}
		if (this.frame_time === undefined) {
			this.frame_time = 5;
		}
		if (typeof this.img === 'string') {
			c.fillStyle = this.img;
			c.fillRect(x, y, this.width, this.height);
		} else {
			this.frames = this.animated ? Math.floor(this.img.width / this.width) : 1;

			if (this.frame >= this.frames) {
				this.frame = 0;
			}
			if (this.animated) {
				c.drawImage(this.img, this.frame * this.width, 0, this.width, this.height, x, y, this.width, this.height);
			} else {
				c.drawImage(this.img, x, y, this.width, this.height);
			}
			
			if (self.time % this.frame_time === 0) {
				this.frame++;
			}
		}
		
	}
}

export class Body {
	constructor(x, y, width, height, sprite, collideEvt) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.sprite = sprite;
		this.center_x = -2;
		this.center_y = -2;
		this.getSides();

		if (typeof collideEvt === 'function') {
			this.collideEvt = collideEvt;
		} else {
			this.collideEvt = () => {return true;};
		}

		this.visible = true;
		this.tangible = true;
		this.is_trigger = false;

		this.col = {
			right: false,
			left: false,
			top: false,
			bottom: false
		}

		self.room_objects.push(this);
		all.push(this);

		this.debug_mode = self.show_hitboxes;
	}

	hide() {
		this.visible = false;
		this.tangible = false;
	}

	show() {
		this.visible = true;
		this.tangible = true;
	}

	resetCol() {
		this.col = {
			right: false,
			left: false,
			top: false,
			bottom: false
		}
	}

	getSides() {
		this.right = this.x + this.width;
		this.bottom = this.y + this.height
	}

	borderCol() {
		if (this.x <= 0) {
			this.col.left = true;
			if (this.x < 0 && self.current_room.neighbors[3] === undefined) {
				this.x = 0;
			}
		}
		if (this.right >= canvas.width) {
			this.col.right = true;
			if (this.right > canvas.width && self.current_room.neighbors[1] === undefined) {
				this.x = canvas.width - this.width;
			}
		}
		if (this.y <= 0) {
			this.col.top = true;
			if (this.y < 0 && self.current_room.neighbors[0] === undefined) {
				this.y = 0;
			}
		}
		if (this.bottom >= canvas.height) {
			this.col.bottom = true;
			if (this.bottom > canvas.height && self.current_room.neighbors[2] === undefined) {
				this.y = canvas.height - this.height;
			}
		}
	}

	collideEvent() {
		return this.collideEvt();
	}

	update() {
		this.resetCol();
		this.getSides();
		col.calcCenter(this);

		this.borderCol();
	}

	drawHitbox() {
		c.strokeStyle = 'red';
		c.fillStyle = 'red';
		c.strokeRect(this.x, this.y, this.width, this.height);
		c.beginPath();
		c.arc(this.center_x, this.center_y, 2, 0, 2 * Math.PI);
		c.fill();
	}

	drawHitRange() {
		c.lineWidth = 1;
		c.strokeStyle = '#d932ff';

		let angle = convertFacingToAngle(this.facing);
		let fov_angle = angle - this.attack_FOV
		let start_radians = (fov_angle) * (Math.PI / 180);
		let end_radians = (fov_angle + this.attack_FOV * 2) * (Math.PI / 180);
		angle -= 90; //Adjust for calculation offset
		fov_angle -= 90;
		let offset = pointOnCircle(this.attack_radius, angle);
		let fov_offset = pointOnCircle(this.attack_radius, fov_angle);
		c.beginPath();
		c.arc(this.center_x, this.center_y, this.attack_radius, start_radians, end_radians);
		c.lineTo(this.center_x, this.center_y);

		c.lineTo(this.center_x - offset.x, this.center_y + offset.y);
		c.moveTo(this.center_x, this.center_y);
		c.lineTo(this.center_x - fov_offset.x, this.center_y + fov_offset.y);
		c.stroke();
	}

	draw(x, y) {
		if (x === undefined) {
			x = this.x + this.sprite.x;
		}
		if (y === undefined) {
			y = this.y + this.sprite.y;
		}
		this.sprite.draw(x, y);
	}
}