import { Particle } from './missileReaction.js';

export class Missile {
	constructor(totalWidth, totalHeight) {
		this.totalWidth = totalWidth;
		this.totalHeight = totalHeight;
		this.spriteWidth = 300;
		this.spriteHeight = 300;
		this.width = this.spriteWidth / 3;
		this.height = this.spriteHeight / 3;
		this.speedX = 1;
		this.speedY = 1;
		this.frame = 1;
		this.frameTime = 0;
		this.frameInterval = 2000;
		this.ship = 'npr1';
		this.particles = [];
		// this.fireTime = 0;
		// this.fireInterval = 3;
	}
	draw(context) {
		[...this.particles].forEach((obj) => {
			obj.update();
			obj.draw(context);
		});
		context.drawImage(
			this.image,
			this.frame * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
	update() {
		this.generateFireReaction();
		this.x -= this.speedX;
		this.y -= this.speedY;
		// if (this.x)
	}
	generateFireReaction() {
		// if (this.fireTime < this.fireInterval) this.fireTime++;
		// else
		this.particles.push(
			new Particle(this.x + this.width * 0.5, this.y + this.height * 0.5)
		);
		this.particles.filter((obj) => !obj.markedForDeletion);
	}
	lightHeadMissile() {
		if (this.frameTime <= this.frameInterval) this.frameTime++;
		else if (this.frameTime >= this.frameInterval) {
			this.frame === 1 ? (this.frame = 0) : (this.frame = 1);
			this.frameTime = 0;
		}

		requestAnimationFrame(() => this.lightHeadMissile());
	}
}

export class MissileP21 extends Missile {
	constructor(totalWidth, totalHeight) {
		super(totalWidth, totalHeight);
		this.x = this.totalWidth / 2.5;
		this.y = this.totalHeight - this.height - 80;
		this.image = p21LightHead;
	}
}

export class MissileP22 extends Missile {
	constructor(totalWidth, totalHeight) {
		super(totalWidth, totalHeight);
		this.x = this.totalWidth / 2.5;
		this.y = this.totalHeight - this.height - 45;
		this.image = p22LightHead;
	}
}
