<%@ include file="/init.jsp" %>


<body onload="start()">
	<canvas id="glcanvas" width="1280" height="720">
		Your browser doesn't appear to support the <code>&lt;canvas&gt;</code> element.
	</canvas>
</body>

<script id="shader-fs" type="x-shader/x-fragment">
void main(void) {
	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
</script>

<script id="shader-vs" type="x-shader/x-vertex">
attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
</script>