export let all = [];

import * as type_exports from './types.js';;
Object.entries(type_exports).forEach(([name, exported]) => window[name] = exported);

function addResource(src, type) {
	let temp;

	if (type === IMAGE) {
		temp = new Image();
	} else if (type === AUDIO) {
		temp = new Audio();
	} else {
		return;
	}

	if (src === undefined) {
		if (type === IMAGE) {
			temp.src ='assets/icon/skull_live.png';
		} else if (type === AUDIO) {
			temp.src ='assets/sound/vase_break.png';
		}
	} else {
		temp.src = src;	
	}

	all.push(temp);
	return temp;
}

//Images
export let missing_texture = addResource(undefined, IMAGE);

//Backgrounds
export let title_background = addResource('assets/background/title_screen.png', IMAGE);
export let stone_background = addResource('assets/background/stone.png', IMAGE);
export let desert_background = addResource('assets/background/desert_1.png', IMAGE);
export let grass_tile = addResource('assets/tile/grass_pine_256.png', IMAGE); 


//Text Images
export let title_text_img = addResource('assets/text/title_1.png', IMAGE);
export let play_text_img = addResource('assets/text/play.png', IMAGE);
export let restart_text_img = addResource('assets/text/restart.png', IMAGE);

//HP Icons
export let hp_icon = addResource('assets/icon/blood.png', IMAGE);
export let hp_half_icon = addResource('assets/icon/blood_half.png', IMAGE);
export let hp_empty_icon = addResource('assets/icon/blood_spent.png', IMAGE);
export let hp_poison_half_icon = addResource('assets/icon/blood_poison_half.png', IMAGE);
export let hp_poison_icon = addResource('assets/icon/blood_poison.png', IMAGE);

export let coin_icon = addResource('assets/icon/coin.png', IMAGE);

//Items
export let coin_img = addResource('assets/item/coin.png', IMAGE);
export let key_img = addResource('assets/item/key_gold_classic.png', IMAGE);

//Object Images
export let skull_img = addResource('assets/object/skull/skull.png', IMAGE);
export let skull_cracked_img = addResource('assets/object/skull/skull_cracked.png', IMAGE);
export let skull_cleaved_img = addResource('assets/object/skull/skull_cleaved.png', IMAGE);
export let vase_img = addResource('assets/object/breakable/desert_vase_1.png', IMAGE);
export let vase_alt_img = addResource('assets/object/breakable/desert_vase_2.png', IMAGE);
export let bloodstone_img = addResource('assets/object/bloodstone.png', IMAGE);
export let pedestal_img = addResource('assets/object/pedestal.png', IMAGE);
export let pedestal_active_img = addResource('assets/object/pedestal_active.png', IMAGE);

export let plr_idle_down = addResource('assets/player/idle_down.png', IMAGE);
export let plr_idle_up = addResource('assets/player/idle_up.png', IMAGE);
export let plr_idle_left = addResource('assets/player/idle_left.png', IMAGE);
export let plr_idle_right = addResource('assets/player/idle_right.png', IMAGE);


//Foliage
// - Trees
export let pine_tree_img = addResource('assets/foliage/tree/pine_tree.png', IMAGE);
export let palm_tree_img = addResource('assets/foliage/tree/palm_tree.png', IMAGE);
export let cactus_img = addResource('assets/foliage/cactus.png', IMAGE);
// - Grass
export let grass1_img = addResource('assets/foliage/grass/grass1.png', IMAGE);
export let grass2_img = addResource('assets/foliage/grass/grass2.png', IMAGE);
export let grass3_img = addResource('assets/foliage/grass/grass3.png', IMAGE);
export let grass4_img = addResource('assets/foliage/grass/grass4.png', IMAGE);

//Water
export let oasis_img = addResource('assets/water/oasis_sm.png', IMAGE);

//Entity Images
export let undead_rat_img = addResource('assets/creature/rat.png', IMAGE);
export let scorpion_img = addResource('assets/creature/scorpion.png', IMAGE);

export let lightning_img = addResource('assets/magic/lightning_short.png', IMAGE);

//Noise Maps
export let sand_map = addResource('assets/noise_map/sand.png', IMAGE);

//Overlays
export let darkness = addResource('assets/overlay/darkness.png', IMAGE);

//Audio
export let error_sfx = addResource('assets/sound/error.ogg', AUDIO);
error_sfx.default_volume = 0.1;
export let swoosh = addResource('assets/sound/swoosh.ogg', AUDIO);
export let wood_thud = addResource('assets/sound/wood_thud_light.ogg', AUDIO);
export let thunder = addResource('assets/sound/thunder.ogg', AUDIO);
export let collect_hp = addResource('assets/sound/collect_hp.ogg', AUDIO);
collect_hp.default_volume = 0.4;
export let coin_collect = addResource('assets/sound/coin_collect.ogg', AUDIO);
coin_collect.default_volume = 0.4;
export let rat_death = addResource('assets/sound/rat_death.ogg', AUDIO);

// - Break SFX
export let vase_break = addResource('assets/sound/vase_break.ogg', AUDIO);
export let skull_break = addResource('assets/sound/skull_break.ogg', AUDIO);
export let grass_break = addResource('assets/sound/grass_break.ogg', AUDIO);
grass_break.default_volume = 0.15;

// - Music
export let title_music = addResource('assets/sound/music/title.ogg', AUDIO);
export let forest_music = addResource('assets/sound/music/forest.ogg', AUDIO);
export let desert_music = addResource('assets/sound/music/desert.ogg', AUDIO);
