//Mouse
export let mouse = {
	x: 0,
	y: 0,
	clickX: -100,
	clickY: -100,
	//ls = last
	lsClickX: -100,
	lsClickY: -100,
	scrollDirection: NONE,
	scroll: 0
}

function click(e) {
	let rect = canvas.getBoundingClientRect(); 
    let x = e.clientX - rect.left; 
    let y = e.clientY - rect.top; 
	mouse.clickX = x;
	mouse.clickY = y; 
	mouse.lsClickX = x;
	mouse.lsClickY = y; 
}

function mouseMove(e) {
	let rect = canvas.getBoundingClientRect(); 
    let x = e.clientX - rect.left; 
    let y = e.clientY - rect.top; 
	mouse.x = x;
	mouse.y = y;
}

function wheel(e) {
	if (e.deltaY === -100) {
		mouse.scrollDirection = UP;
	} else if (e.deltaY === 100) {
		mouse.scrollDirection = DOWN;
	}
}

export function mouseCollision(obj, checkClickPos) {
	let collision = false;

	let x = checkClickPos ? mouse.clickX : mouse.x;
	let y = checkClickPos ? mouse.clickY : mouse.y;
	if (
		x >= obj.x && 
		x <= obj.x + obj.width && 
		y >= obj.y && 
		y <= obj.y + obj.height) {
		collision = true;
	}

	return collision;
}

export function resetClick() {
	mouse.clickX = -100;
	mouse.clickY = -100;
}

export function resetScroll() {
	mouse.scrollDirection = NONE;
}

export function checkClick(obj) {
	if (!obj.visible) {
		return;
	}
	if (Object.hasOwn(obj, 'children')) {
		obj.children.forEach((item)=>{
			if (Object.hasOwn(item, 'click')) {
				checkClick(item);
			}
			
		});
	} else if (mouseCollision(obj, true)) {
		obj.clickEvent();
		resetClick();
	}
}

export function checkScroll(obj) {
	if (mouseCollision(obj, false) && mouse.scrollDirection !== NONE) {
		obj.scrollEvent(mouse.scrollDirection);
	}
}

export function checkHover(obj) {
	if (mouseCollision(obj, false)) {
		obj.hover = true;
	} else {
		obj.hover = false;
	}
}

canvas.addEventListener('mousedown', click, false);
canvas.addEventListener('mousemove', mouseMove, false);
canvas.addEventListener('wheel', wheel, true);

//Keyboard Input
export let keys = {};
window.onkeyup = (e) => { 
	keys[e.keyCode] = false; 
	universalControls(e.keyCode);
}
window.onkeydown = function(e) { keys[e.keyCode] = true; }

export function universalControls(key) {
	if (key === 71) {
		self.show_hitboxes = self.show_hitboxes ? false : true;
	}
	if (key === 72) {
		self.show_grid = self.show_grid ? false : true;
	}
	if (key === 89) {
		self.show_path = self.show_path ? false : true;
	}
}