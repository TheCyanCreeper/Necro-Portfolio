//=====TO DO LIST=====
// Make enemies collide with each other so they don't clump
// Add inventory
// Add sprint visualization

// Named constants
const CANVAS_WIDTH = 1536;
const CANVAS_HEIGHT = 896;
const CELL_SIZE = 32;
const STARTING_SCROLL_Y = 64;
const UPDATE_INTERVAL = 10;
const POISON_ANIMATE_DURATION = 100;
const SPRITE_OFFSET_X = -5;
const SPRITE_OFFSET_Y = -27;
const SPRITE_WIDTH = 64;
const SPRITE_HEIGHT = 64;
const HP_ICON_SIZE = 48;
const HP_OFFSET_X = 8;
const HP_OFFSET_Y = -56;
const COIN_OFFSET_X = -48;
const COIN_OFFSET_Y = 8;
const FONT_SIZE_DEATH = 100;
const RESTART_BTN_WIDTH = 259;
const RESTART_BTN_HEIGHT = 51;
const TITLE_TEXT_WIDTH = 469;
const TITLE_TEXT_HEIGHT = 125;
const TITLE_TEXT_Y = 128;
const PLAY_TEXT_WIDTH = 191;
const PLAY_TEXT_HEIGHT = 87;
const PLAY_TEXT_Y = 512;
const DEBUG_RECT_WIDTH = 128;
const DEBUG_RECT_HEIGHT = 96;
const DEBUG_TEXT_Y_OFFSET = 12;
const SHADOW_BLUR = 10;
const PARTICLE_WIDTH = 128;
const PARTICLE_HEIGHT = 128;
const PARTICLE_OFFSET_X = -32;
const PARTICLE_OFFSET_Y = -70;
const PARTICLE_FRAME_COUNT = 5;
const PARTICLE_FRAME_DURATION = 12;
const ROOM_1_RAT_X = 900;
const ROOM_1_RAT_Y = 575;
const ROOM_1_RAT_SIZE = 64;
const ROOM_1_TREE_SIZE = 25;
const ROOM_1_TREE_OFFSET_X = -52;
const ROOM_1_TREE_OFFSET_Y = -231;
const ROOM_1_TREE_WIDTH = 128;
const ROOM_1_TREE_HEIGHT = 256;
const ROOM_1_SKULL_X = 290;
const ROOM_1_SKULL_Y = 150;
const ROOM_1_SKULL_WIDTH = 54;
const ROOM_1_SKULL_HEIGHT = 32;
const ROOM_1_HP_X1 = 350;
const ROOM_1_HP_Y1 = 650;
const ROOM_1_HP_X2 = 1000;
const ROOM_1_HP_Y2 = 450;
const ROOM_1_COIN_X = 400;
const ROOM_1_COIN_Y = 560;
const ROOM_1_GRID_WIDTH = 256;
const ROOM_1_GRID_HEIGHT = 256;
const ROOM_1_GRID_COLS = 8;
const ROOM_1_GRID_ROWS = 12;
const ROOM_2_WALL_X1 = 400;
const ROOM_2_WALL_Y1 = 500;
const ROOM_2_WALL_X2 = 464;
const ROOM_2_WALL_Y2 = 500;
const ROOM_2_WALL_SIZE = 64;
const ROOM_2_WALL_HEIGHT = 128;
const ROOM_2_TREE_X = 500;
const ROOM_2_TREE_Y = 600;
const ROOM_2_SKULL_X1 = 200;
const ROOM_2_SKULL_X2 = 300;
const ROOM_2_SKULL_X3 = 400;
const ROOM_2_SKULL_Y = 150;
const ROOM_2_BLOODSTONE_X = 750;
const ROOM_2_BLOODSTONE_Y = 750;
const ROOM_2_KEY_X = 1000;
const ROOM_2_KEY_Y = 450;
const ROOM_2_GRID_COLS = 16;
const ROOM_2_GRID_ROWS = 20;
const ROOM_3_SCORPION_X = 500;
const ROOM_3_SCORPION_Y = 575;
const ROOM_3_SCORPION_SIZE = 64;
const ROOM_3_SCORPION_HP = 5;
const ROOM_3_VASE_WIDTH = 52;
const ROOM_3_VASE_HEIGHT = 24;
const ROOM_3_VASE_OFFSET_X = -6;
const ROOM_3_VASE_OFFSET_Y = -40;
const ROOM_3_VASE_X1 = 500;
const ROOM_3_VASE_Y1 = 300;
const ROOM_3_VASE_X2 = 1000;
const ROOM_3_VASE_Y2 = 200;
const ROOM_3_VASE_X3 = 600;
const ROOM_3_VASE_Y3 = 600;
const ROOM_3_VASE_X4 = 1400;
const ROOM_3_VASE_Y4 = 100;
const ROOM_3_OASIS_X = 200;
const ROOM_3_OASIS_Y = 200;
const ROOM_3_OASIS_WIDTH = 108;
const ROOM_3_OASIS_HEIGHT = 120;
const ROOM_3_OASIS_OFFSET_X = -8;
const ROOM_3_OASIS_OFFSET_Y = -4;
const ROOM_3_PALM_X1 = 180;
const ROOM_3_PALM_Y1 = 225;
const ROOM_3_PALM_X2 = 320;
const ROOM_3_PALM_Y2 = 315;
const ROOM_3_CACTUS_X1 = 800;
const ROOM_3_CACTUS_Y1 = 515;
const ROOM_3_CACTUS_X2 = 1350;
const ROOM_3_CACTUS_Y2 = 315;
const ROOM_3_CACTUS_WIDTH = 32;
const ROOM_3_CACTUS_OFFSET_X = -8;
const ROOM_3_CACTUS_OFFSET_Y = -112;
const ROOM_3_CACTUS_SPRITE_WIDTH = 48;
const ROOM_3_CACTUS_SPRITE_HEIGHT = 144;
const ROOM_3_PEDESTAL_X = 1200;
const ROOM_3_PEDESTAL_Y = 650;
const ROOM_3_PEDESTAL_WIDTH = 40;
const ROOM_3_PEDESTAL_HEIGHT = 12;
const ROOM_3_PEDESTAL_OFFSET_X = -12;
const ROOM_3_PEDESTAL_OFFSET_Y = -52;
const PLAYER_X = 100;
const PLAYER_Y = 700;
const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 32;
const PLAYER_SPRITE_OFFSET_Y = -96;
const PLAYER_SPRITE_HEIGHT = 128;
const PLAYER_DEBUG_HP = 10;
const PLAYER_DEBUG_HP_CURRENT = 8;
const PLAYER_SPRINT_MULT = 4;
const PLAYER_SPRINT_LENGTH = 99999999;

