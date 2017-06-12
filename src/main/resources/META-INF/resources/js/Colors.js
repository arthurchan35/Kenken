function generateARandomColor() {
	
	var randomColor = [0, 0, 0, 0];
	randomColor[0] = Math.random();
	randomColor[1] = Math.random();
	randomColor[2] = Math.random();
	randomColor[3] = 1;
	
	return randomColor;
}