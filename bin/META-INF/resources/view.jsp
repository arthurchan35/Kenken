<%@ include file="/init.jsp" %>


<body onload="start()">
	<canvas id="glcanvas" width="1152" height="648">
		Your browser doesn't appear to support the <code>&lt;canvas&gt;</code> element.
	</canvas>
</body>

<script id="shader-fs" type="x-shader/x-fragment">
precision mediump float;

void main(void) {
	gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
}
</script>

<script id="shader-vs" type="x-shader/x-vertex">
attribute vec4 test_Position;

void main(void) {
	gl_Position = test_Position;
}
</script>