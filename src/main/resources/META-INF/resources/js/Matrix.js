class Matrix {
	constructor(m) {
		this.array = m.array.slice();
		this.h = m.h;
		this.w = m.h;
		this.transposition = m.transposition;
	}

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

	add(b) {
		if (this.h != b.h || this.w != b.w) {
			throw "unable to do additon on matrices, they have different height and/or width";
			return null;
		}

		var sum = new Array(this.array.length);

		for (var i = 0; i < sum.length; ++i) {
			sum[i] = this.array[i] + b.array[i];
		}

		return new Matrix(sum, this.h, this.w);
	}

	subtract(b) {
		if (this.h != b.h || this.w != b.w) {
			throw "unable to do subtraction on matrices, they have different height and/or width";
			return null;
		}

		var diff = new Array(this.array.length);

		for (var i = 0; i < diff.length; ++i) {
			diff[i] = this.array[i] + b.array[i];
		}

		return new Matrix(diff, this.h, this.w);
	}

	multiplyScalar(s) {
		var resultMatrix = new Matrix(this);

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
}

class SquareMatrix extends Matrix {
	constructor(m) {
		if (m.height != m.width) {
			throw "unable to copy a square matrix, given matrix is not a square matrix";
		}
		super(m);
	}

	constructor(a, height, width) {
		if (height != width) {
			throw "unable to create a square matrix, height and width are not the same";
		}
		super(a, height, width);
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
		return new SquareMatrix(arr, n, n);
	}
}

class Mat4 extends SquareMatrix {
	constructor(m) {
		if (m.array.length != 16) {
			throw "unable to copy a matrix 4, given matrix is not a matrix matrix 4";
		}
		super(m);
	}

	constructor(a, height, width) {
		if (a.length != 16) {
			throw "unable to create a matrix 4, array size is not 16";
		}
		super(a, height, width);
	}	
}