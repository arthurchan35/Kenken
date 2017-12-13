/*
 * modified from tomdalling/opengl-series/Camera.cpp C++ file
 */
class Camera {

	constructor(gl) {
		this.position = new Vector([-5.0, -5.0, -5.0]);
		this.horizontalAngle = 0.0,
		this.verticalAngle = 0.0,
		this.fieldOfView = 85.0,
		this.nearPlane = 0.01,
		this.farPlane = 1000.0,
		this.viewportAspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
	}

	move(offset) {
		this.position = this.position.add(offset);
	}

	lookAt(target, up) {
		var Z = target.subtract(this.position);
		var zDirection = Z.normalize();
		var xDirection = up.cross(zDirection).normalize();
		var yDirection = zDirection.cross(xDirection).normalize();
		var	distance = Z.magnitude();
		
		var arr = [
			xDirection.array[0],	yDirection.array[0],	zDirection.array[0],	0,
			xDirection.array[1],	yDirection.array[1],	zDirection.array[1],	0,
			xDirection.array[2],	yDirection.array[2],	zDirection.array[2],	0,
			0,						0,						-distance,				1
		];
		return new Mat4(arr);
	}

	perspective() {
		var f = Math.tan(Math.PI * 0.5 - 0.5 * degToRad(this.fieldOfView));
		var rangeInv = 1.0 / (this.nearPlane - this.farPlane);

		var a1 = f / this.viewportAspectRatio;
		var c3 = (this.nearPlane + this.farPlane) * rangeInv;
		var d3 = this.nearPlane * this.farPlane * rangeInv * 2;
		var arr = [
			a1,	0,	0,	0,
			0,	f,	0,	0,
			0,	0,	c3,	-1,
			0,	0,	d3,	0
		];
		return new Mat4(arr);
	}

	projection() {
		return this.perspective();
	}

	view(target, up) {
		return this.lookAt(target, up);
	}

}