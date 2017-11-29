class Matrix {
	constructor(a, height, width) {
		if (height * width != a.length) {
			throw "unable to instantiate a matrix, the number of element is different from its height and width";
			return null;
		}
		if (a.length != height * width) {
			throw "unable to instantiate a matrix, height and width is different from its array";
			return null;
		}
		if (a.length > 128) {
			throw "unable to instantiate a matrix, array size exceeds limit";
			return null;
		}

		this.array = a;
		this.h = height;
		this.w = width;
		//transpositionMatrix could be big
		//do not instantiate unless an explicit call to transpose() method
		//here stores a reference to the transposition matrix object
		this.transposition = null;
	}

	add(m) {
		if (this.h != m.h || this.w != m.w) {
			throw "unable to do additon on matrices, they have different height and/or width";
			return null;
		}

		var sum = new Array(this.array.length);

		for (var i = 0; i < sum.length; ++i) {
			sum[i] = this.array[i] + m.array[i];
		}

		return new Matrix(sum, this.h, this.w);
	}

	subtract(m) {
		if (this.h != m.h || this.w != m.w) {
			throw "unable to do subtraction on matrices, they have different height and/or width";
			return null;
		}

		var diff = new Array(this.array.length);

		for (var i = 0; i < diff.length; ++i) {
			diff[i] = this.array[i] - m.array[i];
		}

		return new Matrix(diff, this.h, this.w);
	}

	multiplyScalar(s) {
		var resultMatrix = Matrix.copy(this);

		for (var i = 0; i < resultMatrix.array.length; ++i) {
			resultMatrix.array[i] *= s;
		}

		return resultMatrix;
	}

	multiplyMatrix(m) {
		if (this.width != m.height) {
			throw "unable to do muliplicaiton on matrices, this matrix width is not same as given matrix height";
			return null;
		}
		var product = new Array(this.height * m.width);
		
		//this.width == m.height == comm
		var comm = this.width;
		for (var i = 0; i < this.height; ++i) {
			for (var j = 0; j < m.width; ++j) {
				for (var k = 0; k < comm; ++k) {
					product[i * m.width + j] += this.array[i * comm + k] * m.array[k * comm + j];
				}
			}
		}

		return new Matrix(product, this.height, m.width);
	}

	transpose() {
		if (!transposition) {
			this.transposition = new Array(this.array.length);
			for (var i = 0; i < this.height; ++i) {
				for (var j = 0; j < this.width; ++j) {
					this.transposition[j * this.height + i] = this.array[i * this.width + j];
				}
			}
		}
		return this.transposition;
	}

	static copy(m) {
		var matrix = new Matrix(m.array.slice(), m.h, m.w);
		matrix.transposition = m.transposition;
		return matrix;
	}

}

class SquareMatrix extends Matrix {
	constructor(a, sideLength) {
		if (a.length != sideLength * sideLength) {
			throw "unable to create a square matrix, array has different size from it's side square";
			return null;
		}
		super(a, sideLength, sideLength);
	}

	add(m) {
		var result = super.add(m);
		return new SquareMatrix(result.array, result.w);
	}

	subtract(m) {
		var result = super.subtract(m);
		return new SquareMatrix(result.array, result.w);
	}

	multiplyScalar(s) {
		var result = super.multiplyScalar(s);
		return new SquareMatrix(result.array, result.w);
	}

	multiplyMatrix(m) {
		var result = super.multiplyMatrix(m);
		return new SquareMatrix(result.array, result.w);
	}

	static copy(m) {
		if (m.height != m.width) {
			throw "unable to copy a square matrix, given matrix is not a square matrix";
			return null;
		}

		var copy = super.copy(m);
		return new SquareMatrix(copy.array, copy.w);
	}

	static identityMatrix(n) {
		var arr = new Array(n * n);
		for (var i = 0; i < n; ++i) {
			for (var j = 0; j < n; ++j) {
				if (i == j) {
					arr[i * n + j] = 1;
				}
				else {
					arr[i * n + j] = 0;
				}
			}
		}
		return new SquareMatrix(arr, n);
	}

	static scalingMatrix(v) {
		var arr = new Array((v.length + 1) * (v.length + 1));
		for (var i = 0; i < v.length; ++i) {
			for (var j = 0; j < v.length; ++j) {
				if (i == j) {
					arr[i * (v.length + 1) + j] = v[i];
				}
				else {
					arr[i * (v.length + 1) + j] = 0;
				}
			}
		}
		arr[(v.length + 1) * (v.length + 1) - 1] = 1;

		return new SquareMatrix(arr, v.length + 1);
	}

	//not interested in implementing generic rotatiomMatrix, maybe in the future
	static rotationMatrix(n, angleInRadians, v) {
		var arr = new Array((v.length + 1) * (v.length + 1));
		for (var i = 0; i < v.length; ++i) {
			for (var j = 0; j < v.length; ++j) {
				if (i == j) {
					arr[i * (v.length + 1) + j] = v[i];
				}
				else {
					arr[i * (v.length + 1) + j] = 0;
				}
			}
		}

		arr[(v.length + 1) * (v.length + 1) - 1] = 1;
		return new SquareMatrix(arr, v.length + 1);
	}

	static translationMatrix(v) {
		var arr = new Array((v.length + 1) * (v.length + 1));
		for (var i = 0; i < v.length + 1; ++i) {
			for (var j = 0; j < v.length + 1; ++j) {
				if (i == j) {
					arr[i * (v.length + 1) + j] = 1;
				}
				else if (j == v.length) {
					arr[i * (v.length + 1) + j] = v[i];
				}
				else {
					arr[i * (v.length + 1) + j] = 0;
				}
			}
		}
		return new SquareMatrix(arr, v.length + 1);
	}

}

class Mat4 extends SquareMatrix {
	constructor(a) {
		if (arg.length != 16) {
			throw "unable to create a matrix 4, given array does not have a size of 16";
			return null;
		}
		super(a, 4);
	}

	add(m) {
		var result = super.add(m);
		return new Mat4(result.array);
	}

	subtract(m) {
		var result = super.subtract(m);
		return new Mat4(result.array);
	}

	multiplyScalar(s) {
		var result = super.multiplyScalar(s);
		return new Mat4(result.array);
	}

	multiplyMatrix(m) {
		var result = super.multiplyMatrix(m);
		return new Mat4(result.array);
	}

	static copy(m) {
		if (arg.array.length != 16) {
			throw "unable to copy a matrix 4, given matrix is not a matrix 4";
			return null;
		}

		var copy = super.copy(m);
		return new Mat4(copy.array);
	}

	static identityMatrix() {
		var copy = super.identityMatrix(4);
		return new Mat4(copy.array);
	}

	static scalingMatrix(v) {
		var copy = super.scalingMatrix(v);
		return new Mat4(copy.array);
	}

	static rotationMatrix(angleInRadians, v) {
		var c = Math.cos(angleInRadians);
		var s = Math.sin(angleInRadians);

		var t = 1 - c;
		var x = v[0];
		var y = v[1];
		var z = v[2];
		var tx = t * x;
		var ty = t * y;

		var arr = [
			tx * x + c,		tx * y - s * z,	tx * z + s * y,	0,
			tx * y + s * z,	ty * y + c,		ty * z - s * x,	0,
			tx * z - s * y,	ty * z + s * x,	t * z * z + c,	0,
			0,				0,				0,				1
		];
		return new Mat4(arr);
	}

	static translationMatrix(v) {
		var copy = super.translationMatrix(v);
		return new Mat4(copy.array);
	}

}