function noAlias(exports) {
    Object.entries(exports).forEach(([name, exported]) => window[name] = exported);
}

//Imports
import {default as col} from './collisions.js';
import * as type_exports from './types.js';
noAlias(type_exports);
let test = NONE === 'test'
import * as resource_exports from './resources.js';
noAlias(resource_exports);
import * as control_exports from './controls.js'
noAlias(control_exports);
import * as tool_exports from './tools.js';
noAlias(tool_exports);

// - Import Classes
import * as base_exports from './classes/base.js';
noAlias(base_exports);
import * as asset_exports from './classes/asset.js';
noAlias(asset_exports);
import * as entity_exports from './classes/entity.js';
noAlias(entity_exports);
import * as other_exports from './classes/other.js';
noAlias(other_exports);
import * as item_exports from './classes/item.js';
noAlias(item_exports);
import * as room_exports from './classes/room.js';
noAlias(room_exports);

//Options
self.mode = NORMAL;
self.mute_music = false;
self.show_hitboxes = false;
self.show_grid = false;
self.show_path = false;

//Global vars
let game_paused = true;

self.time = 0;
self.just_travelled = false;

self.room_objects = [];
self.entities = [];
self.loot_table = [];
self.particles = [];

self.cell_size = CELL_SIZE;
self.grid = [];

//Poison vars
self.animate_poison = false;
let poison_animate_duration = POISON_ANIMATE_DURATION;
let poison_animate = 0;

//Canvas
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

//Canvas Options
c.lineJoin = 'round'
c.textBaseline = 'top';
c.imageSmoothingEnabled = true;

self.plr = new Player(PLAYER_X, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT, new Sprite(plr_idle_down, 0, PLAYER_SPRITE_OFFSET_Y, PLAYER_WIDTH, PLAYER_SPRITE_HEIGHT, false));
if (self.mode === DEBUG) {
    self.plr.sprint_mult = PLAYER_SPRINT_MULT;
    self.plr.sprint_length = PLAYER_SPRINT_LENGTH;
    self.plr.base_hp = PLAYER_DEBUG_HP
    self.plr.hp = PLAYER_DEBUG_HP_CURRENT
} else if (self.mode === GOD) {
    self.plr.invincible = true;
}

let restart_btn = new Button(restart_text_img, canvas.width/2 - RESTART_BTN_WIDTH/2, canvas.height / 2 + STARTING_SCROLL_Y, RESTART_BTN_WIDTH, RESTART_BTN_HEIGHT, () => {location.reload();})

