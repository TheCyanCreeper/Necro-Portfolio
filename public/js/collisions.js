import * as type_exports from './types.js';;
Object.entries(type_exports).forEach(([name, exported]) => window[name] = exported);
 
 let exports = {
    calcCenter: calcCenter,
    calcAngle: calcAngle,
    basic: collisionBasic,
    rect: collision
}

export default exports;
//calcCenter: sets obj's center_x and center_y value
//obj: object with x, y, width, and height values
function calcCenter(obj) {
    obj.center_x = obj.x + obj.width / 2;
    obj.center_y  = obj.y + obj.height / 2;
}

//calcAngle: calculate/returns angle between 2 points based on obj1
//obj1, obj2: objects with center_x and center_y values
function calcAngle(obj1, obj2) {
    let distX = obj1.center_x - obj2.center_x;
    let distY = obj1.center_y - obj2.center_y;
    let angle = (Math.atan(distY / distX) * 180) / Math.PI;
    if (!(obj1.center_x > obj2.center_x && obj1.center_y > obj2.center_y)) {
        angle += 180;
        if (obj1.center_x > obj2.center_x && obj1.center_y < obj2.center_y) {
            angle += 180;
        } else {
            
        }
    }

    if (obj1.center_x === obj2.center_x && obj1.center_y < obj2.center_y) {
        angle = 270;
    } else if (obj1.center_x === obj2.center_x && obj1.center_y > obj2.center_y) {
        angle = 90;
    } else if (obj1.center_y === obj2.center_y && obj1.center_x > obj2.center_x) {
        angle = 0;
    } else if (obj1.center_y === obj2.center_y && obj1.center_x < obj2.center_x) {
        angle = 180;
    } else if (obj1.center_x === obj2.center_x && obj1.center_y === obj2.center_y) {
        angle = 0;
    }
    return angle;
}

function calcCornerAngles(obj1, obj2) {
	let corner_angles = {
		top_left: -1,
		top_right: -1,
		bottom_right: -1,
		bottom_left: -1
	}

	let top_left_corner = {
		x: obj2.x - obj1.width - 1,
		y: obj2.y - obj1.height - 1,
		width: obj1.width,
		height: obj1.height,
		center_x: 0,
		center_y: 0
	}
	calcCenter(top_left_corner);
	corner_angles.top_left = calcAngle(top_left_corner, obj2);

	let top_right_corner = {
		x: obj2.right + 1,
		y: obj2.y - obj1.height - 1,
		width: obj1.width,
		height: obj1.height,
		center_x: 0,
		center_y: 0
	}
	calcCenter(top_right_corner);
	corner_angles.top_right = calcAngle(top_right_corner, obj2);

	let bottom_right_corner = {
		x: obj2.right + 1,
		y: obj2.bottom + 1,
		width: obj1.width,
		height: obj1.height,
		center_x: 0,
		center_y: 0
	}
	calcCenter(bottom_right_corner);
	corner_angles.bottom_right = calcAngle(bottom_right_corner, obj2);

	let bottom_left_corner = {
		x: obj2.x - obj1.width - 1,
		y: obj2.bottom + 1,
		width: obj1.width,
		height: obj1.height,
		center_x: 0,
		center_y: 0
	}
	calcCenter(bottom_left_corner);
	corner_angles.bottom_left = calcAngle(bottom_left_corner, obj2);

	return corner_angles;

}

function collisionBasic(obj1, obj2) {
	return obj1.right >= obj2.x - 1 && 
	obj1.x <= obj2.right + 1 && 
	obj1.bottom >= obj2.y - 1 && 
	obj1.y <= obj2.bottom + 1;
}

function collisionBasicCircle(obj1, obj2, obj1_col_type, obj2_col_type) {
	let collision = false;
	if (obj1_col_type === CIRCLE && obj2_col_type === CIRCLE) {

	} else if (obj1_col_type === RECTANGLE && obj2_col_type === RECTANGLE) {
		return false;
	} else {
		let rect, circ;
		if (obj1_col_type === RECTANGLE) {
			rect = obj1;
			circ = obj2;
		} else {
			rect = obj2;
			circ = obj1;
		}
		//Create corners
		let top_left = {
			center_x: rect.x,
			center_y: rect.y
		}
		let bottom_left = {
			center_x: rect.x,
			center_y: rect.bottom
		}
		let bottom_right = {
			center_x: rect.right,
			center_y: rect.bottom
		}
		let top_right = {
			center_x: rect.right,
			center_y: rect.y
		}
		let corners = [top_left, bottom_left, bottom_right, top_right];

		corners.forEach((item) => {
			if (distance(item, circ) >= circ.radius + 1) {
				collision = true;
			}
		});
	}
	return collision;
}

