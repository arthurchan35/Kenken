function createRandomRectangle2D(gl) {
	
	var x = Math.random();
	var y = Math.random();
	var w = Math.random();
	var h = Math.random();
	
	var vertices =	[	x - 1,		y - 1,		0.0,
						x + w - 1,	y - 1,		0.0,
						x - 1,		y + h - 1,	0.0,
						x - 1,		y + h - 1,	0.0,
						x + w - 1,	y - 1,		0.0,
						x + w - 1,	y + h - 1,	0.0
					];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function createRectangle2D(gl, x, y, w, h) {

	var vertices =	[	x - 1,		y - 1,		0.0,
						x + w - 1,	y - 1,		0.0,
						x - 1,		y + h - 1,	0.0,
						x - 1,		y + h - 1,	0.0,
						x + w - 1,	y - 1,		0.0,
						x + w - 1,	y + h - 1,	0.0
					];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

}

function createLetterF3D(gl) {

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

}

function createKenkenBoard3D(gl, size) {

	var length = 30;
	
	//pre-allocate array for triangle vertices
	var totalTriangles = size * size * 6 * 2;
	var vertices = new Array(totalTriangles * 3);
	
	var x = 0;
	var y = 0;
	var z = 0;

	//each iteration adds one row of cubes
	for (var i = 0; i < size; ++i) {
		//each iteration adds one cube in a row
		for (var j = 0; j < size; ++j) {
			//each cube has 6 faces, each face has 2 triangles
			//each triangle has 3 points, each point has x, y, z
			addCube(vertices, x, y, z, length, (i * size + j) * 6 * 2 * 3 * 3);
			x += length;
		}
		x = 0;
		z += length;
	}
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	function addCube(v, x, y, z, l, i) {
		
		//back face
		v[i +   0] = x;		v[i +   1] = y;		v[i +   2] = z;
		v[i +   3] = x + l;	v[i +   4] = y;		v[i +   5] = z;
		v[i +   6] = x;		v[i +   7] = y + l;	v[i +   8] = z;
		v[i +   9] = x + l;	v[i +  10] = y;		v[i +  11] = z;
		v[i +  12] = x;		v[i +  13] = y + l;	v[i +  14] = z;
		v[i +  15] = x + l;	v[i +  16] = y + l;	v[i +  17] = z;
		
		//front face
		v[i +  18] = x;		v[i +  19] = y;		v[i +  20] = z + l;
		v[i +  21] = x + l;	v[i +  22] = y;		v[i +  23] = z + l;
		v[i +  24] = x;		v[i +  25] = y + l;	v[i +  26] = z + l;
		v[i +  27] = x + l;	v[i +  28] = y;		v[i +  29] = z + l;
		v[i +  30] = x;		v[i +  31] = y + l;	v[i +  32] = z + l;
		v[i +  33] = x + l;	v[i +  34] = y + l;	v[i +  35] = z + l;
		
		//left face
		v[i +  36] = x;		v[i +  37] = y;		v[i +  38] = z;
		v[i +  39] = x;		v[i +  40] = y;		v[i +  41] = z + l;
		v[i +  42] = x;		v[i +  43] = y + l;	v[i +  44] = z;
		v[i +  45] = x;		v[i +  46] = y;		v[i +  47] = z + l;
		v[i +  48] = x;		v[i +  49] = y + l;	v[i +  50] = z;
		v[i +  51] = x;		v[i +  52] = y + l;	v[i +  53] = z + l;
		
		//right face
		v[i +  54] = x + l;	v[i +  55] = y;		v[i +  56] = z;
		v[i +  57] = x + l;	v[i +  58] = y;		v[i +  59] = z + l;
		v[i +  60] = x + l;	v[i +  61] = y + l;	v[i +  62] = z;
		v[i +  63] = x + l;	v[i +  64] = y;		v[i +  65] = z + l;
		v[i +  66] = x + l;	v[i +  67] = y + l;	v[i +  68] = z;
		v[i +  69] = x + l;	v[i +  70] = y + l;	v[i +  71] = z + l;
		
		//bottom face
		v[i +  72] = x;		v[i +  73] = y;		v[i +  74] = z;
		v[i +  75] = x + l;	v[i +  76] = y;		v[i +  77] = z;
		v[i +  78] = x;		v[i +  79] = y;		v[i +  80] = z + l;
		v[i +  81] = x + l;	v[i +  82] = y;		v[i +  83] = z;
		v[i +  84] = x;		v[i +  85] = y;		v[i +  86] = z + l;
		v[i +  87] = x + l;	v[i +  88] = y;		v[i +  89] = z + l;
		
		//top face
		v[i +  90] = x;		v[i +  91] = y + l;	v[i +  92] = z;
		v[i +  93] = x + l;	v[i +  94] = y + l;	v[i +  95] = z;
		v[i +  96] = x;		v[i +  97] = y + l;	v[i +  98] = z + l;
		v[i +  99] = x + l;	v[i + 100] = y + l;	v[i + 101] = z;
		v[i + 102] = x;		v[i + 103] = y + l;	v[i + 104] = z + l;
		v[i + 105] = x + l;	v[i + 106] = y + l;	v[i + 107] = z + l;
	}
}