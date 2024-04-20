export class Background {
	constructor(totalWidth, totalHeight) {
		this.totalWidth = totalWidth;
		this.totalHeight = totalHeight;
		this.x = 0;
		this.y = 0;
		this.width = 2400;
		this.height = 800;
		this.speed = 0.8;
		this.image = backgroundImage;
		this.moving = false;
	}
	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.x + this.width - this.speed,
			this.y,
			this.width,
			this.height
		);
	}
	update() {
		if (this.moving) {
			this.x -= this.speed;
			if (this.x < 0 - this.width) this.x = 0;
		}
	}
}
