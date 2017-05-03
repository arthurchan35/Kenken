<%@ include file="/init.jsp" %>


<body onload="start()">
	<canvas id="glcanvas" width="1152" height="648">
		Your browser doesn't appear to support the <code>&lt;canvas&gt;</code> element.
	</canvas>
</body>

<script id="shader-fs" type="x-shader/x-fragment">
precision mediump float;

uniform vec4 uni_Color;
varying vec4 vry_Color;
void main(void) {
	gl_FragColor = vry_Color;
}
</script>

<script id="shader-vs" type="x-shader/x-vertex">
attribute vec4 test_Position;
varying vec4 vry_Color;
void main(void) {
	gl_Position = test_Position;
	vry_Color = gl_Position * 0.5 + 0.5;
}
</script>