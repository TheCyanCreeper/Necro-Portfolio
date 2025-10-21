import * as type_exports from '../types.js';;
Object.entries(type_exports).forEach(([name, exported]) => window[name] = exported);
import {default as col} from'../collisions.js';

export class Entity extends Body {
	constructor(x, y, width, height, sprite, hit_sfx, death_sfx) {
		super(x, y, width, height, sprite);
		this.hit_sfx = hit_sfx;
		this.death_sfx = death_sfx;

		this.base_hp = 4;
		this.hp = 4;
		this.base_speed = 2;
		this.speed = 2;

		this.attack_dmg = 1;
		this.attack_cooldown_tm = 100;
		this.attack_cooldown = this.attack_cooldown_tm;
		this.attack_radius = 50;
		this.attack_FOV = 30;
		this.hit_cooldown = 50;
		this.hit_tm = 0;
		this.hit_direction = NONE;
		this.hit_by = null;
		this.knockback = 8;
		this.knockback_tm = 8

		this.dead = false;
		this.invincible = false;
		this.poison_lvl = 0;
		this.hittable = true;
		this.can_move = true;
		this.can_attack = true;
		this.idle = true;

		this.facing = DOWN;

		this.follow_player = true;
		this.follow_radius = 96;
		this.attack_radius = this.follow_radius + 32;
		this.movable = true;
		this.moving = false;
		this.room_access = false;
		this.second_dest = null;
		this.old_dest = null;

		this.poison = 0;
		this.poison_tm = 0;

		this.current_cells = [];
		this.obstacles = [];
		this.resetObstacles();

		this.debug_mode = self.show_hitboxes;

		self.entities.push(this);
	}

	deathEvent() {
		playSound(this.death_sfx)
		this.hide();

		this.dead = true;
	}

	hitEvent() {
		if (!this.invincible && this.hit_tm === 0) {
			this.hit_tm = this.hit_cooldown;
			this.hit_direction = this.hit_by.facing;

			this.hp -= this.hit_by.attack_dmg;
			if (this.hp > 0) {
				playSound(this.hit_sfx)
			}
			
		}
	}

	move(dirc, speed) {
		if (speed === undefined) {
			speed = this.speed
		}
		let success = true;
		switch (dirc) {
			case UP:
				this.facing = dirc;
				if (!this.col.top) {
					this.y -= speed;
				}
				break;
			case RIGHT:
				this.facing = dirc;
				if (!this.col.right) {
					this.x += speed;
				}
				break;
			case DOWN:
				this.facing = dirc;
				if (!this.col.bottom) {
					this.y += speed;
				}
				break;
			case LEFT:
				this.facing = dirc;
				if (!this.col.left) {
					this.x -= speed;
				}
				break;
			case UP_RIGHT:
				this.facing = dirc;
				if (!this.col.top) {
					this.y -= speed;
				}
				if (!this.col.right) {
					this.x += speed;
				}
				break;
			case DOWN_RIGHT:
				this.facing = dirc;
				if (!this.col.bottom) {
					this.y += speed;
				}
				if (!this.col.right) {
					this.x += speed;
				}
				break;
			case DOWN_LEFT:
				this.facing = dirc;
				if (!this.col.bottom) {
					this.y += speed;
				}
				if (!this.col.left) {
					this.x -= speed;
				}
				break;
			case UP_LEFT:
				this.facing = dirc;
				if (!this.col.top) {
					this.y -= speed;
				}
				if (!this.col.left) {
					this.x -= speed;
				}
				break;
			default:
				success = false;
				break;
		}
		if (success) {
			this.moving = true;
		}
		return success;
	}

	getCurrentCell() {
		this.old_current_cell = {...this.current_cell}
		let temp = null;
		if (self.grid[Math.floor(this.center_x / self.cell_size)] !== undefined) {
			if (self.grid[Math.floor(this.center_x / self.cell_size)][Math.floor(this.center_y / self.cell_size)] !== undefined) {
				temp = self.grid[Math.floor(this.center_x / self.cell_size)][Math.floor(this.center_y / self.cell_size)]
				this.current_cell = temp;
			}
		}
	}

	reformatCurrentCells() {
		if (this.current_cells[0].length === undefined) {
			let row_width = Math.ceil(this.width / self.cell_size);
			let y_temp = -1;
			let row = [];
			let temp = [];
			this.current_cells.forEach((item, i) => {
				row.push(item);
				if ((i + 1) % row_width === 0) {
					temp.push(row);
					row = [];
				}
				
			});
			this.current_cells = temp;
		}
	}