entities = [];
room_objects = [];

//==Room 1 Objects==
let rat = new Entity(ROOM_1_RAT_X, ROOM_1_RAT_Y, ROOM_1_RAT_SIZE, ROOM_1_RAT_SIZE, new Sprite(undead_rat_img, 0, 0, ROOM_1_RAT_SIZE, ROOM_1_RAT_SIZE, false), skull_break, rat_death);

let pine_tree1 = new Asset(800, 700, ROOM_1_TREE_SIZE, ROOM_1_TREE_SIZE, new Sprite(pine_tree_img, ROOM_1_TREE_OFFSET_X, ROOM_1_TREE_OFFSET_Y, ROOM_1_TREE_WIDTH, ROOM_1_TREE_HEIGHT, false), wood_thud);
let pine_tree2 = new Asset(1000, 200, ROOM_1_TREE_SIZE, ROOM_1_TREE_SIZE, new Sprite(pine_tree_img, ROOM_1_TREE_OFFSET_X, ROOM_1_TREE_OFFSET_Y, ROOM_1_TREE_WIDTH, ROOM_1_TREE_HEIGHT, false), wood_thud);
let pine_tree3 = new Asset(1350, 550, ROOM_1_TREE_SIZE, ROOM_1_TREE_SIZE, new Sprite(pine_tree_img, ROOM_1_TREE_OFFSET_X, ROOM_1_TREE_OFFSET_Y, ROOM_1_TREE_WIDTH, ROOM_1_TREE_HEIGHT, false), wood_thud);

let rng = Math.floor(Math.random() * 2) + 1;
let skull_type = skull_cracked_img;
// if (rng === 2) {
//     skull_type = skull_cleaved_img;
// }
// let skull = new Breakable(700, 350, ROOM_1_SKULL_WIDTH, ROOM_1_SKULL_HEIGHT, new Sprite(skull_img, SPRITE_OFFSET_X, SPRITE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), skull_break, skull_type);
let skull4 = new Breakable(ROOM_1_SKULL_X, ROOM_1_SKULL_Y, ROOM_1_SKULL_WIDTH, ROOM_1_SKULL_HEIGHT, new Sprite(skull_img, SPRITE_OFFSET_X, SPRITE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), thunder, missing_texture);
skull4.oldHitEvent = skull4.hitEvent;
skull4.hitEvent = () => {
    if (!skull4.broken) {
        skull4.oldHitEvent();
        self.particles.push(new Particle(lightning_img, skull4.x + skull4.sprite.x + PARTICLE_OFFSET_X, skull4.y + skull4.sprite.y + PARTICLE_OFFSET_Y, PARTICLE_WIDTH, PARTICLE_HEIGHT, true, PARTICLE_FRAME_COUNT, PARTICLE_FRAME_DURATION));
    }
}
let health_item1 = new Item(ROOM_1_HP_X1, ROOM_1_HP_Y1, HP_ICON_SIZE, HP_ICON_SIZE, new Sprite(hp_icon, 0, 0, HP_ICON_SIZE, HP_ICON_SIZE, false), collectHP);
let health_item2 = new Item(ROOM_1_HP_X2, ROOM_1_HP_Y2, HP_ICON_SIZE, HP_ICON_SIZE, new Sprite(hp_icon, 0, 0, HP_ICON_SIZE, HP_ICON_SIZE, false), collectHP);

let coin1 = new Coin(ROOM_1_COIN_X, ROOM_1_COIN_Y);

let test_room = new Room(room_objects, grass_tile, ROOM_1_GRID_WIDTH, ROOM_1_GRID_HEIGHT, TILE, forest_music, NIGHT, ROOM_1_GRID_COLS, ROOM_1_GRID_ROWS);

//==Room 2 Objects==

let wall = new Body(ROOM_2_WALL_X1, ROOM_2_WALL_Y1, ROOM_2_WALL_SIZE, ROOM_2_WALL_SIZE, new Sprite('#666622', 0, 0, ROOM_2_WALL_SIZE, ROOM_2_WALL_SIZE, false));
let wall2 = new Body(ROOM_2_WALL_X2, ROOM_2_WALL_Y2, ROOM_2_WALL_SIZE, ROOM_2_WALL_SIZE, new Sprite('#555500', 0, -ROOM_2_WALL_SIZE, ROOM_2_WALL_SIZE, ROOM_2_WALL_HEIGHT, false));

