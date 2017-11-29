class Vector extends Matrix {
	constructor(a) {
		super(a, 1, a.length);
		this.normalizedArray = null;
	}

	add(v) {
		var result = super.add(v);
		return new Vector(result.array);
	}

	subtract(v) {
		var result = super.subtract(v);
		return new Vector(result.array);
	}

	multiplyScalar(s) {
		var result = super.multiplyScalar(s);
		return new Vector(result.array);
	}

	//row vector multiplying column vector gives a square matrix
	multiplyMatrix(v) {
		var result = super.multiplyMatrix(v);

		if (result.w == 4) {
			return new Mat4(result.array);
		}
		return new SquareMatrix(result.array, result.w);
	}

	normalize() {
		if (!this.normalizedArray) {
			//require total number overflow check in the feature
			var tot = 0;
			for (var i = 0; i < this.array.length; ++i) {
				tot += this.array[i] * this.array[i];
			}

			var length = Math.sqrt(tot);
		
			var a = new Array(this.array.length);
			// make sure we don't divide by 0.
			if (length > 0.00001) {
				for (var i = 0; i < this.array.length; ++i) {
					a[i] = this.array[i] / length;
				}
				this.normalizedArray = new Vector(a);
			}
		}
		return this.normalizedArray;
	}

	dot(b) {
		var tot = 0;

		if (this.array.length == b.length || this.array.length > 0) {
			//require total number overflow check in the feature
			for (var i = 0; i < this.array.length; ++i) {
				tot += this.array[i] * b[i];
			}
		}

		return tot;
	}

	//assuming three dimensions vector
	cross(v) {
		var a = [
			this.array[1] * v.array[2] - this.array[2] * v.array[1],
			this.array[2] * v.array[0] - this.array[0] * v.array[2],
			this.array[0] * v.array[1] - this.array[1] * v.array[0]
		];

		return new Vector(a);
	}

	static copy(v) {
		var copy = super.copy(v);
		return new Vector(copy.array);
	}

}