	findPath(obj) {
		let start = {...this.current_cell};
		let current = {...this.current_cell};
		let destination = obj.current_cell;
		if (this.old_dest === null) {
			this.old_dest = destination
		}
		if (this.second_dest !== null && this.old_dest.i === destination.i && this.old_dest.k === destination.k) {
			destination = this.second_dest
		} else {
			this.old_dest = destination
		}
		
		
		current.h = distance(current, destination);
		current.f = current.h;

		let open_cells = [current];
		let closed_cells = [];
		while (open_cells.length > 0) {
			let lowest_index = 0;
			open_cells.forEach((item, i) => {
				if (item.f < open_cells[lowest_index].f) {
					lowest_index = i;
				}
			});
			current = open_cells[lowest_index];


			if (current === destination) break
			removeElem(open_cells, current);
			closed_cells.push(current);

			current.neighbors.forEach((item) => {
				if (!closed_cells.includes(item) && !this.obstacles[item.i][item.k]) {
					let temp_g = current.g + self.cell_size;
					
					let new_path = false;
					if (open_cells.includes(item)) {
						if (temp_g < item.g) {	
							item.g = temp_g;
							new_path = true;
						}
					} else {
						item.g = temp_g;
						open_cells.push(item);
						new_path = true;
					}

					if (new_path) {
						item.h = distance(item, destination);
						item.f = item.g + item.h;
						item.previous = current;
					}
				}
			});
		}

		//If path to destination found
		if (current == destination) {
			//Save path
			this.path = [];
			if (!current.previous) {
				return;
			}
			do {
				this.path.push({...current});
				let prev = current;
				current = current.previous;
				prev.previous = undefined

			} while (current.previous)
			if (this.old_dest.i !== obj.current_cell.i || this.old_dest.k !== obj.current_cell.k) {
				this.second_dest = null;
			}
			
		} else { // No Solution
			let best = closed_cells[0];
			closed_cells.forEach((item) => {
				if (item.h < best.h) {
					best = item
				}
			})
			this.second_dest = best;
		}
	}

	followPath() {
		if (this.current_cell === null) return
		if (this.path !== undefined && this.path.length > 0) {
			if (distance(this.path[0], this) <= this.follow_radius) {
				let test_angle = col.calcAngle(self.plr, this);
				let test_facing = convertAngleToFacing(test_angle);
				if (this.facing !== test_facing) {
					this.facing = test_facing;
				}
				return;
			}
			let index = this.path.length - 1;
			let pos = this.path[index];
			for (let j = index; j >= 0; j--) {
				if (this.path[j].i === this.current_cell.i && this.path[j].k === this.current_cell.k) {
					this.path.splice(j, index);
					break;
				}
			}		
			
			let temp_obj = {
				center_x: pos.center_x,
				center_y: pos.center_y,
			}
			let prep_angle = col.calcAngle(temp_obj, this);
			let angle_obj = lockAngle(prep_angle, 8);
			let angle = angle_obj.angle;
			if (angle_obj.error_angle !== undefined) {
				angle = angle_obj.error_angle;
			}
			switch (angle) {
				case 0:
					this.move(RIGHT);
					break;
				case 90:
					this.move(DOWN);
					break;
				case 180:
					this.move(LEFT);
					break;
				case 270:
					this.move(UP);
					break;
				// Diagnols
				case 45:
					this.move(DOWN_RIGHT);
					break;
				case 135:
					this.move(DOWN_LEFT);
					break;
				case 225:
					this.move(UP_LEFT);
					break;
				case 315:
					this.move(UP_RIGHT);
					break;


				
			}
			if (this.center_x <= temp_obj.center_x + this.speed && this.center_x >= temp_obj.center_x - this.speed && this.center_y <= temp_obj.center_y + this.speed && this.center_y >= temp_obj.center_y - this.speed) {
				this.path.splice(index, 1);
			}
			this.idle = false;
		}
	}

	attack() {
		if (!this.can_attack) return
		this.attack_cooldown = this.attack_cooldown_tm;

		let hittables = [...self.current_room.contents];
		hittables.sort((a, b) => (distance(this, a) > distance(this, b)) ? 1 : -1);

		for (let i = 0; i < hittables.length; i++) {
			let item = hittables[i];
			if (item.hittable && item.visible && item.tangible && distance(this, item) <= this.attack_radius && item !== this) {
				let angle = col.calcAngle(this, item);
				let hit = false;
				if (!(this instanceof Player)) {
					playSound(swoosh)
				}

				if (angle >= 90 - this.attack_FOV && angle <= 90 + this.attack_FOV && this.facing === UP) {
		            hit = true;
		        } else if (angle >= 180 - this.attack_FOV && angle <= 180 + this.attack_FOV && this.facing === RIGHT) {
		            hit = true;
		        } else if (angle >= 270 - this.attack_FOV && angle <= 270 + this.attack_FOV && this.facing === DOWN) {
		            hit = true;
		        } else if ((angle >= 360 - this.attack_FOV || angle <= 0 + this.attack_FOV) && this.facing === LEFT) {
		            hit = true;
		        } else if (angle >= 45 - this.attack_FOV && angle <= 45 + this.attack_FOV && this.facing === UP_LEFT) {
		        	hit = true;
		        } else if (angle >= 135 - this.attack_FOV && angle <= 135 + this.attack_FOV && this.facing === UP_RIGHT) {
		        	hit = true;
		        } else if (angle >= 225 - this.attack_FOV && angle <= 225 + this.attack_FOV && this.facing === DOWN_RIGHT) {
		        	hit = true;
		        } else if (angle >= 315 - this.attack_FOV || angle <= 0 + this.attack_FOV && this.facing === DOWN_LEFT) {
		        	hit = true;
		        }


		        if (hit) {
		        	item.hit_by = this;
		        	item.hitEvent();
		        	break;
		        }
		    }
		}
	}