let pine_tree4 = new Asset(ROOM_2_TREE_X, ROOM_2_TREE_Y, ROOM_1_TREE_SIZE, ROOM_1_TREE_SIZE, new Sprite(pine_tree_img, ROOM_1_TREE_OFFSET_X, ROOM_1_TREE_OFFSET_Y, ROOM_1_TREE_WIDTH, ROOM_1_TREE_HEIGHT, false), wood_thud);

rng = Math.floor(Math.random() * 2) + 1;
skull_type = skull_cracked_img;
if (rng === 2) {
    skull_type = skull_cleaved_img;
}
let skull1 = new Breakable(ROOM_2_SKULL_X1, ROOM_2_SKULL_Y, ROOM_1_SKULL_WIDTH, ROOM_1_SKULL_HEIGHT, new Sprite(skull_img, SPRITE_OFFSET_X, SPRITE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), skull_break, skull_type);
rng = Math.floor(Math.random() * 2) + 1;
// skull_type = skull_cracked_img;
// if (rng === 2) {
//     skull_type = skull_cleaved_img;
// }
let skull2 = new Breakable(ROOM_2_SKULL_X2, ROOM_2_SKULL_Y, ROOM_1_SKULL_WIDTH, ROOM_1_SKULL_HEIGHT, new Sprite(skull_img, SPRITE_OFFSET_X, SPRITE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), thunder, missing_texture);
skull2.oldHitEvent = skull2.hitEvent;
skull2.hitEvent = () => {
    if (!skull2.broken) {
        skull2.oldHitEvent();
        self.particles.push(new Particle(lightning_img, skull4.x + skull4.sprite.x + PARTICLE_OFFSET_X, skull4.y + skull4.sprite.y + PARTICLE_OFFSET_Y, PARTICLE_WIDTH, PARTICLE_HEIGHT, true, PARTICLE_FRAME_COUNT, PARTICLE_FRAME_DURATION));
    }
}

rng = Math.floor(Math.random() * 2) + 1;
skull_type = skull_cracked_img;
if (rng === 2) {
    skull_type = skull_cleaved_img;
}
let skull3 = new Breakable(ROOM_2_SKULL_X3, ROOM_2_SKULL_Y, ROOM_1_SKULL_WIDTH, ROOM_1_SKULL_HEIGHT, new Sprite(skull_img, SPRITE_OFFSET_X, SPRITE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), skull_break, skull_type);

let bloodstone = new Bloodstone(ROOM_2_BLOODSTONE_X, ROOM_2_BLOODSTONE_Y);

let key1 = new Item(ROOM_2_KEY_X, ROOM_2_KEY_Y, HP_ICON_SIZE, HP_ICON_SIZE, new Sprite(key_img, 0, 0, HP_ICON_SIZE, HP_ICON_SIZE, false));

let test_room2 = new Room(room_objects, grass_tile, ROOM_1_GRID_WIDTH, ROOM_1_GRID_HEIGHT, TILE, forest_music, NIGHT, ROOM_2_GRID_COLS, ROOM_2_GRID_ROWS)

//==Room 3 Objects==

let scorpion = new Entity(ROOM_3_SCORPION_X, ROOM_3_SCORPION_Y, ROOM_3_SCORPION_SIZE, ROOM_3_SCORPION_SIZE, new Sprite(scorpion_img, 0, 0, ROOM_3_SCORPION_SIZE, ROOM_3_SCORPION_SIZE, false), skull_break, rat_death);
scorpion.max_hp = ROOM_3_SCORPION_HP;
scorpion.hp = scorpion.max_hp;
scorpion.poison_lvl = 1;

self.loot_table = [new Coin()];
let vase1 = new Breakable(ROOM_3_VASE_X1, ROOM_3_VASE_Y1, ROOM_3_VASE_WIDTH, ROOM_3_VASE_HEIGHT, new Sprite(vase_img, ROOM_3_VASE_OFFSET_X, ROOM_3_VASE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), vase_break, null, self.loot_table);
self.loot_table = [scorpion]
let vase2 = new Breakable(ROOM_3_VASE_X2, ROOM_3_VASE_Y2, ROOM_3_VASE_WIDTH, ROOM_3_VASE_HEIGHT, new Sprite(vase_alt_img, ROOM_3_VASE_OFFSET_X, ROOM_3_VASE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), vase_break, null, self.loot_table);
self.loot_table = [new Item(-2, -2, HP_ICON_SIZE, HP_ICON_SIZE, new Sprite(hp_icon, 0, 0, HP_ICON_SIZE, HP_ICON_SIZE, false), collectHP)];
let vase3 = new Breakable(ROOM_3_VASE_X3, ROOM_3_VASE_Y3, ROOM_3_VASE_WIDTH, ROOM_3_VASE_HEIGHT, new Sprite(vase_img, ROOM_3_VASE_OFFSET_X, ROOM_3_VASE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), vase_break, null, self.loot_table);
self.loot_table = [new Bloodstone(-2, -2)]
let vase4 = new Breakable(ROOM_3_VASE_X4, ROOM_3_VASE_Y4, ROOM_3_VASE_WIDTH, ROOM_3_VASE_HEIGHT, new Sprite(vase_alt_img, ROOM_3_VASE_OFFSET_X, ROOM_3_VASE_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), vase_break, null, self.loot_table);

