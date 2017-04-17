var canvas;
var gl;
var vertexPositionAttribute;
var colorUniformLocation;



// Loads a shader program by scouring the current document,
// looking for a script with the specified ID.
function getShader(gl, id) {
	var shaderScript = document.getElementById(id);

	// Didn't find an element with the specified ID; abort.

	if (!shaderScript) {
		return null;
	}

	// Walk through the source element's children, building the
	// shader source string.

	var theSource = "";
	var currentChild = shaderScript.firstChild;

	while(currentChild) {
		if (currentChild.nodeType == 3) {
			theSource += currentChild.textContent;
		}

		currentChild = currentChild.nextSibling;
	}

	// Now figure out what type of shader script we have,
	// based on its MIME type.

	var shader;

	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		alert("unable to convert source to shader, unknown source type");
		return null;	// Unknown shader type
	}

	// Send the source to the shader object

	gl.shaderSource(shader, theSource);

	// Compile the shader program

	gl.compileShader(shader);

	// See if it compiled successfully

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
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

// Initialize WebGL, returning the GL context or null if
// WebGL isn't available or could not be initialized.
function initWebGL() {

	gl = canvas.getContext("webgl2");
	// If we don't have a GL context, give up now

	if (!gl) {
		alert("Unable to initialize WebGL. Your browser may not support it.");
		return;
	}
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);	// Clear to black, fully opaque
	gl.clearDepth(1.0);					// Clear everything
	gl.enable(gl.DEPTH_TEST);			// Enable depth testing
	gl.depthFunc(gl.LEQUAL);			// Near things obscure far things
}

// Initialize the shaders, so WebGL knows how to light our scene.
function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	var shaderProgram = createShaderProgram(vertexShader, fragmentShader);

	gl.useProgram(shaderProgram);

	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "test_Position");
	gl.enableVertexAttribArray(vertexPositionAttribute);
	
	colorUniformLocation = gl.getUniformLocation(shaderProgram, "uni_Color");
}

function setRandomRectangle() {
	
	var x = Math.random();
	var y = Math.random();
	var w = Math.random();
	var h = Math.random();
	
	var r = Math.random();
	var g = Math.random();
	var b = Math.random();
	
	var vertices =	[	x - 1,		y - 1,		0.0,
						x + w - 1,	y - 1,		0.0,
						x - 1,		y + h - 1,	0.0,
						x - 1,		y + h - 1,	0.0,
						x + w - 1,	y - 1,		0.0,
						x + w - 1,	y + h - 1,	0.0
					];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	    // Set a random color.
	gl.uniform4f(colorUniformLocation, r, g, b, 1);
}

// Initialize the buffers we'll need. For this demo, we just have
// one object -- a simple two-dimensional square.
function initBuffers() {

	// Create a buffer for the square's vertices.

	var verticesBuffer = gl.createBuffer();

	// Select the squareVerticesBuffer as the one to apply vertex
	// operations to from here out.

	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

	// Now create an array of vertices for the square. Note that the Z
	// coordinate is always 0 here.
/*
	var vertices = [ 1.0,  1.0,  0.0,
					 0.0,  1.0,  0.0,
					 1.0,  0.0,  0.0,
					-1.0, -1.0,  0.0,
					 0.0, -1.0,  0.0,
					-1.0,  0.0,  0.0,
					-1.0,  1.0,  0.0,
					-1.0,  0.0,  0.0,
					 0.0,  1.0,  0.0];

	// Now pass the list of vertices into WebGL to build the shape. We
	// do this by creating a Float32Array from the JavaScript array,
	// then use it to fill the current vertex buffer.
	
		
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
*/
}

//Draw the scene.
function drawScene() {
	// Clear the canvas before we start drawing on it.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		
	//3 components per iteration, type is gl.FLOAT, set normalize to false, 
	//stride = 0 meaning move forward size * sizeof(type) to get next postion
	//offset = 0 meaning start at the 0 index of array
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	//A hidden part of gl.vertexAttribPointer is that it binds the 
	//current ARRAY_BUFFER to the attribute. In other words now this attribute 
	//is bound to positionBuffer. That means we're free to bind something else 
	//to the ARRAY_BUFFER bind point. The attribute will continue to use positionBuffer.
	
	for (var ii = 0; ii < 50; ++ii) {
		setRandomRectangle();
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
}

// Called when the canvas is created to get the ball rolling.
// Figuratively, that is. There's nothing moving in this demo.
function start() {
	canvas = document.getElementById("glcanvas");
	//alert(canvas);
	// Initialize the GL context	
	initWebGL();

	// Initialize the shaders; this is where all the lighting for the
	// vertices and so forth is established.
	initShaders();

	// Here's where we call the routine that builds all the objects
	// we'll be drawing.
	initBuffers();

	// Set up to draw the scene periodically.
	setInterval(drawScene, 500);
}