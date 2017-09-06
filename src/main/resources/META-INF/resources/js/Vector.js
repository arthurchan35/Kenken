class Vector extends Matrix {
	constructor(v) {
		super(v);
		this.normalizedArray = v.normalizedArray.slice();
	}

	constructor(a, height, width) {
		super(a, height, width);
		this.normalizedArray = normalize();
	}

	normalize() {
		if (!this.normalizedArray) {
			//require tot number overflow check in the feture
			var tot = 0;
			for (var i = 0; i < this.array.length; ++i) {
				tot += this.array[i] * this.array[i];
			}
		
			var length = Math.sqrt(tot);
		
			this.normalizedArray = new Array(v.length);
			// make sure we don't divide by 0.
			if (length > 0.00001) {
				for (var i = 0; i < this.array.length; ++i) {
					this.normalizedArray[i] = this.array[i] / length;
				} 
			}
		}
		return this.normalizedArray;
	}

	dot(b) {
		var tot = 0;

		if (this.array.length == b.length || this.array.length > 0) {
			//require tot number overflow check in the feture
			for (var i = 0; i < this.array.length; ++i) {
				tot += this.array[i] * b[i];
			}
		}

		return tot;
	}

	//assuming three dimensions vector
	cross(b) {
		return [
			this.array[1] * b[2] - this.array[2] * b[1],
			this.array[2] * b[0] - this.array[0] * b[2],
			this.array[0] * b[1] - this.array[1] * b[0]
		];
	}
}