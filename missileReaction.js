export class Particle {
	constructor(x, y) {
		this.markedForDeletion = false;
		this.image = fireReaction;
		this.size = Math.random() * 50 + 50;
		this.x = x;
		this.y = y;
		this.speedX = 1;
		this.speedY = 1;
		this.angle = 0;
		this.va = Math.random() * 0.2 - 0.1;
	}
	update() {
		this.x += Math.sin(this.angle * 10);
		this.y -= this.speedY;
		this.size *= 0.7;
		if (this.size < 0.3) this.markedForDeteltion = true;
		this.angle += this.va;
	}
	draw(context) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.angle);
		context.drawImage(
			this.image,
			this.size * 0.7 + 10,
			this.size * 0.7 + 10,
			this.size * 2,
			this.size
		);
		context.restore();
	}
}
