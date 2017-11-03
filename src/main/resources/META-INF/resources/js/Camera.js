/*
 * modified from tomdalling/opengl-series/Camera.cpp C++ file
 */
class Camera {

	constructor(gl) {
		this.position = new Vector([0.0, 0.0, 1.0], 3, 1);
		this.horizontalAngle = 0.0,
		this.verticalAngle = 0.0,
		this.fieldOfView = 50.0,
		this.nearPlane = 0.01,
		this.farPlane = 1000.0,
		this.viewportAspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
	}

	get position() {
		return this.position;
	}

	set position(p) {
		if (p.array.length != 3) {
			throw "invalid arguement, it is not an vector of size 3";
			return;
		}
		this.position = p;
	}

	offsetPosition(offset) {
		this.position = this.position.add(offset);
	}

	lookAt(target, up) {
		var zAxis = (this.position.subtract(target)).normalize();
		var xAxis = up.cross(zAxis);
		var yAxis = zAxis.cross(xAxis);

		var arr = [
			xAxis.array[0],			xAxis.array[1],			xAxis.array[2],			0,
			yAxis.array[0],			yAxis.array[1],			yAxis.array[2],			0,
			zAxis.array[0],			zAxis.array[1],			zAxis.array[2],			0,
			this.position.array[0],	this.position.array[1],	this.position.array[2],	1,
		];
		return new Vector(arr,)
	}

	perspective() {
		var f = Math.tan(Math.PI * 0.5 - 0.5 * degToRad(this.filedOfView));
		var rangeInv = 1.0 / (this.nearPlane - this.farPlane);

		var a1 = f / this.viewportAspectRatio;
		var c3 = (this.nearPlane + this.farPlane) * rangeInv;
		var d3 = this.nearPlane * this.farPlane * rangeInv * 2;
		return [
			a1,	0,	0,	0,
			0,	f,	0,	0,
			0,	0,	c3,	-1,
			0,	0,	d3,	0
		];
	}

	projection(width, height, depth) {
		// Note: This matrix flips the Y axis so 0 is at the top.
		var a1 = 2 / width;
		var b2 = -2 / height;
		var c3 = 2 / depth;

		return [
			a1,	0,	0,	0,
			0,	b2,	0,	0,
			0,	0,	c3,	0,
			-1,	1,	0,	1,
		];
	}

}