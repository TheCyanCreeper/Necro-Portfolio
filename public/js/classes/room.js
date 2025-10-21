//Canvas
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

import {default as col} from'../collisions.js';

export class Room {
	// contents: array with all objects to appear in room
	// neighbors: array of rooms adjacent to this one
	constructor(contents, backdrop, backdrop_width, backdrop_height, backdrop_mode, music, daytime, min_decor_count, max_decor_count) {
		this.contents = contents;
		this.entities = self.entities;
		self.room_objects = [];
		self.entities = [];
		this.neighbors = [];
		this.background = new Sprite(backdrop, 0, 0, backdrop_width, backdrop_height);
		this.background_mode = backdrop_mode;
		this.music = music;
		if (daytime === undefined) {
			this.time = NIGHT;
		} else {
			this.time = daytime;
		}
		this.min_decor_count = min_decor_count;
		this.max_decor_count = max_decor_count;
		if (this.min_decor_count < 0) {
			this.min_decor_count = 0
		}
		if (this.max_decor_count < this.min_decor_count) {
			this.max_decor_count = this.min_decor_count;
		}

		this.map_offset = 0;
		this.has_sand = false;

		this.placeDecor();
		
	}

	getDecorImg() {
		let img;
		if (this.background.img === grass_tile) {
			let rng = rngRange(1, 4)
			switch(rng) {
				case 1:
					img = grass1_img;
					break;
				case 2:
					img = grass2_img;
					break;
				case 3:
					img = grass3_img;
					break;
				case 4:
					img = grass4_img;
					break;
			}
		}
		return img;
	}

	placeDecor() {
		if (this.max_decor_count < 1 || !defined(this.max_decor_count)) return;
		let decor_size = 64;
		let col_height = 16;
		let amount = rngRange(this.min_decor_count, this.max_decor_count);
		for (let i = 0; i < amount; i++) {
			if (i > 50) {
				alert();
			}
			let can_place_here = false;
			let decor;
			let max_iterations = 100;
			let j = 0;
			while (!can_place_here && j < max_iterations) {
				let x = rngRange(0, canvas.width - decor_size);
				let y = rngRange(0, canvas.height - decor_size);

				let loot_chance = rngRange(1, 5)
				let loot = [];
				if (loot_chance === 1) {
					loot = [new Coin()]
				}
				
				decor = new Breakable(x, y, decor_size, col_height, new Sprite(this.getDecorImg(), 0, col_height - decor_size, decor_size, decor_size, false), grass_break, null, loot)
				decor.is_trigger = true;
				decor.is_obstacle = false;
				can_place_here = true;
				this.contents.forEach((item) => {
					if (col.basic(item, decor)) {
						can_place_here = false;
					}
				})
				j++
			}
			if (j < max_iterations) {
				this.contents.push(decor);
				self.room_objects = [];
			}
		}
	}

	changeRoom(newRoom) {
		//Check for music change
		if (self.current_room.music !== newRoom.music) {
			self.current_room.music.pause();
			self.current_room.music.currentTime = 0;

			newRoom.music.play();
		}

		removeElem(self.current_room.contents, self.plr);
		newRoom.contents.push(self.plr);
		removeElem(self.current_room.entities, self.plr);
		newRoom.entities.push(self.plr);
		if (self.plr.holding !== null) {
			removeElem(self.current_room.contents, self.plr.holding);
			newRoom.contents.push(self.plr.holding);
		}

		self.current_room = newRoom;
		self.just_travelled = true;
	}

	checkTravel(obj) {
		let success = false;
		if (obj.room_access) {
			self.current_room.neighbors.forEach((item, i) => {
				if (item !== undefined && !success) {
					switch (i) {
						//Top
						case 0:
							if (obj.y <= 0) {
								success = true;
								obj.y = canvas.height - obj.height - 1;
							}
							break;
						//Right
						case 1:
							if (obj.right >= canvas.width) {
								success = true;
								obj.x = 1;
							}
							break;
						//Bottom
						case 2:
							if (obj.bottom >= canvas.height) {
								success = true;
								obj.y = 1;
							}
							break;
						//Left
						case 3:
							if (obj.x <= 0) {
								success = true;
								obj.x = canvas.width - obj.width - 1;
							}
							break;
					}
					if (success) {
						this.changeRoom(item);
					}
				}
			});
		}
	}

	draw() {
		if (this.background_mode === FULL) {
			this.background.draw(0, 0);
			if (!this.has_sand) return;
			//c.drawImage(sand_map, 0, 0, canvas.width, canvas.height);
			for (let i = 0; i < (canvas.width / sand_map.width) + 1; i++) {
				for (let k = 0; k < canvas.height / sand_map.height; k++) {
					c.drawImage(sand_map, i * sand_map.width - sand_map.width + this.map_offset, k * sand_map.height);
				}
			}
			this.map_offset++;
			if (this.map_offset > sand_map.width) {
				this.map_offset = 0;
			}
		} else if (this.background_mode === TILE) {
			let tile = this.background;
			for (let i = 0; i < canvas.width / tile.width; i++) {
				for (let k = 0; k < canvas.height / tile.height; k++) {
					tile.draw(tile.x + i * tile.width, tile.y + k * tile.height);
				}
			}
		}
		
	}
}