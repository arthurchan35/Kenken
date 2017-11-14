function createACube() {
	/*
	 * 1 cube has 6 faces
	 * 4 vertices per face
	 * each vertex consists of
	 * 3 floats of position
	 * 3 floats of normal
	 * 2 floats of text coord
	 */
	var vertices = [

		//front face
		//v01
		0,	0,	0,		//vertex 01's position: x, y, z
		0,	0,	-1,		//vertex 01's normal: n1, n2, n3
		0.25,	0.5,	//vertex 01's text coord: u, v
		//v02
		64,	0,	0,
		0,	0,	-1,
		0.5,	0,5,
		//v03
		64,	64,	0,
		0,	0,	-1,
		0.5,	0.75,
		//v04
		0,	64,	0,
		0,	0,	-1,
		0.25,	0.75,

		//left face
		//v05
		0,	0,	0,
		-1,	0,	0,
		0.25,	0.5,
		//v06
		0,	64,	0,
		-1,	0,	0,
		0,		0.5,
		//v07
		0,	64,	64,
		-1,	0,	0,
		0,		0.75,
		//v08
		0,	0,	64,
		-1,	0,	0,
		0.25,	0.75,

		//bottom face
		//v09
		0,	0,	0,
		0,	-1,	0,
		0.25,	0.5,
		//v10
		64,	0,	0,
		0,	-1,	0,
		0.5,	0.5,
		//v11
		64,	0,	64,
		0,	-1,	0,
		0.5,	0.25,
		//v12
		0,	0,	64,
		0,	-1,	0,
		0.25,	0.25,

		//right face
		//v13
		64,	64,	64,
		1,	0,	0,
		0.75,	0.75,
		//v14
		64,	0,	64,
		1,	0,	0,
		0.75,	0.5,
		//v15
		64,	0,	0,
		1,	0,	0,
		0.5,	0.5,
		//v16
		64,	64,	0,
		1,	0,	0,
		0.5,	0.75,

		//top face
		//v17
		64,	64,	64,
		0,	1,	0,
		0.75,	0.75,
		//v18
		0,	64,	64,
		0,	1,	0,
		0.25,	1.0,
		//v19
		0,	64,	0,
		0,	1,	0,
		0.25,	0.75,
		//v20
		64,	64,	0,
		0,	1,	0,
		0.5,	0.75,

		//back face
		//v21
		64,	64,	64,
		0,	0,	1,
		0.5,	0.0,
		//v22
		64,	0,	64,
		0,	0,	1,
		0.5,	0.25,
		//v23
		0,	0,	64,
		0,	0,	1,
		0.25,	0.25,
		//v24
		0,	64,	64,
		0,	0,	1,
		0.25,	0.0
	];

	var vertexIndices = [
		//front face, two triangles
		0,	1,	2,
		0,	3,	2,
		//left face, two triangles
		4,	5,	6,
		4,	7,	6,
		//bottom face, two triangles
		8,	9,	10,
		8,	11,	10,
		//right face, two triangles
		12,	13,	14,
		12,	15,	14,
		//top face, two triangles
		16,	17,	18,
		16,	19,	18，
		//back face, two triangles
		20,	21,	22,
		20,	23,	22
	];

	var cube;
	cube.vertices = vertices;
	cube.vertexIndices = vertexIndices;

	return cube;
}
