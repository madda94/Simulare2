export class Ship {
	constructor(totalWidth, totalHeight) {
		this.totalWidth = totalWidth;
		this.totalHeight = totalHeight;
		this.spriteWidth = 402;
		this.spriteHeight = 149;
		this.width = this.spriteWidth;
		this.height = this.spriteHeight;
		this.x = this.totalWidth - this.width;
		this.y = this.totalHeight - 1.5 * this.height;
		this.image = npr2_0;
		this.angle = 0;
		this.rotateTime = 0;
		this.rotateInterval = 50;
		this.needRotation = false;
		this.currentFrame = 0;
		this.turnedAround = false;
		this.sizesShip = [
			[402, 149],
			[500, 221],
			[581, 337],
			[480, 319],
			[666, 319],
			[453, 306],
			[431, 299],
			[406, 375],
			[378, 290],
			[352, 284],
			[348, 276],
			[235, 244],
			[227, 238],
			[172, 213],
			[160, 205],
			[141, 182],
			[122, 154],
			[137, 149],
			[150, 187],
			[163, 206],
			[180, 217],
			[179, 213],
			[214, 233],
			[234, 248],
			[248, 252],
			[330, 276],
			[350, 284],
			[376, 290],
			[409, 299],
			[428, 299],
			[460, 306],
			[457, 302],
			[485, 319],
			[542, 374],
			[383, 311],
			[404, 146],
		];
		this.outofScreen = false;
	}
	draw(context) {
		context.drawImage(
			this.image,
			0,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
	update(context, collision, missile1, missile2, shipsOnScreen) {
		if (!this.turnedAround) {
			if (collision >= -300) {
				this.x -= 2;
				if (Math.trunc(collision) <= 0) {
					missile1.draw(context);
					missile1.update();
					missile2.draw(context);
					missile2.update();
				}
			}
		} else {
			this.x++;
			if (this.x >= this.totalWidth) {
				this.outofScreen = true;
			}
		}
	}
	updateSizeSprite(i) {
		this.spriteWidth = this.sizesShip[i][0];
		this.spriteHeight = this.sizesShip[i][1];
		if ((i > 1 && i < 11) || (i > 24 && i < 35)) {
			this.width = this.spriteWidth / 2;
			this.height = this.spriteHeight / 2;
		} else if (i > 10 && i < 15) this.width = this.spriteWidth / 1.1;
		else if (i > 10 && i < 20) this.height = this.spriteHeight * 1.2;
		else {
			this.width = this.spriteWidth;
			this.height = this.spriteHeight;
		}

		if (i === 30) this.y += this.height / 3;
	}
	turnAround() {
		if (this.needRotation && !this.turnedAround && this.currentFrame < 35) {
			if (this.rotateTime < this.rotateInterval) {
				this.rotateTime++;
				this.x -= 0.08;
				this.y -= 0.2;
			} else {
				this.rotateTime = 0;
				this.x -= 1;
				this.y -= 2;
				this.image = document.getElementById(`npr2_${this.currentFrame + 1}`);
				this.updateSizeSprite(this.currentFrame + 1);
				this.currentFrame++;
			}
		} else {
			this.turnedAround = true;
			this.currentFrame = 0;
		}
	}
}
