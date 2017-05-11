<%@ include file="/init.jsp" %>


<body onload="start()">
	<canvas id="glcanvas" width="1152" height="648">
		Your browser doesn't appear to support the <code>&lt;canvas&gt;</code> element.
	</canvas>
</body>

<script id="shader-fs" type="x-shader/x-fragment">
precision mediump float;

uniform vec4 color_attrib_loc;
varying vec4 vry_Color;
void main(void) {
	gl_FragColor = color_attrib_loc;
}
</script>

<script id="shader-vs" type="x-shader/x-vertex">
attribute vec4 vertex_attrib_loc;
varying vec4 vry_Color;
void main(void) {
	gl_Position = vertex_attrib_loc;
	vry_Color = gl_Position * 0.5 + 0.5;
}
</script>