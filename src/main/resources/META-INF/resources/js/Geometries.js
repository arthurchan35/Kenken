function createABox() {
	//4 vertices per face, each vertex with x, y, z coords
	var vertices = [
		//front face
		0,	0,	0,
		64,	0,	0,
		64,	64,	0,
		0,	64,	0,
		//left face
		0,	0,	0,
		0,	64,	0,
		0,	64,	64,
		0,	0,	64,
		//bottom face
		0,	0,	0,
		64,	0,	0,
		64,	0,	64,
		0,	0,	64,
		//right face
		64,	64,	64,
		64,	0,	64,
		64,	0,	0,
		64,	64,	0,
		//top face
		64,	64,	64,
		0,	64,	64,
		0,	64,	0,
		64,	64,	0,
		//back face
		64,	64,	64,
		64,	0,	64,
		0,	0,	64,
		0,	64,	64
	];

	//per vertex
	var normals = [
		//front face
		0,	0,	-1,
		0,	0,	-1,
		0,	0,	-1,
		0,	0,	-1,
		//left face
		-1,	0,	0,
		-1,	0,	0,
		-1,	0,	0,
		-1,	0,	0,
		//bottom face
		0,	-1,	0,
		0,	-1,	0,
		0,	-1,	0,
		0,	-1,	0,
		//right face
		1,	0,	0,
		1,	0,	0,
		1,	0,	0,
		1,	0,	0,
		//top face
		0,	1,	0,
		0,	1,	0,
		0,	1,	0,
		0,	1,	0,
		//back face
		0,	0,	1,
		0,	0,	1,
		0,	0,	1,
		0,	0,	1
	];

	//per vertex
	var texCoords = [
		//front face
		0.25,	0.5,
		0.5,	0,5,
		0.5,	0.75,
		0.25,	0.75,
		//left face
		0.25,	0.5,
		0,		0.5,
		0,		0.75,
		0.25,	0.75,
		//bottom face
		0.25,	0.5,
		0.5,	0.5,
		0.5,	0.25,
		0.25,	0.25,
		//right face
		0.75,	0.75,
		0.75,	0.5,
		0.5,	0.5,
		0.5,	0.75,
		//top face
		0.75,	0.75,
		0.25,	1.0,
		0.25,	0.75,
		0.5,	0.75,
		//back face
		0.5,	0.0,
		0.5,	0.25,
		0.25,	0.25,
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

	var boxGeometry = new Array();
	boxGeometry.push(vertices);
	boxGeometry.push(normals);
	boxGeometry.push(texCoords);
	boxGeometry.push(vertexIndices);

	return boxGeometry;
}
