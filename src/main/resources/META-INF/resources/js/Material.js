class Material {

	constructor() {
		this.shader = null;
		this.texture = null;
		this.colors = null;
		//color buffer object
		this.cbo = null;
		this.projUniLoc = null;
		this.viewUniLoc = null;
		this.modelUniLoc = null;
	}

	/**
	 * Creates and compiles a shader.
	 *
	 * @param {!WebGLRenderingContext} gl The WebGL Context.
	 * @param {string} shaderSource The GLSL source code for the shader.
	 * @param {number} shaderType The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
	 * @return {!WebGLShader} The shader.
	 */
	compileShader(gl, shaderSource, shaderType) {
		// Create the shader object
		var shader = gl.createShader(shaderType);

		// Set the shader source code.
		gl.shaderSource(shader, shaderSource);

		// Compile the shader
		gl.compileShader(shader);

		// Check if it compiled
		var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!success) {
			throw "could not compile shader:" + gl.getShaderInfoLog(shader);
		}

		return shader;
	}

	/**
	 * Creates a shader from the content of a script tag.
	 *
	 * @param {!WebGLRenderingContext} gl The WebGL Context.
	 * @param {string} scriptId The id of the script tag.
	 * @param {string} opt_shaderType. The type of shader to create. If not passed in will use the type attribute from the script tag.
	 * @return {!WebGLShader} A shader.
	 */
	createShaderFromScript(gl, scriptId, opt_shaderType) {
		// look up the script tag by id.
		var shaderScript = document.getElementById(scriptId);
		if (!shaderScript) {
			throw("*** Error: unknown script element" + scriptId);
		}

		// extract the contents of the script tag.
		var shaderSource = shaderScript.text;

		// If we didn't pass in a type, use the 'type' from the script tag.
		if (!opt_shaderType) {
			if (shaderScript.type == "x-shader/x-vertex") {
				opt_shaderType = gl.VERTEX_SHADER;
			}
			else if (shaderScript.type == "x-shader/x-fragment") {
				opt_shaderType = gl.FRAGMENT_SHADER;
			}
			else if (!opt_shaderType) {
				throw("*** Error: shader type not set");
			}
		}

		return compileShader(gl, shaderSource, opt_shaderType);
	}

	/**
	 * Creates a program from 2 script tags.
	 *
	 * @param {!WebGLRenderingContext} gl The WebGL Context.
	 * @param {string} vertexShaderId The id of the vertex shader script tag.
	 * @param {string} fragmentShaderId The id of the fragment shader script tag.
	 * @return {!WebGLProgram} A program
	 */
	initShaderProgramFromScript(gl, vertexShaderId, fragmentShaderId) {

		var vertexShader = createShaderFromScript(gl, vertexShaderId, null);
		var fragmentShader = createShaderFromScript(gl, fragmentShaderId, null);

		var program = gl.createProgram();

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		var success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (success) {
			this.shader = program;
		}
		alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
		console.log(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
	}

	loadColors(gl, colors) {
		this.colors = colors;

		this.cbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

		glEnableVertexAttribArray(3);
		gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 0, 0);

	}

	loadTexture(gl, textureSrc) {
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);

		// Feed the texture with a temporary color
		// since it takes a while for browser to finish downloading the texture image
		// so that we can see some thing rather than waiting for page to be loaded
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

		var image = new Image();
		image.src = textureSrc;
		image.addEventListener(
			'load',
			function() {
				// Now that the image has loaded make copy it to the texture.
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
				gl.generateMipmap(gl.TEXTURE_2D);
			}
		);
	}

	setMVPUniforms(gl, m, v, p) {
		this.projUniLoc = gl.getUniformLocation(this.shader, p);
		this.viewUniLoc = gl.getUniformLocation(this.shader, v);
		this.modelUniLoc = gl.getUniformLocation(this.shader, m);
	}

}