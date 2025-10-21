import * as base_exports from './base.js';
Object.entries(base_exports).forEach(([name, exported]) => window[name] = exported);
import * as tool_exports from '../tools.js'
Object.entries(tool_exports).forEach(([name, exported]) => window[name] = exported);

export class Asset extends Body {
	constructor(x, y, width, height, sprite, hit_sfx) {
		super(x, y, width, height, sprite);
		this.hit_sfx = hit_sfx;

		this.debug_mode = self.show_hitboxes;

		this.hittable = true;
		this.interactable = false;
		this.is_obstacle = true;
	}

	hitEvent() {
		playSound(this.hit_sfx)
	}
}

export class Breakable extends Asset {
	constructor(x, y, width, height, sprite, hit_sfx, broken_img, loot) {
		super(x, y, width, height, sprite, hit_sfx);
		this.broken_img = broken_img;
		this.loot = loot;
		this.broken = false;

		if (loot !== undefined && loot.length > 0) {
			for (let i = 0; i < this.loot.length; i++) {
				let item = this.loot[i];

				item.hide();
				removeElem(self.room_objects, item);
			}
		}

		this.debug_mode = self.show_hitboxes;

		self.loot_table = [];
	}

	hitEvent() {
		if (!this.broken) {
			if (this.broken_img === null) {
				this.hide()
			} else {
				this.sprite.img = this.broken_img;
			}
			
			super.hitEvent();
			if (this.loot !== undefined && this.loot.length > 0) {
				for (let i = 0; i < this.loot.length; i++) {
					let item = this.loot[i];

					item.show()
					item.x = this.center_x - item.width / 2;
					item.y = this.center_y - item.height / 2;
					self.current_room.contents.push(item);
				}
			}
			

			this.broken = true;
		}
	}

	draw() {
		super.draw();
	}
}

export class Bloodstone extends Asset {
	constructor(x, y, hit_sfx) {
		let width = 24;
		let height = 24;
		let sprite = new Sprite(bloodstone_img, -4, -4, 32, 32);
		super(x, y, width, height, sprite, hit_sfx);

		this.hold_offset_x = (self.plr.width - width) / 2;
		this.hold_offset_y = -height;

		this.interactable = true;
		this.hittable = false;
	}

	interactEvent(obj) {
		this.tangible = false;
		obj.holding = this;
		obj.holdingUpdate()
	}

	dropEvent() {
		this.tangible = true;
	}
}

export class Pedestal extends Asset {
	constructor(x, y, width, height, sprite, hit_sfx, active_img) {
		super(x, y, width, height, sprite, hit_sfx);
		this.normal_img = sprite.img;
		this.active_img = active_img;

		this.holding = null;
		this.activated = false;
		this.effect_radius = 512;

		this.interactable = true;
		this.hittable = false;
	}

	activate() {
		this.activated = true;
		this.sprite.img = this.active_img
	}

	deactivate() {
		this.activated = false;
		this.sprite.img = this.normal_img
	}

	toggleActivation() {
		if (this.activated) {
			this.activate();
		} else {
			this.deactivate();
		}
	}

	interactEvent(obj) {
		if (obj.holding instanceof Bloodstone && !this.activated) {
			this.activate();
			this.holding = obj.holding;
			this.holding.hide()
			this.holding.x = this.x;
			this.holding.y = this.y;
			obj.holding = null;
		} else if (this.activated && self.plr.holding === null) {
			this.deactivate()
			obj.holding = this.holding;
			obj.holdingUpdate()
			obj.holding.visible = true;
			this.holding = null;
		}
	}
}