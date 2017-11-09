function createRandomRectangle2D() {
	
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
	
	return vertices;
}

function createRectangle2D(gl, x, y, w, h) {

	var vertices =	[	x - 1,		y - 1,		0.0,
						x + w - 1,	y - 1,		0.0,
						x - 1,		y + h - 1,	0.0,
						x - 1,		y + h - 1,	0.0,
						x + w - 1,	y - 1,		0.0,
						x + w - 1,	y + h - 1,	0.0
					];
	
	return vertices;
}

function createLetterF3D() {

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
	
	return vertices;
}

function createABox() {
	//8 vertices, each with x, y, z
	var vertices = [
		0,	0,	0,//v1 left, bottom, front
		64,	0,	0,//v2 right, bottom, front
		0,	64,	0,//v3 left, top, front
		64,	64,	0,//v4 right, top, front
		0,	0,	64,//v5 left, bottom, back
		64,	0,	64,//v6 right, bottom, back
		0,	64,	64,//v7 left, top, back
		64,	64,	64//v8 right, top, back
	];

	var vertexIndices = [
		//front face, two triangles
		0,	1,	2,
		0,	3,	2,
		//left face, two triangles
		0,	3,	7,
		0,	4,	7,
		//bottom face, two triangles
		0,	4,	5,
		0,	1,	5,
		//back face, two triangles
		6,	5,	4,
		6,	7,	4,
		//right face, two triangles
		6,	2,	1,
		6,	5,	1,
		//top face, two triangles
		6,	2,	3,
		6,	7,	3
	];

	var normals = [
		-1,	-1,	-1,//v1 - v8
		1,	-1,	-1,//v2 - v7
		-1,	1,	-1,
		1,	1,	-1,
		-1,	-1,	1,
		1,	-1,	1,
		-1,	1,	1,
		1,	1,	1
	];

	//assume this box use a square texture for every face
	var texCoords = [
		0,	0, // 0, left bottom of the texture
		1,	0, // 1, right bottom of the texture
		0,	1, // 2, left top of the texture
		1,	1  // 3, right top of the texture
	];

	var texCoordsIndices = [
		//front face, two triangles
		0,	1,	3,
		0,	2,	3,
		//left face, two triangles
		0,	1,	3,
		0,	2,	3,
		//bottom face, two triangles
		0,	1,	3,
		0,	2,	3,
		//back face, two triangles
		6,	1,	3,
		6,	2,	3,
		//right face, two triangles
		0,	1,	3,
		6,	2,	3,
		//top face, two triangles
		0,	1,	3,
		6,	2,	3
	];

	var boxGeometry = new Array();
	boxGeometry.push(vertices);
	boxGeometry.push(vertexIndices);
	boxGeometry.push(normals);
	boxGeometry.push(texCoords);
	boxGeometry.push(texCoordsIndices);

	return boxGeometry;
}