//collision
//obj1, obj2: objects with x, y, right, and bottom values
function collision(obj1, obj2) {
	let collision_direction = NONE
    if (collisionBasic(obj1, obj2)) {
        let angle = calcAngle(obj1, obj2);
        let corner_angles = calcCornerAngles(obj1, obj2);

        if (angle > corner_angles.top_right || angle < corner_angles.bottom_right && obj1.bottom >= obj2.y && obj1.y <= obj2.bottom) {
	    	collision_direction = LEFT
        } else if (angle > corner_angles.bottom_right && angle < corner_angles.bottom_left && obj1.right >= obj2.x && obj1.x <= obj2.right) {
            collision_direction = TOP;
        } else if (angle > corner_angles.bottom_left && angle < corner_angles.top_left && obj1.bottom >= obj2.y && obj1.y <= obj2.bottom) {
            collision_direction = RIGHT;
        } else if (angle > corner_angles.top_left && angle < corner_angles.top_right && obj1.right >= obj2.x && obj1.x <= obj2.right) {
            collision_direction = BOTTOM;
        } 
        if (!obj1.is_trigger && !obj2.is_trigger) {
	        if (angle === corner_angles.bottom_right) {
	        	if (obj1.y <= obj2.bottom && obj1.col.left && obj2.col.right && obj1.x <= obj2.right) {
		            obj1.y = obj2.bottom + 1;
		            obj1.x = obj2.right + 1;
		        }
	        } else if (angle === corner_angles.bottom_left) {
	        	if (obj1.y <= obj2.bottom && obj1.col.right && obj2.col.left && obj1.right >= obj2.x) {
		            obj1.y = obj2.bottom + 1;
		            obj1.x = obj2.x - obj1.width - 1;
		        }
	        } else if (angle === corner_angles.top_left) {
	        	if (obj1.right >= obj2.x && obj1.col.bottom && obj2.col.top && obj1.bottom >= obj2.y) {
		            obj1.x = obj2.x - obj1.width - 1;
		            obj1.y = obj2.y - obj1.height - 1;  
		        }
	        } else if (angle === corner_angles.top_right) {
	        	if (obj1.x <= obj2.right && obj1.col.bottom && obj2.col.top && obj1.bottom >= obj2.y) {
		            obj1.x = obj2.right + 1;
		            obj1.y = obj2.y - obj1.height - 1;
		        }
	        }

	        if (angle > corner_angles.bottom_right && angle < corner_angles.bottom_left && obj1.right >= obj2.x && obj1.x <= obj2.right && obj1.y <= obj2.bottom) {
	            obj1.y = obj2.bottom + 1;
	        } else if (angle > corner_angles.bottom_left && angle < corner_angles.top_left && obj1.bottom >= obj2.y && obj1.y <= obj2.bottom && obj1.right >= obj2.x) {
	            obj1.x = obj2.x - obj1.width - 1;
	        } else if (angle > corner_angles.top_left && angle < corner_angles.top_right && obj1.right >= obj2.x && obj1.x <= obj2.right && obj1.bottom >= obj2.y) {
	            obj1.y = obj2.y - obj1.height - 1;
	        } else if (angle > corner_angles.top_right || angle < corner_angles.bottom_right && obj1.bottom >= obj2.y && obj1.y <= obj2.bottom && obj1.x <= obj2.right) {
	            obj1.x = obj2.right + 1;
	            
	        }

	        switch (collision_direction) {
	        	case TOP:
	        		obj1.col.top = true;
	            	obj2.col.bottom = true;
	            	break;
	            case RIGHT:
	            	obj1.col.right = true;
	            	obj2.col.left = true;
	            	break;
	        	case LEFT:
	        		obj1.col.left = true;
	            	obj2.col.right = true;
	            	break;
	            case BOTTOM:
	            	obj1.col.bottom = true;
	            	obj2.col.top = true;
	            	break;
	        }
	    }
    }
    if (collision_direction !== NONE) {
    	if (typeof obj1.collideEvent === 'function') {
    		obj1.collideEvent(obj2);
    	}
    	if (typeof obj2.collideEvent === 'function') {
    		obj2.collideEvent(obj1);
    	}
    }
}