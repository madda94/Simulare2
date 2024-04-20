import { Ship } from './ship.js';
import { ApproachDetection } from './approachLine.js';
import { MissileP21, MissileP22 } from './missile.js';
import { Background } from './scrollingBackground.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const npr1 = new Ship(canvas.width, canvas.height);
const npr2 = new Ship(canvas.width, canvas.height);
const NPR1p21 = new MissileP21(canvas.width, canvas.height);
const NPR1p22 = new MissileP22(canvas.width, canvas.height);
const missilesNPR1 = [];
missilesNPR1.push(NPR1p21);
missilesNPR1.push(NPR1p22);
const NPR2p21 = new MissileP21(canvas.width, canvas.height);
const NPR2p22 = new MissileP22(canvas.width, canvas.height);
const missilesNPR2 = [];
missilesNPR2.push(NPR2p21);
missilesNPR2.push(NPR2p22);
const approachLine = new ApproachDetection(canvas.width, canvas.height);
const background = new Background(canvas.width, canvas.height);

function controlNPR1() {
	npr1.draw(ctx);
	const collisionNPR1 = approachLine.detectCollision(npr1) + 20;
	if (collisionNPR1 <= 300) {
		approachLine.appearBlinking = true;
		approachLine.draw(ctx, collisionNPR1);
	} else {
		approachLine.appearBlinking = false;
	}
	npr1.update(ctx, collisionNPR1, NPR1p21, NPR1p22);
	if (Math.trunc(collisionNPR1) <= 0) {
		background.moving = true;
		npr1.x += 0.5;
		approachLine.x += 0.1;
		missilesNPR1.forEach((obj) => {
			obj.draw(ctx);
			obj.update();
			obj.x += 0.1;
		});
		// npr2.draw(ctx);
		// npr2.update(ctx, collisionNPR1, NPR2p21, NPR2p22);
	}
	if (Math.trunc(collisionNPR1) <= -300) {
		npr1.needRotation = true;
		npr1.turnAround();
		npr1.needRotation = false;
	}
}

export function animateSimulare1() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	background.draw(ctx);
	background.update();
	controlNPR1();

	// generateFireReaction(p21)
	// p21.lightHeadMissile();
	// p22.lightHeadMissile();
	requestAnimationFrame(animateSimulare1);
}
animateSimulare1();