	poisonUpdate() {
		if (this.poison > 0) {
			if (this.poison_tm >= 100) {
				self.animate_poison = true;
				this.hp--;
				this.poison--;
				this.poison_tm = 0;
			} else {
				this.poison_tm++;
			}	
		}
	}

	updateHit() {
		//Apply knockback
		if (this.hit_tm > 0) {
			let knock_tm = Math.abs(this.hit_cooldown - this.knockback_tm);

			if (knock_tm <= this.hit_tm) {
				this.move(this.hit_direction, this.knockback)
				this.can_move = false;
			}

			this.hit_tm--;
		}
	}

	resetObstacles() {

		this.obstacles = new Array(Math.floor(canvas.width / self.cell_size));
		for (let i = 0; i < this.obstacles.length; i++) {
			this.obstacles[i] = new Array(Math.floor(canvas.height / self.cell_size));
			for (let j = 0; j < this.obstacles[i].length; j++) {
				this.obstacles[i][j] = false;
			}
		}
	}

	update() {
		if (!this.dead) {
			this.idle = true;
			this.can_move = true;
			this.moving = false;
			if (this.hp <= 0 && !this.dead) {
				this.deathEvent();
			}

			super.update();

			this.poisonUpdate();
			
			this.getCurrentCell();
			if (!(this instanceof Player)) {
				if (this.path !== undefined && this.path.length > 0) {
					if (self.plr.current_cell.i !== this.path[0].i || self.plr.current_cell.k !== this.path[0].k) {
						if (self.time % 15 === 0) {
							
							if (this.follow_player && self.plr.current_cell !== undefined) {
								this.findPath(self.plr);
							}
						}
					}
				} else {	
					if (this.follow_player && self.plr.current_cell !== undefined) {
						this.findPath(self.plr);
					}
				}

				if (this.idle && self.plr.visible && distance(self.plr, this) <= this.attack_radius) {
					if (this.attack_cooldown > 0) {
						this.attack_cooldown--
					} else {
						this.attack();
					}
				} else {
					this.attack_cooldown = this.attack_cooldown_tm
				}
			}
			this.current_cells = [];
			this.resetObstacles();
		}
	}

}

export class Player extends Entity {
	constructor(x, y, width, height, sprite) {
		super(x, y, width, height, sprite, skull_break, rat_death);
		this.controls = WASD;

		this.money = 0;

		this.base_speed = 3;
		this.speed = 3;
		this.base_hp = 4;
		this.hp = 2;
		this.sprint_mult = 2;
		this.sprint = 0;
		this.sprint_length = 250;
		this.sprint_cooling = false;
		this.attack_dmg = 1;
		this.attack_cooldown = 0;
		this.attack_cooldown_tm = 70;
		this.attack_radius = 80;
		this.attack_FOV = 35;
		this.interact_cooldown = 0;
		this.interact_cooldown_tm = 40;
		this.interact_radius = 80;
		this.interact_FOV = 45;

		this.follow_player = false;
		this.movable = true;
		this.hittable = true;
		this.room_access = true;

		this.can_interact = true;
		this.can_attack = true;
		this.holding = null;

		this.debug_mode = self.show_hitboxes;
	}

	checkControls() {
		//Move up
		if (keys[this.controls[0]]) {
			this.move(UP);
		}
		//Move left
		if (keys[this.controls[1]]) {
			this.move(LEFT);
		}
		//Move down
		if (keys[this.controls[2]]) {
			this.move(DOWN);
		}
		//Move right
		if (keys[this.controls[3]]) { 
			this.move(RIGHT);
		}

		//Sprint
		if (this.sprint >= this.sprint_length) {
			this.sprint_cooling = true;
		}
		if (keys[16] && this.sprint < this.sprint_length && !this.sprint_cooling) {
			this.speed = this.base_speed * this.sprint_mult;
			this.sprint++;
		} else {
			this.speed = this.base_speed;
			if (this.sprint > 0) {
				this.sprint--;
			} else {
				this.sprint_cooling = false;
			}
		}

		//Attack
		if (this.attack_cooldown > 0) {
			this.attack_cooldown--;
		}
		if (keys[74] && this.attack_cooldown === 0) {
			this.attack();
		}

		//Interact
		if (this.interact_cooldown > 0) {
			this.interact_cooldown--;
		}
		if (keys[85] && this.interact_cooldown === 0) {
			this.interact();
		}
	}