let oasis = new Asset(ROOM_3_OASIS_X, ROOM_3_OASIS_Y, ROOM_3_OASIS_WIDTH, ROOM_3_OASIS_HEIGHT, new Sprite(oasis_img, ROOM_3_OASIS_OFFSET_X, ROOM_3_OASIS_OFFSET_Y, PARTICLE_WIDTH, PARTICLE_WIDTH, false), null);
oasis.is_background = true;
let palm_tree1 = new Asset(ROOM_3_PALM_X1, ROOM_3_PALM_Y1, ROOM_1_TREE_SIZE, ROOM_1_TREE_SIZE, new Sprite(palm_tree_img, ROOM_1_TREE_OFFSET_X, ROOM_1_TREE_OFFSET_Y, ROOM_1_TREE_WIDTH, ROOM_1_TREE_HEIGHT, false), wood_thud);
let palm_tree2 = new Asset(ROOM_3_PALM_X2, ROOM_3_PALM_Y2, ROOM_1_TREE_SIZE, ROOM_1_TREE_SIZE, new Sprite(palm_tree_img, ROOM_1_TREE_OFFSET_X, ROOM_1_TREE_OFFSET_Y, ROOM_1_TREE_WIDTH, ROOM_1_TREE_HEIGHT, false), wood_thud);
let cactus = new Asset(ROOM_3_CACTUS_X1, ROOM_3_CACTUS_Y1, ROOM_3_CACTUS_WIDTH, ROOM_3_CACTUS_WIDTH, new Sprite(cactus_img, ROOM_3_CACTUS_OFFSET_X, ROOM_3_CACTUS_OFFSET_Y, ROOM_3_CACTUS_SPRITE_WIDTH, ROOM_3_CACTUS_SPRITE_HEIGHT, false), wood_thud);
let cactus2 = new Asset(ROOM_3_CACTUS_X2, ROOM_3_CACTUS_Y2, ROOM_3_CACTUS_WIDTH, ROOM_3_CACTUS_WIDTH, new Sprite(cactus_img, ROOM_3_CACTUS_OFFSET_X, ROOM_3_CACTUS_OFFSET_Y, ROOM_3_CACTUS_SPRITE_WIDTH, ROOM_3_CACTUS_SPRITE_HEIGHT, false), wood_thud);

let pedestal = new Pedestal(ROOM_3_PEDESTAL_X, ROOM_3_PEDESTAL_Y, ROOM_3_PEDESTAL_WIDTH, ROOM_3_PEDESTAL_HEIGHT, new Sprite(pedestal_img, ROOM_3_PEDESTAL_OFFSET_X, ROOM_3_PEDESTAL_OFFSET_Y, SPRITE_WIDTH, SPRITE_HEIGHT, false), null, pedestal_active_img);

let test_room3 = new Room(room_objects, desert_background, canvas.width, canvas.height, FULL, desert_music, DAY)
test_room3.has_sand = true

//==Title Objects==

let title_text = new Sprite(title_text_img, canvas.width / 2 - TITLE_TEXT_WIDTH / 2, TITLE_TEXT_Y, TITLE_TEXT_WIDTH, TITLE_TEXT_HEIGHT, false)
room_objects.push(title_text);
let play_text = new Button(play_text_img, canvas.width / 2 - PLAY_TEXT_WIDTH / 2, PLAY_TEXT_Y, PLAY_TEXT_WIDTH, PLAY_TEXT_HEIGHT, playGame);
room_objects.push(play_text);

let title_screen = new Room(room_objects, title_background, canvas.width, canvas.height, FULL, title_music, DAY);

//Set Room Relationships
test_room.neighbors[1] = test_room2;
test_room.neighbors[0] = test_room3;
test_room2.neighbors[3] = test_room;
test_room3.neighbors[2] = test_room;

self.current_room = title_screen;
// self.current_room.contents.push(self.plr);
// self.current_room.entities.push(self.plr);

