function addEventListeners(canvas) {
	canvas.addEventListener(
		'mousemove',
		function (e) {
			translation[0] = e.pageX;
			translation[1] = e.pageY;
			drawScene();
		}
	);
}