	attack() {
		playSound(swoosh);
		super.attack();
	}

	interact() {
		if (this.holding !== null) {
			this.dropObject();
		}
		this.interact_cooldown = this.interact_cooldown_tm;

		//put interact sfx here

		let interactables = [...self.current_room.contents];
		interactables.sort((a, b) => (distance(this, a) > distance(this, b)) ? 1 : -1);

		for (let i = 0; i < interactables.length; i++) {
			let item = interactables[i];
			if (item.interactable && item.visible && item.tangible && distance(this, item) <= this.interact_radius) {
				let angle = col.calcAngle(this, item);
				let interact = false;

				if (angle >= 90 - this.interact_FOV && angle <= 90 + this.interact_FOV && this.facing === UP) {
		            interact = true;
		        } else if (angle >= 180 - this.interact_FOV && angle <= 180 + this.interact_FOV && this.facing === RIGHT) {
		            interact = true;
		        } else if (angle >= 270 - this.interact_FOV && angle <= 270 + this.interact_FOV && this.facing === DOWN) {
		            interact = true;
		        } else if ((angle >= 360 - this.interact_FOV || angle <= 0 + this.interact_FOV) && this.facing === LEFT) {
		            interact = true;
		        }	

		        if (interact && (this.can_interact || (item instanceof Pedestal && item.holding === null))) {
		        	item.interactEvent(this);
		        	break;
		        }
		    }
			
		}
	}

	dropObject() {
		let obj = {
			x: null,
			y: null,
			width: this.holding.width,
			height: this.holding.height
		}
		let min_no_collide_dist = 1;
		switch (this.facing) {
			case UP:
				obj.x = this.center_x - obj.width / 2;
				obj.y = this.y - obj.height - min_no_collide_dist;
				break;
			case RIGHT:
				obj.x = this.right + min_no_collide_dist;
				obj.y = this.center_y - obj.height / 2;
				break;
			case DOWN:
				obj.x = this.center_x - obj.width / 2;
				obj.y = this.bottom + min_no_collide_dist;
				break;
			case LEFT:
				obj.x = this.x - obj.width - min_no_collide_dist;
				obj.y = this.center_y - obj.height / 2;
				break;
		}
		obj.right = obj.x + obj.width;
		obj.bottom = obj.y + obj.height;
		let col_obj = {...obj};
		col_obj.x += min_no_collide_dist;
		col_obj.right -= min_no_collide_dist;
		col_obj.y += min_no_collide_dist;
		col_obj.bottom -= min_no_collide_dist;

		let collided = false;
		let isEmptyPedestal = false
		for (let i = 0; i < self.current_room.contents.length; i++) {
			let item = self.current_room.contents[i]
			if (item !== this) {			
				if (col.basic(col_obj, item) && !item.is_trigger) {
					if (item instanceof Pedestal && item.holding === null) {
						isEmptyPedestal = true;
					}
					collided = true;
					break;
				}
			}
		}
		if (collided) {
			if (!isEmptyPedestal) {
				playSound(error_sfx);
			}
		} else {
			this.holding.x = obj.x;
			this.holding.y = obj.y;
			this.holding.dropEvent();
			this.holding = null;
			this.can_interact = true;
		}
	}

	hitEvent() {
		super.hitEvent();
		if (this.hit_by.poison_lvl > 0) {
			this.poison = this.hit_by.poison_lvl;
		}
	}

	holdingUpdate() {
		if (this.holding !== null) {
			let obj = this.holding;
			obj.x = this.x + obj.hold_offset_x + this.sprite.x;
			obj.y = this.y + obj.hold_offset_y + this.sprite.y;
		}
	}

	updateFacing() {
		switch (this.facing) {
			case DOWN:
				this.sprite.img = plr_idle_down;
				break;
			case LEFT:
				this.sprite.img = plr_idle_left;
				break;
			case UP:
				this.sprite.img = plr_idle_up;
				break;
			case RIGHT:
				this.sprite.img = plr_idle_right;
				break;
		}
	}

	update() {
		this.can_interact = true;
		this.moving = false;
		if (this.holding !== null) {
			this.can_interact = false
		}
		super.update();

		this.holdingUpdate();

	}
}