function addNeighbors(cell, temp_grid) {
    let cols = temp_grid.length - 1;
    let rows = temp_grid[0].length - 1;

    if (cell.i > 0) {
        cell.neighbors.push(temp_grid[cell.i - 1][cell.k])
    }
    if (cell.i < cols) {
        cell.neighbors.push(temp_grid[cell.i + 1][cell.k])
    }
    if (cell.k > 0) {
        cell.neighbors.push(temp_grid[cell.i][cell.k - 1])
    }
    if (cell.k < rows) {
        cell.neighbors.push(temp_grid[cell.i][cell.k + 1])
    }
    //Diagonals
    if (cell.i > 0 && cell.k > 0) {
        cell.neighbors.push(temp_grid[cell.i - 1][cell.k - 1])
    }
    if (cell.i < cols && cell.k > 0) {
        cell.neighbors.push(temp_grid[cell.i + 1][cell.k - 1])
    }
    if (cell.k < rows && cell.i < cols) {
        cell.neighbors.push(temp_grid[cell.i + 1][cell.k + 1])
    }
    if (cell.k < rows && cell.i > 0) {
        cell.neighbors.push(temp_grid[cell.i - 1][cell.k + 1])
    }
}

function createGrid(size) {
    //Create grid array
    let temp_grid = new Array(Math.ceil(canvas.width / size));
    for (let i = 0; i < temp_grid.length; i++) {
        temp_grid[i] = new Array(Math.ceil(canvas.height / size));
    }

    //Populate grid with cells
    temp_grid.forEach((item, i) => {
        for (let k = 0; k < item.length; k++) {    
            item[k] = {
                x: i * size,
                y: k * size,
                i: i,
                k: k,
                center_x: i * size + Math.floor(size / 2),
                center_y: k * size + Math.floor(size / 2),
                f: 0,
                g: 0,
                h: 0,
                empty: true,
                always_full: false,
                active: true,
                neighbors: []
            };
        }
    });

    temp_grid.forEach((item, i) => {
        for (let k = 0; k < item.length; k++) {    
            addNeighbors(item[k], temp_grid)
        }
    });

    return temp_grid;
}

