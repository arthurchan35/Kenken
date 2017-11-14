class Mesh {

	constructor() {
		//an array of vertices, see Vertex class
		this.vertices = null;
		//used to identify which 3 vertices to form a triangle
		//for example, indices = [0,1,2,1,2,3], meaning
		///vertices[0],vertices[1],vertices[2] forms a triangle, vertices[1],vertices[2],vertices[3] forms another
		this.indices = null;
		//vertex buffer object
		this.vbo = null;
		//vertex array object
		this.vao = null;
		//element buffer object
		this.ebo = null;
	}

	initMesh(gl) {
		this.vao = gl.createVertexArray();
		gl.bindVertexArray(this.vao);

		this.ebo = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

		this.vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

		/*
		 * glVertexAttribPointer() reference site:
		 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
		 * notice that 24 means 24 bytes of each vertex, see geometries.js file
		*/

		// vertex positions
		glEnableVertexAttribArray(0);
		glVertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0 * 4);
		// vertex normals
		glEnableVertexAttribArray(1);
		glVertexAttribPointer(1, 3, gl.FLOAT, false, 24, 3 * 4);
		// vertex texture coords
		glEnableVertexAttribArray(2);
		glVertexAttribPointer(2, 2, gl.FLOAT, false, 24, 6 * 4);

		glBindVertexArray(0);
	}

	loadMesh(geometry) {
		this.vertices = geometry.vertices;
		this.indices = geometry.indices;
	}

	//load a mesh geometry from a file or some a link
	loadMesh(meshPath) {
		//stub for now
	}

}