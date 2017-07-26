<%@ include file="/init.jsp" %>


<body onload="start()">
	<canvas id="glcanvas" width="1920" height="1080"></canvas>
</body>

<script id="shader-fs" type="x-shader/x-fragment">

precision mediump float;

varying vec4 color_vary_loc;
	
void main(void) {
	gl_FragColor = color_vary_loc;
}

</script>

<script id="shader-vs" type="x-shader/x-vertex">

attribute vec4 vertex_attrib_loc;
attribute vec4 color_attrib_loc;

uniform mat4 mvp_matrix;

varying vec4 color_vary_loc;
	
void main(void) {
	gl_Position = mvp_matrix * vertex_attrib_loc;
	color_vary_loc = color_attrib_loc;
}

</script>