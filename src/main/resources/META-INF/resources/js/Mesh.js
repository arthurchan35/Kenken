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
		super.constructor();
	}

	initMesh(gl) {
		
		this.shaderProgram = createShaderProgramFromScript("shader-fs", "shader-vs");

		this.positionsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
		this.positionAttribLocation = gl.getAttribLocation(shaderProgram, "vertex_attrib_loc");

		this.colorsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
		this.colorAttribLocation = gl.getAttribLocation(shaderProgram, "color_attrib_loc");	

		mvpUniformLocation = gl.getUniformLocation(shaderProgram, "mvp_matrix");

	}

	loadMesh() {
		this.positions = createKenkenBoard3D(4);
		this.colors = generateRandomColorsForBoard(4);
	}

	draw(gl) {
		// Clear the canvas before we start drawing on it.
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		
		gl.useProgram(shaderProgram);
		
		gl.enableVertexAttribArray(this.vertexAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionsBuffer);
		gl.vertexAttribPointer(this.positionAttribLocation, 3, gl.FLOAT, false, 0, 0);
		
		//borrow same mechinism to pass in color attribute to vertex shader
		gl.enableVertexAttribArray(this.colorAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
		gl.vertexAttribPointer(this.colorAttribLocation, 3, gl.FLOAT, false, 0, 0);
		
		var mvpMatrix = getMVPMatrix(gl, translation, rotation, scale);
		gl.uniformMatrix4fv(mvpUniformLocation, false, mvpMatrix);

		//draw type is triangle
		//offset = 0, starting from the first entry
		//triangle count = 96 * 6, every 6 points compose a rectangle, total 96 rectangles
		gl.drawArrays(gl.TRIANGLES, 0, 96 * 6);
	}
}