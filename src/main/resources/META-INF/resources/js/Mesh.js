class Mesh {
	
	constructor() {
		this.positions = null;
		this.normals = null;
		this.textCoords = null;
		this.indices = null;
		this.textures = null;
	}

	initMesh() {	
	}

	loadMesh() {
	}

	loadMesh(modelPath) {
	}

	draw(shader) {
	}

}

class KenkenBoardMesh extends Mesh {

	constructor() {
		super();
	}

	initMesh(gl) {
		this.shaderProgram = createShaderProgramFromScript("shader-fs", "shader-vs");

		this.positionsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
		this.positionAttribLocation = gl.getAttribLocation(this.shaderProgram, "vertex_attrib_loc");

		this.colorsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
		this.colorAttribLocation = gl.getAttribLocation(this.shaderProgram, "color_attrib_loc");

		this.mvpUniformLocation = gl.getUniformLocation(this.shaderProgram, "mvp_matrix");

	}

	loadMesh() {
		this.positions = createKenkenBoard3D(4);
		this.colors = generateRandomColorsForBoard(4);
	}

	draw(gl) {
		gl.useProgram(this.shaderProgram);
		
		gl.enableVertexAttribArray(this.positionAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionsBuffer);
		gl.vertexAttribPointer(this.positionAttribLocation, 3, gl.FLOAT, false, 0, 0);
		
		//borrow same mechinism to pass in color attribute to vertex shader
		gl.enableVertexAttribArray(this.colorAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
		gl.vertexAttribPointer(this.colorAttribLocation, 3, gl.FLOAT, false, 0, 0);
		
		var mvpMatrix = getMVPMatrix(gl, translation, rotation, scale);
		gl.uniformMatrix4fv(this.mvpUniformLocation, false, mvpMatrix);

		//draw type is triangle
		//offset = 0, starting from the first entry
		//triangle count = 96 * 6, every 6 points compose a rectangle, total 96 rectangles
		gl.drawArrays(gl.TRIANGLES, 0, 96 * 6);
	}
}