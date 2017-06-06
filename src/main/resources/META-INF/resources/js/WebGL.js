var gl;
var shaderProgram;
var verticesBuffer;
var vertexAttribLocation;
var colorUniformLocation;

/**
 * Creates and compiles a shader.
 *
 * @param {!WebGLRenderingContext} gl The WebGL Context.
 * @param {string} shaderSource The GLSL source code for the shader.
 * @param {number} shaderType The type of shader, VERTEX_SHADER or
 *     FRAGMENT_SHADER.
 * @return {!WebGLShader} The shader.
 */
function compileShader(shaderSource, shaderType) {
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
 * @param {string} opt_shaderType. The type of shader to create.
 *     If not passed in will use the type attribute from the
 *     script tag.
 * @return {!WebGLShader} A shader.
 */
function createShaderFromScript(scriptId, opt_shaderType) {
	// look up the script tag by id.
	var shaderScript = document.getElementById(scriptId);
	if (!shaderScript) {
		throw("*** Error: unknown script element" + scriptId);
	}
 
	// extract the contents of the script tag.
	var shaderSource = shaderScript.text;
 
	// If we didn't pass in a type, use the 'type' from
	// the script tag.
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
 
	return compileShader(shaderSource, opt_shaderType);
}

//Create the shader program
function createShaderProgram(vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
	  return program;
	}
	alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

/**
 * Creates a program from 2 script tags.
 *
 * @param {!WebGLRenderingContext} gl The WebGL Context.
 * @param {string} vertexShaderId The id of the vertex shader script tag.
 * @param {string} fragmentShaderId The id of the fragment shader script tag.
 * @return {!WebGLProgram} A program
 */
function createShaderProgramFromScript(vertexShaderId, fragmentShaderId) {

	var vertexShader = createShaderFromScript(vertexShaderId, null);
	var fragmentShader = createShaderFromScript(fragmentShaderId, null);

	return createShaderProgram(vertexShader, fragmentShader);
}

// Initialize WebGL, returning the GL context or null if
// WebGL isn't available or could not be initialized.
function createWebGL(canvas) {

	var gl = canvas.getContext("webgl2");
	// If we don't have a GL context, give up now

	if (!gl) {
		alert("Unable to initialize WebGL. Your browser may not support it.");
		return;
	}
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);	// Clear to black, fully opaque
	gl.clearDepth(1.0);					// Clear everything
	gl.enable(gl.DEPTH_TEST);			// Enable depth testing
	gl.depthFunc(gl.LEQUAL);			// Near things obscure far things

	return gl;
}

//Draw the scene.
function drawScene() {
	// Clear the canvas before we start drawing on it.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	
	gl.useProgram(shaderProgram);
	
	gl.enableVertexAttribArray(vertexAttribLocation);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	
	//3 components per iteration
	//type is gl.FLOAT
	//set normalize to false 
	//stride = 0 meaning move forward size * sizeof(type) to get next postion
	//offset = 0 meaning start at the 0 index of array
	//A hidden part of gl.vertexAttribPointer is that it binds the current
	//ARRAY_BUFFER to the attribute. In other words now this attribute is
	//bound to positionBuffer. That means we're free to bind something else to
	//the ARRAY_BUFFER bind point. The attribute will continue to use positionBuffer.
	gl.vertexAttribPointer(vertexAttribLocation, 3, gl.FLOAT, false, 0, 0);
	
	createRectangle(translation[0], translation[1], 0.5, 0.3);

	//draw type is triangle
	//offset = 0, starting from the first entry
	//count = 6, every 6 points compose a rectantle
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

// Called when the canvas is created.
function start() {
		
	var canvas = document.getElementById("glcanvas");

	gl = createWebGL(canvas);
	
	shaderProgram = createShaderProgramFromScript("shader-fs", "shader-vs");
	
	vertexAttribLocation = gl.getAttribLocation(shaderProgram, "vertex_attrib_loc");
	
	colorUniformLocation = gl.getUniformLocation(shaderProgram, "color_attrib_loc");
	
	verticesBuffer = gl.createBuffer();
	
	drawScene();
	
	require(
		['uiElements'], 
		function(uiElements) {
			uiElements.setupSlider("#x", {value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
			uiElements.setupSlider("#y", {value: translation[1], slide: updatePosition(1), max: gl.canvas.height});
			uiElements.setupSlider("#z", {value: translation[2], slide: updatePosition(2), max: gl.canvas.height});
			uiElements.setupSlider("#angleX", {value: radToDeg(rotation[0]), slide: updateRotation(0), max: 360});
			uiElements.setupSlider("#angleY", {value: radToDeg(rotation[1]), slide: updateRotation(1), max: 360});
			uiElements.setupSlider("#angleZ", {value: radToDeg(rotation[2]), slide: updateRotation(2), max: 360});
			uiElements.setupSlider("#scaleX", {value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
			uiElements.setupSlider("#scaleY", {value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
			uiElements.setupSlider("#scaleZ", {value: scale[2], slide: updateScale(2), min: -5, max: 5, step: 0.01, precision: 2});

		}
	);
}