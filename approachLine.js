export class ApproachDetection {
	constructor(totalWidth, totalHeight, ship) {
		this.totalWidth = totalWidth;
		this.totalHeight = totalHeight;
		this.width = 0;
		this.height = 1000;
		this.x = this.totalWidth / 3.2;
		this.y = this.totalHeight - this.height / 2;
		this.blinking = true;
		this.lastBlinkTime = 0;
		this.blinkInterval = 450;
		this.appearBlinking = false;
	}
	draw(context) {
		if (this.blink() && this.appearBlinking) {
			context.beginPath();
			context.setLineDash([7]);
			context.moveTo(this.x, this.y);
			context.lineTo(this.x, this.height);
			context.lineWidth = 3;
			context.strokeStyle = 'red';
			context.stroke();
		}
	}
	blink() {
		const currentTime = new Date().getTime();
		if (currentTime - this.lastBlinkTime > this.blinkInterval) {
			this.lastBlinkTime = currentTime;
			this.blinking = !this.blinking;
		}
		return this.blinking;
	}
	detectCollision(ship) {
		let dx = ship.x - this.x;
		return dx;
	}
	actAfterCollision(context, background, missiles) {
		if (Math.trunc(this.collision) <= 0) {
			background.update();
			missiles.forEach((obj) => {
				obj.draw(context);
				obj.update();
			});
		}
	}
}