function markCells() {
    self.current_room.contents.forEach((item) => {
        if ((item.is_obstacle && item.tangible) || item instanceof Entity) {
            let start_x = Math.floor(item.x / self.cell_size) * self.cell_size;
            let start_y = Math.floor(item.y / self.cell_size) * self.cell_size;
            for (let i = start_x; i < item.x + item.width + self.cell_size; i += self.cell_size) {
                for (let j = start_y; j < item.y + item.height + self.cell_size; j += self.cell_size) {
                    if (i < item.x + item.width && j < item.y + item.height) {
                        let col = Math.floor(i / self.cell_size);
                        let row = Math.floor(j / self.cell_size);
                        if (col >= 0 && row >= 0 && col < Math.floor(canvas.width / self.cell_size) && row < Math.floor(canvas.height / self.cell_size)) {
                            self.grid[col][row].active = true;
                            if (item instanceof Entity) {
                                item.current_cells.push(self.grid[col][row]);
                            } else {
                                self.grid[col][row].active = false;
                                self.current_room.contents.forEach((itemZ) => {
                                    if (itemZ instanceof Entity) {
                                        let cell_width = Math.floor(itemZ.width / self.cell_size);
                                        let cell_height = Math.floor(itemZ.height / self.cell_size);
                                        let cell_width_offset = Math.floor(cell_width / 2);
                                        let cell_height_offset = Math.floor(cell_height / 2);
                                        //Mark obstacles with extra space based on entity size
                                        for (let k = -cell_width_offset; k < cell_width; k++) {
                                            for (let l = -cell_height_offset; l < cell_height; l++) {
                                                if (col + k >= 0 && row + l >= 0 && col + k < Math.floor(canvas.width / self.cell_size) && row + l < Math.floor(canvas.height / self.cell_size)) {
                                                    itemZ.obstacles[col + k][row + l] = true;
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    });
}

//Load canvas button
document.querySelector('#play-btn').onclick = () => {
    document.querySelector('#play-btn').hidden = true;
    self.current_room.music.play();
    canvas.hidden = false;
    game_paused = false;
    window.scrollTo(0, STARTING_SCROLL_Y)
}

function playGame() {
    self.current_room.changeRoom(test_room);
}

function collectHP() {
    let success = false;
    if (self.plr.hp < self.plr.base_hp) {
        playSound(collect_hp);
        self.plr.hp++;
        success = true;
    }
    return success;
}

function checkAllCollisions() {
    let unchecked = [...self.current_room.contents];
    
    self.current_room.contents.forEach((item, i) => {
        if (item.tangible) {
            unchecked = [...self.current_room.contents];
            unchecked.splice(0, i + 1);
            if (unchecked.length > 0) {
                unchecked.forEach((itemZ, k) => {
                    if (item.tangible && itemZ.tangible && (item.movable || itemZ.movable) && !(item instanceof Entity && itemZ instanceof Entity && !((item instanceof Player) || (itemZ instanceof Player)))) {
                        if (item.movable) {
                            col.rect(item, itemZ);
                        } else {
                            col.rect(itemZ, item);
                        }
                    }
                });
            }
        }
    });
}

function update() {
    if (self.plr.dead) {
        restart_btn.update()
    }

    if (game_paused) return;

    if (self.mute_music || self.plr.dead) {
        self.current_room.music.pause();
    }

    self.current_room.contents.forEach((item) => {
        if (typeof item.update === 'function') {
            item.update();
        }
    });
    self.particles.forEach((item) => {
        item.update();
    });

    markCells();

    checkAllCollisions();

    self.plr.checkControls();
    self.plr.updateFacing();

    self.just_travelled = false;
    self.current_room.entities.forEach((item) => {
        //Check room travel
        self.current_room.checkTravel(item);
        if (item.follow_player && !self.just_travelled) {
            item.followPath();
        }
        item.updateHit();
    });

    //Trigger poison animation
    if (self.animate_poison) {
        poison_animate = poison_animate_duration;
        self.animate_poison = false;
    }

    draw();
    self.time++;
}

function drawHealth() {
    let health = new Sprite(CELL_SIZE, canvas.height + HP_OFFSET_Y + HP_ICON_SIZE, SPRITE_WIDTH, SPRITE_HEIGHT);
    let icon_count = Math.ceil(self.plr.base_hp / 2);
    for (let i = 0; i < icon_count; i++) {
        let image = hp_empty_icon;
        if (i + 1 <= self.plr.hp / 2) {
            if (self.plr.poison > 0) {
                image = hp_poison_icon
            } else {
                image = hp_icon;
            }
        } else if (i + 0.5 <= self.plr.hp / 2) {
            if (self.plr.poison > 0) {
                image = hp_poison_half_icon
            } else {
                image = hp_half_icon;
            }
        }
        let hp_size = HP_ICON_SIZE;
        let sprite = new Sprite(image, HP_OFFSET_X + i * hp_size, canvas.height + HP_OFFSET_Y, hp_size, hp_size);
        sprite.draw(sprite.x, sprite.y);
    }
}

function drawMoney() {
    let icon = coin_icon;
    let icon_size = HP_ICON_SIZE;
    c.fillStyle = 'white';
    c.font = '32px Arial'
    c.drawImage(icon, canvas.width + COIN_OFFSET_X, COIN_OFFSET_Y - HP_ICON_SIZE, icon_size, icon_size);
    c.fillText('' + self.plr.money, canvas.width - c.measureText('' + self.plr.money).width + COIN_OFFSET_X, COIN_OFFSET_Y);
}

function drawDebug() {
    c.fillStyle = 'rgba(255, 255, 255, 0.5)';
    c.fillRect(0, 0, DEBUG_RECT_WIDTH, DEBUG_RECT_HEIGHT);

    c.font = '12px arial';
    c.fillStyle = 'black';
    
    c.fillText('mouse.x: ' + mouse.x, 4, DEBUG_TEXT_Y_OFFSET);
    c.fillText('mouse.y: ' + mouse.y, 4, DEBUG_TEXT_Y_OFFSET * 2);
    c.fillText('col.top: ' + self.plr.col.top, 4, DEBUG_TEXT_Y_OFFSET * 3);
    c.fillText('col.right: ' + rat.col.right, 4, DEBUG_TEXT_Y_OFFSET * 4);
    c.fillText('col.bottom: ' + self.plr.col.bottom, 4, DEBUG_TEXT_Y_OFFSET * 5);
    c.fillText('col.left: ' + self.plr.col.left, 4, DEBUG_TEXT_Y_OFFSET * 6);
    c.fillText('rat_attack_cool: ' + rat.attack_cooldown, 4, DEBUG_TEXT_Y_OFFSET * 7);
}

function drawDeathScreen() {
    c.fillStyle = 'rgba(255, 0, 0, 0.3)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    let death_message = 'You died!';
    let font_size = FONT_SIZE_DEATH;
    c.font = font_size + 'px Arial';
    c.fillStyle = 'white';
    c.fillText(death_message, (canvas.width - c.measureText(death_message).width) / 2, (canvas.height - font_size) / 2);
    restart_btn.draw()
}

function drawPoison() {
    if (poison_animate > 0 && !self.plr.dead) {
        let alpha = (poison_animate / poison_animate_duration) * 0.8;
        c.fillStyle = 'rgba(19, 78, 11,' + alpha + ' )';
        c.fillRect(0, 0, canvas.width, canvas.height);
        poison_animate--;
    }
}

function drawShadow(blur, color) {
    c.shadowBlur = blur;
    c.shadowColor = color;
}

function resetStyles() {
    c.fillStyle = 'black';
    c.strokeStyle = 'black';
    c.lineWidth = 1;
    c.font = '12px Arial';
    c.shadowBlur = 0;
    c.shadowColor = 'black';
}

function draw() {
    //Clear Screen
    c.clearRect(0, 0, canvas.width, canvas.height);

    resetStyles();

    //Draw Background
    self.current_room.draw();
    
    if (self.show_grid && self.current_room !== title_screen) {
        self.grid.forEach((item, i) => {
            item.forEach((itemZ, j) => {
                if (itemZ.always_full) {
                    c.strokeStyle = 'orange';
                } else if (!itemZ.active) {
                    c.strokeStyle = '#FFFF00';
                } else {
                    c.strokeStyle = 'white';
                }
                c.strokeRect(itemZ.x, itemZ.y, self.cell_size, self.cell_size);
                // if (rat.obstacles[i][j]) {
                //     c.strokeStyle = 'rgba(0, 0, 0, 0.5)';
                //     c.strokeRect(itemZ.x, itemZ.y, self.cell_size, self.cell_size);
                // }
            });
        });
    }

    //Draw all room background
    self.current_room.contents.forEach((item) => {
        if (item.is_background && item.visible) {
            resetStyles();
            item.draw();
        }
        //Draw pedestal circle
        if (item instanceof Pedestal && item.activated) {
            c.strokeStyle = 'rgba(255, 0, 0, 0.5)';
            c.fillStyle = 'rgba(255, 0, 0, 0.05)';
            c.beginPath();
            c.arc(item.center_x, item.center_y, item.effect_radius, 0, Math.PI * 2);
            c.stroke();
            c.fill();
        }
    });
    
    //Draw all room foreground
    let drawOrder = [...self.current_room.contents];
    drawOrder.sort((a, b) => (a.y + a.height > b.y + b.height) ? 1 : -1)
    drawOrder.forEach((item) => {
        if (item.visible && !item.is_background && self.plr.holding !== item) {
            resetStyles();
            item.draw();
        }
    });

    //Draw bloodstones
    if (self.plr.holding !== null) {
        drawShadow(SHADOW_BLUR, 'white');
        self.plr.holding.draw();
    }

    //Draw particles
    self.particles.forEach((item) => {
        if (item.visible) {
            resetStyles();
            item.draw();
        }
    });

    if (self.current_room.time === NIGHT) {
        resetStyles();
        c.drawImage(darkness, 0, 0, canvas.width, canvas.height);
    }

    if (self.show_hitboxes) {
        self.current_room.contents.forEach((item) => {
            if ((item.debug_mode || self.show_hitboxes) && item.tangible) {
                resetStyles();
                item.drawHitbox();
                item.drawHitRange();
            }
        });
    }

    if (self.show_path) {
        self.current_room.entities.forEach((item) => {
            if (item.path !== undefined && item.visible) {
                item.path.forEach((itemZ) => {
                    c.fillStyle = 'blue';
                    c.fillRect(itemZ.x + self.cell_size / 4, itemZ.y + self.cell_size / 4, self.cell_size / 2, self.cell_size / 2)
                });
                item.current_cells.forEach((itemZ) => {
                    c.fillStyle = 'aqua';
                    c.fillRect(itemZ.x + self.cell_size / 4, itemZ.y + self.cell_size / 4, self.cell_size / 2, self.cell_size / 2)
                });
            }
            // let temp = item.second_dest;
            // if (temp !== null) {
            //     c.fillStyle = 'red';
            //     c.fillRect(temp.x, temp.y, self.cell_size, self.cell_size)
            // }
        });
    }

    if (self.current_room !== title_screen) {
        resetStyles();
        drawHealth();
        resetStyles();
        drawMoney();
    }

    if (self.mode === DEBUG && self.current_room !== title_screen) {
        resetStyles();
        drawDebug();
    }
    drawPoison();
    if (self.plr.dead) {
        resetStyles();
        drawDeathScreen();
    }
}

function init() {
    self.grid = createGrid(self.cell_size);
    self.current_room.contents.forEach((item) => {
        col.calcCenter(item);
    });

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
}

init();
setInterval(update, UPDATE_INTERVAL);