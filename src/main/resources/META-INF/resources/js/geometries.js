function createRandomRectangle2D(gl) {
	
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

function createRectangle2D(gl, x, y, w, h) {
	
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