var gl;
var meshes;

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
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	console.log("X = " + translation[0] + ", Y = " + translation[1]);

	meshes.forEach(function(mesh) {mesh.draw(gl)});
	
}

// Called when the canvas is created.
function start() {
	var canvas = document.getElementById("glcanvas");
	gl = createWebGL(canvas);
	meshes = new Array();
	
	
	var kenkenBoard = new KenkenBoardMesh();
	kenkenBoard.loadMesh();
	kenkenBoard.initMesh(gl);
	meshes.push(kenkenBoard);
	
	drawScene();
}