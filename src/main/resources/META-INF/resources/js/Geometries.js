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

function createLetterF3D(gl) {
	
	var r = Math.random();
	var g = Math.random();
	var b = Math.random();

	var vertices = [
		// left column front
        0,   0,  0,
       30,   0,  0,
        0, 150,  0,
        0, 150,  0,
       30,   0,  0,
       30, 150,  0,

      // top rung front
       30,   0,  0,
      100,   0,  0,
       30,  30,  0,
       30,  30,  0,
      100,   0,  0,
      100,  30,  0,

      // middle rung front
       30,  60,  0,
       67,  60,  0,
       30,  90,  0,
       30,  90,  0,
       67,  60,  0,
       67,  90,  0,

      // left column back
        0,   0,  30,
       30,   0,  30,
        0, 150,  30,
        0, 150,  30,
       30,   0,  30,
       30, 150,  30,

      // top rung back
       30,   0,  30,
      100,   0,  30,
       30,  30,  30,
       30,  30,  30,
      100,   0,  30,
      100,  30,  30,

      // middle rung back
       30,  60,  30,
       67,  60,  30,
       30,  90,  30,
       30,  90,  30,
       67,  60,  30,
       67,  90,  30,

      // top
        0,   0,   0,
      100,   0,   0,
      100,   0,  30,
        0,   0,   0,
      100,   0,  30,
        0,   0,  30,

      // top rung right
      100,   0,   0,
      100,  30,   0,
      100,  30,  30,
      100,   0,   0,
      100,  30,  30,
      100,   0,  30,

      // under top rung
      30,   30,   0,
      30,   30,  30,
      100,  30,  30,
      30,   30,   0,
      100,  30,  30,
      100,  30,   0,

      // between top rung and middle
      30,   30,   0,
      30,   30,  30,
      30,   60,  30,
      30,   30,   0,
      30,   60,  30,
      30,   60,   0,

      // top of middle rung
      30,   60,   0,
      30,   60,  30,
      67,   60,  30,
      30,   60,   0,
      67,   60,  30,
      67,   60,   0,

      // right of middle rung
      67,   60,   0,
      67,   60,  30,
      67,   90,  30,
      67,   60,   0,
      67,   90,  30,
      67,   90,   0,

      // bottom of middle rung.
      30,   90,   0,
      30,   90,  30,
      67,   90,  30,
      30,   90,   0,
      67,   90,  30,
      67,   90,   0,

      // right of bottom
      30,   90,   0,
      30,   90,  30,
      30,  150,  30,
      30,   90,   0,
      30,  150,  30,
      30,  150,   0,

      // bottom
      0,   150,   0,
      0,   150,  30,
      30,  150,  30,
      0,   150,   0,
      30,  150,  30,
      30,  150,   0,

      // left side
      0,   0,   0,
      0,   0,  30,
      0, 150,  30,
      0,   0,   0,
      0, 150,  30,
      0, 150,   0
	];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Set a random color.
	gl.uniform4f(colorUniformLocation, r, g, b, 1);
}