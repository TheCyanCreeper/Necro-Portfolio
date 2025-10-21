// tools.js is for extra math functions, type conversion, and other basic functions
import * as type_exports from './types.js';;
Object.entries(type_exports).forEach(([name, exported]) => window[name] = exported);

export function defined(variable) {
	let success = false;
	if (variable !== undefined && variable !== null) {
		success = true;
	}
	return success;
}

export function rngRange(min, max) {
	return Math.floor(Math.random() * max + min)
}

export function playSound(sfx, volume) {
	if (defined(sfx)) {
		sfx.pause();
		sfx.currentTime = 0;
		if (volume !== undefined) {
			sfx.volume = volume;
		} else if (sfx.default_volume !== undefined) {
			sfx.volume = sfx.default_volume;
		} else {
			sfx.volume = 1;
		}
		sfx.play();
	}
}

export function convertFacingToAngle(dirc) {
	let angle = 0;
	switch (dirc) {
		case UP:
			angle = 270;
			break;
		case DOWN:
			angle = 90;
			break;
		case LEFT:
			angle = 180;
			break;
		case DOWN_RIGHT:
			angle = 45;
			break;
		case DOWN_LEFT:
			angle = 135;
			break;
		case UP_LEFT:
			angle = 225;
			break;
		case UP_RIGHT:
			angle = 315;
			break;
	}
	return angle;
}

export function convertAngleToFacing(angle) {
	angle = lockAngle(angle, 8);
	let facing = NONE;
	switch (angle.angle) {
		case 0:
			facing = RIGHT;
			break;
		case 90:
			facing = DOWN;
			break;
		case 180:
			facing = LEFT;
			break;
		case 270:
			facing = UP;
			break;
		case 45:
			facing = DOWN_RIGHT;
			break;
		case 135:
			facing = DOWN_LEFT;
			break;
		case 225:
			facing = UP_LEFT;
			break;
		case 315:
			facing = UP_RIGHT;
			break;
	}
	return facing;
}

//Removes element from an array
export function removeElem(arr, elem) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] === elem) {
			arr.splice(i, 1);
		}
	}
}

export function distance(obj1, obj2) {
	return Math.sqrt(Math.pow(obj2.center_x - obj1.center_x, 2) + Math.pow(obj2.center_y - obj1.center_y, 2));
}

export function pointOnCircle(radius, angle) {
	let radians = angle * (Math.PI / 180);
	let x = radius * Math.sin(radians);
	let y = radius * Math.cos(radians);
	return {x: x, y:y}
}

export function lockAngle(angle, interval) {
	if (angle >= 318) {

	}
	let output = {angle: null}
	for (let i = 0; i < interval; i++) {
		let low_angle = (360 / interval) * i - (180 / interval);
		let high_angle = (360 / interval) * i + (180 / interval);
		if (low_angle >= 0 && high_angle <= 360) {
			if (angle > low_angle && angle < high_angle) {
				output.angle = (360 / interval) * i;
			}
		} else {
			if (low_angle < 0) {
				low_angle += 360;
			}
			if (high_angle > 360) {
				high_angle -= 360;
			}
			if (angle > low_angle || angle < high_angle) {
				output.angle = (360 / interval) * i;
			}
		}
		if (angle === low_angle) {
			// output.error_angle = low_angle;
			output.angle = low_angle;
		} else if (angle === high_angle) {
			// output.error_angle = high_angle;
			output.angle = high_angle;
		}
	}

	return output;
}