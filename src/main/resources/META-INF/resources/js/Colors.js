function generateARandomColor() {
	
	var randomColor = [0, 0, 0, 0];
	randomColor[0] = Math.random();
	randomColor[1] = Math.random();
	randomColor[2] = Math.random();
	randomColor[3] = 1;
	
	return randomColor;
}

function generateRandomColorsForBoard(size) {
	
	//pre-allocate array for triangle vertices
	var cubes = size * size;
	var vertices_in_a_cube = 6 * 2 * 3;

	var colors = new Array(cubes * vertices_in_a_cube * 3);
	
	for (var i = 0; i < cubes; ++i) {
		
		var randomColor = generateARandomColor();
		
		for (var j = 0; j < vertices_in_a_cube; ++j) {
			colors[i * vertices_in_a_cube * 3 + j * 3 + 0] = randomColor[0];
			colors[i * vertices_in_a_cube * 3 + j * 3 + 1] = randomColor[1];
			colors[i * vertices_in_a_cube * 3 + j * 3 + 2] = randomColor[2];
		}
	
	}
	
	return colors;
}