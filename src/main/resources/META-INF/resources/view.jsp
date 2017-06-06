<%@ include file="/init.jsp" %>


<body onload="start()">
	<canvas id="glcanvas" width="1152" height="648">
		Your browser doesn't appear to support the <code>&lt;canvas&gt;</code> element.
	</canvas>
	<div id="uiContainer">
		<div id="ui">
			<div id="x"></div>
			<div id="y"></div>
		</div>
	</div>
</body>

<script id="shader-fs" type="x-shader/x-fragment">

precision mediump float;

uniform vec4 color_attrib_loc;
	
void main(void) {
	gl_FragColor = color_attrib_loc;
}

</script>

<script id="shader-vs" type="x-shader/x-vertex">

attribute vec4 vertex_attrib_loc;
uniform mat4 model_matrix;
	
void main(void) {
	gl_Position = model_matrix * vertex_attrib_loc;
}

</script>